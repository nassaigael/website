import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Grid3x3,
  List,
  TrendingUp,
  Target,
  Sparkles,
  X,
  ChevronDown,
  BarChart3,
  Users,
  Award
} from 'lucide-react';
import ProjectCard from '../components/sections/ProjectCard';
import { projects, projectsData } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectsPage = () => {
  const { language } = useLanguage();
  const t = projectsData[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'progress' | 'budget'>('newest');

  const categories = [
    {
      id: 'all',
      icon: Sparkles,
      label: t.categories.education,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'education',
      icon: TrendingUp,
      label: t.categories.education,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'culture',
      icon: Award,
      label: t.categories.culture,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'social',
      icon: Users,
      label: t.categories.social,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'infrastructure',
      icon: BarChart3,
      label: t.categories.infrastructure,
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 'heritage',
      icon: Target,
      label: t.categories.heritage,
      color: 'from-rose-500 to-red-500'
    },
    {
      id: 'environment',
      icon: Sparkles,
      label: t.categories.environment,
      color: 'from-teal-500 to-green-500'
    }
  ];

  const statuses = [
    { id: 'all', label: { mg: 'REHETRA', fr: 'TOUS', en: 'ALL' } },
    { id: 'ongoing', label: t.statuses.ongoing },
    { id: 'completed', label: t.statuses.completed },
    { id: 'upcoming', label: t.statuses.upcoming },
    { id: 'planning', label: t.statuses.planning }
  ];

  // Fonction pour trier les projets
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch =
        project.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        // Trier par date de début (simplifié)
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      } else if (sortBy === 'progress') {
        return (b.progress || 0) - (a.progress || 0);
      } else {
        // Trier par budget (simplifié)
        const budgetA = parseFloat(a.budget?.replace(/[^0-9]/g, '') || '0');
        const budgetB = parseFloat(b.budget?.replace(/[^0-9]/g, '') || '0');
        return budgetB - budgetA;
      }
    });

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  // Statistiques
  const stats = {
    total: projects.length,
    ongoing: projects.filter(p => p.status === 'ongoing').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => {
      const budget = parseFloat(p.budget?.replace(/[^0-9]/g, '') || '0');
      return sum + budget;
    }, 0)
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900 pt-24 pb-32"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-r from-emerald-500/5 to-green-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 to-teal-600 rounded-full blur-xl opacity-75" />
              <div className="relative px-8 py-3  bg-[#ee5253] to-teal-600 rounded-full">
                <span className="text-white font-bold tracking-wider">
                  {t.title}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t.description}
          </motion.p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              label: { mg: 'Tetikasa', fr: 'Projets', en: 'Projects' },
              value: stats.total,
              icon: Target,
              color: 'bg-[#ee5253]'
            },
            {
              label: { mg: 'Mbola mitohy', fr: 'En cours', en: 'Ongoing' },
              value: stats.ongoing,
              icon: TrendingUp,
              color: 'bg-[#ee5253]'
            },
            {
              label: { mg: 'Vita', fr: 'Terminés', en: 'Completed' },
              value: stats.completed,
              icon: Award,
              color: 'bg-[#ee5253]'
            },
            {
              label: { mg: 'Total tetibola', fr: 'Budget total', en: 'Total budget' },
              value: `${(stats.totalBudget / 1000000).toFixed(1)}M Ar`,
              icon: BarChart3,
              color: 'bg-[#ee5253]'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {typeof stat.label === 'object' ? stat.label[language] : stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#ee5253] rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {language === 'mg' ? 'Tetikasa voavoatra' :
                    language === 'fr' ? 'Projets prioritaires' :
                      'Featured Projects'}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        {/* Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="sticky top-24 z-30 mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-200/50 dark:border-gray-800/50"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={
                    language === 'mg' ? 'Hikaroka tetikasa, toerana, sehatra...' :
                      language === 'fr' ? 'Rechercher des projets, lieux, domaines...' :
                        'Search projects, locations, fields...'
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-12 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300/50 dark:border-gray-700/50 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                />
                {searchTerm && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* View Toggle & Sort */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-md' : 'hover:bg-white/50 dark:hover:bg-gray-700/50'}`}
                >
                  <Grid3x3 className={`w-5 h-5 ${viewMode === 'grid' ? 'text-emerald-500' : 'text-gray-500'}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-md' : 'hover:bg-white/50 dark:hover:bg-gray-700/50'}`}
                >
                  <List className={`w-5 h-5 ${viewMode === 'list' ? 'text-emerald-500' : 'text-gray-500'}`} />
                </motion.button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {sortBy === 'newest' ? (language === 'mg' ? 'Vaovao indrindra' : language === 'fr' ? 'Plus récent' : 'Newest') :
                      sortBy === 'progress' ? (language === 'mg' ? 'Fandrosoana' : language === 'fr' ? 'Progression' : 'Progress') :
                        (language === 'mg' ? 'Tetibola' : language === 'fr' ? 'Budget' : 'Budget')}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-40"
                    >
                      {['newest', 'progress', 'budget'].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option as never);
                            setShowFilters(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-colors ${sortBy === option
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                          {option === 'newest' ? (language === 'mg' ? 'Vaovao indrindra' : language === 'fr' ? 'Plus récent' : 'Newest') :
                            option === 'progress' ? (language === 'mg' ? 'Fandrosoana' : language === 'fr' ? 'Progression' : 'Progress') :
                              (language === 'mg' ? 'Tetibola' : language === 'fr' ? 'Budget' : 'Budget')}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Filters */}
          <motion.div
            className="mt-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {language === 'mg' ? 'Karazana tetikasa' : language === 'fr' ? 'Catégories' : 'Categories'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat, index) => {
                  const Icon = cat.icon;
                  return (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${selectedCategory === cat.id
                        ? `bg-linear-to-r ${cat.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {cat.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Status Filters */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {language === 'mg' ? 'Sata' : language === 'fr' ? 'Statut' : 'Status'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {statuses.map((status, index) => (
                  <motion.button
                    key={status.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedStatus(status.id)}
                    className={`px-4 py-2.5 rounded-xl transition-all duration-300 ${selectedStatus === status.id
                      ? 'bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                  >
                    <span className="font-medium text-sm">
                      {typeof status.label === 'object' ? status.label[language] : status.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {language === 'mg' ? `Hita ${filteredProjects.length} tetikasa` :
                  language === 'fr' ? `${filteredProjects.length} projets trouvés` :
                    `${filteredProjects.length} projects found`}
              </p>
              {searchTerm && (
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {language === 'mg' ? `Fikarohana ho an'ny "${searchTerm}"` :
                    language === 'fr' ? `Recherche pour "${searchTerm}"` :
                      `Search for "${searchTerm}"`}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${viewMode}-${selectedCategory}-${selectedStatus}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                : "flex flex-col gap-6"
              }
            >
              {regularProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  viewMode={viewMode}
                />
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
                className="w-48 h-48 mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-600 rounded-full blur-2xl opacity-20" />
                <Target className="w-48 h-48 text-gray-300 dark:text-gray-700" />
              </motion.div>

              <motion.h3
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring" }}
              >
                {language === 'mg' ? 'Tsy misy tetikasa hita' :
                  language === 'fr' ? 'Aucun projet trouvé' :
                    'No projects found'}
              </motion.h3>

              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {language === 'mg' ? `Tsy misy tetikasa mifanaraka amin'ny safidy nataonao. Andramo ny manova ny teny fikarohana na ny karazana safidy.` :
                  language === 'fr' ? `Aucun projet ne correspond à vos critères. Essayez de modifier vos termes de recherche ou vos filtres.` :
                    `No projects match your criteria. Try adjusting your search terms or filters.`}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                  setSortBy('newest');
                }}
                className="px-8 py-3.5 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {language === 'mg' ? 'Hamafa ny safidy rehetra' :
                  language === 'fr' ? 'Réinitialiser tous les filtres' :
                    'Reset all filters'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  ); 
};

export default ProjectsPage;