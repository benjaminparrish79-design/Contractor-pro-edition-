# ContractorPro Render Deployment - Step-by-Step Guide

## 🎯 Quick Start (5 Minutes)

You're already on the Render dashboard! Follow these exact steps to deploy ContractorPro.

---

## Step 1: Select Git Provider

**Current Screen:** New Private Service

1. Click on **"Git Provider"** tab (should be selected)
2. Verify **benjaminparrish79-design** is shown under "Connected Deployment Credentials"
3. Your repository is ready to use ✓

---

## Step 2: Select Repository

1. In the search box, type or select: **Contractor-pro-edition-**
2. Click on your repository to select it
3. You should see it highlighted

---

## Step 3: Configure Service Settings

**Name:** contractor-pro

**Runtime:** Node

**Build Command:**
```bash
pnpm install && pnpm build
```

**Start Command:**
```bash
pnpm start
```

**Plan:** Standard ($7/month)

**Region:** Choose closest to your location (e.g., us-east, eu-west)

---

## Step 4: Create Database

Before deploying the app, you need a MySQL database:

1. Click **"New +"** → **"MySQL"**
2. Configure:
   - **Name:** contractor-pro-db
   - **Database Name:** contractor_pro
   - **User:** contractor_pro_user
   - **Plan:** Standard ($15/month)
3. Click **"Create Database"**
4. **IMPORTANT:** Copy the connection string (you'll need it in Step 5)

---

## Step 5: Add Environment Variables

Back in your web service, click **"Environment"** and add these variables:

### Essential Variables
```
NODE_ENV=production
DATABASE_URL=<paste-your-mysql-connection-string-from-step-4>
JWT_SECRET=<generate-random-32-char-string>
```

### Manus OAuth Variables
```
VITE_APP_ID=<your-manus-app-id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_OPEN_ID=<your-owner-open-id>
OWNER_NAME=<your-name>
```

### Manus API Variables (from your API keys file)
```
BUILT_IN_FORGE_API_KEY=<your-api-key>
BUILT_IN_FORGE_API_URL=<your-api-url>
VITE_FRONTEND_FORGE_API_KEY=<your-frontend-key>
VITE_FRONTEND_FORGE_API_URL=<your-frontend-url>
```

### Stripe (Optional - for payments)
```
STRIPE_SECRET_KEY=<your-stripe-secret>
STRIPE_WEBHOOK_SECRET=<your-webhook-secret>
VITE_STRIPE_PUBLISHABLE_KEY=<your-public-key>
```

---

## Step 6: Deploy

1. Click **"Deploy"** button
2. Render will:
   - Clone your GitHub repository
   - Install dependencies
   - Build the application
   - Start the service
3. Monitor progress in the **Logs** tab
4. Wait for message: **"Service is live"** ✓

---

## Step 7: Run Database Migrations

Once deployment completes:

1. Click on your web service
2. Go to **"Shell"** tab
3. Run this command:
   ```bash
   pnpm db:push
   ```
4. Wait for success message

---

## Step 8: Test Your Application

1. Click **"Visit Site"** button
2. You should see the ContractorPro login page
3. Click **"Sign In"** and authenticate with Manus OAuth
4. Create your first client and project

---

## 🔑 Environment Variables Reference

| Variable | Required | Source | Example |
|----------|----------|--------|---------|
| NODE_ENV | ✓ | Set manually | production |
| DATABASE_URL | ✓ | MySQL connection string | mysql://user:pass@host/db |
| JWT_SECRET | ✓ | Generate random | abc123...xyz789 |
| VITE_APP_ID | ✓ | Manus dashboard | your-app-id |
| OAUTH_SERVER_URL | ✓ | Fixed | https://api.manus.im |
| VITE_OAUTH_PORTAL_URL | ✓ | Fixed | https://oauth.manus.im |
| BUILT_IN_FORGE_API_KEY | ✓ | API keys file | your-api-key |
| BUILT_IN_FORGE_API_URL | ✓ | API keys file | your-api-url |
| STRIPE_SECRET_KEY | ✗ | Stripe dashboard | sk_test_... |
| VITE_STRIPE_PUBLISHABLE_KEY | ✗ | Stripe dashboard | pk_test_... |

---

## 🆘 Troubleshooting

### "Build failed"
- Check build logs for errors
- Verify all dependencies are in package.json
- Ensure pnpm-lock.yaml is committed

### "Database connection failed"
- Verify DATABASE_URL is correct
- Check MySQL database is running
- Ensure credentials are correct
- Try connecting from MySQL client

### "Service won't start"
- Check environment variables are set
- Review application logs
- Verify Node.js version compatibility
- Check for missing dependencies

### "Application loads but shows error"
- Check browser console for errors
- Review Render application logs
- Verify OAuth configuration
- Test database connection

---

## 📊 Monitoring Your Deployment

### View Logs
- Click **"Logs"** tab in service dashboard
- Search for errors or warnings
- Filter by date/time

### Check Metrics
- CPU usage
- Memory usage
- Request count
- Response times

### Health Checks
- Render checks service every 30 seconds
- Auto-restarts on failure
- Alerts on critical issues

---

## 🔄 Continuous Deployment

After initial deployment, every push to GitHub automatically:

1. Triggers CI/CD pipeline
2. Runs tests
3. Builds application
4. Deploys to Render

No manual intervention needed!

---

## 🎉 Next Steps

1. **Configure Custom Domain** (optional)
   - Add domain in service settings
   - Update DNS records
   - SSL auto-provisioned

2. **Set Up Monitoring**
   - Enable error tracking
   - Configure alerts
   - Monitor performance

3. **Configure Stripe** (if using payments)
   - Claim Stripe sandbox
   - Add API keys
   - Test payment flow

4. **Invite Team Members**
   - Add users to your business
   - Configure roles
   - Set permissions

---

## 📞 Support

- **Render Docs:** https://render.com/docs
- **GitHub Issues:** Open issue in your repository
- **Application Logs:** Check Render dashboard
- **Database Issues:** Contact Render support

---

**Ready to deploy? Go back to Render and follow the steps above!**

**Repository:** https://github.com/benjaminparrish79-design/Contractor-pro-edition-
**Application:** ContractorPro Masterpiece
**Deployment Date:** January 2026
