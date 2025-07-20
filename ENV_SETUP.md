# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in your project root with the following variables:

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

## Admin Password Configuration

The admin dashboard password is now configurable through environment variables:

- **Variable**: `VITE_ADMIN_PASSWORD`
- **Default**: `sutraSPEAK@2025` (if not set)
- **Usage**: Access admin dashboard at `/admin`

## Security Benefits

1. **No Hardcoded Passwords**: Password is stored in environment variables
2. **Easy to Change**: Update password without code changes
3. **Environment Specific**: Different passwords for dev/prod
4. **Version Control Safe**: `.env` files are typically gitignored

## How to Set Up

1. Create a `.env` file in your project root
2. Add the environment variables above
3. Replace placeholder values with your actual credentials
4. Restart your development server

## Important Notes

- The `.env` file should be added to `.gitignore` to keep secrets safe
- Never commit actual passwords to version control
- Use different passwords for development and production environments 