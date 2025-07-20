# Environment Variables Consolidation Guide

## Current Issue
You have duplicate `.env` files:
- One in the root directory (`/.env`)
- One in the server directory (`/src/server/.env`)

This can cause confusion and potential conflicts.

## Solution: Single Root .env File

### Step 1: Keep Only Root .env File
Delete the `.env` file in `/src/server/` and keep only the one in the root directory.

### Step 2: Update Root .env File
Create/update the `.env` file in your project root with all required variables:

```env
# Admin Dashboard Password
VITE_ADMIN_PASSWORD=sutraSPEAK@2025

# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# MongoDB Configuration
MONGODB_URI=your_mongodb_atlas_connection_string

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password

# Server Configuration
PORT=3000
```

### Step 3: Update Server Configuration
The server is already configured to read from the root `.env` file:

```typescript
// src/server/index.ts - Line 16
dotenv.config({ path: '../../.env' });
```

This tells the server to look for the `.env` file two directories up (in the root).

### Step 4: Verify Frontend Access
The frontend can access environment variables with the `VITE_` prefix:

```typescript
// Frontend access
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
```

## Benefits of Single .env File

1. **No Duplication**: Single source of truth
2. **Easier Management**: One file to update
3. **No Conflicts**: No risk of different values
4. **Better Security**: Fewer files to secure
5. **Simpler Deployment**: One environment file to configure

## File Structure After Consolidation

```
project/
├── .env                    # ✅ Single environment file
├── src/
│   ├── server/
│   │   └── index.ts       # Reads from root .env
│   └── components/
│       └── AdminLogin.tsx  # Uses VITE_ variables
└── package.json
```

## Commands to Execute

```bash
# 1. Delete server .env file
rm src/server/.env

# 2. Ensure root .env has all variables
# (Manually create/update the root .env file)

# 3. Restart both servers
npm run dev:all
```

## Verification Steps

1. **Check Server Logs**: Should show "Connected to MongoDB"
2. **Test Admin Login**: Should work with password from root .env
3. **Verify Payment**: Should work with Razorpay keys from root .env
4. **Check Email**: Should work with email config from root .env

## Important Notes

- **VITE_ Prefix**: Only variables with `VITE_` prefix are accessible in frontend
- **Server Variables**: Variables without `VITE_` are only for server
- **Security**: Never commit `.env` files to version control
- **Backup**: Keep a backup of your environment variables

## Troubleshooting

If you encounter issues:

1. **Server can't find .env**: Check the path in `dotenv.config()`
2. **Frontend can't access variables**: Ensure they have `VITE_` prefix
3. **Duplicate variables**: Remove any duplicates in the root .env file

This consolidation will make your project much easier to manage! 