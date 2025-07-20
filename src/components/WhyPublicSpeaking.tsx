import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, TrendingUp, Users, Trophy } from 'lucide-react';

const WhyPublicSpeaking = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  const benefits = [
    {
      icon: <CheckCircle2 className="w-12 h-12 text-primary-500" />,
      title: 'Build instant credibility',
      description: 'When you speak with authority, people trust your expertise immediately.',
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary-500" />,
      title: 'Command attention in any room',
      description: 'Learn techniques to captivate audiences whether in meetings or on stage.',
    },
    {
      icon: <Users className="w-12 h-12 text-primary-500" />,
      title: 'Inspire and influence others',
      description: 'Master the art of persuasive speaking to move people to action.',
    },
    {
      icon: <Trophy className="w-12 h-12 text-primary-500" />,
      title: 'Boost your career, confidence, and charisma',
      description: 'Watch opportunities multiply as your speaking skills improve.',
    },
  ];

  return (
    <section id="why-public-speaking" className="section bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-title"
          >
            Why Public Speaking?
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl text-neutral-700 mb-8">
              In today's world, it's not enough to be skilled—you need to be heard. Whether you're presenting in a meeting, pitching your startup, or raising your voice for change, your ability to communicate effectively can make all the difference.
            </p>
            
            <div className="relative inline-block">
              <span className="font-display text-2xl italic text-primary-800">
                "Those who speak well, lead well."
              </span>
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-accent-500 opacity-70"></div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="feature-card flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="mb-4 p-3 bg-primary-50 rounded-full">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-neutral-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyPublicSpeaking;