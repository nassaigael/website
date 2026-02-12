import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { type Project, projectsData } from '../../data/projects';
import { useLanguage } from '../../contexts/LanguageContext';

// Import des icônes react-icons
import {
  GiTheater,
  GiHandSaw,
  GiCrane,
  GiStoneTower,
  GiForest,
  GiProgression,
  GiCheckMark,
  GiSandsOfTime,
  GiGearHammer
} from 'react-icons/gi';
import {
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaStar
} from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';

interface ProjectCardProps {
  project: Project;
  index: number;
  viewMode?: 'grid' | 'featured';
}

const ProjectCard = ({ project, index, viewMode = 'grid' }: ProjectCardProps) => {
  const { language } = useLanguage();
  const t = projectsData[language];

  // Icônes par catégorie
  const categoryIcons = {
    education: <IoMdSchool className="w-4 h-4" />,
    culture: <GiTheater className="w-4 h-4" />,
    social: <GiHandSaw className="w-4 h-4" />,
    infrastructure: <GiCrane className="w-4 h-4" />,
    heritage: <GiStoneTower className="w-4 h-4" />,
    environment: <GiForest className="w-4 h-4" />
  };

  // Icônes pour le mode featured (plus grandes)
  const featuredCategoryIcons = {
    education: <IoMdSchool className="w-5 h-5" />,
    culture: <GiTheater className="w-5 h-5" />,
    social: <GiHandSaw className="w-5 h-5" />,
    infrastructure: <GiCrane className="w-5 h-5" />,
    heritage: <GiStoneTower className="w-5 h-5" />,
    environment: <GiForest className="w-5 h-5" />
  };

  // Icônes pour les statuts
  const statusIcons = {
    ongoing: <GiProgression className="w-3.5 h-3.5" />,
    completed: <GiCheckMark className="w-3.5 h-3.5" />,
    upcoming: <GiSandsOfTime className="w-3.5 h-3.5" />,
    planning: <GiGearHammer className="w-3.5 h-3.5" />
  };

  const categoryConfig = {
    education: {
      label: t.categories.education,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      progressColor: 'from-[#ee5253] to-[#932020]',
      icon: categoryIcons.education,
      featuredIcon: featuredCategoryIcons.education
    },
    culture: {
      label: t.categories.culture,
      bg: 'bg-[#932020]',
      text: 'text-white',
      progressColor: 'from-[#932020] to-[#ee5253]',
      icon: categoryIcons.culture,
      featuredIcon: featuredCategoryIcons.culture
    },
    social: {
      label: t.categories.social,
      bg: 'bg-[#e38282]',
      text: 'text-white',
      progressColor: 'from-[#e38282] to-[#932020]',
      icon: categoryIcons.social,
      featuredIcon: featuredCategoryIcons.social
    },
    infrastructure: {
      label: t.categories.infrastructure,
      bg: 'bg-[#932020]',
      text: 'text-white',
      progressColor: 'from-[#932020] to-[#ee5253]',
      icon: categoryIcons.infrastructure,
      featuredIcon: featuredCategoryIcons.infrastructure
    },
    heritage: {
      label: t.categories.heritage,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      progressColor: 'from-[#ee5253] to-[#932020]',
      icon: categoryIcons.heritage,
      featuredIcon: featuredCategoryIcons.heritage
    },
    environment: {
      label: t.categories.environment,
      bg: 'bg-[#e38282]',
      text: 'text-white',
      progressColor: 'from-[#e38282] to-[#932020]',
      icon: categoryIcons.environment,
      featuredIcon: featuredCategoryIcons.environment
    }
  };

  const statusConfig = {
    ongoing: {
      label: t.statuses.ongoing,
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-700',
      icon: statusIcons.ongoing
    },
    completed: {
      label: t.statuses.completed,
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-200 dark:border-green-700',
      icon: statusIcons.completed
    },
    upcoming: {
      label: t.statuses.upcoming,
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-700',
      icon: statusIcons.upcoming
    },
    planning: {
      label: t.statuses.planning,
      bg: 'bg-gray-50 dark:bg-gray-900/20',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200 dark:border-gray-700',
      icon: statusIcons.planning
    }
  };

  const config = categoryConfig[project.category];
  const status = statusConfig[project.status];

  // ============================================
  // MODE FEATURED - Design Premium
  // ============================================
  if (viewMode === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-black shadow-2xl hover:shadow-3xl transition-all duration-500 h-full flex flex-col"
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ee5253] rounded-full shadow-lg">
              <FaStar className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-bold text-white tracking-wider">
                {language === 'mg' ? 'VOAVOATRA' : 
                 language === 'fr' ? 'PRIORITAIRE' : 
                 'FEATURED'}
              </span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {project.progress !== undefined && (
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full">
              <div className="relative w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`absolute h-full bg-linear-to-r ${config.progressColor} rounded-full`}
                />
              </div>
              <span className="text-xs font-bold text-white">{project.progress}%</span>
            </div>
          </div>
        )}

        <div className="relative h-80 overflow-hidden shrink-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent z-10" />

          {/* Image */}
          <img
            src={project.image}
            alt={project.title[language]}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
            {/* Category et Status */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-3 py-1.5 rounded-full ${config.bg} ${config.text} font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-lg`}>
                {config.featuredIcon} {config.label}
              </span>
              <span className={`px-2.5 py-1 rounded-full ${status.bg} ${status.text} border ${status.border} text-[10px] font-medium flex items-center gap-1 shadow-md`}>
                {status.icon} {status.label}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
              {project.title[language]}
            </h3>

            <p className="text-gray-200 mb-3 text-sm line-clamp-2">
              {project.excerpt[language]}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-gray-200">
              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5" />
                <span className="truncate max-w-24">{project.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaCalendarAlt className="w-3.5 h-3.5" />
                <span>{project.startDate}</span>
              </div>
            </div>

            <Link to={`/projects/${project.id}`}>
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ee5253] hover:bg-[#932020] text-white text-xs font-semibold rounded-lg hover:shadow-xl transition-all duration-300 group/btn"
              >
                <span>{t.cta}</span>
                <FaArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  // ============================================
  // MODE GRID - UNIQUEMENT (suppression du mode liste)
  // ============================================
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 h-full flex flex-col"
    >
      {/* Image Container - Hauteur fixe */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title[language]}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge - HAUT GAUCHE */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`px-2.5 py-1.5 rounded-lg ${config.bg} ${config.text} font-bold text-xs flex items-center gap-1.5 shadow-lg`}>
            {config.icon} {config.label}
          </span>
        </div>

        {/* Status Badge - SOUS CATEGORY */}
        <div className="absolute top-14 left-3 z-20">
          <span className={`px-2 py-1 rounded-lg ${status.bg} ${status.text} border ${status.border} text-[10px] font-medium flex items-center gap-1 shadow-md`}>
            {status.icon} {status.label}
          </span>
        </div>

        {/* Featured Badge - HAUT DROITE */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20">
            <div className="p-1.5 bg-linear-to-br from-[#ee5253] to-[#932020] rounded-full shadow-lg">
              <FaStar className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        )}

        {/* Progress Bar - BAS DROITE */}
        {project.progress !== undefined && (
          <div className="absolute bottom-3 right-3 z-20">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full">
              <div className="relative w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`absolute h-full bg-linear-to-r ${config.progressColor} rounded-full`}
                />
              </div>
              <span className="text-[10px] font-bold text-white">{project.progress}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Date et Location */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <FaCalendarAlt className="w-3.5 h-3.5" />
            <span>{project.startDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <FaMapMarkerAlt className="w-3.5 h-3.5" />
            <span className="truncate max-w-20">{project.location}</span>
          </div>
        </div>

        {/* Titre - Hauteur fixe 2 lignes */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 h-12 group-hover:text-[#ee5253] transition-colors">
          {project.title[language]}
        </h3>

        {/* Description - Hauteur fixe 2 lignes */}
        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 text-xs h-8">
          {project.excerpt[language]}
        </p>

        {/* Espace réservé pour alignement */}
        {project.progress === undefined && (
          <div className="h-8 mb-3"></div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <FaUsers className="w-3.5 h-3.5" />
            <span>{project.partners.length}</span>
          </div>

          <Link to={`/projects/${project.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-linear-to-r from-[#ee5253] to-[#932020] text-white text-xs font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1.5"
            >
              <span>{language === 'mg' ? 'Hijery' : language === 'fr' ? 'Voir' : 'View'}</span>
              <FaArrowRight className="w-2.5 h-2.5" />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#ee5253] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.article>
  );
};

export default ProjectCard;