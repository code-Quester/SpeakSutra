# Render Deployment Guide

## Overview
This guide will help you deploy your SpeakSutra application to Render with both frontend and backend services.

## Prerequisites

1. **GitHub Repository**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Environment Variables**: Prepare all your environment variables

## Step 1: Prepare Your Repository

### 1.1 Update .gitignore
Ensure your `.gitignore` includes:
```
.env
node_modules/
dist/
```

### 1.2 Commit Your Changes
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 2: Deploy Backend Service

### 2.1 Create Backend Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- **Name**: `speaksutra-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `src/server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 2.2 Set Environment Variables
Add these environment variables in Render:

```
MONGODB_URI=your_mongodb_atlas_connection_string
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
PORT=3000
NODE_ENV=production
```

### 2.3 Deploy
Click "Create Web Service" and wait for deployment.

## Step 3: Deploy Frontend Service

### 3.1 Create Static Site
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- **Name**: `speaksutra-frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Root Directory**: Leave empty (root)

### 3.2 Set Environment Variables
Add these environment variables:

```
VITE_ADMIN_PASSWORD=sutraSPEAK@2025
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 3.3 Deploy
Click "Create Static Site" and wait for deployment.

## Step 4: Update CORS Settings

### 4.1 Get Your Frontend URL
After frontend deployment, note your frontend URL (e.g., `https://speaksutra-frontend.onrender.com`)

### 4.2 Update Backend CORS
In your backend service, update the CORS origin to include your frontend URL:

```typescript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://speaksutra-frontend.onrender.com']
    : 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));
```

### 4.3 Redeploy Backend
Redeploy your backend service after updating the CORS settings.

## Step 5: Test Your Deployment

### 5.1 Test Frontend
- Visit your frontend URL
- Test the main functionality
- Test admin login at `/admin`

### 5.2 Test Backend
- Test API endpoints
- Check MongoDB connection
- Test payment flow

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain
1. Go to your frontend service
2. Click "Settings" → "Custom Domains"
3. Add your domain
4. Update DNS settings as instructed

### 6.2 Update CORS
Update your backend CORS to include your custom domain.

## Environment Variables Reference

### Backend Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
VITE_RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
PORT=3000
NODE_ENV=production
```

### Frontend Variables
```
VITE_ADMIN_PASSWORD=sutraSPEAK@2025
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
VITE_RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Render
   - Ensure all dependencies are in package.json
   - Verify TypeScript compilation

2. **CORS Errors**
   - Update CORS origins in backend
   - Check frontend URL in backend CORS settings

3. **Database Connection Issues**
   - Verify MongoDB URI
   - Check network access in MongoDB Atlas
   - Ensure IP whitelist includes Render IPs

4. **Environment Variables**
   - Double-check all variables are set
   - Ensure no typos in variable names
   - Verify sensitive data is correct

### Debug Commands

```bash
# Check build logs
# View in Render dashboard

# Test API endpoints
curl https://speaksutra-backend.onrender.com/api/health

# Check environment variables
# View in Render dashboard under Environment
```

## Monitoring

### Render Dashboard
- Monitor service health
- Check build logs
- View environment variables
- Monitor performance metrics

### Application Logs
- Backend logs available in Render dashboard
- Frontend errors in browser console
- API errors in backend logs

## Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS**: Only allow necessary origins
3. **MongoDB**: Use connection string with authentication
4. **HTTPS**: Render provides SSL certificates automatically

## Cost Optimization

### Free Tier Limits
- **Backend**: 750 hours/month
- **Frontend**: Unlimited
- **Bandwidth**: 100GB/month

### Upgrade Considerations
- Monitor usage in Render dashboard
- Consider paid plans for production traffic
- Optimize bundle size for faster loading

Your application should now be successfully deployed on Render! 