# Brew Haven Deployment Guide

This guide will help you deploy your Brew Haven project using Render for the backend and Netlify for the frontend.

## Prerequisites

- GitHub account
- Render account (free tier available)
- Netlify account (free tier available)
- Your project pushed to a GitHub repository

## Backend Deployment (Render)

### Step 1: Prepare Backend Files

The following files have been created/updated for Render deployment:
- `render.yaml` - Render service configuration
- `php.ini` - PHP configuration
- `api/db_connection.php` - Updated with environment variable support

### Step 2: Deploy to Render

1. **Create a new Web Service on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Web Service:**
   - **Name**: `brew-haven-backend`
   - **Environment**: `PHP`
   - **Build Command**: `echo "No build needed for PHP"`
   - **Start Command**: `php -S 0.0.0.0:$PORT -t api`
   - **Plan**: Free

3. **Add Environment Variables:**
   - `PHP_VERSION`: `8.2`

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://brew-haven-backend.onrender.com`)

### Step 3: Create Database on Render

1. **Create a new PostgreSQL Database:**
   - Go to Render Dashboard
   - Click "New +" → "PostgreSQL"
   - **Name**: `brew-haven-db`
   - **Plan**: Free
   - **Database**: `brew_haven_db`

2. **Note the Database URL:**
   - Copy the "External Database URL" for configuration

3. **Update Backend Environment Variables:**
   - Go to your web service settings
   - Add environment variable: `DATABASE_URL` with the PostgreSQL URL

### Step 4: Initialize Database

1. **Run the SQL setup:**
   - Use the `database_setup_production.sql` file to create tables
   - You can run this through Render's database console or a database client

## Frontend Deployment (Netlify)

### Step 1: Prepare Frontend Files

The following files have been created/updated for Netlify deployment:
- `netlify.toml` - Netlify configuration
- `src/database/mysqlDB.js` - Updated with environment variable support
- `vite.config.js` - Updated with production optimizations

### Step 2: Deploy to Netlify

1. **Connect Repository:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings:**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: `18`

3. **Add Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-render-backend-url.onrender.com`
   - Replace with your actual Render backend URL

4. **Deploy:**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note your frontend URL (e.g., `https://brew-haven.netlify.app`)

### Step 3: Update CORS Settings

1. **Update Backend CORS:**
   - Go to your Render backend service
   - Update the `api/db_connection.php` file
   - Replace `https://your-netlify-app.netlify.app` with your actual Netlify URL
   - Redeploy the backend

## Testing Your Deployment

### Backend Testing
1. Visit: `https://your-backend-url.onrender.com/test.php`
2. Should return a success message

### Frontend Testing
1. Visit your Netlify URL
2. Test user registration and login
3. Test menu browsing and ordering
4. Test contact form submission

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure your Netlify URL is added to the allowed origins in `api/db_connection.php`
   - Check that environment variables are set correctly

2. **Database Connection Issues:**
   - Verify `DATABASE_URL` environment variable is set correctly
   - Check that database tables are created using `database_setup_production.sql`

3. **Build Failures:**
   - Check Node.js version compatibility
   - Ensure all dependencies are in `package.json`

4. **API Endpoint Errors:**
   - Verify backend URL is correct in frontend environment variables
   - Check Render service logs for errors

### Environment Variables Reference

**Backend (Render):**
- `DATABASE_URL`: PostgreSQL connection string
- `PHP_VERSION`: PHP version (8.2)

**Frontend (Netlify):**
- `VITE_API_URL`: Backend API URL

## Production Considerations

1. **Security:**
   - Update CORS settings to only allow your production domains
   - Consider implementing API rate limiting
   - Use HTTPS for all communications

2. **Performance:**
   - Enable caching headers in Netlify
   - Optimize images and assets
   - Consider CDN for static assets

3. **Monitoring:**
   - Set up error tracking (Sentry, etc.)
   - Monitor API response times
   - Set up uptime monitoring

## Support

If you encounter issues:
1. Check Render service logs
2. Check Netlify build logs
3. Verify environment variables
4. Test API endpoints individually

Your Brew Haven application should now be successfully deployed and accessible to users worldwide!
