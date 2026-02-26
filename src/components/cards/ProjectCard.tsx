import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData, type Project } from '../../data/projects';
import { useLanguage } from '../../contexts/LanguageContext';
import { getCategoryConfig, getStatusConfig, getFeaturedText, cardClasses, animations, type ViewMode } from '../../config/projectCardConfig';

// Import des icônes
import {
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaStar
} from 'react-icons/fa';

interface ProjectCardProps {
  project: Project;
  index: number;
  viewMode?: ViewMode;
}

const ProjectCard = ({ project, index, viewMode = 'grid' }: ProjectCardProps) => {
  const { language } = useLanguage();
  
  // Récupérer les configurations
  const categoryConfig = getCategoryConfig(language);
  const statusConfig = getStatusConfig(language);
  
  const config = categoryConfig[project.category];
  const status = statusConfig[project.status];
  const featuredText = getFeaturedText(language);

  // MODE FEATURED
  if (viewMode === 'featured') {
    return (
      <motion.article
        {...animations.featured}
        transition={{ ...animations.featured.transition, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-black shadow-2xl hover:shadow-3xl transition-all duration-500 h-full flex flex-col"
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ee5253] rounded-full shadow-lg">
              <FaStar className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-bold text-white tracking-wider">
                {featuredText}
              </span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {project.progress !== undefined && (
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray- backdrop-blur-sm rounded-full">
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
                <span className="truncate max-w-24 text-white">{project.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaCalendarAlt className="w-3.5 h-3.5" />
                <span className="text-white">{project.startDate}</span>
              </div>
            </div>

            <Link to={`/projects/${project.id}`}>
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ee5253] hover:bg-[#932020] text-white text-xs font-semibold rounded-lg hover:shadow-xl transition-all duration-300 group/btn"
              >
                <span>{projectsData[language].cta}</span>
                <FaArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  // MODE GRID
  return (
    <motion.article
      {...animations.grid}
      transition={{ ...animations.grid.transition, delay: index * 0.1 }}
      className={cardClasses.container}
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1.5 rounded-lg ${config.bg} ${config.text} font-bold text-xs tracking-wide`}>
          <span className="flex items-center gap-1.5">
            {config.icon} {config.label}
          </span>
        </span>
      </div>

      {/* Status Badge */}
      <div className="absolute top-16 left-4 z-10">
        <span className={`px-2.5 py-1 rounded-lg ${status.bg} ${status.text} border ${status.border} text-[10px] font-medium flex items-center gap-1 shadow-md`}>
          {status.icon} {status.label}
        </span>
      </div>

      {/* Featured Star */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="p-2 bg-[#ee5253] rounded-full shadow-lg">
            <FaStar className="w-4 h-4 text-white" fill="white" />
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {project.progress !== undefined && (
        <div className="absolute bottom-20 right-4 z-10">
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

      {/* Image Container */}
      <div className={cardClasses.imageContainer}>
        <img
          src={project.image}
          alt={project.title[language]}
          className={cardClasses.image}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className={cardClasses.content}>
        {/* Date et Location */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FaCalendarAlt className="w-4 h-4" />
            <span>{project.startDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span className="truncate max-w-20">{project.location}</span>
          </div>
        </div>

        {/* Titre */}
        <h3 className={cardClasses.title}>
          {project.title[language]}
        </h3>

        {/* Description */}
        <p className={cardClasses.description}>
          {project.excerpt[language]}
        </p>

        {/* Footer */}
        <div className={cardClasses.footer}>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FaUsers className="w-4 h-4" />
            <span>{project.partners.length}</span>
          </div>

          <Link to={`/projects/${project.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cardClasses.button}
            >
              {language === 'mg' ? 'Hamaky' : language === 'fr' ? 'Lire' : 'Read'}
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className={cardClasses.hoverLine} />
    </motion.article>
  );
};

export default ProjectCard;