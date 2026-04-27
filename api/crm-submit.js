// CRM Form Submission Handler
// Saves to database AND sends Telegram notification

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Save to database
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          company: formData.company || null,
          company_size: formData.companySize || null,
          interest: formData.interest || null,
          message: formData.message,
          status: 'new',
          source: 'contact_form'
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue to send Telegram even if DB fails
    }

    // Send Telegram notification
    const telegramSent = await sendTelegramNotification(formData, lead?.id);

    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been sent. We'll get back to you within 24 hours.",
      leadId: lead?.id,
      telegramSent
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

async function sendTelegramNotification(formData, leadId) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram not configured');
    return false;
  }

  const message = `
🔔 *New Lead Submission* ${leadId ? `#${leadId.substring(0, 8)}` : ''}

👤 *Name:* ${formData.firstName} ${formData.lastName}
📧 *Email:* ${formData.email}
🏢 *Company:* ${formData.company || 'Not provided'}
📊 *Size:* ${formData.companySize || 'Not provided'}
🎯 *Interest:* ${formData.interest || 'Not specified'}

💬 *Message:*
${formData.message}

---
⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
${leadId ? `\n🔗 Lead ID: ${leadId}` : ''}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Telegram error:', error);
    return false;
  }
}
