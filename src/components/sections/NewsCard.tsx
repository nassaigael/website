import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type NewsArticle } from '../../data/index';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const NewsCard = ({ article, index }: NewsCardProps) => {
  const { language } = useLanguage();

  const categoryColors = {
    event: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    project: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    announcement: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    culture: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
  };

  const categoryLabels = {
    event: { mg: 'Hetsika', fr: 'Événement', en: 'Event' },
    project: { mg: 'Tetikasa', fr: 'Projet', en: 'Project' },
    announcement: { mg: 'Fampandrenesana', fr: 'Annonce', en: 'Announcement' },
    culture: { mg: 'Kolontsaina', fr: 'Culture', en: 'Culture' }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800"
    >
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={article.image}
          alt={article.title[language]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColors[article.category]} backdrop-blur-sm`}>
            {categoryLabels[article.category][language]}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7">
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
          
          {article.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{article.location}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#ee5253] transition-colors line-clamp-2">
          {article.title[language]}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3 leading-relaxed">
          {article.excerpt[language]}
        </p>

        {/* Read More Button */}
        <Link to={`/news/${article.id}`}>
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-[#ee5253] font-semibold group/btn"
          >
            <span>
              {language === 'mg' ? 'Hamaky bebe kokoa' : 
               language === 'fr' ? 'Lire la suite' : 
               'Read more'}
            </span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>
    </motion.article>
  );
};

export default NewsCard;