import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import PaymentPage from './pages/PaymentPage';
import CourseStructurePage from './pages/CourseStructurePage';
import CoursePage from './pages/CoursePage';
import SuccessPage from './pages/SuccessPage';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Test component for debugging
const TestPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Page</h1>
      <p className="text-gray-600">This is a test page to verify routing is working.</p>
      <a href="/admin" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
        Go to Admin
      </a>
    </div>
  </div>
);

// Component to conditionally render navbar
const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/course-structure" element={<CourseStructurePage />} />
          <Route path="/course" element={
            <ProtectedRoute>
              <CoursePage />
            </ProtectedRoute>
          } />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;