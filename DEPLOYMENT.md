# ContractorPro Deployment Guide

This guide covers deploying ContractorPro to various platforms including Render, Docker, and other hosting providers.

## 🚀 Render Deployment (Recommended)

Render is the recommended platform for ContractorPro as it provides seamless Node.js hosting with built-in PostgreSQL/MySQL support.

### Prerequisites
- GitHub account with repository access
- Render account (free tier available)
- Environment variables configured

### Step-by-Step Deployment

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Initial ContractorPro deployment"
   git push origin main
   ```

2. **Create Render Account**
   - Visit [https://render.com](https://render.com)
   - Sign up with GitHub account
   - Authorize Render to access your repositories

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Select your GitHub repository
   - Choose branch (usually `main`)
   - Configure settings:
     - **Name:** contractor-pro
     - **Runtime:** Node
     - **Build Command:** `pnpm install && pnpm build`
     - **Start Command:** `pnpm start`
     - **Plan:** Standard ($7/month) or higher

4. **Configure Environment Variables**
   In Render dashboard, add the following environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=<from MySQL database>
   JWT_SECRET=<generate-secure-random-string>
   VITE_APP_ID=<your-manus-app-id>
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
   BUILT_IN_FORGE_API_KEY=<your-api-key>
   BUILT_IN_FORGE_API_URL=<your-api-url>
   STRIPE_SECRET_KEY=<your-stripe-secret>
   VITE_STRIPE_PUBLISHABLE_KEY=<your-stripe-public>
   ```

5. **Create MySQL Database**
   - Click "New +" → "MySQL"
   - Configure:
     - **Name:** contractor-pro-db
     - **Database Name:** contractor_pro
     - **User:** contractor_pro_user
     - **Plan:** Standard ($15/month) or higher
   - Copy the `DATABASE_URL` and add to web service environment

6. **Deploy**
   - Render will automatically deploy when you push to GitHub
   - Monitor deployment in Render dashboard
   - Check logs for any errors

7. **Run Database Migrations**
   - SSH into your Render instance or use Render Shell
   - Run: `pnpm db:push`
   - Verify tables are created

8. **Configure Custom Domain** (Optional)
   - In Render dashboard, go to Settings
   - Add custom domain
   - Update DNS records with Render's nameservers

### Monitoring & Maintenance

- **Logs:** View in Render dashboard → Logs
- **Metrics:** Monitor CPU, memory, and bandwidth usage
- **Auto-deploy:** Enable auto-deploy on GitHub push
- **Backups:** Configure MySQL automated backups

## 🐳 Docker Deployment

Deploy ContractorPro using Docker for maximum portability.

### Build Docker Image

```bash
# Build image
docker build -t contractor-pro:latest .

# Run container locally
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://user:pass@db:3306/contractor_pro" \
  -e NODE_ENV=production \
  contractor-pro:latest
```

### Push to Docker Registry

```bash
# Tag image
docker tag contractor-pro:latest your-registry/contractor-pro:latest

# Push to registry (Docker Hub, ECR, GCR, etc.)
docker push your-registry/contractor-pro:latest
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    image: contractor-pro:latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: mysql://contractor_pro_user:password@db:3306/contractor_pro
      NODE_ENV: production
      JWT_SECRET: your-secret-key
      VITE_APP_ID: your-app-id
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: contractor_pro
      MYSQL_USER: contractor_pro_user
      MYSQL_PASSWORD: password
    volumes:
      - db_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  db_data:
```

Run with: `docker-compose up -d`

## ☁️ AWS Deployment

Deploy to AWS using ECS or Elastic Beanstalk.

### ECS Deployment

1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name contractor-pro
   ```

2. **Build and Push Image**
   ```bash
   docker build -t contractor-pro:latest .
   docker tag contractor-pro:latest <account-id>.dkr.ecr.<region>.amazonaws.com/contractor-pro:latest
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/contractor-pro:latest
   ```

3. **Create ECS Task Definition**
   - Configure container image, port, environment variables
   - Set memory and CPU limits
   - Configure logging to CloudWatch

4. **Create ECS Service**
   - Set desired task count
   - Configure load balancer
   - Set auto-scaling policies

5. **Create RDS MySQL Database**
   - Configure multi-AZ for high availability
   - Set backup retention period
   - Configure security groups

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Render
        run: |
          curl -X POST https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }}?key=${{ secrets.RENDER_API_KEY }}
```

## 📊 Performance Optimization

### Database
- Enable query caching
- Create indexes on frequently queried columns
- Use connection pooling
- Regular backups and maintenance

### Application
- Enable gzip compression
- Minify CSS and JavaScript
- Implement caching headers
- Use CDN for static assets

### Monitoring
- Set up error tracking (Sentry)
- Monitor performance metrics
- Configure alerts for high CPU/memory
- Track user analytics

## 🔐 Security Checklist

- [ ] Set strong `JWT_SECRET`
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable database SSL connections
- [ ] Set up rate limiting
- [ ] Configure firewall rules
- [ ] Regular security updates
- [ ] Enable audit logging
- [ ] Implement DDoS protection

## 🆘 Troubleshooting

### Application Won't Start
1. Check logs for errors
2. Verify all environment variables are set
3. Ensure database connection is working
4. Check Node.js version compatibility

### Database Connection Issues
1. Verify `DATABASE_URL` format
2. Check database credentials
3. Ensure database is accessible from app
4. Check firewall/security group rules

### High Memory Usage
1. Check for memory leaks
2. Increase allocated memory
3. Optimize database queries
4. Implement caching

### Slow Performance
1. Check database query performance
2. Enable caching
3. Optimize frontend bundle size
4. Use CDN for static assets

## 📞 Support

For deployment issues:
- Check Render documentation
- Review application logs
- Contact hosting provider support
- Open GitHub issue with error details

---

**Last Updated:** January 2026
