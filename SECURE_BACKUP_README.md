# Viseyyon Secure Backup - Password Protected Archive

This password-protected zip file contains important configuration files and credentials for the Viseyyon CRM system.

## 🔐 Archive Details

**File**: `viseyyon-secure-backup.zip`  
**Size**: ~14 KB  
**Password**: `Viseyyon2025!Secure`  
**Created**: 2026-04-28

## 📦 Contents

### Configuration Files:
- `.gitignore` - Git ignore rules
- `package.json` - Node.js dependencies

### CRM Setup & Credentials:
- `crm/LOGIN_CREDENTIALS.txt` - **Supabase login credentials for CRM dashboard**
- `crm/SETUP_GUIDE.md` - Complete CRM setup instructions
- `crm/DATABASE_SCHEMA.sql` - Initial database schema
- `crm/SIMPLE_SCHEMA.sql` - Simplified schema without RLS
- `crm/UPGRADE_SCHEMA.sql` - Schema upgrade for follow-up and outcome tracking
- `crm/FIX_PERMISSIONS.sql` - Permission fixes for RLS

### Documentation:
- `MANUAL_UPLOAD_GUIDE.md` - Hostinger File Manager upload guide
- `HOSTINGER_ISSUE_REPORT.md` - FTP troubleshooting documentation
- `TELEGRAM_SETUP.md` - Telegram Bot integration setup

---

## 🔓 How to Extract

### Method 1: Command Line (Mac/Linux)
```bash
# Navigate to the directory containing the zip file
cd /path/to/viseyyon-website_2

# Extract the archive
unzip viseyyon-secure-backup.zip

# Enter password when prompted: Viseyyon2025!Secure
```

### Method 2: Using GUI (Mac)
1. Double-click `viseyyon-secure-backup.zip`
2. Enter password: `Viseyyon2025!Secure`
3. Files will be extracted to the same directory

### Method 3: Windows
1. Right-click `viseyyon-secure-backup.zip`
2. Select "Extract All..."
3. Enter password: `Viseyyon2025!Secure`
4. Click "Extract"

### Method 4: Using 7-Zip (Windows)
1. Right-click `viseyyon-secure-backup.zip`
2. Select "7-Zip" → "Extract files..."
3. Enter password: `Viseyyon2025!Secure`
4. Click "OK"

---

## ⚠️ Security Notes

1. **Keep Password Secure**: Change the default password if sharing this archive
2. **Sensitive Data**: This archive contains login credentials - handle with care
3. **Don't Commit Unencrypted**: Never commit the extracted LOGIN_CREDENTIALS.txt to public repos
4. **Update Passwords**: If credentials are compromised, update them immediately in:
   - Supabase dashboard
   - Vercel environment variables
   - This backup archive

---

## 🔄 Creating a New Backup

To create a fresh backup with updated files:

```bash
cd /Users/manoharans/Downloads/viseyyon-website_2

# Create new backup with password
zip -P "YourNewPassword" -r viseyyon-secure-backup-new.zip \
  .gitignore \
  crm/LOGIN_CREDENTIALS.txt \
  crm/SETUP_GUIDE.md \
  crm/DATABASE_SCHEMA.sql \
  crm/SIMPLE_SCHEMA.sql \
  crm/UPGRADE_SCHEMA.sql \
  crm/FIX_PERMISSIONS.sql \
  MANUAL_UPLOAD_GUIDE.md \
  HOSTINGER_ISSUE_REPORT.md \
  TELEGRAM_SETUP.md \
  package.json
```

---

## 📋 What to Do After Extracting

1. **Review Credentials**: Check `crm/LOGIN_CREDENTIALS.txt` for CRM access
2. **Verify Setup**: Read `crm/SETUP_GUIDE.md` for system overview
3. **Database Access**: Use the Supabase credentials to access your database
4. **CRM Dashboard**: Login at https://viseyyon-website2.vercel.app/crm/

---

## 🆘 If Password is Lost

If you lose the password:
1. The credentials are also stored in:
   - Supabase dashboard (Settings → API)
   - Vercel environment variables
   - Your CRM browser localStorage (if logged in)
2. Create a new backup with a new password
3. Update this README with the new password

---

## 📊 Backup Verification

To verify the backup integrity:

```bash
# List contents without extracting
unzip -l viseyyon-secure-backup.zip

# Test the archive
unzip -t viseyyon-secure-backup.zip
# Enter password when prompted
```

Expected output: 11 files, no errors

---

## 🔗 Related Resources

- **CRM Dashboard**: https://viseyyon-website2.vercel.app/crm/
- **Supabase Project**: https://lvyuwacdvxhxyvenwxbi.supabase.co
- **GitHub Repository**: https://github.com/viseyyon/viseyyon
- **Vercel Project**: https://vercel.com/rudramstartup-6473s-projects/viseyyon-website_2

---

## 📅 Version History

- **2026-04-28**: Initial secure backup created
  - 11 configuration files
  - CRM credentials included
  - Database schemas included
  - Password: Viseyyon2025!Secure

---

**⚠️ IMPORTANT**: Store this password securely. Consider using a password manager or updating to your own strong password.
