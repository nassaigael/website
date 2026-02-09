import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, User, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type NewsArticle } from '../../data/news';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewsCardProps {
  article: NewsArticle;
  index: number;
  viewMode?: 'grid' | 'list' | 'featured';
}

const NewsCard = ({ article, index, viewMode = 'grid' }: NewsCardProps) => {
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

  if (viewMode === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-black shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        {/* Featured Badge */}
        {article.featured && (
          <div className="absolute top-6 right-6 z-20">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#ee5253] rounded-full shadow-lg">
              <Star className="w-4 h-4 text-white" fill="white" />
              <span className="text-xs font-bold text-white tracking-wider">
                {language === 'mg' ? 'VOAVOARY' : language === 'fr' ? 'À LA UNE' : 'FEATURED'}
              </span>
            </div>
          </div>
        )}

        <div className="relative h-125 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent z-10" />
          
          {/* Image */}
          <img
            src={article.image}
            alt={article.title[language]}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`px-4 py-2 rounded-full ${config.bg} ${config.text} font-bold text-sm tracking-wider`}>
                {config.label[language]}
              </span>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min</span>
                </div>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
              {article.title[language]}
            </h3>

            <p className="text-gray-300 mb-6 text-lg line-clamp-2">
              {article.excerpt[language]}
            </p>

            <Link to={`/news/${article.id}`}>
              <motion.button
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#ee5253] text-white font-bold rounded-xl transition-all duration-300 group/btn"
              >
                <span className="tracking-wide">
                  {language === 'mg' ? 'HAMAKY NY ZAVA-BITANY' : 
                   language === 'fr' ? 'LIRE L\'ARTICLE' : 
                   'READ ARTICLE'}
                </span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  if (viewMode === 'list') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ x: 4 }}
        className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-2/5 relative overflow-hidden">
            <div className="relative h-64 md:h-full">
              <img
                src={article.image}
                alt={article.title[language]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-lg ${config.bg} ${config.text} font-bold text-xs`}>
                  {config.label[language]}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-3/5 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              {article.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{article.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#ee5253] transition-colors">
              {article.title[language]}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
              {article.excerpt[language]}
            </p>

            <div className="flex items-center justify-between">
              <Link to={`/news/${article.id}`}>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-[#ee5253] font-semibold group/read"
                >
                  <span>
                    {language === 'mg' ? 'Hamaky bebe kokoa' : 
                     language === 'fr' ? 'Lire la suite' : 
                     'Read more'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover/read:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
              
              {article.featured && (
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/10 rounded-full">
                  <Star className="w-3 h-3  text-[#ee5253]" fill="#f59e0b" />
                  <span className="text-xs font-medium  text-[#ee5253]">
                    {language === 'mg' ? 'Voavoatra' : language === 'fr' ? 'À la une' : 'Featured'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Default grid view
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
          <div className="p-2  bg-[#ee5253] rounded-full shadow-lg">
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

export default NewsCard;