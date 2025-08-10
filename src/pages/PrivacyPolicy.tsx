import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
            Privacy Policy
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
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">1. Introduction</h2>
              <p className="text-neutral-700 mb-4">
                Welcome to SpeakSutra ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, enroll in our communication courses, or interact with our services.
              </p>
              <p className="text-neutral-700">
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">2.1 Personal Information</h3>
              <p className="text-neutral-700 mb-4">
                We may collect the following personal information:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Billing and payment information</li>
                <li>Course enrollment details and preferences</li>
                <li>Communication preferences and feedback</li>
                <li>Profile information and course progress</li>
              </ul>

              <h3 className="text-xl font-semibold text-neutral-800 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-neutral-700 mb-4">
                When you visit our website, we automatically collect:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-neutral-700 mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li>Process course enrollments and payments</li>
                <li>Provide access to course materials and resources</li>
                <li>Send important course updates and notifications</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and course offerings</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-neutral-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, processing payments, or delivering course content</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                <li><strong>Consent:</strong> We may share information with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">5. Data Security</h2>
              <p className="text-neutral-700 mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Secure payment processing</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure hosting and infrastructure</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-neutral-700 mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">7. Your Rights and Choices</h2>
              <p className="text-neutral-700 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-neutral-700 mb-4 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">8. Children's Privacy</h2>
              <p className="text-neutral-700 mb-4">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">9. International Data Transfers</h2>
              <p className="text-neutral-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-neutral-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">11. Contact Us</h2>
              <p className="text-neutral-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy; 