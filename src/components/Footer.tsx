import React from 'react';
import { Mic, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mic className="w-6 h-6 text-accent-500" />
              <span className="text-xl font-display font-bold">SpeakSutra</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Helping individuals unlock their public speaking potential and communicate with confidence.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div> */}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="text-neutral-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#why-public-speaking" className="text-neutral-400 hover:text-white transition-colors">Why Public Speaking</a>
              </li>
              <li>
                <a href="#conquer-fear" className="text-neutral-400 hover:text-white transition-colors">Conquer Stage Fear</a>
              </li>
              <li>
                <a href="#what-you-learn" className="text-neutral-400 hover:text-white transition-colors">What You'll Learn</a>
              </li>
              <li>
                <a href="#cta" className="text-neutral-400 hover:text-white transition-colors">Join the Course</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy & Terms</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy-policy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Free Resources</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Student Stories</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">Support</a>
              </li>
            </ul>
          </div> */}
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=infospeaksutra@gmail.com" className="text-neutral-400 hover:text-white transition-colors">infospeaksutra@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
                <a href="tel:+919062023916" className="text-neutral-400 hover:text-white transition-colors">+91 9062023916</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
                <address className="text-neutral-400 not-italic">
                  Behala,Kolkata - 700034
                </address>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-800 text-center text-neutral-500 text-sm">
          <p>© {currentYear} SpeakSutra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;