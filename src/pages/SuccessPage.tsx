import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { message, orderId, customerId } = location.state || {};

  if (!message || !orderId || !customerId) {
    navigate('/');
    return null;
  }

  // Auto-login the user after successful payment
  useEffect(() => {
    if (customerId && orderId) {
      login(customerId, orderId);
    }
  }, [customerId, orderId, login]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24">
      <div className="container py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl text-neutral-700 mb-6">{message}</p>
          
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-neutral-600">Order ID: {orderId}</p>
          </div>
          
          <p className="text-neutral-600 mb-8">
            We've sent a confirmation email with course details. 
            Our team will contact you shortly to schedule your first session.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/course"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Join WhatsApp Group
            </Link>
            
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="bg-accent-500 hover:bg-accent-600 text-white py-3 px-6 rounded-full font-semibold transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 