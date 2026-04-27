# Hostinger Domain Troubleshooting Guide

## Current Status (April 27, 2026)

### DNS Configuration ✅
- **viseyyon.com** → 145.79.25.18 (Correct)
- **viseyyon.tech** → 145.79.25.18 (Correct)
- **Nameservers**: ns1.dns-parking.com, ns2.dns-parking.com (Correct)

### Issue
- DNS is configured correctly
- FTP deployments succeed
- **BUT**: HTTP server (145.79.25.18) not responding
- Websites timing out on .com and .tech

## Applied Fix

Updated FTP upload directory:
- **Before**: `server-dir: '/'` (wrong - files uploaded to root)
- **After**: `server-dir: '/public_html/'` (correct directory for web files)

## Required Actions in Hostinger Control Panel

### Step 1: Verify Upload Directory

1. Login to **Hostinger Control Panel**
2. Go to **File Manager**
3. Check the directory structure for your domains

**Common structures**:
```
Option A (Single Domain Account):
/public_html/           ← Files go here
  ├── index.html
  ├── pages/
  ├── css/
  └── js/

Option B (Multiple Domain Account):
/domains/
  ├── viseyyon.com/
  │   └── public_html/  ← .com files here
  └── viseyyon.tech/
      └── public_html/  ← .tech files here

Option C (Different naming):
/htdocs/
/www/
/web/
```

### Step 2: Update Workflows If Needed

If your directory is different from `/public_html/`, update these files:

**`.github/workflows/deploy-to-hostinger.yml`** (for .tech):
```yaml
server-dir: '/domains/viseyyon.tech/public_html/'  # or your actual path
```

**.github/workflows/deploy-to-hostinger2.yml`** (for .com):
```yaml
server-dir: '/domains/viseyyon.com/public_html/'  # or your actual path
```

### Step 3: Verify Domain Association

1. In Hostinger → **Domains** section
2. Check both domains are listed:
   - ✅ viseyyon.com
   - ✅ viseyyon.tech

3. For each domain, verify:
   - **Status**: Active (not parked/suspended)
   - **Hosting**: Enabled
   - **Document Root**: Correct directory path

### Step 4: Check FTP Users

1. Go to **Hostinger** → **FTP Accounts**
2. Verify these FTP users exist and have correct access:
   - `u399810470.viseyyon` (for .tech)
   - `u399810470.viseyyoncom` (for .com)

3. Check their **home directories** match the deployment paths

### Step 5: SSL Configuration

If using HTTPS (recommended):

1. **Hostinger** → **SSL** section
2. Install SSL certificates for both domains:
   - viseyyon.com
   - viseyyon.tech

3. **Force HTTPS** (optional):
   - Enable "Force HTTPS" in Hostinger
   - Or add to `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Step 6: Verify Hosting Plan Status

1. **Hostinger** → **Account Overview**
2. Check:
   - ✅ Hosting plan is **Active** (not expired/suspended)
   - ✅ You have **website hosting** (not just domain registration)
   - ✅ Both domains are assigned to the hosting account

## Testing After Fix

### 1. Wait for Deployment
After pushing changes, GitHub Actions will deploy in ~2-3 minutes.

### 2. Test Accessibility
```bash
# Test .com
curl -I http://www.viseyyon.com

# Test .tech
curl -I http://www.viseyyon.tech

# Test direct IP (should show default site or error)
curl -I http://145.79.25.18
```

### 3. Check File Upload
Login to Hostinger File Manager and verify files exist in the correct directory:
- index.html
- pages/
- css/
- js/
- images/

## Common Issues & Solutions

### Issue: "Connection timed out"
**Cause**: Server IP not responding
**Solutions**:
1. Verify hosting account is active
2. Check if firewall is blocking your IP
3. Contact Hostinger support to verify server status

### Issue: "403 Forbidden"
**Cause**: Wrong permissions or missing index file
**Solutions**:
1. Ensure `index.html` exists in document root
2. Check file permissions (644 for files, 755 for directories)
3. Verify `.htaccess` isn't blocking access

### Issue: "404 Not Found"
**Cause**: Files in wrong directory
**Solutions**:
1. Verify FTP `server-dir` points to correct path
2. Check File Manager to see where files actually uploaded
3. Adjust workflow YAML with correct path

### Issue: Files uploaded but site shows old content
**Cause**: Browser cache or CDN cache
**Solutions**:
1. Hard refresh browser (Ctrl+F5)
2. Clear Cloudflare cache if using CDN
3. Check file timestamps in File Manager

## Alternative: Use Hostinger API (Future)

The Hostinger MCP server is configured (`.mcp.json`) but not yet approved.

To use it:
1. Approve via `/mcp` in Claude Code
2. Use Hostinger tools to:
   - Check domain configuration
   - Manage DNS records
   - View hosting status
   - List files and directories

## Support Contacts

If issues persist:
1. **Hostinger Live Chat**: Available 24/7
2. **Check Server Status**: https://www.hostinger.com/status
3. **Knowledge Base**: https://support.hostinger.com

## Quick Reference

| Item | Value |
|------|-------|
| FTP Server | 145.79.25.18 |
| FTP Port | 21 |
| FTP User (.tech) | u399810470.viseyyon |
| FTP User (.com) | u399810470.viseyyoncom |
| Upload Directory | `/public_html/` (or verify in File Manager) |
| Nameservers | ns1.dns-parking.com<br>ns2.dns-parking.com |
| Working Site | https://www.viseyyon.in (GitHub Pages) |

## Next Steps

1. ⏳ **Wait** for current deployment to complete (~2 min)
2. 🔍 **Check** Hostinger File Manager for uploaded files
3. ✅ **Verify** correct directory structure
4. 🌐 **Test** websites: viseyyon.com and viseyyon.tech
5. 📞 **Contact** Hostinger support if issues persist
