import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrder, verifyPayment } from '../services/payment.js';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the amount from location state or use a default
  const amount = location.state?.amount || 1000; // Default amount in INR

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');

      // Create order
      const order = await createOrder({
        amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          email: 'customer@example.com', // You can modify this as needed
        },
      });

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Public Speaking Curriculum',
        description: 'Course Enrollment',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const result = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (result.success) {
              // Payment successful
              navigate('/success', { 
                state: { 
                  message: 'Payment successful! Welcome to the course.',
                  orderId: response.razorpay_order_id 
                } 
              });
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Customer Name', // You can modify this as needed
          email: 'customer@example.com', // You can modify this as needed
        },
        theme: {
          color: '#6366f1',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Payment</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-600 mb-2">Amount to Pay:</p>
          <p className="text-3xl font-bold text-gray-900">₹{amount}</p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
} 