import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { 
  MessageCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  Users, 
  Calendar,
  Mic,
  ArrowLeft
} from 'lucide-react';

const CoursePage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const whatsappLink = 'https://chat.whatsapp.com/EUs6LO0CtPi4ETAJfqKNV4';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(whatsappLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleJoinWhatsApp = () => {
    window.open(whatsappLink, '_blank');
  };

  // Generate QR code on component mount
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrDataUrl = await QRCode.toDataURL(whatsappLink, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });
        setQrCodeDataUrl(qrDataUrl);
      } catch (err) {
        console.error('Failed to generate QR code:', err);
      }
    };

    generateQRCode();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back to Home */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-6"
            >
              <MessageCircle className="w-8 h-8 text-accent-600" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Welcome to Your Course Community!
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Join our WhatsApp group to stay connected with your fellow learners, 
              receive Zoom meeting links, course updates, and valuable resources.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* WhatsApp Link Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">WhatsApp Group</h3>
                  <p className="text-neutral-600">Join our community</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-sm text-neutral-600 mb-2">Group Link:</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={whatsappLink}
                      readOnly
                      className="flex-1 bg-white border border-neutral-300 rounded px-3 py-2 text-sm"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="p-2 text-neutral-600 hover:text-accent-600 transition-colors"
                      title="Copy link"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleJoinWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Join WhatsApp Group</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* QR Code Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-sm"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">QR Code</h3>
                  <p className="text-neutral-600">Scan to join</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-neutral-50 rounded-lg p-6 mb-4">
                  <div className="w-48 h-48 mx-auto bg-white rounded-lg border-2 border-neutral-300 flex items-center justify-center">
                    {qrCodeDataUrl ? (
                      <img 
                        src={qrCodeDataUrl} 
                        alt="WhatsApp Group QR Code" 
                        className="w-40 h-40"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-32 h-32 bg-neutral-200 rounded-lg flex items-center justify-center mb-2">
                          <span className="text-neutral-500 text-xs">Loading...</span>
                        </div>
                        <p className="text-xs text-neutral-500">
                          Generating QR Code
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-neutral-600">
                  Open WhatsApp and scan this QR code to join the group
                </p>
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-xl p-8 shadow-lg border border-neutral-200 mb-12"
          >
            <h3 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">
              What You'll Get in the Group
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Zoom Links</h4>
                <p className="text-sm text-neutral-600">
                  Direct access to all live session meeting links
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Course Updates</h4>
                <p className="text-sm text-neutral-600">
                  Important announcements and schedule changes
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Community</h4>
                <p className="text-sm text-neutral-600">
                  Connect with fellow learners and share experiences
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center"
          >
            <div className="bg-accent-50 rounded-xl p-8 border border-accent-200">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-neutral-600 mb-6">
                Join the WhatsApp group now to stay connected and never miss an important update!
              </p>
              <button
                onClick={handleJoinWhatsApp}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 hover:shadow-lg shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join WhatsApp Group Now</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursePage; 