import { motion } from 'framer-motion';
import { Calendar, MapPin, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Project, projectsData } from '../../data/projects';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
  index: number;
  viewMode?: 'grid' | 'list' | 'featured';
}

const ProjectCard = ({ project, index, viewMode = 'grid' }: ProjectCardProps) => {
  const { language } = useLanguage();
  const t = projectsData[language];

  const categoryConfig = {
    education: {
      label: t.categories.education,
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: '📚'
    },
    culture: {
      label: t.categories.culture,
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: '🎭'
    },
    social: {
      label: t.categories.social,
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: '🤝'
    },
    infrastructure: {
      label: t.categories.infrastructure,
      color: 'from-orange-500 to-amber-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: '🏗️'
    },
    heritage: {
      label: t.categories.heritage,
      color: 'from-rose-500 to-red-500',
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: '🏛️'
    },
    environment: {
      label: t.categories.environment,
      color: 'from-teal-500 to-green-500',
      bg: 'bg-teal-500/10',
      text: 'text-white',
      icon: '🌿'
    }
  };

  const statusConfig = {
    ongoing: {
      label: t.statuses.ongoing,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      text: 'text-blue-100',
      dot: 'bg-blue-400'
    },
    completed: {
      label: t.statuses.completed,
      color: 'bg-gradient-to-r from-emerald-500 to-green-500',
      text: 'text-emerald-100',
      dot: 'bg-emerald-400'
    },
    upcoming: {
      label: t.statuses.upcoming,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      text: 'text-purple-100',
      dot: 'bg-purple-400'
    },
    planning: {
      label: t.statuses.planning,
      color: 'bg-gradient-to-r from-gray-500 to-gray-700',
      text: 'text-gray-100',
      dot: 'bg-gray-400'
    }
  };

  const config = categoryConfig[project.category];
  const status = statusConfig[project.status];

  if (viewMode === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-black shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        {/* Progress Bar */}
        {project.progress && (
          <div className="absolute top-6 right-6 z-20">
            <div className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
              <div className="relative w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`absolute h-full ${config.color} rounded-full`}
                />
              </div>
              <span className="text-sm font-bold text-white">{project.progress}%</span>
            </div>
          </div>
        )}

        <div className="relative h-125 overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent z-10" />
          
          {/* Image */}
          <img
            src={project.image}
            alt={project.title[language]}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`px-4 py-2 rounded-full ${config.bg} ${config.text} font-bold text-sm tracking-wider`}>
                {config.icon} {config.label}
              </span>
              <span className={`px-3 py-1.5 rounded-full ${status.color} ${status.text} text-xs font-semibold`}>
                {status.label}
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
              {project.title[language]}
            </h3>

            <p className="text-gray-300 mb-6 text-lg line-clamp-2">
              {project.excerpt[language]}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.startDate}</span>
              </div>
              {project.budget && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{project.budget}</span>
                </div>
              )}
            </div>

            <Link to={`/projects/${project.id}`}>
              <motion.button
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-linear-to-r from-[#ee5253] to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#ee5253]/30 transition-all duration-300 group/btn"
              >
                <span className="tracking-wide">{t.cta}</span>
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  if (viewMode === 'list') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ x: 4 }}
        className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-2/5 relative overflow-hidden">
            <div className="relative h-64 md:h-full">
              <img
                src={project.image}
                alt={project.title[language]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className={`px-3 py-1.5 rounded-lg ${config.bg} ${config.text} font-bold text-xs`}>
                  {config.icon} {config.label}
                </span>
                <span className={`px-2 py-1 rounded ${status.color} ${status.text} text-xs font-medium`}>
                  {status.label}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:w-3/5 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{project.partners.length} {language === 'mg' ? 'mpiaraka' : language === 'fr' ? 'partenaires' : 'partners'}</span>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#ee5253] transition-colors">
              {project.title[language]}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
              {project.excerpt[language]}
            </p>

            {/* Progress */}
            {project.progress && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {language === 'mg' ? 'Fandrosoana' : language === 'fr' ? 'Progression' : 'Progress'}
                  </span>
                  <span className="text-sm font-bold" style={{ color: `var(--color-${project.status})` }}>
                    {project.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full rounded-full ${config.color}`}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Link to={`/projects/${project.id}`}>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-[#ee5253] font-semibold group/read"
                >
                  <span>
                    {language === 'mg' ? 'Hijery antsipiriany' : 
                     language === 'fr' ? 'Voir les détails' : 
                     'View details'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover/read:translate-x-2 transition-transform" />
                </motion.button>
              </Link>
              
              {project.featured && (
                <div className="flex items-center gap-1 px-3 py-1 bg-linear-to-r from-amber-500 to-orange-500 rounded-full">
                  <span className="text-xs font-bold text-white">
                    {language === 'mg' ? 'Voavoatra' : language === 'fr' ? 'Prioritaire' : 'Featured'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Default grid view
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300"
    >
      {/* Category & Status Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <span className={`px-3 py-1.5 rounded-lg ${config.bg} ${config.text} font-bold text-xs tracking-wide`}>
          {config.icon} {config.label}
        </span>
        <span className={`px-2 py-1 rounded ${status.color} ${status.text} text-xs font-medium`}>
          {status.label}
        </span>
      </div>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="p-2 bg-linear-to-br from-amber-500 to-orange-500 rounded-full shadow-lg">
            <span className="text-xs font-bold text-white">⭐</span>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title[language]}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{project.startDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="truncate max-w-25">{project.location}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#ee5253] transition-colors">
          {project.title[language]}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed text-sm">
          {project.excerpt[language]}
        </p>

        {/* Progress Bar */}
        {project.progress && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {language === 'mg' ? 'Fandrosoana' : language === 'fr' ? 'Progression' : 'Progress'}
              </span>
              <span className="text-xs font-bold" style={{ color: `var(--color-${project.status})` }}>
                {project.progress}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-full rounded-full ${config.color}`}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span>{project.partners.length}</span>
          </div>

          <Link to={`/projects/${project.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-linear-to-r from-[#ee5253] to-purple-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              {language === 'mg' ? 'Hijery' : language === 'fr' ? 'Voir' : 'View'}
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#ee5253] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.article>
  );
};

export default ProjectCard;