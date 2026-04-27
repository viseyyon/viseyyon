# Manual Upload Guide for Hostinger File Manager

Since FTP is not working, use Hostinger's web-based File Manager to upload the contact form.

## File to Upload:
`js/contact-form.js`

## Steps for viseyyon.com:

1. **Login to Hostinger**
   - Go to: https://hpanel.hostinger.com/
   - Login with your credentials

2. **Open File Manager**
   - Click on **viseyyon.com** dashboard
   - Click **File Manager** (in the Files section)

3. **Navigate to public_html**
   - Click on `public_html` folder
   - Click on `js` folder

4. **Upload the File**
   - Click **Upload Files** button (top right)
   - Select: `/Users/manoharans/Downloads/viseyyon-website_2/js/contact-form.js`
   - Wait for upload to complete
   - **If file exists**: Click "Overwrite" to replace it

5. **Verify**
   - Check that `contact-form.js` appears in the `js` folder
   - File size should be around 5-6 KB

## Steps for viseyyon.tech:

**Repeat the same steps** but:
- Click on **viseyyon.tech** dashboard instead
- Upload to: `/home/u399810470/domains/viseyyon.tech/public_html/js/`

## After Upload:

Test that it works:
- Open: https://viseyyon.com/js/contact-form.js
- Should show JavaScript code (not 404)
- Open: https://viseyyon.tech/js/contact-form.js
- Should show JavaScript code (not 404)

Then test the contact form:
- https://viseyyon.com/pages/contact.html
- Submit a test form
- Check Telegram and CRM dashboard

## Quick Access Links:

- Hostinger Panel: https://hpanel.hostinger.com/
- viseyyon.com File Manager: https://hpanel.hostinger.com/hosting/viseyyon.com/file-manager
- viseyyon.tech File Manager: https://hpanel.hostinger.com/hosting/viseyyon.tech/file-manager
