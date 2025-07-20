import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Star, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState({ fullName: false, whatsapp: false, email: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isFullNameValid = fullName.trim().length > 0;
  const isWhatsappValid = whatsapp.trim().length >= 8 && /^\d+$/.test(whatsapp);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isFullNameValid && isWhatsappValid && isEmailValid;

  const handleBlur = (field: keyof typeof touched) => setTouched({ ...touched, [field]: true });

  const handleEnrollNow = async () => {
    try {
      setLoading(true);
      setError('');

      // Log the Razorpay key to verify it's loaded
      console.log('Razorpay Key:', import.meta.env.VITE_RAZORPAY_KEY_ID);

      // Create customer and order
      const response = await fetch('http://localhost:3000/api/create-customer-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          whatsapp,
          countryCode,
        }),
      });

      const data = await response.json();
      console.log('Order creation response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: 149900, // ₹1,499 in paise
        currency: 'INR',
        name: 'SpeakSutra',
        description: 'Public Speaking Course Enrollment',
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch('http://localhost:3000/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              // Payment successful
              navigate('/success', {
                state: {
                  message: 'Payment successful! Welcome to the course.',
                  orderId: response.razorpay_order_id,
                  customerId: data.customerId,
                },
              });
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: fullName,
          email,
          contact: `${countryCode}${whatsapp}`,
        },
        theme: {
          color: '#6366f1',
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: "Pay using Net Banking",
                instruments: [
                  {
                    method: "netbanking"
                  }
                ]
              },
              upi: {
                name: "Pay using UPI",
                instruments: [
                  {
                    method: "upi"
                  }
                ]
              },
              card: {
                name: "Pay using Card",
                instruments: [
                  {
                    method: "card"
                  }
                ]
              },
              wallet: {
                name: "Pay using Wallet",
                instruments: [
                  {
                    method: "wallet"
                  }
                ]
              }
            },
            sequence: ["block.upi", "block.banks", "block.card", "block.wallet"],
            preferences: {
              show_default_blocks: true
            }
          }
        },
        modal: {
          ondismiss: function() {
            setError('Payment cancelled. Please try again.');
          }
        }
      };

      console.log('Razorpay Options:', options);

      // Check if Razorpay is available
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK failed to load');
      }

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24">
      <div className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Invest in Your Communication Skills
          </h1>
          <p className="text-xl text-neutral-700">
            Transform your public speaking abilities with our comprehensive course.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-primary-800 text-white p-8 text-center">
            <div className="inline-flex items-center gap-2 bg-accent-500 rounded-full px-4 py-1 mb-6">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </div>
            
            <div className="flex justify-center items-baseline gap-4 mb-4">
              <span className="text-lg line-through opacity-70">₹2,000</span>
              <span className="text-5xl font-bold">₹1,499</span>
            </div>
            <p className="text-white/80 mb-6">Early Bird Offer</p>
            
            {/* Customer Information Form */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6 text-left max-w-xl mx-auto">
              <div className="text-center text-orange-900 font-medium mb-4 bg-orange-100 rounded py-2">
                You are one step away from becoming a Confident Speaker
              </div>
              <h2 className="text-lg font-semibold mb-4 text-neutral-900">Customer Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    className={`w-full border rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-accent-400 ${touched.fullName && !isFullNameValid ? 'border-red-400' : 'border-neutral-300'}`}
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Enter your full name"
                    required
                  />
                  {touched.fullName && !isFullNameValid && (
                    <div className="text-red-500 text-xs mt-1">Full Name is required.</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Enter Whatsapp no. *</label>
                  <div className="flex gap-2">
                    <select
                      className="border border-neutral-300 rounded px-2 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-accent-400"
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                    >
                      <option value="+91" className="text-black">🇮🇳 +91</option>
                      <option value="+1" className="text-black">🇺🇸 +1</option>
                      <option value="+44" className="text-black">🇬🇧 +44</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      type="tel"
                      className={`flex-1 border rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-accent-400 ${touched.whatsapp && !isWhatsappValid ? 'border-red-400' : 'border-neutral-300'}`}
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      onBlur={() => handleBlur('whatsapp')}
                      placeholder="Enter Whatsapp no."
                      required
                    />
                  </div>
                  {touched.whatsapp && !isWhatsappValid && (
                    <div className="text-red-500 text-xs mt-1">Enter a valid WhatsApp number.</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    className={`w-full border rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-accent-400 ${touched.email && !isEmailValid ? 'border-red-400' : 'border-neutral-300'}`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="Enter your email"
                    required
                  />
                  {touched.email && !isEmailValid && (
                    <div className="text-red-500 text-xs mt-1">Enter a valid email address.</div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <img src="https://cdn.razorpay.com/logo.svg" alt="Pay by Razorpay" className="h-6" />
                  <span className="text-neutral-700 text-sm">Pay by Razorpay</span>
                </div>
              </form>
            </div>

            <button
              onClick={handleEnrollNow}
              disabled={!isFormValid || loading}
              className="w-full bg-accent-500 hover:bg-accent-600 text-white py-4 px-8 rounded-full font-semibold text-xl transition-colors flex flex-col items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed mb-2"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>➜ Enroll Now ₹1,499.00</span>
                  <span className="text-base font-normal mt-1">Click Here To Place Order</span>
                </>
              )}
            </button>
          </div>

          <div className="p-8">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <p className="text-lg">Classes will be held for 2 months, once a week</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <p className="text-lg">Online Live interactive sessions</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent-500 flex-shrink-0 mt-1" />
                  <p className="text-lg">Personalised mentoring</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-accent-500" />
                <h2 className="text-2xl font-bold">Why Join Now?</h2>
              </div>
              <p className="text-xl font-display italic mb-4">
                "The best investment is in yourself."
              </p>
              <p className="text-lg text-neutral-700">
                This isn't just a course. It's your stage debut, your confidence booster, and your leadership ignition.
              </p>
            </div>

            <div className="mt-8 p-6 border-2 border-accent-100 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-accent-500" />
                <h3 className="text-xl font-bold">Bonus Materials</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent-500" />
                  <span>Downloadable speech templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent-500" />
                  <span>Practice exercises and worksheets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent-500" />
                  <span>Access to private community</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;