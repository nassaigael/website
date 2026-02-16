import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  TrendingUp,
  X,
  Award,
  Building2,
  Users,
} from 'lucide-react';
import ProjectCard from '../components/cards/ProjectCard';
import { projects, projectsData } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import NoResultsState from '../components/states/NoResultsState';

const ProjectsPage = () => {
  const { language } = useLanguage();
  const t = projectsData[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
      className="min-h-screen bg-white dark:bg-[#1e293b] pt-20 md:pt-24 pb-16 md:pb-32"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 md:mb-20"
        >
          {/* Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-[#ee5253]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 md:w-96 md:h-96 bg-[#932020]/5 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">
                  {language === 'mg' ? 'Tetikasantsika' :
                    language === 'fr' ? 'Nos Projets' :
                      'Our Projects'}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-2 md:h-3 bg-[#ee5253]/20 -z-10"></span>
              </span>
            </h1>

            {/* Subtitle */}
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

            {/* Elegant Divider */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
              <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]/30"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-[#ee5253] rotate-45"></div>
              <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]/30"></div>
            </div>

            {/* Stats Cards */}
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
                  <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className={`p-2 md:p-3 rounded-lg md:rounded-xl ${stat.color}`}>
                        <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <span className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {typeof stat.label === 'object' ? stat.label[language] : stat.label}
                    </p>
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

        {/* BARRE DE RECHERCHE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="relative mb-12 md:mb-16"
        >
          <div className="relative max-w-3xl mx-auto">
            {/* Effet de glow */}
            <div className={`absolute -inset-1 bg-linear-to-r from-[#ee5253]/20 via-[#932020]/20 to-[#ee5253]/20 rounded-2xl blur-xl transition-all duration-500 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`} />
            
            {/* Conteneur principal */}
            <div className={`relative flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 border-2 ${
              isSearchFocused 
                ? 'border-[#ee5253] shadow-xl shadow-[#ee5253]/20' 
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}>
              
              {/* Icône de recherche */}
              <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                <div className={`p-1 rounded-lg transition-all duration-300 ${isSearchFocused ? 'bg-[#ee5253]/10' : ''}`}>
                  <Search className={`w-5 h-5 transition-colors duration-300 ${
                    isSearchFocused ? 'text-[#ee5253]' : 'text-gray-400'
                  }`} />
                </div>
              </div>

              {/* Input */}
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
                className="w-full pl-14 pr-24 py-4 md:py-5 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-sm md:text-base rounded-2xl"
              />

              {/* Bouton clear */}
              {searchTerm && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchTerm('')}
                    className="p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* PROJETS */}
        {filteredProjects.length > 0 ? (
          <motion.div
            key={`grid-${filteredProjects.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Section des projets réguliers */}
            {regularProjects.length > 0 && (
              <div>
                {!searchTerm && (
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 md:mb-12 text-center">
                    {language === 'mg' ? 'Tetikasa rehetra' : 
                     language === 'fr' ? 'Tous les projets' : 
                     'All projects'}
                  </h3>
                )}
                
                {/* GRILLEs */}
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
            onResetFilters={() => setSearchTerm('')}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;