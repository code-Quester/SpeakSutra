import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, User, HelpCircle, Users, Layout, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToTop } from '../utils/scroll';

const WhatYouWillLearn = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleViewStructureClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTop();
    navigate('/course-structure');
  };

  const skills = [
    {
      icon: <MessageSquare className="w-10 h-10 text-accent-500" />,
      title: "Craft powerful speeches",
      description: "Learn to create compelling narratives that move hearts and minds."
    },
    {
      icon: <User className="w-10 h-10 text-accent-500" />,
      title: "Master body language",
      description: "Develop non-verbal communication that speaks louder than words."
    },
    {
      icon: <HelpCircle className="w-10 h-10 text-accent-500" />,
      title: "Handle Q&A sessions",
      description: "Respond to questions with confidence and authority."
    },
    {
      icon: <Users className="w-10 h-10 text-accent-500" />,
      title: "Connect with any audience",
      description: "Build instant rapport with listeners in any setting."
    },
    {
      icon: <Layout className="w-10 h-10 text-accent-500" />,
      title: "Structure effective talks",
      description: "Organize your content for maximum impact and retention."
    },
  ];

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
      }
    })
  };

  return (
    <section id="what-you-learn" className="section bg-white">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white opacity-50 z-0" 
        style={{ height: '50%' }}
      ></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            What You'll Learn
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-700"
          >
            Whether you're a student, entrepreneur, or professional—this course will change how you speak, forever.
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              className="feature-card flex flex-col h-full"
            >
              <div className="mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-neutral-600 flex-grow">{skill.description}</p>
            </motion.div>
          ))}
          
          <motion.div
            custom={5}
            variants={cardVariants}
            className="md:col-span-2 lg:col-span-3 mt-8 bg-gradient-to-r from-primary-700 to-primary-800 rounded-xl p-8 text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/3 flex justify-center">
                <div className="rounded-full bg-white/10 p-6">
                  <CheckCircle className="w-20 h-20 text-accent-400" />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4 text-white">For Everyone, Everywhere</h3>
                <p className="text-white/90 text-lg mb-4">
                  Our curriculum is designed for all experience levels. Whether you've never spoken publicly or you're looking to refine your skills, we meet you where you are.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Students</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Professionals</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Entrepreneurs</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Team Leaders</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Activists</span>
                </div>
                <Link 
                  to="/course-structure" 
                  onClick={handleViewStructureClick}
                  className="inline-block px-8 py-4 bg-accent-500 hover:bg-accent-400 text-white font-semibold text-lg rounded-lg transition-all transform hover:scale-105 hover:shadow-lg shadow-md"
                >
                  View Course Structure
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatYouWillLearn;