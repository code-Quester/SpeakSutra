import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create transporter using Gmail SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"SpeakSutra" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(customerName: string, customerEmail: string, whatsappLink: string): Promise<boolean> {
    const subject = 'Welcome to SpeakSutra - Your Public Speaking Journey Begins! 🎤';
    
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to SpeakSutra</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #6366f1;
            margin-bottom: 10px;
          }
          .welcome-text {
            font-size: 18px;
            color: #4b5563;
            margin-bottom: 25px;
          }
          .highlight {
            background-color: #fef3c7;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #f59e0b;
          }
          .whatsapp-section {
            background-color: #dcfce7;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            text-align: center;
          }
          .whatsapp-button {
            display: inline-block;
            background-color: #25d366;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 10px 0;
          }
          .course-info {
            background-color: #eff6ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .course-info h3 {
            color: #1e40af;
            margin-top: 0;
          }
          .course-info ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .course-info li {
            margin: 5px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .contact-info {
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎤 SpeakSutra</div>
            <h1 style="color: #1f2937; margin: 10px 0;">Welcome to Your Public Speaking Journey!</h1>
          </div>

          <div class="welcome-text">
            Dear <strong>${customerName}</strong>,
          </div>

          <p>
            Congratulations on taking the first step towards becoming a confident public speaker! 
            We're thrilled to have you join our comprehensive 8-week Public Speaking Course.
          </p>

          <div class="highlight">
            <strong>🎯 What's Next?</strong><br>
            Your course materials and schedule will be shared in our WhatsApp group. 
            This is where you'll receive all important updates, Zoom meeting links, and connect with fellow learners.
          </div>

          <div class="whatsapp-section">
            <h3 style="color: #059669; margin-top: 0;">📱 Join Our WhatsApp Group</h3>
            <p>Click the button below to join our exclusive WhatsApp group:</p>
            <a href="${whatsappLink}" class="whatsapp-button" target="_blank">
              💬 Join WhatsApp Group
            </a>
            <p style="font-size: 14px; margin-top: 10px; color: #059669;">
              <strong>Group Link:</strong> ${whatsappLink}
            </p>
          </div>

          <div class="course-info">
            <h3>📚 Course Overview</h3>
            <ul>
              <li><strong>Duration:</strong> 8 weeks of intensive training</li>
              <li><strong>Format:</strong> Live sessions + Practice exercises</li>
              <li><strong>Topics:</strong> Voice modulation, body language, storytelling, leadership skills</li>
              <li><strong>Support:</strong> Personalized feedback and guidance</li>
            </ul>
          </div>

          <div class="contact-info">
            <strong>Need Help?</strong><br>
            Email us at: <a href="mailto:infospeaksutra@gmail.com" style="color: #6366f1;">infospeaksutra@gmail.com</a><br>
            WhatsApp: <a href="https://wa.me/919062023916" style="color: #6366f1;">+91 919062023916</a>
          </div>

          <div class="footer">
            <p>
              <strong>SpeakSutra</strong><br>
              Transforming Communication Skills<br>
              © 2024 SpeakSutra. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.sendEmail({
      to: customerEmail,
      subject,
      html,
    });
  }

  async sendPaymentConfirmationEmail(customerName: string, customerEmail: string, orderId: string, amount: string): Promise<boolean> {
    const subject = 'Payment Confirmed - SpeakSutra Course Enrollment ✅';
    
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmed</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .success-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          .order-details {
            background-color: #f0f9ff;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #0ea5e9;
          }
          .amount {
            font-size: 24px;
            font-weight: bold;
            color: #059669;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✅</div>
            <h1 style="color: #059669; margin: 10px 0;">Payment Confirmed!</h1>
          </div>

          <p>Dear <strong>${customerName}</strong>,</p>

          <p>Thank you for enrolling in our Public Speaking Course! Your payment has been successfully processed.</p>

          <div class="order-details">
            <h3 style="color: #0ea5e9; margin-top: 0;">📋 Order Details</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Amount Paid:</strong> <span class="amount">₹${amount}</span></p>
            <p><strong>Course:</strong> Public Speaking Mastery (8-week program)</p>
            <p><strong>Status:</strong> <span style="color: #059669; font-weight: bold;">✅ Confirmed</span></p>
          </div>

          <p>You will receive a separate welcome email with your course access details and WhatsApp group link.</p>

          <p>We're excited to have you on this journey!</p>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px;">
              <strong>SpeakSutra Team</strong><br>
              Transforming Communication Skills
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    return await this.sendEmail({
      to: customerEmail,
      subject,
      html,
    });
  }
}

export default EmailService; 