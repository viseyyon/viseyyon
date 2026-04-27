# Viseyyon CRM

A free, self-hosted CRM system for managing contact form submissions.

## Quick Start

1. **Read**: [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup instructions
2. **Setup Database**: Run `DATABASE_SCHEMA.sql` in Supabase
3. **Configure**: Add environment variables to Vercel
4. **Deploy**: `vercel --prod`
5. **Access**: https://viseyyon-website2.vercel.app/crm/

## Files

- `index.html` - CRM dashboard interface
- `css/crm.css` - Dashboard styling
- `js/crm.js` - Dashboard functionality
- `DATABASE_SCHEMA.sql` - PostgreSQL database schema
- `SETUP_GUIDE.md` - Detailed setup instructions

## API Endpoints

- `/api/crm-submit` - Save lead + send Telegram notification
- `/api/telegram-notify` - Send Telegram notification only (legacy)

## Features

- Lead management dashboard
- Real-time Telegram notifications
- Status tracking (New, Contacted, In Progress, Converted, Lost)
- Search and filter leads
- Add notes to leads
- 100% free hosting

## Tech Stack

- Frontend: Vanilla JavaScript + HTML + CSS
- Backend: Vercel Serverless Functions
- Database: Supabase (PostgreSQL)
- Notifications: Telegram Bot API

## Cost

**$0/month** - Free tier includes:
- Supabase: 500MB database, 10,000+ leads capacity
- Vercel: Unlimited deployments, 100GB bandwidth
- Telegram: Unlimited notifications

## Support

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for troubleshooting and detailed documentation.
