import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import WeekCard from '../components/WeekCard';
import { Link, useNavigate } from 'react-router-dom';
import { MicIcon } from 'lucide-react';
import { scrollToTop } from '../utils/scroll';

const CourseStructurePage = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTop();
    navigate('/pricing');
  };

  const weeks = [
    {
      weekNumber: 1,
      title: "Introduction to Soft Skills & Self-Awareness",
      objective: "Discover soft skills and explore personal strengths.",
      topics: [
        "What are soft skills?",
        "Introduction to public speaking & leadership",
        "Self-awareness through reflections"
      ]
    },
    {
      weekNumber: 2,
      title: "Communication Skills – Your Ice Breaker Speech",
      objective: "Speak confidently and express yourself clearly.",
      topics: [
        "Voice modulation, gestures, clarity",
        "Giving and receiving feedback"
      ]
    },
    {
      weekNumber: 3,
      title: "Teamwork & Leadership",
      objective: "Collaborate and lead in group settings.",
      topics: [
        "Roles in a team",
        "Leading with empathy"
      ]
    },
    {
      weekNumber: 4,
      title: "Emotional Intelligence & Feedback",
      objective: "Build empathy and give helpful feedback.",
      topics: [
        "Managing emotions",
        "How to critique positively"
      ]
    },
    {
      weekNumber: 5,
      title: "Critical Thinking & Impromptu Speaking",
      objective: "Think quickly and speak spontaneously.",
      topics: [
        "Introduction to impromptu speaking",
        "Quick-thinking frameworks (PREP, Rule of 3)"
      ]
    },
    {
      weekNumber: 6,
      title: "Time Management & Planning",
      objective: "Prioritize tasks and set goals.",
      topics: [
        "SMART goals",
        "Time-blocking and prioritization tools"
      ]
    },
    {
      weekNumber: 7,
      title: "Leadership in Action & Project Planning",
      objective: "Take initiative and work towards a shared goal.",
      topics: [
        "Leading vs managing",
        "Delegation and motivation"
      ]
    },
    {
      weekNumber: 8,
      title: "The Power of Storytelling – Your Final Speech",
      objective: "Craft and deliver a story that connects, inspires, or teaches.",
      topics: [
        "Elements of a great story (Character – Conflict – Resolution)",
        "Personal storytelling vs. fictional storytelling",
        "Voice, pause, expression, and structure in storytelling"
      ]
    }
  ];

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
          <h1 className="text-4xl font-bold text-neutral-900 mb-4 text-center">
            Course Structure
          </h1>
          <p className="text-lg text-neutral-600 mb-12 text-center">
            An 8-week journey to transform your communication and leadership skills
          </p>
          
          <div className="space-y-6 mb-16">
            {weeks.map((week, index) => (
              <WeekCard
                key={week.weekNumber}
                weekNumber={week.weekNumber}
                title={week.title}
                objective={week.objective}
                topics={week.topics}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Link 
              to="/pricing" 
              onClick={handleJoinClick}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-accent-500 hover:bg-accent-600 text-white font-semibold text-lg rounded-lg transition-all transform hover:scale-105 hover:shadow-lg shadow-md min-w-[200px]"
            >
              <MicIcon className="w-5 h-5" />
              <span>Join Today</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseStructurePage; 