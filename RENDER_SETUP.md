# ContractorPro Render Deployment Setup

This guide walks you through deploying ContractorPro to Render with your GitHub repository and API keys.

## 📋 Prerequisites

- GitHub account with repository access
- Render account (free tier available at https://render.com)
- API keys from the file you provided

## 🚀 Step-by-Step Deployment

### 1. Connect GitHub to Render

1. Visit [https://render.com](https://render.com)
2. Click "Sign up" and select "Sign up with GitHub"
3. Authorize Render to access your GitHub account
4. Grant access to your repositories

### 2. Create Web Service

1. In Render dashboard, click "New +" → "Web Service"
2. Select repository: `benjaminparrish79-design/Contractor-pro-edition-`
3. Choose branch: `main`
4. Configure service:
   - **Name:** contractor-pro
   - **Runtime:** Node
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `pnpm start`
   - **Plan:** Standard ($7/month) or higher
   - **Region:** Choose closest to your users

### 3. Create MySQL Database

1. In Render dashboard, click "New +" → "MySQL"
2. Configure database:
   - **Name:** contractor-pro-db
   - **Database Name:** contractor_pro
   - **User:** contractor_pro_user
   - **Plan:** Standard ($15/month) or higher
3. Copy the connection string (you'll need this)

### 4. Configure Environment Variables

In your web service settings, add these environment variables:

#### Required Variables
```
NODE_ENV=production
DATABASE_URL=<paste-mysql-connection-string-from-step-3>
JWT_SECRET=<generate-a-secure-random-string>
```

#### Manus OAuth Variables
```
VITE_APP_ID=<your-manus-app-id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_OPEN_ID=<your-owner-id>
OWNER_NAME=<your-name>
```

#### Manus API Variables
```
BUILT_IN_FORGE_API_KEY=<from-your-api-keys-file>
BUILT_IN_FORGE_API_URL=<from-your-api-keys-file>
VITE_FRONTEND_FORGE_API_KEY=<from-your-api-keys-file>
VITE_FRONTEND_FORGE_API_URL=<from-your-api-keys-file>
```

#### Stripe Integration (Optional)
```
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
VITE_STRIPE_PUBLISHABLE_KEY=<your-stripe-public-key>
```

#### Analytics (Optional)
```
VITE_ANALYTICS_ENDPOINT=<your-analytics-endpoint>
VITE_ANALYTICS_WEBSITE_ID=<your-website-id>
```

### 5. Deploy Application

1. Click "Deploy" button
2. Render will automatically:
   - Clone your GitHub repository
   - Install dependencies
   - Build the application
   - Start the service
3. Monitor deployment progress in the logs

### 6. Run Database Migrations

Once deployment is complete:

1. Click on your web service
2. Go to "Shell" tab
3. Run the following command:
   ```bash
   pnpm db:push
   ```
4. Verify tables are created successfully

### 7. Test Application

1. Click "Visit Site" to open your application
2. You should see the ContractorPro login page
3. Click "Sign In" and authenticate with Manus OAuth
4. Create your first client and project

### 8. Configure Custom Domain (Optional)

1. In service settings, go to "Custom Domain"
2. Enter your domain (e.g., contractor-pro.example.com)
3. Update your DNS records with the provided CNAME
4. SSL certificate will be automatically provisioned

## 🔄 Continuous Deployment

Render automatically deploys when you push to GitHub:

1. Make changes to your code
2. Commit and push to `main` branch
3. Render automatically:
   - Detects the push
   - Builds new version
   - Deploys to production
4. Check deployment logs for any issues

## 📊 Monitoring & Maintenance

### View Logs
- In service dashboard, click "Logs" tab
- Filter by date/time to find specific events
- Search for errors or warnings

### Monitor Metrics
- CPU usage
- Memory usage
- Bandwidth
- Request count

### Database Backups
1. In MySQL database settings, go to "Backups"
2. Enable automated daily backups
3. Retention period: 30 days recommended

### Health Checks
Render automatically monitors your service:
- HTTP health check every 30 seconds
- Automatic restart if service fails
- Alerts on critical issues

## 🆘 Troubleshooting

### Application Won't Start
**Check logs for errors:**
- Missing environment variables
- Database connection failed
- Build errors

**Solution:**
1. Verify all environment variables are set
2. Check DATABASE_URL format
3. Review build logs for compilation errors

### Database Connection Failed
**Error:** `ECONNREFUSED` or `ENOTFOUND`

**Solution:**
1. Verify DATABASE_URL is correct
2. Ensure MySQL database is running
3. Check database credentials
4. Verify network connectivity

### High Memory Usage
**Symptoms:** Service keeps restarting

**Solution:**
1. Increase plan tier for more memory
2. Check for memory leaks in code
3. Optimize database queries
4. Enable caching

### Slow Performance
**Symptoms:** Pages load slowly

**Solution:**
1. Check database query performance
2. Enable Redis caching
3. Optimize frontend bundle size
4. Use CDN for static assets

## 🔐 Security Best Practices

- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable HTTPS (automatic with Render)
- [ ] Rotate API keys regularly
- [ ] Use environment variables for all secrets
- [ ] Enable database SSL connections
- [ ] Configure firewall rules
- [ ] Monitor access logs
- [ ] Set up alerts for suspicious activity

## 📞 Support

- **Render Support:** https://render.com/docs
- **GitHub Issues:** Open issue in your repository
- **Application Logs:** Check Render dashboard logs
- **Database Issues:** Contact Render support with database ID

## 🎉 Next Steps

1. **Configure Stripe** (if using payments)
   - Claim Stripe sandbox
   - Add API keys to environment variables
   - Test payment flow

2. **Set Up Monitoring**
   - Configure error tracking (Sentry)
   - Set up performance monitoring
   - Enable email alerts

3. **Customize Application**
   - Update company branding
   - Configure business settings
   - Add custom domain

4. **Team Collaboration**
   - Invite team members
   - Configure roles and permissions
   - Set up team workflows

---

**Deployment Date:** January 2026
**Application:** ContractorPro Masterpiece
**Repository:** https://github.com/benjaminparrish79-design/Contractor-pro-edition-
