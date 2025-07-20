import React from 'react';
import { motion } from 'framer-motion';
import { MicIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-800 opacity-90"></div>
      
      <div className="container relative z-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <div className="flex justify-center mb-6">
            <MicIcon className="w-16 h-16 text-accent-400" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
            Master the Art of
            <span className="block text-accent-400">Public Speaking</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Transform your communication skills and build unshakeable confidence in just 8 weeks
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="btn btn-primary text-lg px-8 py-4"
            >
              Enroll Now - ₹1,499
            </Link>
            <Link
              to="/course-structure"
              className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 text-lg px-8 py-4"
            >
              View Course Structure
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;