import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-neutral-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl">
          <div className="prose prose-neutral max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-neutral-700 mb-4">
                By accessing and using SpeakSutra's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-neutral-700">
                These Terms of Service ("Terms") govern your use of our website, courses, and services provided by SpeakSutra ("we," "us," or "our").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Description of Service</h2>
              <p className="text-neutral-700 mb-4">
                SpeakSutra provides online communication and public speaking courses designed to help individuals improve their speaking skills, overcome stage fear, and develop confidence in public speaking. Our services include:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li>Online course content and materials</li>
                <li>Video lessons and tutorials</li>
                <li>Practice exercises and assignments</li>
                <li>Progress tracking and assessments</li>
                <li>Customer support and guidance</li>
                <li>Access to course community (where applicable)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. User Accounts and Registration</h2>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">3.1 Account Creation</h3>
              <p className="text-neutral-700 mb-4">
                To access certain features of our courses, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Keep your account credentials secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutral-800 mb-3">3.2 Account Security</h3>
              <p className="text-neutral-700 mb-4">
                You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Course Enrollment and Payment</h2>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">4.1 Enrollment</h3>
              <p className="text-neutral-700 mb-4">
                Course enrollment is subject to availability and payment of applicable fees. We reserve the right to modify course offerings, pricing, and availability at any time.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mb-3">4.2 Payment Terms</h3>
              <p className="text-neutral-700 mb-4">
                All course fees must be paid in full before access is granted. Payment is processed through secure third-party payment processors. You agree to provide accurate payment information and authorize us to charge the specified amount.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mb-3">4.3 Refund Policy</h3>
              <p className="text-neutral-700 mb-4">
                We offer a 7-day money-back guarantee for course purchases. Refund requests must be submitted within 7 days of purchase and before completing more than 25% of the course content. Refunds are processed within 5-7 business days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Course Access and Usage</h2>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">5.1 Access Period</h3>
              <p className="text-neutral-700 mb-4">
                Course access is granted for the duration specified at the time of purchase. Access may be extended at our discretion or through additional purchases.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mb-3">5.2 Personal Use Only</h3>
              <p className="text-neutral-700 mb-4">
                Course materials are for your personal, non-commercial use only. You may not:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li>Share your account credentials with others</li>
                <li>Download, copy, or distribute course materials</li>
                <li>Use course content for commercial purposes</li>
                <li>Modify or create derivative works</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Intellectual Property Rights</h2>
              <p className="text-neutral-700 mb-4">
                All content, materials, and intellectual property associated with our courses, including but not limited to videos, text, graphics, logos, and software, are owned by SpeakSutra or our licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-neutral-700 mb-4">
                You retain ownership of any content you create or submit as part of course assignments, but you grant us a license to use, display, and distribute such content for educational and promotional purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. User Conduct and Prohibited Activities</h2>
              <p className="text-neutral-700 mb-4">
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li>Violating any applicable laws or regulations</li>
                <li>Interfering with or disrupting our services</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Harassing, abusing, or harming other users</li>
                <li>Uploading malicious code or content</li>
                <li>Impersonating others or providing false information</li>
                <li>Using our services for any illegal or unauthorized purpose</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Disclaimers and Limitations</h2>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">8.1 Educational Disclaimer</h3>
              <p className="text-neutral-700 mb-4">
                While we strive to provide high-quality educational content, we cannot guarantee specific outcomes or results. Individual progress depends on various factors including effort, practice, and personal circumstances.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mb-3">8.2 Service Availability</h3>
              <p className="text-neutral-700 mb-4">
                We strive to maintain continuous service availability but cannot guarantee uninterrupted access. We may temporarily suspend services for maintenance, updates, or other operational reasons.
              </p>

              <h3 className="text-xl font-semibold text-neutral-800 mb-3">8.3 Limitation of Liability</h3>
              <p className="text-neutral-700 mb-4">
                To the maximum extent permitted by law, SpeakSutra shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. Termination</h2>
              <p className="text-neutral-700 mb-4">
                We may terminate or suspend your account and access to our services at any time, with or without cause, with or without notice. Upon termination, your right to use our services will cease immediately.
              </p>
              <p className="text-neutral-700 mb-4">
                You may terminate your account at any time by contacting us. Upon termination, we will delete your account information in accordance with our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">10. Privacy and Data Protection</h2>
              <p className="text-neutral-700 mb-4">
                Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">11. Governing Law and Dispute Resolution</h2>
              <p className="text-neutral-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in Kolkata, India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">12. Changes to Terms</h2>
              <p className="text-neutral-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">13. Contact Information</h2>
              <p className="text-neutral-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="text-neutral-700 mb-2">
                  <strong>Email:</strong> infospeaksutra@gmail.com
                </p>
                <p className="text-neutral-700 mb-2">
                  <strong>Phone:</strong> +91 9062023916
                </p>
                <p className="text-neutral-700">
                  <strong>Address:</strong> Behala, Kolkata - 700034
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 