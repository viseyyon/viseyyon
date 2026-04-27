# Viseyyon CRM - Complete Setup Guide

A free, fully-functional CRM system to manage contact form submissions with Telegram notifications.

**100% FREE** • **No Credit Card Required** • **Hosted on Vercel + Supabase**

---

## Features

✅ Store all contact form submissions in database  
✅ Real-time Telegram notifications with Lead ID  
✅ Web dashboard to view and manage leads  
✅ Filter by status, search, and sort leads  
✅ Update lead status (New, Contacted, In Progress, Converted, Lost)  
✅ Add notes to leads  
✅ View lead details and history  
✅ 100% free hosting (Vercel + Supabase free tiers)  

---

## Step 1: Create Supabase Account (3 minutes)

1. **Go to** https://supabase.com
2. **Sign up** with GitHub (instant, no credit card)
3. **Create a new project**:
   - Project name: `viseyyon-crm`
   - Database password: (create a strong password, save it)
   - Region: Choose closest to you
   - Click **Create new project**
4. **Wait 2 minutes** for project to be ready

---

## Step 2: Setup Database (2 minutes)

1. In your Supabase project, go to **SQL Editor**
2. Click **New query**
3. **Copy and paste** the entire content from `crm/DATABASE_SCHEMA.sql`
4. Click **Run** (bottom right)
5. You should see: ✅ Success. No rows returned

---

## Step 3: Get Supabase Credentials (1 minute)

