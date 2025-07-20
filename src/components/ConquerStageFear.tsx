import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Unlock, Brain, MessageSquare, Dumbbell } from 'lucide-react';

const ConquerStageFear = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const strategies = [
    {
      icon: <Unlock className="w-6 h-6 text-white" />,
      text: 'Break through nervousness',
    },
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      text: 'Master your mindset',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      text: 'Practice in a safe, supportive space',
    },
    {
      icon: <Dumbbell className="w-6 h-6 text-white" />,
      text: 'Gain the confidence to own any stage',
    },
  ];

  return (
    <section id="conquer-fear" className="section bg-neutral-50">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-800 to-primary-600 rounded-2xl opacity-90"></div>
            <img 
              src="https://images.pexels.com/photos/7256905/pexels-photo-7256905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Person overcoming stage fear" 
              className="rounded-2xl shadow-xl relative z-0 mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
              <h3 className="text-3xl font-display font-bold mb-4">You Are Not Alone</h3>
              <p className="text-lg mb-6">75% of people experience<br/>speech anxiety</p>
              <div className="w-16 h-1 bg-accent-500"></div>
            </div>
          </motion.div>
          
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-6">Conquer Stage Fear</h2>
            
            <div className="space-y-6">
              <p className="text-lg">
                <span className="font-semibold">One of the biggest fears in the world?</span><br/>
                It's not snakes. Not even heights.<br/>
                <span className="text-xl font-bold text-primary-700">It's public speaking.</span>
              </p>
              
              <p className="text-lg">
                But here's the truth—you're not alone. And more importantly, you can overcome it.
              </p>
              
              <p className="text-lg font-medium mb-6">
                Our course is designed to help you:
              </p>
              
              <div className="space-y-4">
                {strategies.map((strategy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                      {strategy.icon}
                    </div>
                    <p className="text-lg">{strategy.text}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg border-l-4 border-accent-500">
                <p className="text-lg font-medium italic text-neutral-800">
                  Join us—and transform fear into power.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConquerStageFear;