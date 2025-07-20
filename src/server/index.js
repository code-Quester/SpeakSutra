const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const dotenv = require('dotenv');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { Customer } = require('./models/Customer');
const EmailService = require('./utils/emailService');

// Load environment variables from root .env file
dotenv.config({ path: '../../.env' });

// Log environment variables (without sensitive data)
console.log('Server starting with configuration:');
console.log('RAZORPAY_KEY_ID:', process.env.VITE_RAZORPAY_KEY_ID ? 'Present' : 'Missing');
console.log('RAZORPAY_KEY_SECRET:', process.env.VITE_RAZORPAY_KEY_SECRET ? 'Present' : 'Missing');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Present' : 'Missing');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Present' : 'Missing');
console.log('PORT:', process.env.PORT || 3000);

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';

if (!process.env.VITE_RAZORPAY_KEY_ID || !process.env.VITE_RAZORPAY_KEY_SECRET || !process.env.MONGODB_URI) {
  if (isDevelopment) {
    console.warn('⚠️  Development mode: Using mock configuration');
    console.warn('⚠️  For full functionality, set up environment variables');
  } else {
    throw new Error('Required environment variables are not defined');
  }
}

// Initialize email service (optional for development)
let emailService = null;
try {
  emailService = new EmailService();
  console.log('Email service initialized successfully');
} catch (error) {
  console.warn('Email service not configured - emails will not be sent');
  console.warn('To enable emails, set EMAIL_USER and EMAIL_PASSWORD environment variables');
}

// Connect to MongoDB (or use mock in development)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else if (isDevelopment) {
  console.warn('⚠️  Development mode: MongoDB connection skipped');
} else {
  throw new Error('MONGODB_URI is required in production');
}

const app = express();
const router = express.Router();

// Initialize Razorpay (or use mock in development)
let razorpay = null;
if (process.env.VITE_RAZORPAY_KEY_ID && process.env.VITE_RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.VITE_RAZORPAY_KEY_ID,
    key_secret: process.env.VITE_RAZORPAY_KEY_SECRET,
  });
} else if (isDevelopment) {
  console.warn('⚠️  Development mode: Razorpay initialization skipped');
} else {
  throw new Error('Razorpay credentials are required in production');
}

// Enable CORS for all routes
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://speaksutra-frontend.onrender.com', 'https://your-frontend-domain.onrender.com']
    : 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create customer and order
router.post('/create-customer-order', async (req, res) => {
  try {
    const { name, email, whatsapp, countryCode } = req.body;
    console.log('Creating order for:', { name, email, whatsapp, countryCode });

    // Validate required fields
    if (!name || !email || !whatsapp || !countryCode) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create customer record
    const customer = new Customer({
      name,
      email,
      whatsapp,
      countryCode,
      orderId: `ORDER_${Date.now()}`,
    });

    await customer.save();

    // Create Razorpay order with proper configuration
    const options = {
      amount: 149900, // ₹1,499 in paise
      currency: 'INR',
      receipt: customer.orderId,
      notes: {
        customerId: customer._id.toString(),
        name,
        email,
        whatsapp: `${countryCode}${whatsapp}`
      }
    };

    console.log('Creating Razorpay order with options:', options);
    if (!razorpay) {
      throw new Error('Razorpay not initialized');
    }
    const order = await razorpay.orders.create(options);
    console.log('Order created:', order);

    // Update customer with Razorpay order ID
    customer.razorpayOrderId = order.id;
    await customer.save();

    res.json({
      orderId: order.id,
      customerId: customer._id,
      success: true,
      amount: options.amount,
      currency: options.currency
    });
  } catch (error) {
    console.error('Error creating customer and order:', error);
    res.status(500).json({ 
      error: 'Error creating customer and order',
      details: error.message || 'Unknown error'
    });
  }
});

router.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    console.log('Verifying payment:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id
    });

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.VITE_RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update customer payment status
      const customer = await Customer.findOne({ razorpayOrderId: razorpay_order_id });
      if (customer) {
        customer.paymentStatus = 'completed';
        customer.razorpayPaymentId = razorpay_payment_id;
        await customer.save();
        console.log('Payment verified and customer updated:', customer._id);

        // Send emails to customer (if email service is configured)
        if (emailService) {
          try {
            const whatsappLink = 'https://chat.whatsapp.com/EUs6LO0CtPi4ETAJfqKNV4';
            const amount = '1,499';

            // Send payment confirmation email
            await emailService.sendPaymentConfirmationEmail(
              customer.name,
              customer.email,
              customer.orderId,
              amount
            );

            // Send welcome email with WhatsApp group link
            await emailService.sendWelcomeEmail(
              customer.name,
              customer.email,
              whatsappLink
            );

            console.log('Welcome emails sent successfully to:', customer.email);
          } catch (emailError) {
            console.error('Error sending welcome emails:', emailError);
            // Don't fail the payment verification if email fails
          }
        } else {
          console.log('Email service not configured - skipping email sending');
        }
      } else {
        console.warn('Customer not found for order:', razorpay_order_id);
      }

      res.json({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      console.error('Invalid signature for order:', razorpay_order_id);
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      error: 'Error verifying payment',
      details: error.message || 'Unknown error'
    });
  }
});

// Verify enrollment endpoint
router.post('/verify-enrollment', async (req, res) => {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    // Find customer and check payment status
    const customer = await Customer.findById(customerId);
    
    if (!customer) {
      return res.json({ isEnrolled: false });
    }

    // Check if payment is completed
    const isEnrolled = customer.paymentStatus === 'completed';

    res.json({ 
      isEnrolled,
      customerName: customer.name,
      orderId: customer.orderId
    });
  } catch (error) {
    console.error('Error verifying enrollment:', error);
    res.status(500).json({ 
      error: 'Error verifying enrollment',
      details: error.message || 'Unknown error'
    });
  }
});

// Get all customers endpoint (for admin dashboard)
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    
    res.json({ 
      customers,
      total: customers.length,
      completed: customers.filter(c => c.paymentStatus === 'completed').length,
      pending: customers.filter(c => c.paymentStatus === 'pending').length,
      failed: customers.filter(c => c.paymentStatus === 'failed').length,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ 
      error: 'Error fetching customers',
      details: error.message || 'Unknown error'
    });
  }
});

// Mount the router
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 