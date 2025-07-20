const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      throw new Error('Email credentials not configured');
    }

    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendPaymentConfirmationEmail(name, email, orderId, amount) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Payment Confirmation - SpeakSutra Course',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Payment Confirmation</h2>
          <p>Dear ${name},</p>
          <p>Thank you for your payment of ₹${amount} for the SpeakSutra course.</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p>Your payment has been successfully processed and you are now enrolled in the course.</p>
          <p>You will receive a welcome email shortly with details about accessing the course materials.</p>
          <p>Best regards,<br>SpeakSutra Team</p>
        </div>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendWelcomeEmail(name, email, whatsappLink) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to SpeakSutra - Your Course Access',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome to SpeakSutra!</h2>
          <p>Dear ${name},</p>
          <p>Welcome to your public speaking journey! You're now officially enrolled in the SpeakSutra course.</p>
          <h3>What's Next?</h3>
          <ul>
            <li>Join our WhatsApp group for course updates and community support</li>
            <li>Access your course materials through the provided links</li>
            <li>Start your learning journey with our structured modules</li>
          </ul>
          <p><strong>WhatsApp Group Link:</strong> <a href="${whatsappLink}" style="color: #2563eb;">Join WhatsApp Group</a></p>
          <p>If you have any questions, feel free to reach out to us.</p>
          <p>Happy learning!<br>SpeakSutra Team</p>
        </div>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService; 