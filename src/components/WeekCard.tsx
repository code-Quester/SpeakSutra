import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface WeekCardProps {
  weekNumber: number;
  title: string;
  objective: string;
  topics: string[];
  index: number;
}

const WeekCard: React.FC<WeekCardProps> = ({ weekNumber, title, objective, topics, index }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200"
    >
      <div 
        className="p-6 cursor-pointer hover:bg-neutral-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                Week {weekNumber}
              </span>
              <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
            </div>
            <p className="text-neutral-600 mb-4">{objective}</p>
          </div>
          <ChevronDown 
            className={`w-6 h-6 text-neutral-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
        
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="border-t border-neutral-200 pt-4">
              <h4 className="font-semibold text-neutral-900 mb-3">Topics:</h4>
              <ul className="space-y-2">
                {topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-600">
                    <span className="text-accent-500 mt-1">•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default WeekCard; 