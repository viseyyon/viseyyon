# Contact Form Notifications Setup Guide

Get instant notifications via Telegram, WhatsApp, and SMS when someone submits the contact form!

## 📋 Overview

The contact form now supports real-time notifications through:
- ✅ **Telegram** (Free, instant, recommended)
- ✅ **WhatsApp** (via Twilio)
- ✅ **SMS** (via Twilio)

## 🚀 Quick Start (Telegram - Free & Easy)

### Step 1: Create Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` command
3. Follow instructions to create your bot
4. Copy the **Bot Token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Step 2: Get Your Chat ID

1. Search for `@userinfobot` in Telegram
2. Start a chat with it
3. It will send you your **Chat ID** (looks like: `123456789`)

### Step 3: Configure Environment Variables

**For Vercel deployment:**
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add these variables:

```
TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=your_bot_token_from_step_1
TELEGRAM_CHAT_ID=your_chat_id_from_step_2
```

**For local testing:**
Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
# Edit .env with your values
```

### Step 4: Deploy

```bash
# If using Vercel
vercel deploy

# If using Netlify
netlify deploy
```

### Step 5: Test!

1. Visit your contact page
2. Fill out the form
3. Submit
4. Check your Telegram - you should receive a notification instantly!

---

## 📱 WhatsApp Setup (via Twilio)

### Step 1: Create Twilio Account

1. Go to https://www.twilio.com/try-twilio
2. Sign up (free trial includes $15 credit)
3. Verify your phone number

### Step 2: Get WhatsApp Sandbox

1. In Twilio Console, go to **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Follow instructions to join the sandbox
3. Send the join code to the Twilio WhatsApp number from your WhatsApp

### Step 3: Get Credentials

From Twilio Console, copy:
- **Account SID**
- **Auth Token** (click to reveal)
- **WhatsApp From Number** (e.g., `whatsapp:+14155238886`)
- **Your WhatsApp Number** (e.g., `whatsapp:+919876543210`)

### Step 4: Configure

Add to Vercel Environment Variables:

```
WHATSAPP_ENABLED=true
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+919876543210
```

---

## 💬 SMS Setup (via Twilio)

### Step 1: Get a Phone Number

1. In Twilio Console, go to **Phone Numbers** → **Buy a number**
2. Choose a number (may cost $1-2/month)
3. Or use trial number (limited to verified numbers)

### Step 2: Configure

Add to Vercel Environment Variables:

```
SMS_ENABLED=true
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_SMS_FROM=+1234567890
TWILIO_SMS_TO=+919876543210
```

---

## 🔧 Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard
4. Your API will be at: `https://your-domain.vercel.app/api/contact-notify`

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Create `netlify.toml`:
```toml
[build]
  functions = "api"

[functions]
  node_bundler = "esbuild"
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Set environment variables in Netlify dashboard

### Option 3: Self-hosted (Node.js)

1. Create Express server wrapping the function
2. Deploy to your server
3. Set environment variables

---

## 📝 Update Contact Form HTML

Add the script to your contact page:

```html
<!-- Before closing </body> tag -->
<script src="../js/contact-form.js"></script>
```

Update API endpoint in `js/contact-form.js`:
```javascript
apiEndpoint: 'https://your-domain.vercel.app/api/contact-notify',
```

---

## ✅ Testing

### Test Telegram

```bash
curl -X POST https://your-domain.vercel.app/api/contact-notify \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "message": "This is a test notification"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Form submitted successfully! 1 notification(s) sent."
}
```

Check your Telegram for the notification!

---

## 🎯 Notification Format

### Telegram Message:
```
🔔 New Contact Form Submission

👤 Name: John Doe
📧 Email: john@company.com
🏢 Company: Acme Inc
📊 Company Size: 51-200 employees
🎯 Interest: NEXUS-RCA Enterprise

💬 Message:
We're interested in implementing NEXUS-RCA for our DevOps team...

---
⏰ 4/27/2026, 12:00:00 AM
```

### WhatsApp/SMS:
Shorter format optimized for mobile.

---

## 🔒 Security

1. **Never commit `.env` file** - it's in `.gitignore`
2. **Use environment variables** for all secrets
3. **Rotate tokens** periodically
4. **Rate limit** the API endpoint (Vercel does this automatically)
5. **Validate input** on both client and server

---

## 💰 Cost Breakdown

| Service | Cost | Free Tier |
|---------|------|-----------|
| **Telegram** | FREE ✅ | Unlimited |
| **Twilio WhatsApp** | ~$0.005/message | $15 credit |
| **Twilio SMS** | ~$0.0075-0.01/message | $15 credit |
| **Vercel Hosting** | FREE ✅ | 100GB bandwidth/month |

**Recommended**: Use Telegram (completely free and instant!)

---

## 🐛 Troubleshooting

### Telegram not working

- ✅ Check bot token is correct
- ✅ Make sure you started a chat with your bot
- ✅ Chat ID should be a number, not username
- ✅ Check environment variables are set in Vercel

### WhatsApp not working

- ✅ Join the Twilio sandbox first
- ✅ Use correct format: `whatsapp:+1234567890`
- ✅ Check Twilio account has credit
- ✅ Verify phone number in Twilio console

### API returns 500 error

- ✅ Check server logs in Vercel
- ✅ Verify all required env variables are set
- ✅ Test credentials separately
- ✅ Check CORS settings

---

## 📚 Resources

- **Telegram Bot API**: https://core.telegram.org/bots/api
- **Twilio WhatsApp**: https://www.twilio.com/docs/whatsapp
- **Twilio SMS**: https://www.twilio.com/docs/sms
- **Vercel Functions**: https://vercel.com/docs/functions

---

## 🎉 Success!

Once set up, you'll receive instant notifications for every form submission. No more checking emails constantly!

**Questions?** Check the troubleshooting section or contact support.
