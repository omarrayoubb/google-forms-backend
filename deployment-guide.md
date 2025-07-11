# Google Forms Backend - Deployment Guide

This guide provides instructions for deploying your NestJS Google Forms backend to various platforms.

## Prerequisites

1. **Environment Variables**: Create a `.env` file with the following variables:

   ```env
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   SECRET_KEY=your-secret-key
   JWT_SECRET=your-jwt-secret
   ```

2. **Database**: Set up a MongoDB database (MongoDB Atlas recommended for production)

## Deployment Options

### 1. Docker Deployment

#### Local Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t google-forms-backend .
docker run -p 3000:3000 --env-file .env google-forms-backend
```

#### Docker Hub

```bash
# Build and push to Docker Hub
docker build -t your-username/google-forms-backend .
docker push your-username/google-forms-backend
```

### 2. Heroku Deployment

1. **Install Heroku CLI**:

   ```bash
   npm install -g heroku
   ```

2. **Login and create app**:

   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Set environment variables**:

   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set JWT_SECRET=your-jwt-secret
   ```

4. **Deploy**:
   ```bash
   git push heroku main
   ```

### 3. Railway Deployment

1. **Install Railway CLI**:

   ```bash
   npm install -g @railway/cli
   ```

2. **Login and deploy**:

   ```bash
   railway login
   railway init
   railway up
   ```

3. **Set environment variables** in Railway dashboard

### 4. Vercel Deployment

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Deploy**:

   ```bash
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard

### 5. DigitalOcean App Platform

1. **Create app** in DigitalOcean dashboard
2. **Connect your GitHub repository**
3. **Set environment variables** in the dashboard
4. **Deploy automatically** on push to main branch

### 6. AWS Elastic Beanstalk

1. **Install EB CLI**:

   ```bash
   pip install awsebcli
   ```

2. **Initialize EB**:

   ```bash
   eb init
   eb create production
   ```

3. **Set environment variables** in EB console
4. **Deploy**:
   ```bash
   eb deploy
   ```

## Environment Variables

Make sure to set these environment variables in your deployment platform:

- `NODE_ENV`: Set to `production`
- `PORT`: Port number (usually set by platform)
- `MONGODB_URI`: Your MongoDB connection string
- `SECRET_KEY`: Secret key for encryption
- `JWT_SECRET`: Secret key for JWT tokens

## Database Setup

### MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Add your deployment IP to the whitelist

### Local MongoDB

```bash
# Install MongoDB
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Start MongoDB
sudo systemctl start mongodb
```

## Health Check

Your API includes a health check endpoint at `/api` (Swagger documentation).

## Monitoring

Consider setting up monitoring with:

- **Uptime Robot** for uptime monitoring
- **Sentry** for error tracking
- **LogRocket** for performance monitoring

## SSL/HTTPS

Most platforms (Heroku, Railway, Vercel, DigitalOcean) provide SSL certificates automatically.

## Scaling

- **Horizontal scaling**: Deploy multiple instances behind a load balancer
- **Vertical scaling**: Increase instance size
- **Database scaling**: Use MongoDB Atlas with read replicas

## Troubleshooting

### Common Issues

1. **Port binding**: Ensure your app listens on `process.env.PORT`
2. **Database connection**: Check MongoDB URI and network access
3. **Environment variables**: Verify all required variables are set
4. **Build errors**: Check Node.js version compatibility

### Logs

```bash
# Heroku
heroku logs --tail

# Railway
railway logs

# Docker
docker logs container-name

# Vercel
vercel logs
```

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong secret keys
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated
- [ ] Set up proper authentication
- [ ] Monitor for security issues

## Performance Optimization

- [ ] Enable compression
- [ ] Use caching headers
- [ ] Optimize database queries
- [ ] Use CDN for static assets
- [ ] Implement rate limiting
- [ ] Monitor performance metrics
