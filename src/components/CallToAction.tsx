import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mic, Star, Shield, Calendar } from 'lucide-react';
import { scrollToTop } from '../utils/scroll';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTop();
    navigate('/pricing');
  };

  return (
    <section id="cta" className="section bg-primary-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-700 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-600 rounded-full filter blur-3xl opacity-10 translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title text-white">Ready to Upgrade Yourself?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Every great speaker started where you are right now. Make the choice to grow, speak, and lead.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white text-neutral-800 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-100 rounded-full filter blur-3xl opacity-70 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative text-center">
              <h3 className="text-4xl font-display font-bold mb-8 text-primary-800">Join our Public Speaking Course</h3>
              
              <ul className="space-y-6 mb-8 max-w-xl mx-auto">
                <li className="flex items-center gap-3 justify-center">
                  <Star className="w-6 h-6 text-accent-500 flex-shrink-0" />
                  <p className="text-lg">Comprehensive 8-week program designed for rapid improvement</p>
                </li>
                <li className="flex items-center gap-3 justify-center">
                  <Shield className="w-6 h-6 text-accent-500 flex-shrink-0" />
                  <p className="text-lg">Supportive environment with personalized feedback</p>
                </li>
                <li className="flex items-center gap-3 justify-center">
                  <Calendar className="w-6 h-6 text-accent-500 flex-shrink-0" />
                  <p className="text-lg">Flexible scheduling with both in-person and virtual options</p>
                </li>
              </ul>
              
              <div className="text-primary-700 font-medium italic text-xl mb-8">
                ✨ Seats are limited. Your voice deserves the spotlight.
              </div>

              <Link 
                to="/pricing"
                onClick={handleJoinClick}
                className="inline-flex items-center gap-2 btn btn-primary text-lg px-10 py-4 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                <Mic className="w-5 h-5" />
                Join the Course Today
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;