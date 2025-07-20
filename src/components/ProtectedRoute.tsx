import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isEnrolled } = useAuth();
  const location = useLocation();

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-red-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                Access Restricted
              </h1>
              
              <p className="text-lg text-neutral-600 mb-6">
                This course page is only available to enrolled students. 
                Please complete your enrollment to access the course materials and WhatsApp group.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-900 mb-1">
                      How to get access:
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Complete the enrollment process</li>
                      <li>• Make the payment successfully</li>
                      <li>• You'll automatically get access to this page</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                >
                  Enroll Now
                </a>
                
                <div>
                  <a
                    href="/"
                    className="text-accent-600 hover:text-accent-700 font-medium"
                  >
                    ← Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 