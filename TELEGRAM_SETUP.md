# Telegram Contact Form Notifications - Quick Setup

Get instant Telegram messages when someone submits your contact form! 

**100% FREE** • **5 Minutes Setup** • **No Credit Card Required**

---

## 📱 Step 1: Create Your Telegram Bot (2 minutes)

1. **Open Telegram** on your phone or computer

2. **Search for** `@BotFather` (official bot by Telegram)

3. **Start a chat** and send: `/newbot`

4. **Choose a name** for your bot (e.g., "Viseyyon Contact Bot")

5. **Choose a username** (must end in 'bot', e.g., "viseyyon_contact_bot")

6. **Copy the token** - BotFather will give you a token like:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```
   ⚠️ Keep this token secret!

---

## 🆔 Step 2: Get Your Chat ID (1 minute)

1. **Search for** `@userinfobot` in Telegram

2. **Start a chat** with it

3. It will instantly reply with your **User ID** (a number like `123456789`)

4. **Copy this number** - this is your Chat ID

**Alternative method:**
- Send a message to your bot from Step 1
- Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
- Look for `"chat":{"id":123456789}` in the response

---

## ☁️ Step 3: Deploy to Vercel (2 minutes)

### Option A: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/viseyyon/viseyyon)

1. Click the button above
2. Sign in to Vercel (free account)
3. When asked for environment variables, enter:
   - `TELEGRAM_BOT_TOKEN`: Your bot token from Step 1
   - `TELEGRAM_CHAT_ID`: Your chat ID from Step 2
4. Click **Deploy**

### Option B: Manual Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add TELEGRAM_BOT_TOKEN
# Paste your bot token when prompted

vercel env add TELEGRAM_CHAT_ID
# Paste your chat ID when prompted

# Deploy again to use the env vars
vercel --prod
```

Your API endpoint will be:
```
https://your-project.vercel.app/api/telegram-notify
```

---

## 🔧 Step 4: Update Your Website

### Update the form script

Edit `js/contact-form.js` and change the API endpoint:

```javascript
const CONFIG = {
  apiEndpoint: 'https://your-project.vercel.app/api/telegram-notify',
  // Replace with your actual Vercel URL
};
```

Or use the relative path if deployed together:
```javascript
apiEndpoint: '/api/telegram-notify',
```

### Commit and push

```bash
git add js/contact-form.js
git commit -m "Connect form to Telegram notifications"
git push origin main
```

---

## ✅ Step 5: Test It!

1. **Go to your contact page**

2. **Fill out the form** with test data

3. **Submit**

4. **Check your Telegram** - you should instantly receive:

```
🔔 New Contact Form Submission

👤 Name: Test User
📧 Email: test@example.com
🏢 Company: Test Company
📊 Size: Not provided
🎯 Interest: NEXUS-RCA Enterprise

💬 Message:
This is a test message to verify the notification system works!

---
⏰ 4/27/2026, 1:00:00 AM
```

---

## 🎯 What You Get

✅ **Instant notifications** - Get notified within seconds  
✅ **Complete form data** - All fields included in message  
✅ **Formatted messages** - Easy to read with emojis  
✅ **Timestamp** - Know exactly when each form was submitted  
✅ **100% Free** - No costs, no limits  
✅ **No maintenance** - Just works!  

---

## 🔐 Security Notes

1. **Never share your bot token** - keep it secret
2. **Don't commit .env** - it's in .gitignore
3. **Use Vercel environment variables** - they're encrypted
4. **Regenerate token if exposed** - ask @BotFather for `/revoke`

---

## 🐛 Troubleshooting

### "Telegram not configured" error

✅ Check environment variables are set in Vercel:
- Go to Vercel Dashboard → Project → Settings → Environment Variables
- Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are there
- Redeploy after adding variables

### Not receiving messages

✅ **Start a chat with your bot first**
- Search for your bot in Telegram
- Click **Start** or send any message
- Bots can only message users who've started a chat with them

✅ **Check bot token and chat ID**
- Token should be in format: `123456789:ABCdef...`
- Chat ID should be just numbers (can be negative for groups)

✅ **Test the API directly**
```bash
curl -X POST https://your-project.vercel.app/api/telegram-notify \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### "Unauthorized" error

✅ Bot token is wrong or revoked
- Double-check the token from @BotFather
- Make sure you copied it completely
- Try creating a new bot if needed

---

## 💡 Pro Tips

### Send to a Group

Want multiple people to receive notifications?

1. Create a Telegram group
2. Add your bot to the group
3. Make the bot an admin (optional)
4. Get the group chat ID:
   - Send a message in the group
   - Visit: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Look for `"chat":{"id":-123456789}` (note the negative sign)
5. Use this negative number as your `TELEGRAM_CHAT_ID`

### Multiple Notification Channels

Want different notifications for different forms?

1. Create separate bots for each form
2. Use different API endpoints (e.g., `/api/contact-notify`, `/api/demo-notify`)
3. Set different env vars: `CONTACT_BOT_TOKEN`, `DEMO_BOT_TOKEN`, etc.

### Custom Message Format

Edit `api/telegram-notify.js` to customize the message:

```javascript
const message = `
🎯 New Lead!

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Interest: ${formData.interest}

${formData.message}
`;
```

---

## 📊 Your Notification Flow

```
User fills form
    ↓
Contact page
    ↓
JavaScript sends to API
    ↓
Vercel Function
    ↓
Telegram Bot API
    ↓
📱 Your Telegram (instant!)
```

---

## 🎉 Done!

You're all set! Every form submission will now instantly appear in your Telegram.

**Questions?** 
- Check Troubleshooting section above
- Test with the curl command
- Check Vercel logs for errors

---

## 🔗 Resources

- **Telegram Bot API**: https://core.telegram.org/bots/api
- **Vercel Functions**: https://vercel.com/docs/functions
- **Get Updates**: `https://api.telegram.org/bot<TOKEN>/getUpdates`

---

**Enjoy your instant notifications! 🚀**
