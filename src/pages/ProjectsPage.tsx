import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Grid3x3,
  List,
  TrendingUp,
  Target,
  X,
  BarChart3,
  Users,
  Award
} from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
import { projects, projectsData } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import NoResultsState from '../components/states/NoResultsState';

const ProjectsPage = () => {
  const { language } = useLanguage();
  const t = projectsData[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allProjects = [...projects];

  // Statistiques (toujours utiles pour l'affichage)
  const stats = {
    total: projects.length,
    ongoing: projects.filter(p => p.status === 'ongoing').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => {
      const budget = parseFloat(p.budget?.replace(/[^0-9]/g, '') || '0');
      return sum + budget;
    }, 0)
  };

  // Garder uniquement la recherche
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch =
      project.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function setSelectedCategory(_arg0: string) {
    throw new Error('Function not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function setSelectedStatus(_arg0: string) {
    throw new Error('Function not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function setSortBy(_arg0: string) {
    throw new Error('Function not implemented.');
  }

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
              <div className="relative px-8 py-3 bg-[#ee5253] to-teal-600 rounded-full">
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

        {/* Control Bar - Simplifié sans filtres */}
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

            {/* View Toggle seulement */}
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
            </div>
          </div>

          {/* Message indiquant que tous les projets sont affichés */}
          <motion.div
            className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Users className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'mg' ? 'Ireo tetikasa rehetra eto amin\'ny lisitra' :
                  language === 'fr' ? 'Tous les projets sont affichés dans cette liste' :
                    'All projects are displayed in this list'}
              </p>
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
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`${viewMode}`}
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
          <NoResultsState
            entityType="projects"
            onResetFilters={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedStatus('all');
              setSortBy('newest');
            }}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;