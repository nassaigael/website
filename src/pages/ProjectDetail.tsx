import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  ArrowLeft,
  DollarSign,
  BarChart3,
  Building,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { projects, projectsData, getRelatedProjects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import ProjectCard from '../components/cards/ProjectCard';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = projectsData[language];

  const project = projects.find(p => p.id === parseInt(id || '0'));
  const relatedProjects = project ? getRelatedProjects(project.id) : [];

  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'progress' | 'partners'>('overview');

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl text-emerald-500/20 mb-6"
          >
            404
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'mg' ? 'Tsy hita ny tetikasa' :
              language === 'fr' ? 'Projet non trouvé' :
                'Project not found'}
          </h1>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            {language === 'mg' ? 'Hiverina amin\'ny lisitra' :
              language === 'fr' ? 'Retour à la liste' :
                'Back to list'}
          </button>
        </div>
      </div>
    );
  }

  const categoryConfig = {
    education: { color: 'from-blue-500 to-cyan-500', icon: '📚' },
    culture: { color: 'from-purple-500 to-pink-500', icon: '🎭' },
    social: { color: 'from-green-500 to-emerald-500', icon: '🤝' },
    infrastructure: { color: 'from-orange-500 to-amber-500', icon: '🏗️' },
    heritage: { color: 'from-rose-500 to-red-500', icon: '🏛️' },
    environment: { color: 'from-teal-500 to-green-500', icon: '🌿' }
  };

  const statusConfig = {
    ongoing: {
      label: t.statuses.ongoing,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      text: 'text-blue-100'
    },
    completed: {
      label: t.statuses.completed,
      color: 'bg-gradient-to-r from-emerald-500 to-green-500',
      text: 'text-emerald-100'
    },
    upcoming: {
      label: t.statuses.upcoming,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      text: 'text-purple-100'
    },
    planning: {
      label: t.statuses.planning,
      color: 'bg-gradient-to-r from-gray-500 to-gray-700',
      text: 'text-gray-100'
    }
  };

  const config = categoryConfig[project.category];
  const status = statusConfig[project.status];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 pt-24 pb-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/projects')}
          className="flex items-center gap-3 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-emerald-500 transition-colors" />
          <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-500 transition-colors">
            {language === 'mg' ? 'Hiverina amin\'ny tetikasa' :
              language === 'fr' ? 'Retour aux projets' :
                'Back to projects'}
          </span>
        </motion.button>

        {/* Project Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className={`px-4 py-2 rounded-full bg-linear-to-r ${config.color} text-white font-bold text-sm tracking-wider`}>
              {config.icon} {t.categories[project.category]}
            </span>
            <span className={`px-3 py-1.5 rounded-full ${status.color} ${status.text} font-semibold text-sm`}>
              {status.label}
            </span>

            {project.featured && (
              <span className="px-3 py-1.5 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm rounded-full">
                ⭐ {language === 'mg' ? 'Voavoatra' : language === 'fr' ? 'Prioritaire' : 'Featured'}
              </span>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            {project.title[language]}
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            {project.excerpt[language]}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{language === 'mg' ? 'Daty nanombohana' : language === 'fr' ? 'Date de début' : 'Start date'}</span>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">{project.startDate}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{language === 'mg' ? 'Toerana' : language === 'fr' ? 'Localisation' : 'Location'}</span>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">{project.location}</p>
            </div>

            {project.budget && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">{language === 'mg' ? 'Tetibola' : language === 'fr' ? 'Budget' : 'Budget'}</span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{project.budget}</p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">{language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaires' : 'Partners'}</span>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">{project.partners.length}</p>
            </div>
          </div>
        </motion.header>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-2xl">
            <img
              src={project.image}
              alt={project.title[language]}
              className="w-full h-100 sm:h-125 object-cover"
            />

            {/* Progress Overlay */}
            {project.progress && (
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
                <div className="max-w-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">
                      {language === 'mg' ? 'Fandrosoana' : language === 'fr' ? 'Progression' : 'Progress'}
                    </span>
                    <span className="text-white font-bold text-xl">{project.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.5 }}
                      className={`h-full rounded-full ${config.color}`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800">
            {[
              { id: 'overview', icon: BarChart3, label: { mg: 'Famintinana', fr: 'Aperçu', en: 'Overview' } },
              { id: 'objectives', icon: Target, label: { mg: 'Tanjona', fr: 'Objectifs', en: 'Objectives' } },
              { id: 'progress', icon: TrendingUp, label: { mg: 'Fandrosoana', fr: 'Progression', en: 'Progress' } },
              { id: 'partners', icon: Users, label: { mg: 'Mpiara-miasa', fr: 'Partenaires', en: 'Partners' } }
            ].map((tab) => (
              <button
                key={tab.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label[language]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          {activeTab === 'overview' && (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 space-y-6 text-lg leading-relaxed">
                {project.description[language].map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {language === 'mg' ? 'Sary' : language === 'fr' ? 'Galerie' : 'Gallery'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((img, index) => (
                      <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                        <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-64 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'objectives' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-emerald-500" />
                  {language === 'mg' ? 'Tanjona' : language === 'fr' ? 'Objectifs' : 'Objectives'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.objectives[language].map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Target className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{objective}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {project.achievements && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    {language === 'mg' ? 'Zava-bita' : language === 'fr' ? 'Réalisations' : 'Achievements'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.achievements[language].map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                      >
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-8">
              {/* Timeline */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'mg' ? 'Daty manan-danja' : language === 'fr' ? 'Dates importantes' : 'Key Dates'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {language === 'mg' ? 'Daty nanombohana' : language === 'fr' ? 'Date de début' : 'Start date'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">{project.startDate}</p>
                    </div>
                  </div>

                  {project.endDate && (
                    <div className="flex items-center gap-4 p-4 bg-linear-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {language === 'mg' ? 'Daty farany' : language === 'fr' ? 'Date de fin' : 'End date'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{project.endDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Details */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'mg' ? 'Fampitana' : language === 'fr' ? 'Détails' : 'Details'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-linear-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl border border-blue-500/20">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {project.partners.length}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaires' : 'Partners'}
                    </p>
                  </div>

                  <div className="p-6 bg-linear-to-br from-emerald-500/5 to-green-500/5 rounded-2xl border border-emerald-500/20">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {project.progress || 0}%
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {language === 'mg' ? 'Fandrosoana' : language === 'fr' ? 'Progression' : 'Progress'}
                    </p>
                  </div>

                  <div className="p-6 bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-2xl border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {project.status === 'completed' ? '100%' :
                        project.status === 'ongoing' ? `${project.progress || 0}%` : '0%'}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {status.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'partners' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaires' : 'Partners'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.partners.map((partner, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 text-center"
                    >
                      <div className="p-3 bg-emerald-500/10 rounded-full inline-flex mb-4">
                        <Building className="w-8 h-8 text-emerald-500" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{partner}</h4>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="p-8 bg-linear-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-500/20">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {language === 'mg' ? 'Fifandraisana' : language === 'fr' ? 'Contact' : 'Contact'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-emerald-500" />
                    <span className="text-gray-700 dark:text-gray-300">{project.contactPerson}</span>
                  </div>
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>{language === 'mg' ? 'Vakio bebe kokoa' : language === 'fr' ? 'En savoir plus' : 'Learn more'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'mg' ? 'Tetikasa mifandraika' :
                    language === 'fr' ? 'Projets similaires' :
                      'Related projects'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'mg' ? 'Mijery ireo tetikasa hafa mety ho liana aminao' :
                    language === 'fr' ? 'Découvrez d\'autres projets qui pourraient vous intéresser' :
                      'Discover other projects you might be interested in'}
                </p>
              </div>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/projects')}
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold group"
              >
                <span>
                  {language === 'mg' ? 'Hijery ny rehetra' :
                    language === 'fr' ? 'Voir tout' :
                      'View all'}
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <ProjectCard
                  key={relatedProject.id}
                  project={relatedProject}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Projects Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/projects')}
            className="px-10 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {language === 'mg' ? 'Hiverina amin\'ny tetikasa rehetra' :
              language === 'fr' ? 'Retour à tous les projets' :
                'Back to all projects'}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;