// Viseyyon Contact Form - Telegram Notifications
// Simple, free, instant notifications via Telegram Bot

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramMessage(formData) {
  const message = `
🔔 *New Contact Form Submission*

👤 *Name:* ${formData.firstName} ${formData.lastName}
📧 *Email:* ${formData.email}
🏢 *Company:* ${formData.company || 'Not provided'}
📊 *Size:* ${formData.companySize || 'Not provided'}
🎯 *Interest:* ${formData.interest || 'Not specified'}

💬 *Message:*
${formData.message}

---
⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
  `.trim();

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

  return await response.json();
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Validate
    if (!formData.firstName || !formData.email || !formData.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check config
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return res.status(500).json({ error: 'Telegram not configured' });
    }

    // Send notification
    const result = await sendTelegramMessage(formData);

    if (result.ok) {
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your message has been sent. We\'ll get back to you within 24 hours.',
      });
    } else {
      throw new Error(result.description || 'Telegram API error');
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      error: 'Failed to send notification',
      details: error.message,
    });
  }
}
