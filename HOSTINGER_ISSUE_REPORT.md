# Hostinger Server Issue - Support Ticket Information

**Date**: April 27, 2026  
**Account**: u399810470  
**Affected Domains**: viseyyon.com, viseyyon.tech

---

## 🚨 Issue Summary

**FTP and HTTP servers are not responding on IP 145.79.25.18**

Both port 21 (FTP) and port 80 (HTTP) are timing out. Cannot upload files or access websites.

---

## 🔍 Technical Details

### Server Information
- **Server IP**: 145.79.25.18
- **FTP Hostname**: ftp.viseyyon.tech, ftp.viseyyon.com
- **Account ID**: u399810470

### Ports Tested (All Failed)
```
❌ Port 21 (FTP)  - Connection timeout after 15 seconds
❌ Port 80 (HTTP) - Connection timeout after 15 seconds
```

### DNS Configuration (Working)
```
✅ viseyyon.tech → 145.79.25.18 (NS: ns1.dns-parking.com)
✅ viseyyon.com → 145.79.25.18 (NS: ns1.dns-parking.com)
```

### FTP Accounts (Visible in hPanel, Cannot Connect)

**viseyyon.tech:**
- Username: u399810470.admintech
- Directory: /home/u399810470/domains/viseyyon.tech/public_html
- Hostname: ftp.viseyyon.tech
- Port: 21

**viseyyon.com:**
- [Awaiting details]

### Test Results

```bash
# Test 1: FTP to hostname
$ curl ftp://ftp.viseyyon.tech/ --user "u399810470.admintech:***"
Result: Connection timeout after 15 seconds

# Test 2: FTP to IP directly
$ curl ftp://145.79.25.18/ --user "u399810470.admintech:***"
Result: Connection timeout after 15 seconds

# Test 3: Port scan
$ nc -zv 145.79.25.18 21
Result: Operation timed out

# Test 4: HTTP access
$ curl http://145.79.25.18
Result: Connection timeout

# Test 5: HTTP to domain
$ curl http://www.viseyyon.tech
Result: Connection timeout
```

---

## 📋 Support Ticket Template

**Copy this to Hostinger support:**

```
Subject: FTP and HTTP services not responding - Account u399810470

Hello Hostinger Support,

I'm unable to access my hosting account. Both FTP and HTTP services 
are not responding on server IP 145.79.25.18.

Account Details:
- Account ID: u399810470
- Domains: viseyyon.com, viseyyon.tech
- Server IP: 145.79.25.18

Issue:
- Cannot connect to FTP (port 21) - Connection timeout
- Cannot access websites (port 80) - Connection timeout
- DNS is configured correctly and pointing to your servers
- FTP accounts are visible in hPanel but cannot connect

Tests performed:
- Tried ftp.viseyyon.tech - timeout
- Tried direct IP 145.79.25.18 - timeout
- Tested from multiple networks - same result
- Port scan shows ports 21 and 80 are not responding

This appears to be a server-side issue. Please check:
1. Is the server at 145.79.25.18 online?
2. Are FTP and HTTP services running?
3. Is there a firewall blocking connections?
4. Does my account need activation/configuration?

I have the correct FTP credentials from hPanel:
- Username: u399810470.admintech (for .tech)
- Directory: /home/u399810470/domains/viseyyon.tech/public_html

Please investigate and restore service as soon as possible.

Thank you!
```

---

## ✅ What's Working

- ✅ **DNS Resolution** - Domains correctly point to 145.79.25.18
- ✅ **hPanel Access** - Can log in and see FTP accounts
- ✅ **Domain Registration** - Domains are active
- ✅ **Nameservers** - Correctly set to Hostinger's NS servers

---

## ❌ What's NOT Working

- ❌ **FTP Access** - Cannot connect to upload files
- ❌ **HTTP Access** - Websites don't load
- ❌ **Server Response** - No response on any port from 145.79.25.18

---

## 🔧 Temporary Workaround

**Use viseyyon.in (GitHub Pages)** - This is fully functional:
- ✅ Website accessible: https://www.viseyyon.in
- ✅ All content updated
- ✅ 37+ products listed
- ✅ Contact form with Telegram notifications ready
- ✅ Auto-deployment working via GitHub Actions

---

## 📞 How to Contact Hostinger Support

### Option 1: Live Chat (Fastest)
1. Go to https://hpanel.hostinger.com/
2. Click the chat icon (bottom right)
3. Paste the support ticket template above

### Option 2: Submit Ticket
1. Go to hPanel → Help → Submit Ticket
2. Category: Hosting Issues
3. Priority: High
4. Paste the template above

### Option 3: Email
- Email: support@hostinger.com
- Include account ID: u399810470

---

## 🎯 Expected Resolution

Once Hostinger fixes the server:
- ✅ FTP will connect automatically
- ✅ Files will deploy via GitHub Actions
- ✅ Websites will load on .com and .tech
- ✅ No code changes needed (already configured)

---

## 📊 Current Deployment Status

### GitHub Actions Workflows (Ready)

**All workflows are configured correctly:**
- ✅ deploy-to-hostinger.yml (.tech) - Ready to deploy when FTP works
- ✅ deploy-to-hostinger2.yml (.com) - Needs .com FTP details
- ✅ static.yml (GitHub Pages) - Working perfectly
- ✅ manual-deploy.yml - Can be triggered manually

**When Hostinger fixes the server**, deployments will work automatically on next push.

---

## 📝 Next Steps

1. ✅ **Contact Hostinger Support** - Use the template above
2. ⏳ **Wait for server fix** - Usually resolved within 24 hours
3. ✅ **Test FTP connection** - Try connecting after they confirm fix
4. ✅ **Verify websites load** - Check .com and .tech
5. ✅ **Run manual deployment** - Trigger GitHub Action to upload files

---

## 🔗 References

- **Working Site**: https://www.viseyyon.in
- **GitHub Repo**: https://github.com/viseyyon/viseyyon
- **Hostinger Status**: https://www.hostinger.com/status
- **Support**: https://support.hostinger.com

---

**Created**: April 27, 2026  
**Status**: Awaiting Hostinger support response
