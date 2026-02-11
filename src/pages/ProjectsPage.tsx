import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  TrendingUp,
  Target,
  X,
  Award,
  Building2,
  Users,
  Sparkles,
  TargetIcon
} from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
import { projects, projectsData } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import NoResultsState from '../components/states/NoResultsState';

const ProjectsPage = () => {
  const { language } = useLanguage();
  const t = projectsData[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Par défaut en liste

  // Détection automatique du mode d'affichage selon la taille d'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('grid'); // Mobile: grille
      } else {
        setViewMode('list'); // Desktop: liste
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allProjects = [...projects];

  // Statistiques simplifiées (sans budget)
  const stats = {
    total: projects.length,
    ongoing: projects.filter(p => p.status === 'ongoing').length,
    completed: projects.filter(p => p.status === 'completed').length,
    partners: projects.reduce((sum, p) => sum + p.partners.length, 0)
  };

  // Filtre de recherche
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch =
      project.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-[#1e293b] pt-24 pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-20"
        >
          {/* Background Element */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ee5253]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#932020]/5 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            {/* Premium Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="p-2 bg-[#ee5253] rounded-lg">
                <TargetIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-800 dark:text-white tracking-wider uppercase">
                {t.title}
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              <span className="relative">
                <span className="relative z-10">
                  {language === 'mg' ? 'Tetikasantsika' : 
                   language === 'fr' ? 'Nos Projets' : 
                   'Our Projects'}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-[#ee5253]/20 -z-10"></span>
              </span>
            </h1>

            {/* Premium Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl mx-auto mb-12"
            >
              <p className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {t.description}
              </p>
            </motion.div>

            {/* Elegant Divider */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="w-12 h-0.5 bg-[#ee5253]/30"></div>
              <div className="w-4 h-4 border-2 border-[#ee5253] rotate-45"></div>
              <div className="w-12 h-0.5 bg-[#ee5253]/30"></div>
            </div>

            {/* Premium Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
            >
              {[
                {
                  label: { mg: 'Tetikasa', fr: 'Projets', en: 'Projects' },
                  value: stats.total,
                  icon: Building2,
                  color: 'bg-[#ee5253]'
                },
                {
                  label: { mg: 'Mbola mitohy', fr: 'En cours', en: 'Ongoing' },
                  value: stats.ongoing,
                  icon: TrendingUp,
                  color: 'bg-[#932020]'
                },
                {
                  label: { mg: 'Vita', fr: 'Terminés', en: 'Completed' },
                  value: stats.completed,
                  icon: Award,
                  color: 'bg-[#e38282]'
                },
                {
                  label: { mg: 'Mpiara-miasa', fr: 'Partenaires', en: 'Partners' },
                  value: stats.partners,
                  icon: Users,
                  color: 'bg-[#ee5253]'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-white/0 to-white/0 group-hover:from-[#ee5253]/5 group-hover:to-[#932020]/5 rounded-2xl transition-all duration-300" />
                  <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.color}`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {typeof stat.label === 'object' ? stat.label[language] : stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-linear-to-br from-[#ee5253] to-[#932020] rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  {language === 'mg' ? 'Tetikasa Voavoatra' :
                    language === 'fr' ? 'Projets Prioritaires' :
                      'Featured Projects'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {language === 'mg' ? 'Ireo tetikasa tena manan-danja sy mpiantraika' :
                    language === 'fr' ? 'Les projets les plus importants et impactants' :
                      'Most important and impactful projects'}
                </p>
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

        {/* Control Bar - Recherche seulement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="sticky top-24 z-30 mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
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
                  className="w-full pl-14 pr-12 py-4 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-[#ee5253] focus:ring-4 focus:ring-[#ee5253]/20 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                />
                {searchTerm && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#ee5253] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* View Mode Indicator (Informative seulement) */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {viewMode === 'grid' ? 
                      (language === 'mg' ? 'Endrika takila' : 
                       language === 'fr' ? 'Mode grille' : 
                       'Grid view') : 
                      (language === 'mg' ? 'Endrika lisitra' : 
                       language === 'fr' ? 'Mode liste' : 
                       'List view')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Info */}
          {filteredProjects.length > 0 && (
            <motion.div
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#ee5253]/10 rounded-lg">
                    <Target className="w-4 h-4 text-[#ee5253]" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {searchTerm ? 
                      (language === 'mg' ? `Hita ${filteredProjects.length} tetikasa tamin'ny fikarohana "${searchTerm}"` :
                       language === 'fr' ? `${filteredProjects.length} projets trouvés pour "${searchTerm}"` :
                       `${filteredProjects.length} projects found for "${searchTerm}"`) :
                      (language === 'mg' ? `Ireo tetikasa ${filteredProjects.length} rehetra` :
                       language === 'fr' ? `Tous les ${filteredProjects.length} projets` :
                       `All ${filteredProjects.length} projects`)
                    }
                  </p>
                </div>
                
                {/* Mobile View Mode Indicator */}
                <div className="md:hidden flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {viewMode === 'grid' ? 'Takila' : 'Lisitra'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Projects List/Grid (Auto-détecté) */}
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`${viewMode}-${filteredProjects.length}`}
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
            onResetFilters={() => setSearchTerm('')}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;