# Deployment Fix Guide - Frontend & Backend Integration

## Issues Identified and Fixed

### 1. **Hardcoded localhost URLs** ✅ FIXED
   - **Problem**: All API calls were using `http://localhost:4000` which doesn't work in production
   - **Solution**: Created centralized API configuration using environment variables

### 2. **CORS Configuration** ✅ FIXED
   - **Problem**: Backend CORS was allowing all origins, but needed explicit frontend URL for production
   - **Solution**: Updated CORS to use environment variable for frontend URL

### 3. **Vercel Serverless Function Support** ✅ FIXED
   - **Problem**: Backend wasn't properly exported for Vercel serverless functions
   - **Solution**: Added module.exports and conditional server listening

### 4. **Environment Variables** ✅ FIXED
   - **Problem**: No environment variable configuration
   - **Solution**: Created example .env files and API config

---

## Step-by-Step Deployment Instructions

### Frontend Deployment (Vercel)

1. **Set Environment Variable in Vercel:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add a new variable:
     - **Name**: `VITE_API_URL`
     - **Value**: `https://my-backend.vercel.app` (replace with your actual backend URL)
     - **Environment**: Production, Preview, Development (select all)

2. **Redeploy Frontend:**
   - After adding the environment variable, trigger a new deployment
   - Vercel will rebuild with the new environment variable

### Backend Deployment (Vercel)

1. **Set Environment Variables in Vercel:**
   - Go to your backend Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add the following variables:
     - **Name**: `FRONTEND_URL`
       - **Value**: `https://my-frontend.vercel.app` (replace with your actual frontend URL)
       - **Environment**: Production, Preview, Development
     
     - **Name**: `MONGODBURI`
       - **Value**: Your MongoDB Atlas connection string
       - **Environment**: Production, Preview, Development
     
     - **Name**: `NODE_ENV`
       - **Value**: `production`
       - **Environment**: Production only

2. **Verify vercel.json Configuration:**
   - Ensure your `Backend/vercel.json` is correctly configured (already present)

3. **Redeploy Backend:**
   - After adding environment variables, trigger a new deployment

---

## Files Changed

### Frontend Changes:
1. ✅ Created `frontend/src/config/api.js` - Centralized API configuration
2. ✅ Updated all components to use API config:
   - `Freebook.jsx`
   - `Course.jsx`
   - `Cards.jsx`
   - `Cards2.jsx`
   - `Login.jsx`
   - `Signup.jsx`
   - `Payment.jsx`
   - `BookReader.jsx`

### Backend Changes:
1. ✅ Updated `Backend/index.js`:
   - Improved CORS configuration with environment variable support
   - Added proper export for Vercel serverless functions
   - Conditional server listening

### New Files:
1. ✅ `frontend/.env.example` - Example environment variables for frontend
2. ✅ `Backend/.env.example` - Example environment variables for backend

---

## Testing After Deployment

1. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Check Console tab for any CORS errors
   - Check Network tab to verify API calls are going to the correct backend URL

2. **Verify API Calls:**
   - All API calls should now go to `https://my-backend.vercel.app` instead of `localhost:4000`
   - Check Network tab in DevTools to confirm

3. **Test Features:**
   - ✅ Books should load and display cards
   - ✅ Login/Signup should work
   - ✅ Book reading should work
   - ✅ Payment flow should work

---

## Common Issues and Solutions

### Issue: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solution**: 
- Verify `FRONTEND_URL` environment variable in backend Vercel settings matches your frontend URL exactly
- Ensure no trailing slash in the URL
- Redeploy backend after changing environment variables

### Issue: "Network Error" or "Failed to fetch"
**Solution**:
- Verify `VITE_API_URL` environment variable in frontend Vercel settings
- Check that backend URL is correct and accessible
- Ensure backend is deployed and running

### Issue: Cards not showing
**Solution**:
- Check browser console for errors
- Verify API endpoint is correct: `https://my-backend.vercel.app/book`
- Check Network tab to see if request is being made and what response is received

### Issue: Environment variables not working
**Solution**:
- Vite requires `VITE_` prefix for environment variables
- After adding environment variables in Vercel, you MUST redeploy
- Clear browser cache and hard refresh (Ctrl+Shift+R)

---

## Quick Checklist

- [ ] Frontend `VITE_API_URL` environment variable set in Vercel
- [ ] Backend `FRONTEND_URL` environment variable set in Vercel
- [ ] Backend `MONGODBURI` environment variable set in Vercel
- [ ] Both frontend and backend redeployed after environment variable changes
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows API calls going to correct backend URL
- [ ] Books/cards are displaying correctly

---

## Support

If you continue to experience issues:
1. Check Vercel deployment logs for errors
2. Check browser console for specific error messages
3. Verify all environment variables are set correctly
4. Ensure both deployments completed successfully

