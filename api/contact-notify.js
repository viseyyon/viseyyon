// Viseyyon Contact Form - Notification Handler
// Sends notifications via Telegram, WhatsApp, and SMS
// Deploy to Vercel/Netlify as serverless function

// Configuration
const CONFIG = {
  // Telegram Bot Configuration
  telegram: {
    enabled: process.env.TELEGRAM_ENABLED === 'true',
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },

  // WhatsApp Configuration (via Twilio)
  whatsapp: {
    enabled: process.env.WHATSAPP_ENABLED === 'true',
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_WHATSAPP_FROM, // e.g., whatsapp:+14155238886
    toNumber: process.env.TWILIO_WHATSAPP_TO,     // e.g., whatsapp:+919876543210
  },

  // SMS Configuration (via Twilio)
  sms: {
    enabled: process.env.SMS_ENABLED === 'true',
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_SMS_FROM,
    toNumber: process.env.TWILIO_SMS_TO,
  },
};

// Send Telegram notification
async function sendTelegramNotification(formData) {
  if (!CONFIG.telegram.enabled) return { success: false, reason: 'disabled' };

  const message = `
🔔 *New Contact Form Submission*

👤 *Name:* ${formData.firstName} ${formData.lastName}
📧 *Email:* ${formData.email}
🏢 *Company:* ${formData.company || 'Not provided'}
📊 *Company Size:* ${formData.companySize || 'Not provided'}
🎯 *Interest:* ${formData.interest || 'Not specified'}

💬 *Message:*
${formData.message}

---
⏰ ${new Date().toLocaleString()}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${CONFIG.telegram.botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CONFIG.telegram.chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const result = await response.json();
    return { success: result.ok, data: result };
  } catch (error) {
    console.error('Telegram error:', error);
    return { success: false, error: error.message };
  }
}

// Send WhatsApp notification (via Twilio)
async function sendWhatsAppNotification(formData) {
  if (!CONFIG.whatsapp.enabled) return { success: false, reason: 'disabled' };

  const message = `
*Viseyyon Contact Form*

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company || 'N/A'}
Interest: ${formData.interest || 'N/A'}

Message: ${formData.message}
  `.trim();

  try {
    const auth = Buffer.from(
      `${CONFIG.whatsapp.accountSid}:${CONFIG.whatsapp.authToken}`
    ).toString('base64');

    const params = new URLSearchParams({
      To: CONFIG.whatsapp.toNumber,
      From: CONFIG.whatsapp.fromNumber,
      Body: message,
    });

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${CONFIG.whatsapp.accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    );

    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (error) {
    console.error('WhatsApp error:', error);
    return { success: false, error: error.message };
  }
}

// Send SMS notification (via Twilio)
async function sendSMSNotification(formData) {
  if (!CONFIG.sms.enabled) return { success: false, reason: 'disabled' };

  const message = `Viseyyon Form: ${formData.firstName} ${formData.lastName} (${formData.email}) - ${formData.interest || 'Contact'}. ${formData.message.substring(0, 80)}...`;

  try {
    const auth = Buffer.from(
      `${CONFIG.sms.accountSid}:${CONFIG.sms.authToken}`
    ).toString('base64');

    const params = new URLSearchParams({
      To: CONFIG.sms.toNumber,
      From: CONFIG.sms.fromNumber,
      Body: message,
    });

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${CONFIG.sms.accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    );

    const result = await response.json();
    return { success: response.ok, data: result };
  } catch (error) {
    console.error('SMS error:', error);
    return { success: false, error: error.message };
  }
}

// Main handler
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['firstName', 'email', 'message']
      });
    }

    // Send notifications
    const results = await Promise.allSettled([
      sendTelegramNotification(formData),
      sendWhatsAppNotification(formData),
      sendSMSNotification(formData),
    ]);

    // Check if at least one notification succeeded
    const successCount = results.filter(
      r => r.status === 'fulfilled' && r.value.success
    ).length;

    if (successCount === 0) {
      return res.status(500).json({
        error: 'All notifications failed',
        details: results,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Form submitted successfully! ${successCount} notification(s) sent.`,
      results: results.map((r, i) => ({
        channel: ['telegram', 'whatsapp', 'sms'][i],
        status: r.status,
        success: r.status === 'fulfilled' ? r.value.success : false,
        reason: r.status === 'fulfilled' ? r.value.reason : r.reason,
      })),
    });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
