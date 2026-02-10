import { motion } from 'framer-motion';
import { Calendar, Clock, User, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type NewsArticle } from '../../data/index';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewsGridCardProps {
  article: NewsArticle;
  index: number;
}

const NewsGridCard = ({ article, index }: NewsGridCardProps) => {
  const { language } = useLanguage();

  const categoryConfig = {
    event: {
      label: { mg: 'HETSIKA', fr: 'ÉVÉNEMENT', en: 'EVENT' },
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white'
    },
    project: {
      label: { mg: 'TETIKASA', fr: 'PROJET', en: 'PROJECT' },
      color: 'from-emerald-500 to-green-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white'
    },
    announcement: {
      label: { mg: 'FANAMBARANA', fr: 'ANNONCE', en: 'ANNOUNCEMENT' },
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white'
    },
    culture: {
      label: { mg: 'KOLONTSAINA', fr: 'CULTURE', en: 'CULTURE' },
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white'
    },
    heritage: {
      label: { mg: 'VAKOKA', fr: 'PATRIMOINE', en: 'HERITAGE' },
      color: 'from-rose-500 to-red-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white'
    }
  };

  const config = categoryConfig[article.category];

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300"
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1.5 rounded-lg ${config.bg} ${config.text} font-bold text-xs tracking-wide`}>
          {config.label[language]}
        </span>
      </div>

      {/* Featured Star */}
      {article.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="p-2 bg-[#ee5253] rounded-full shadow-lg">
            <Star className="w-4 h-4 text-white" fill="white" />
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={article.image}
          alt={article.title[language]}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{article.readTime} min</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#ee5253] transition-colors">
          {article.title[language]}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed text-sm">
          {article.excerpt[language]}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>

          <Link to={`/news/${article.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-[#ee5253] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              {language === 'mg' ? 'Hamaky' : language === 'fr' ? 'Lire' : 'Read'}
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#ee5253] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.article>
  );
};

export default NewsGridCard;