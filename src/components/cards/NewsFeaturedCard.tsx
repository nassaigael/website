import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type NewsArticle } from '../../data/news';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewsFeaturedCardProps {
  article: NewsArticle;
  index: number;
}

const NewsFeaturedCard = ({ article, index }: NewsFeaturedCardProps) => {
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
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {article.title[language]}
          </h3>

          <p className="text-gray-300 mb-6 text-base md:text-lg line-clamp-3">
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
};

export default NewsFeaturedCard;