1. Go to **Project Settings** (gear icon)
2. Click **API** in the left sidebar
3. **Copy these values** (you'll need them):
   - `Project URL` (looks like: https://xxxxx.supabase.co)
   - `anon public` key (long string starting with eyJ...)

---

## Step 4: Update Vercel Environment Variables (2 minutes)

Add these to your Vercel project:

```bash
# In your terminal:
cd /Users/manoharans/Downloads/viseyyon-website_2

# Add Supabase URL
echo "https://your-project.supabase.co" | vercel env add SUPABASE_URL production

# Add Supabase Service Key
echo "your-service-role-key" | vercel env add SUPABASE_SERVICE_KEY production
```

**Where to find Service Role key:**
1. Supabase Project Settings → API
2. Under "Project API keys" section
3. Copy the `service_role` key (⚠️ Keep this secret!)

---

## Step 5: Install Supabase Package (1 minute)

```bash
# Create package.json if it doesn't exist
echo '{
  "name": "viseyyon-crm",
  "version": "1.0.0",
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  }
}' > package.json

# Install dependencies
npm install
```

---

## Step 6: Deploy CRM to Vercel (2 minutes)

```bash
# Deploy with the new API endpoint
vercel --prod
```

Your CRM will be available at:
- **Dashboard**: https://viseyyon-website2.vercel.app/crm/
- **API**: https://viseyyon-website2.vercel.app/api/crm-submit

---

## Step 7: Update Contact Form (1 minute)

Update `js/contact-form.js` to use the new CRM endpoint:

```javascript
const CONFIG = {
  apiEndpoint: 'https://viseyyon-website2.vercel.app/api/crm-submit',
  fallbackEmail: 'hello@viseyyon.in',
};
```

Then commit and deploy:

```bash
git add js/contact-form.js package.json
git commit -m "Connect contact form to CRM database"
git push origin main
```

---

## Step 8: Access Your CRM Dashboard (1 minute)

1. **Open**: https://viseyyon-website2.vercel.app/crm/
2. **Login** with your Supabase credentials:
   - Format: `{"url":"your-supabase-url","key":"your-anon-key"}`
   - Or: `your-supabase-url|your-anon-key`
3. **See your leads!** 🎉

---

## Using the CRM

### Dashboard Features

- **Stats Cards**: Total leads, New, In Progress, Converted
- **Search**: Find leads by name, email, or company
- **Filter**: View leads by status
- **Sort**: By date or name

### Managing Leads

1. **Click on any lead** to see full details
2. **Update status**:
   - New → Contacted → In Progress → Converted
   - Or mark as Lost
3. **Add notes** to track conversations and actions
4. **Save changes** to update the lead

### Lead Statuses

- **New**: Fresh submissions, not yet contacted
- **Contacted**: Reached out, waiting for response
- **In Progress**: Actively working with the lead
- **Converted**: Successfully closed!
- **Lost**: Not interested or didn't respond

---

## How It Works

```
User submits form
    ↓
Vercel API (/api/crm-submit)
    ↓
1. Save to Supabase database
2. Send Telegram notification with Lead ID
    ↓
You get instant Telegram alert
    ↓
View & manage in CRM dashboard
```

---

## Testing the CRM

1. **Submit a test form** on your contact page
2. **Check Telegram** - you should get a notification with Lead ID
3. **Open CRM dashboard** - the lead should appear
4. **Click on the lead** to see details
5. **Update status** and add notes
6. **Refresh** to see your changes

---

## Security Notes

⚠️ **IMPORTANT**:

1. **Never commit** your Supabase Service Role key to Git
2. **Only share** the anon/public key (it's safe for frontend)
3. **Use Environment Variables** in Vercel for sensitive keys
4. **Row Level Security** is enabled on the database
5. **Change your CRM access code** periodically

---

## Free Tier Limits

### Supabase Free Tier:
- ✅ 500 MB database
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth/month
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

**Translation**: Easily handles 10,000+ leads/month for free!

### Vercel Free Tier:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Serverless functions included

**Translation**: More than enough for a business website!

---

## Troubleshooting

### Can't login to CRM

✅ **Check your access code format**:
- JSON: `{"url":"https://xxx.supabase.co","key":"eyJxxx..."}`
- Pipe: `https://xxx.supabase.co|eyJxxx...`

✅ **Use the anon/public key**, not service_role key

### Leads not appearing

✅ **Check Supabase** → Table Editor → leads table  
✅ **Verify** environment variables in Vercel  
✅ **Test the API** directly:

```bash
curl -X POST https://viseyyon-website2.vercel.app/api/crm-submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "Lead",
    "email": "test@example.com",
    "message": "Testing CRM"
  }'
```

### Telegram not sending

✅ **Check** TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel  
✅ **Redeploy** after adding environment variables  
✅ **Test** the telegram-notify API separately  

---

## Customization

### Add more fields

1. Update `DATABASE_SCHEMA.sql` to add columns
2. Update `api/crm-submit.js` to save new fields
3. Update `crm/js/crm.js` to display new fields
4. Redeploy

### Change CRM styling

Edit `crm/css/crm.css` to customize colors and layout.

### Custom domain

1. Go to Vercel → Your project → Settings → Domains
2. Add your custom domain (e.g., crm.viseyyon.com)
3. Follow DNS instructions
4. Access at: https://crm.viseyyon.com

---

## Next Steps

🎯 **Test the full flow**:
1. Submit a form
2. Get Telegram notification
3. View in CRM
4. Update lead status
5. Add notes

🎯 **Share CRM access** with your team:
- Just share the Supabase URL and anon key
- They can login to the dashboard
- Everyone sees the same leads

🎯 **Backup your data**:
- Supabase → Database → Backups (automatic daily backups)
- Export to CSV from Table Editor if needed

---

## Support

**Questions?**
- Check Supabase docs: https://supabase.com/docs
- Check Vercel docs: https://vercel.com/docs
- Test each component separately

**Everything working?**
🎉 **Congratulations!** You now have a fully functional, free CRM system!

---

## Summary of What You Have

✅ **Contact forms** on 3 domains (viseyyon.in, .com, .tech)  
✅ **Instant Telegram notifications** for every submission  
✅ **Database storage** of all leads in Supabase  
✅ **Web dashboard** to manage leads  
✅ **Lead tracking** with status and notes  
✅ **100% free hosting** on Vercel + Supabase  
✅ **No maintenance** required  

**Total setup time**: ~15 minutes  
**Monthly cost**: $0  
**Leads you can handle**: 10,000+  

🚀 **You're all set!**
