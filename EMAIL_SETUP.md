# Email Setup Guide

## Gmail Configuration

To enable email functionality, you need to configure Gmail SMTP settings:

### 1. Enable 2-Factor Authentication
- Go to your Google Account settings
- Enable 2-Factor Authentication

### 2. Generate App Password
- Go to Google Account → Security → 2-Step Verification
- Click on "App passwords"
- Generate a new app password for "Mail"
- Copy the 16-character password

### 3. Environment Variables
Add these variables to your `.env` file:

```env
# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
```

### 4. Email Templates
The application sends two types of emails:

#### Payment Confirmation Email
- Sent immediately after successful payment
- Contains order details and confirmation

#### Welcome Email
- Sent after payment confirmation
- Contains WhatsApp group link and course information
- Beautiful HTML template with course details

### 5. Email Features
- ✅ Professional HTML templates
- ✅ WhatsApp group link included
- ✅ Course information and schedule
- ✅ Contact information
- ✅ Responsive design
- ✅ Error handling

### 6. Testing
To test email functionality:
1. Complete a test payment
2. Check your email for both confirmation and welcome emails
3. Verify WhatsApp group link works correctly

### 7. Troubleshooting
- Ensure Gmail app password is correct
- Check that 2FA is enabled on Gmail account
- Verify environment variables are set correctly
- Check server logs for email errors

### 8. Customization
You can customize email templates in `src/server/utils/emailService.ts`:
- Update email content
- Modify styling
- Add additional information
- Change contact details 