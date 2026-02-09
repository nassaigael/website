import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { type TimelineEvent } from '../../data/index';
import { useLanguage } from '../../contexts/LanguageContext';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  const { language } = useLanguage();

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-emerald-500 via-emerald-400 to-emerald-500" />

      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Year Card */}
            <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div className={`inline-block ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-teal-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                  <div className="relative px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 rounded-full shadow-xl">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-white" />
                      <span className="text-2xl font-bold text-white">{event.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Dot */}
            <div className="relative z-10">
              <div className="w-6 h-6 bg-white border-4 border-emerald-500 rounded-full shadow-xl" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <div className="w-6 h-6 bg-emerald-500 rounded-full" />
              </div>
            </div>

            {/* Event Card */}
            <div className={`flex-1 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
              <motion.div
                whileHover={{ scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <ChevronRight className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {event.title[language]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {event.description[language]}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;