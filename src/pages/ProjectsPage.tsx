// pages/ProjectsPage.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  Search,
  TrendingUp,
  X,
  Award,
  Building2,
  Users,
  Filter,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
import { projects, projectsData } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import NoResultsState from '../components/states/NoResultsState';

const ProjectsPage = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = projectsData[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const allProjects = [...projects];

  // Catégories pour le filtre
  const categories = [
    { id: 'all', label: { mg: 'Rehetra', fr: 'Tous', en: 'All' }, icon: Sparkles },
    { id: 'education', label: { mg: 'Fampianarana', fr: 'Éducation', en: 'Education' }, icon: Building2 },
    { id: 'culture', label: { mg: 'Kolontsaina', fr: 'Culture', en: 'Culture' }, icon: Award },
    { id: 'social', label: { mg: 'Sosialy', fr: 'Social', en: 'Social' }, icon: Users },
    { id: 'infrastructure', label: { mg: 'Fitaovana', fr: 'Infrastructure', en: 'Infrastructure' }, icon: Building2 },
    { id: 'heritage', label: { mg: 'Vakoka', fr: 'Patrimoine', en: 'Heritage' }, icon: Award },
    { id: 'environment', label: { mg: 'Tontolo iainana', fr: 'Environnement', en: 'Environment' }, icon: TrendingUp },
  ];

  // Statistiques
  const stats = {
    total: projects.length,
    ongoing: projects.filter(p => p.status === 'ongoing').length,
    completed: projects.filter(p => p.status === 'completed').length,
    partners: projects.reduce((sum, p) => sum + p.partners.length, 0)
  };

  // Filtre de recherche et catégorie
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch =
      project.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen bg-white dark:bg-[#1e293b] pb-16 md:pb-32 ${
        location.pathname === '/projects' ? 'pt-0!' : ''
      }`}
    >
      {/* Éléments décoratifs d'arrière-plan - Version Light premium */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-[#ee5253]/5 dark:bg-[#ee5253]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#932020]/5 dark:bg-[#932020]/5 rounded-full blur-3xl"
        />
        
        {/* Grille subtile premium */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,82,83,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(147,32,32,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />
        
        {/* Éléments géométriques décoratifs */}
        <div className="absolute top-40 right-40 w-32 h-32 border border-[#ee5253]/10 rounded-full" />
        <div className="absolute bottom-40 left-40 w-48 h-48 border border-[#932020]/10 rotate-45" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 border border-[#ee5253]/5 rounded-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        {/* HERO SECTION - Version Light premium */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 md:mb-20"
        >
          <div className="relative z-10 text-center">
            {/* Main Title avec effet premium */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">
                  {language === 'mg' ? 'Tetikasantsika' :
                    language === 'fr' ? 'Nos Projets' :
                      'Our Projects'}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-2 md:h-3 bg-[#ee5253]/20 dark:bg-[#ee5253]/20 -z-10"></span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 text-2xl opacity-20"
                >
                  ✦
                </motion.span>
              </span>
            </h1>

            {/* Subtitle premium */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl mx-auto mb-10 md:mb-12 px-4"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {t.description}
              </p>
            </motion.div>

            {/* Elegant Divider avec effet premium */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
              <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]/30 dark:bg-[#ee5253]/30"></div>
              <div className="relative">
                <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-[#ee5253] rotate-45"></div>
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#ee5253]/20 rounded-full blur-sm"
                />
              </div>
              <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]/30 dark:bg-[#ee5253]/30"></div>
            </div>

            {/* Stats Cards - Version Light premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto"
            >
              {[
                {
                  label: { mg: 'Tetikasa', fr: 'Projets', en: 'Projects' },
                  value: stats.total,
                  icon: Building2,
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  label: { mg: 'Mbola mitohy', fr: 'En cours', en: 'Ongoing' },
                  value: stats.ongoing,
                  icon: TrendingUp,
                  gradient: 'from-emerald-500 to-green-500'
                },
                {
                  label: { mg: 'Vita', fr: 'Terminés', en: 'Completed' },
                  value: stats.completed,
                  icon: Award,
                  gradient: 'from-amber-500 to-orange-500'
                },
                {
                  label: { mg: 'Mpiara-miasa', fr: 'Partenaires', en: 'Partners' },
                  value: stats.partners,
                  icon: Users,
                  gradient: 'from-purple-500 to-pink-500'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-white/0 to-white/0 group-hover:from-[#ee5253]/5 group-hover:to-[#932020]/5 rounded-2xl transition-all duration-300" />
                  <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-[#ee5253] bg-linear-to-r ${stat.gradient}`}>
                        <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-white font-medium">
                      {typeof stat.label === 'object' ? stat.label[language] : stat.label}
                    </p>
                    
                    {/* Effet de brillance */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-tr from-transparent via-white/10 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* FEATURED PROJECTS */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-16 md:mb-20"
          >
            <div className="flex flex-col items-center text-center mb-8 md:mb-12">
              <div className="flex items-center gap-3 md:gap-4 mb-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {language === 'mg' ? 'Tetikasa Voavoatra' :
                    language === 'fr' ? 'Projets Prioritaires' :
                      'Featured Projects'}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                {language === 'mg' ? 'Ireo tetikasa manan-danja indrindra' :
                  language === 'fr' ? 'Les projets les plus importants' :
                    'The most important projects'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  viewMode="featured"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Control Bar - Version Light premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="sticky top-24 z-30 mb-12"
        >
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-800/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Search Bar premium */}
              <div className="flex-1 w-full">
                <div className="relative group">
                  <div className={`absolute -inset-1 rounded-2xl blur-lg transition-all duration-500 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`} />
                  <div className={`relative flex items-center bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-300 ${
                    isSearchFocused
                      ? 'border-[#ee5253] shadow-lg shadow-[#ee5253]/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Search className={`w-5 h-5 transition-colors duration-300 ${
                        isSearchFocused ? 'text-[#ee5253]' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      type="text"
                      placeholder={
                        language === 'mg' ? 'Hikaroka tetikasa, toerana, sehatra...' :
                          language === 'fr' ? 'Rechercher des projets, lieux, domaines...' :
                            'Search projects, locations, fields...'
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="w-full pl-12 pr-24 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none text-sm md:text-base rounded-xl"
                    />
                    {searchTerm && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSearchTerm('')}
                          className="p-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Filter Dropdown uniquement */}
              <div className="relative w-full lg:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full lg:w-64 flex items-center justify-between gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#ee5253] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-700 dark:text-white" />
                    <span className="text-sm text-gray-700 dark:text-white font-medium">
                      {categories.find(c => c.id === selectedCategory)?.label[language]}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full mt-2 right-0 w-full lg:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-40"
                    >
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setShowFilters(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${
                            selectedCategory === cat.id
                              ? 'bg-[#ee5253]/10 text-[#ee5253]'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white'
                          }`}
                        >
                          <cat.icon className="w-4 h-4" />
                          <span className="text-sm">{cat.label[language]}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJETS - Toujours en grille */}
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`grid-${filteredProjects.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Section des projets réguliers */}
            {regularProjects.length > 0 && (
              <div>
                {!searchTerm && selectedCategory === 'all' && (
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 md:mb-12 text-center"
                  >
                    {language === 'mg' ? 'Tetikasa rehetra' :
                      language === 'fr' ? 'Tous les projets' :
                        'All projects'}
                  </motion.h3>
                )}

                {/* Grille fixe - toujours en grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
                  {regularProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      viewMode="grid"
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <NoResultsState
            entityType="projects"
            onResetFilters={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;