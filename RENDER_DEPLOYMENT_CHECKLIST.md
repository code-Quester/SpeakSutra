# Render Deployment Checklist

## ✅ **Fixed Issues:**

### **1. Client-Side Routing**
- ✅ Added `public/404.html` for SPA routing
- ✅ Updated `index.html` with redirect script
- ✅ This fixes the "not found" error on Render

### **2. Backend Issues**
- ✅ Fixed email service typo (`createTransporter` → `createTransport`)
- ✅ Removed duplicate database index
- ✅ Improved error handling

### **3. Environment Variables**
- ✅ Frontend variables configured
- ✅ Backend variables configured
- ✅ CORS settings updated

## 🚀 **Deployment Steps:**

### **Step 1: Deploy Frontend**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Create new **Static Site**
3. Connect your GitHub repository
4. Set **Build Command**: `npm install && npm run build`
5. Set **Publish Directory**: `dist`
6. Add environment variables:
   ```
   VITE_ADMIN_PASSWORD=sutraSPEAK@2025
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

### **Step 2: Deploy Backend**
1. Create new **Web Service**
2. Set **Root Directory**: `src/server`
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_app_password
   PORT=3000
   NODE_ENV=production
   ```

### **Step 3: Update CORS**
1. Get your frontend URL from Render
2. Update backend CORS in `src/server/index.js`:
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? ['https://YOUR-FRONTEND-URL.onrender.com']
       : 'http://localhost:5173',
     methods: ['GET', 'POST'],
     credentials: true,
   }));
   ```
3. Redeploy backend

## 🧪 **Testing Checklist:**

### **Frontend Tests:**
- [ ] Home page loads: `https://your-url.onrender.com/`
- [ ] Admin page loads: `https://your-url.onrender.com/admin`
- [ ] Admin login works with password: `sutraSPEAK@2025`
- [ ] All routes work (pricing, course, etc.)

### **Backend Tests:**
- [ ] Health check: `https://your-backend-url.onrender.com/api/health`
- [ ] API responds: `https://your-backend-url.onrender.com/api/customers`
- [ ] CORS allows frontend requests

### **Admin Dashboard Tests:**
- [ ] Login with correct password
- [ ] View user statistics
- [ ] Search and filter users
- [ ] Export CSV functionality
- [ ] User detail modal

## 🐛 **Common Issues & Solutions:**

### **Issue: "Cannot GET /admin"**
**Solution:** ✅ Fixed with 404.html and redirect script

### **Issue: CORS errors**
**Solution:** Update backend CORS with correct frontend URL

### **Issue: Admin password not working**
**Solution:** Check `VITE_ADMIN_PASSWORD` environment variable

### **Issue: No users showing**
**Solution:** 
- Verify backend is connected to MongoDB
- Check if users have been enrolled
- Test backend API endpoints

## 📊 **Expected URLs:**

- **Frontend**: `https://speaksutra-frontend.onrender.com`
- **Backend**: `https://speaksutra-backend.onrender.com`
- **Admin**: `https://speaksutra-frontend.onrender.com/admin`

## 🔒 **Security Notes:**

- Admin password: `sutraSPEAK@2025`
- Password required on every admin access
- No session persistence for security
- CORS restricted to your frontend domain

Your admin page should now work perfectly on Render! 🎉 