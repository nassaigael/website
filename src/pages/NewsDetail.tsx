import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowLeft, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { newsArticles } from '../data/news';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  const article = newsArticles.find(a => a.id === parseInt(id || '0'));

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'mg' ? 'Tsy hita ny vaovao' : 
             language === 'fr' ? 'Actualité non trouvée' : 
             'News not found'}
          </h1>
          <button
            onClick={() => navigate('/news')}
            className="text-[#ee5253] hover:underline"
          >
            {language === 'mg' ? 'Hiverina amin\'ny lisitra' : 
             language === 'fr' ? 'Retour à la liste' : 
             'Back to list'}
          </button>
        </div>
      </div>
    );
  }

  const categoryLabels = {
    event: { mg: 'Hetsika', fr: 'Événement', en: 'Event' },
    project: { mg: 'Tetikasa', fr: 'Projet', en: 'Project' },
    announcement: { mg: 'Fampandrenesana', fr: 'Annonce', en: 'Announcement' },
    culture: { mg: 'Kolontsaina', fr: 'Culture', en: 'Culture' }
  };

  const images = article.gallery ? [article.image, ...article.gallery] : [article.image];

  const shareNews = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title[language],
        text: article.excerpt[language],
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'mg' ? 'Ny rohy nohoraofina' : 
            language === 'fr' ? 'Lien copié' : 
            'Link copied');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/news')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#ee5253] mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>
            {language === 'mg' ? 'Hiverina' : 
             language === 'fr' ? 'Retour' : 
             'Back'}
          </span>
        </motion.button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-[#ee5253]/10 text-[#ee5253] rounded-full font-semibold">
              {categoryLabels[article.category][language]}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title[language]}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {article.excerpt[language]}
          </p>
        </motion.header>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={images[currentImage]}
              alt={`${article.title[language]} - Image ${currentImage + 1}`}
              className="w-full h-[500px] object-cover"
            />

            {/* Gallery Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage(prev => (prev - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentImage(prev => (prev + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImage
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
        >
          {article.content[language].map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Share & Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <button
            onClick={shareNews}
            className="flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all"
          >
            <Share2 className="w-5 h-5" />
            <span>
              {language === 'mg' ? 'Hizara' : 
               language === 'fr' ? 'Partager' : 
               'Share'}
            </span>
          </button>

          <button
            onClick={() => navigate('/news')}
            className="px-8 py-3 bg-[#ee5253] hover:bg-[#d94645] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            {language === 'mg' ? 'Hijery vaovao hafa' : 
             language === 'fr' ? 'Voir d\'autres actualités' : 
             'View other news'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsDetail;