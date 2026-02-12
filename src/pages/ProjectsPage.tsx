import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  TrendingUp,
  X,
  Award,
  Building2,
  Users,
  Sparkles,
} from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
import { projects, projectsData } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import NoResultsState from '../components/states/NoResultsState';

const ProjectsPage = () => {
  const { language } = useLanguage();
  const t = projectsData[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('grid');
      } else {
        setViewMode('list');
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allProjects = [...projects];

  // Statistiques
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
              <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
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
          className="flex flex-col lg:flex-row items-center justify-between gap-6">
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

          {/* Search Info */}
          {filteredProjects.length > 0 && (
            <motion.div
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >


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