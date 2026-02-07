import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, Grid, List, Sparkles, TrendingUp, Clock } from 'lucide-react';
import NewsCard from '../components/sections/NewsCard';
import { newsArticles } from '../data/news';
import { useLanguage } from '../contexts/LanguageContext';

const NewsPage = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = [
    { id: 'all', icon: Sparkles, label: { mg: 'Rehetra', fr: 'Tous', en: 'All' } },
    { id: 'event', icon: Calendar, label: { mg: 'Hetsika', fr: 'Événements', en: 'Events' } },
    { id: 'project', icon: TrendingUp, label: { mg: 'Tetikasa', fr: 'Projets', en: 'Projects' } },
    { id: 'announcement', icon: Clock, label: { mg: 'Fampandrenesana', fr: 'Annonces', en: 'Announcements' } },
    { id: 'culture', icon: Sparkles, label: { mg: 'Kolontsaina', fr: 'Culture', en: 'Culture' } }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = 
      article.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-rose-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-24 pb-32"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-rose-300/10 dark:bg-rose-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section with floating animation */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#ee5253]/10 to-purple-500/10 dark:from-[#ee5253]/20 dark:to-purple-500/20 mb-6 backdrop-blur-sm border border-white/20 dark:border-white/10"
          >
            <Sparkles className="w-5 h-5 text-[#ee5253]" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {language === 'mg' ? 'Vaovao farany' : 
               language === 'fr' ? 'Dernières actualités' : 
               'Latest updates'}
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-[#ee5253] dark:from-white dark:via-gray-300 dark:to-[#ee5253]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {language === 'mg' ? 'Vaovao sy Hetsika' : 
             language === 'fr' ? 'Actualités & Événements' : 
             'News & Events'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {language === 'mg' ? 'Mijery ny zava-baovao sy hetsika rehetra momba ny Fikambanana Fizanakara' :
             language === 'fr' ? 'Découvrez toutes les nouvelles et événements de l\'Association Fizanakara' :
             'Discover all news and events from the Fizanakara Association'}
          </motion.p>
        </motion.div>

        {/* Advanced Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 sm:mb-16"
        >
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-black/30 p-6 border border-gray-200/50 dark:border-gray-800/50">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              {/* Search Bar with floating effect */}
              <motion.div 
                className="flex-1 relative"
                whileHover={{ scale: 1.01 }}
              >
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={
                      language === 'mg' ? 'Hikaroka vaovao, hetsika, tetikasa...' :
                      language === 'fr' ? 'Rechercher des actualités, événements, projets...' :
                      'Search news, events, projects...'
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-white dark:bg-gray-800/50 border-2 border-gray-300/50 dark:border-gray-700/50 rounded-2xl focus:border-[#ee5253] focus:ring-4 focus:ring-[#ee5253]/20 dark:focus:ring-[#ee5253]/30 outline-none transition-all text-lg placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchTerm('')}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${searchTerm ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <span className="text-gray-400 hover:text-[#ee5253]">✕</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* View Toggle & Filter Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* View Mode Toggle */}
                <motion.div 
                  className="flex items-center bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-lg' : 'hover:bg-white/50 dark:hover:bg-gray-700/50'}`}
                  >
                    <Grid className={`w-5 h-5 ${viewMode === 'grid' ? 'text-[#ee5253]' : 'text-gray-500'}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-lg' : 'hover:bg-white/50 dark:hover:bg-gray-700/50'}`}
                  >
                    <List className={`w-5 h-5 ${viewMode === 'list' ? 'text-[#ee5253]' : 'text-gray-500'}`} />
                  </motion.button>
                </motion.div>

                {/* Mobile Filter Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ee5253] to-purple-600 text-white font-semibold rounded-2xl shadow-lg"
                >
                  <Filter className="w-5 h-5" />
                  <span>{language === 'mg' ? 'Safidy' : language === 'fr' ? 'Filtres' : 'Filters'}</span>
                </motion.button>
              </div>
            </div>

            {/* Category Filters - Animated */}
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-800/50"
                >
                  <div className="flex flex-wrap gap-3">
                    {categories.map((cat, index) => {
                      const Icon = cat.icon;
                      return (
                        <motion.button
                          key={cat.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ 
                            scale: 1.05,
                            y: -2,
                            boxShadow: "0 10px 30px rgba(238, 82, 83, 0.2)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 ${selectedCategory === cat.id
                            ? 'bg-gradient-to-r from-[#ee5253] to-purple-600 text-white shadow-lg shadow-[#ee5253]/30'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium whitespace-nowrap">
                            {cat.label[language]}
                          </span>
                          {selectedCategory === cat.id && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-white rounded-full"
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results Count & Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-[#ee5253]/10 to-purple-500/10 rounded-full">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {language === 'mg' ? `Hita ${filteredArticles.length} vaovao` :
                 language === 'fr' ? `${filteredArticles.length} actualités trouvées` :
                 `${filteredArticles.length} news found`}
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>{language === 'mg' ? 'Hetsika' : language === 'fr' ? 'Événements' : 'Events'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>{language === 'mg' ? 'Tetikasa' : language === 'fr' ? 'Projets' : 'Projects'}</span>
              </div>
            </div>
          </div>

          <motion.div 
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="w-4 h-4" />
            <span>{language === 'mg' ? `Mizara vaovao isan'andro`  : 
                   language === 'fr' ? 'Mises à jour quotidiennes' : 
                   'Daily updates'}</span>
          </motion.div>
        </motion.div>

        {/* News Grid/List with animations */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div
              key={viewMode}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex flex-col gap-6"
              }
            >
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  layoutId={`news-${article.id}`}
                  className={viewMode === 'list' 
                    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    : ""
                  }
                >
                  <NewsCard 
                    article={article} 
                    index={index}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 mx-auto mb-8 relative"
              >
                <Calendar className="w-40 h-40 text-gray-300 dark:text-gray-700 absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search className="w-20 h-20 text-gray-400 dark:text-gray-600" />
                </div>
              </motion.div>
              
              <motion.h3 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring" }}
              >
                {language === 'mg' ? 'Tsy misy vaovao' :
                 language === 'fr' ? 'Aucune actualité' :
                 'No news found'}
              </motion.h3>
              
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {language === 'mg' ? `Tsy misy vaovao mifanaraka amin'ny safidy nataonao. Andramo ny manova ny safidy fanasiana na fanisiana.` :
                 language === 'fr' ? 'Aucune actualité ne correspond à vos critères. Essayez de modifier vos filtres ou votre recherche.' :
                 'No news match your criteria. Try adjusting your filters or search terms.'}
              </motion.p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-8 py-3 bg-gradient-to-r from-[#ee5253] to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {language === 'mg' ? 'Hamafa safidy' :
                 language === 'fr' ? 'Réinitialiser les filtres' :
                 'Reset filters'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination/Scroll indicator */}
        {filteredArticles.length > 0 && (
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400"
            >
              <span className="text-sm">
                {language === 'mg' ? 'Mijery bebe kokoa' :
                 language === 'fr' ? 'Défiler pour plus' :
                 'Scroll for more'}
              </span>
              <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full p-1">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-[#ee5253] rounded-full mx-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default NewsPage;