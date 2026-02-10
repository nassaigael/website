import { motion } from 'framer-motion';
import { Calendar, MapPin, User, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type NewsArticle } from '../../data/news';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewsListCardProps {
  article: NewsArticle;
  index: number;
}

const NewsListCard = ({ article, index }: NewsListCardProps) => {
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
                <Star className="w-3 h-3 text-[#ee5253]" fill="#f59e0b" />
                <span className="text-xs font-medium text-[#ee5253]">
                  {language === 'mg' ? 'Voavoatra' : language === 'fr' ? 'À la une' : 'Featured'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default NewsListCard;