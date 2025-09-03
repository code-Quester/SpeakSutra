import express, { Request, Response, Router, RequestHandler } from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { Customer } from './models/Customer';
import EmailService from './utils/emailService';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from root .env file
const envPath = '../../.env';
console.log('Loading .env from path:', envPath);

dotenv.config({ path: envPath });

// Alternative paths if first one doesn't work
if (!process.env.RAZORPAY_KEY_ID) {
  console.log('Trying alternative path: ../../../.env');
  dotenv.config({ path: '../../../.env' });
}

if (!process.env.RAZORPAY_KEY_ID) {
  console.log('Trying current directory: .env');
  dotenv.config({ path: '.env' });
}

// Force development mode for local testing
process.env.NODE_ENV = 'development';

// Log environment variables (without sensitive data)
console.log('Server starting with configuration:');
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? 'Present' : 'Missing');
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? 'Present' : 'Missing');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Present' : 'Missing');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Present' : 'Missing');
console.log('PORT:', process.env.PORT || 3000);

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV !== 'production';

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET || !process.env.MONGODB_URI) {
  if (isDevelopment) {
    console.warn('⚠️  Development mode: Using mock configuration');
    console.warn('⚠️  For full functionality, set up environment variables');
  } else {
    throw new Error('Required environment variables are not defined');
  }
}

// Initialize email service (optional for development)
let emailService: EmailService | null = null;
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
const router = Router();

// Initialize Razorpay (or use mock in development)
let razorpay: Razorpay | null = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
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
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

interface CreateOrderRequest {
  name: string;
  email: string;
  whatsapp: string;
  countryCode: string;
}

// Create customer and order
router.post('/create-customer-order', (async (req: Request<{}, {}, CreateOrderRequest>, res: Response) => {
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
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface VerifyEnrollmentRequest {
  customerId: string;
}

router.post('/verify-payment', (async (req: Request<{}, {}, VerifyPaymentRequest>, res: Response) => {
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
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
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
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

// Verify enrollment endpoint
router.post('/verify-enrollment', (async (req: Request<{}, {}, VerifyEnrollmentRequest>, res: Response) => {
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
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

// Get all customers endpoint (for admin dashboard)
router.get('/customers', (async (req: Request, res: Response) => {
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
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

// Webhook handler functions
async function handlePaymentCaptured(payload: any) {
  try {
    const orderId = payload.payment.entity.order_id;
    const paymentId = payload.payment.entity.id;
    
    console.log('Payment captured for order:', orderId);
    
    // Update customer payment status
    const customer = await Customer.findOne({ razorpayOrderId: orderId });
    if (customer) {
      customer.paymentStatus = 'completed';
      customer.razorpayPaymentId = paymentId;
      await customer.save();
      console.log('Customer payment status updated to completed:', customer._id);
      
      // Send welcome emails
      if (emailService) {
        try {
          const whatsappLink = 'https://chat.whatsapp.com/EUs6LO0CtPi4ETAJfqKNV4';
          const amount = '1,499';
          
          await emailService.sendPaymentConfirmationEmail(
            customer.name,
            customer.email,
            customer.orderId,
            amount
          );
          
          await emailService.sendWelcomeEmail(
            customer.name,
            customer.email,
            whatsappLink
          );
          
          console.log('Welcome emails sent via webhook for:', customer.email);
        } catch (emailError) {
          console.error('Error sending emails via webhook:', emailError);
        }
      }
    } else {
      console.warn('Customer not found for webhook order:', orderId);
    }
  } catch (error) {
    console.error('Error handling payment captured webhook:', error);
  }
}

async function handlePaymentFailed(payload: any) {
  try {
    const orderId = payload.payment.entity.order_id;
    console.log('Payment failed for order:', orderId);
    
    // Update customer payment status
    const customer = await Customer.findOne({ razorpayOrderId: orderId });
    if (customer) {
      customer.paymentStatus = 'failed';
      await customer.save();
      console.log('Customer payment status updated to failed:', customer._id);
    }
  } catch (error) {
    console.error('Error handling payment failed webhook:', error);
  }
}

async function handleOrderPaid(payload: any) {
  try {
    const orderId = payload.order.entity.id;
    console.log('Order paid for order:', orderId);
    
    // This event is similar to payment.captured, but we'll handle it separately
    // for better logging and potential future differences
    await handlePaymentCaptured(payload);
  } catch (error) {
    console.error('Error handling order paid webhook:', error);
  }
}

// Webhook endpoint for Razorpay payment updates
router.post('/webhook', (async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const body = JSON.stringify(req.body);
    
    if (!signature) {
      console.error('Webhook: Missing signature header');
      return res.status(400).json({ error: 'Missing signature header' });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('Webhook: RAZORPAY_KEY_SECRET not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Webhook: Invalid signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const { event, payload } = req.body;
    console.log('Webhook received:', { event, orderId: payload?.payment?.entity?.order_id });

    // Handle different webhook events
    switch (event) {
      case 'payment.captured':
        await handlePaymentCaptured(payload);
        break;
      case 'payment.failed':
        await handlePaymentFailed(payload);
        break;
      case 'order.paid':
        await handleOrderPaid(payload);
        break;
      default:
        console.log('Webhook: Unhandled event type:', event);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ 
      error: 'Webhook processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}) as RequestHandler);

// Mount the router
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 