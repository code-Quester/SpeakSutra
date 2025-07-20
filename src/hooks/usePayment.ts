import { useState } from 'react';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (amount: number) => {
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll simulate a successful payment
      // In a real implementation, you would integrate with Razorpay's payment processing
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return { 
        success: true, 
        paymentId: `pi_demo_${Date.now()}`,
        amount 
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    processPayment,
    loading,
    error,
  };
};