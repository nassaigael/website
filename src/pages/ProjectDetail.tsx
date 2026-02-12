import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/cards/ProjectCard';
import { projects, projectsData, getRelatedProjects } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChartLine,
  FaUsers,
  FaBullseye,
  FaCheckCircle,
  FaArrowLeft,
  FaChartBar,
  FaBuilding,
  FaExternalLinkAlt,
  FaChevronRight,
  FaStar,
  FaHandshake,
  FaUserTie,
  FaImage
} from 'react-icons/fa';
import { GiProgression, GiCheckMark, GiSandsOfTime, GiGearHammer, GiTheater, GiHandSaw, GiCrane, GiStoneTower, GiForest } from 'react-icons/gi';
import { IoMdSchool } from 'react-icons/io';
import { MdAgriculture, MdWaterDrop } from 'react-icons/md';
import type { JSX } from 'react/jsx-dev-runtime';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = projectsData[language];

  const project = projects.find(p => p.id === parseInt(id || '0'));
  const relatedProjects = project ? getRelatedProjects(project.id) : [];

  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'progress' | 'partners'>('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1e293b] px-4">
        <div className="text-center max-w-md">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl text-[#ee5253]/20 mb-6 font-bold"
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
            className="px-8 py-4 bg-[#ee5253] hover:bg-[#932020] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {language === 'mg' ? 'Hiverina amin\'ny lisitra' :
              language === 'fr' ? 'Retour à la liste' :
                'Back to list'}
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // CONFIGURATION COULEURS ROUGES UNIQUEMENT
  // ============================================
  const categoryConfig = {
    education: {
      label: t.categories.education,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: <IoMdSchool className="w-5 h-5" />,
      progressColor: 'from-[#ee5253] to-[#932020]',
      lightBg: 'bg-[#ee5253]/10',
      border: 'border-[#ee5253]/20'
    },
    culture: {
      label: t.categories.culture,
      bg: 'bg-[#932020]',
      text: 'text-white',
      icon: <GiTheater className="w-5 h-5" />,
      progressColor: 'from-[#932020] to-[#ee5253]',
      lightBg: 'bg-[#932020]/10',
      border: 'border-[#932020]/20'
    },
    social: {
      label: t.categories.social,
      bg: 'bg-[#e38282]',
      text: 'text-white',
      icon: <GiHandSaw className="w-5 h-5" />,
      progressColor: 'from-[#e38282] to-[#932020]',
      lightBg: 'bg-[#e38282]/10',
      border: 'border-[#e38282]/20'
    },
    infrastructure: {
      label: t.categories.infrastructure,
      bg: 'bg-[#932020]',
      text: 'text-white',
      icon: <GiCrane className="w-5 h-5" />,
      progressColor: 'from-[#932020] to-[#ee5253]',
      lightBg: 'bg-[#932020]/10',
      border: 'border-[#932020]/20'
    },
    heritage: {
      label: t.categories.heritage,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: <GiStoneTower className="w-5 h-5" />,
      progressColor: 'from-[#ee5253] to-[#932020]',
      lightBg: 'bg-[#ee5253]/10',
      border: 'border-[#ee5253]/20'
    },
    environment: {
      label: t.categories.environment,
      bg: 'bg-[#e38282]',
      text: 'text-white',
      icon: <GiForest className="w-5 h-5" />,
      progressColor: 'from-[#e38282] to-[#932020]',
      lightBg: 'bg-[#e38282]/10',
      border: 'border-[#e38282]/20'
    }
  };

  // CONFIGURATION STATUTS - UNIQUEMENT ROUGE/BLANC/NOIR
  const statusConfig = {
    ongoing: {
      label: t.statuses.ongoing,
      bg: 'bg-[#ee5253]/10',
      text: 'text-[#ee5253]',
      border: 'border-[#ee5253]/20',
      icon: <GiProgression className="w-4 h-4" />
    },
    completed: {
      label: t.statuses.completed,
      bg: 'bg-[#932020]/10',
      text: 'text-[#932020]',
      border: 'border-[#932020]/20',
      icon: <GiCheckMark className="w-4 h-4" />
    },
    upcoming: {
      label: t.statuses.upcoming,
      bg: 'bg-[#e38282]/10',
      text: 'text-[#e38282]',
      border: 'border-[#e38282]/20',
      icon: <GiSandsOfTime className="w-4 h-4" />
    },
    planning: {
      label: t.statuses.planning,
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-300 dark:border-gray-600',
      icon: <GiGearHammer className="w-4 h-4" />
    }
  };

  const config = categoryConfig[project.category];
  const status = statusConfig[project.status];

  // ============================================
  // LOGOS PARTENAIRES - UNIQUEMENT ROUGE
  // ============================================
  const getPartnerLogo = (partner: string) => {
    const logos: Record<string, { icon: JSX.Element; bg: string }> = {
      'Ministère de l\'Éducation': {
        icon: <FaBuilding />,
        bg: 'bg-[#ee5253]/10 text-[#ee5253]'
      },
      'UNICEF Madagascar': {
        icon: <FaUsers />,
        bg: 'bg-[#932020]/10 text-[#932020]'
      },
      'Entreprises Locales': {
        icon: <FaBuilding />,
        bg: 'bg-[#e38282]/10 text-[#e38282]'
      },
      'Ministère de la Culture': {
        icon: <GiTheater />,
        bg: 'bg-[#ee5253]/10 text-[#ee5253]'
      },
      'Université d\'Antananarivo': {
        icon: <IoMdSchool />,
        bg: 'bg-[#932020]/10 text-[#932020]'
      },
      'MadaCulture': {
        icon: <GiStoneTower />,
        bg: 'bg-[#e38282]/10 text-[#e38282]'
      },
      'Ministère de l\'Eau': {
        icon: <MdWaterDrop />,
        bg: 'bg-[#ee5253]/10 text-[#ee5253]'
      },
      'Croix-Rouge Malagasy': {
        icon: <FaHandshake />,
        bg: 'bg-[#932020]/10 text-[#932020]'
      },
      'Ministère de la Jeunesse': {
        icon: <FaUsers />,
        bg: 'bg-[#e38282]/10 text-[#e38282]'
      },
      'PNUD': {
        icon: <FaExternalLinkAlt />,
        bg: 'bg-[#ee5253]/10 text-[#ee5253]'
      },
      'Ministère de l\'Agriculture': {
        icon: <MdAgriculture />,
        bg: 'bg-[#932020]/10 text-[#932020]'
      },
      'FAO': {
        icon: <FaUsers />,
        bg: 'bg-[#e38282]/10 text-[#e38282]'
      },
      'Organisations Paysannes': {
        icon: <GiHandSaw />,
        bg: 'bg-[#ee5253]/10 text-[#ee5253]'
      },
      'Ministère de l\'Environnement': {
        icon: <GiForest />,
        bg: 'bg-[#932020]/10 text-[#932020]'
      },
      'WWF': {
        icon: <FaStar />,
        bg: 'bg-[#e38282]/10 text-[#e38282]'
      },
      'Communautés Locales': {
        icon: <FaUsers />,
        bg: 'bg-[#ee5253]/10 text-[#ee5253]'
      }
    };

    return logos[partner] || {
      icon: <FaBuilding />,
      bg: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    };
  };

  const tabs = [
    { id: 'overview', icon: FaChartBar, label: { mg: 'Famintinana', fr: 'Aperçu', en: 'Overview' } },
    { id: 'objectives', icon: FaBullseye, label: { mg: 'Tanjona', fr: 'Objectifs', en: 'Objectives' } },
    { id: 'progress', icon: FaChartLine, label: { mg: 'Fandrosoana', fr: 'Progression', en: 'Progress' } },
    { id: 'partners', icon: FaUsers, label: { mg: 'Mpiara-miasa', fr: 'Partenaires', en: 'Partners' } }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-[#1e293b] pt-20 md:pt-24 pb-16 md:pb-20"
    >
      {/* MODAL GALERIE */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh]"
            >
              <img
                src={selectedImage}
                alt=""
                className="max-w-full max-h-[90vh] object-contain rounded-2xl"
              />
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-[#ee5253] text-white rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <FaArrowLeft className="w-5 h-5 rotate-45" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BOUTON RETOUR */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/projects')}
          className="flex items-center gap-3 mb-8 group"
        >
          <div className="p-2 bg-[#ee5253]/10 rounded-lg group-hover:bg-[#ee5253]/20 transition-all duration-300">
            <FaArrowLeft className="w-4 h-4 text-[#ee5253] group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#ee5253] transition-colors">
            {language === 'mg' ? 'Hiverina amin\'ny tetikasa' :
              language === 'fr' ? 'Retour aux projets' :
                'Back to projects'}
          </span>
        </motion.button>

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* BADGES */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-4 py-2.5 rounded-full ${config.bg} ${config.text} font-bold text-sm tracking-wider flex items-center gap-2 shadow-lg`}>
              {config.icon} {config.label}
            </span>
            <span className={`px-3 py-1.5 rounded-full ${status.bg} ${status.text} border ${status.border} font-semibold text-sm flex items-center gap-1.5 shadow-md`}>
              {status.icon} {status.label}
            </span>
            {project.featured && (
              <span className="px-3 py-1.5 bg-linear-to-r from-[#ee5253] to-[#932020] text-white font-semibold text-sm rounded-full flex items-center gap-1.5 shadow-lg">
                <FaStar className="w-3.5 h-3.5" />
                {language === 'mg' ? 'Voavoatra' : language === 'fr' ? 'Prioritaire' : 'Featured'}
              </span>
            )}
          </div>

          {/* TITRE */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {project.title[language]}
          </h1>

          {/* EXTRAIT */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 border-l-4 border-[#ee5253] pl-6 italic">
            {project.excerpt[language]}
          </p>

          {/* STATISTIQUES RAPIDES */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaCalendarAlt className="w-4 h-4 text-[#ee5253]" />
                <span className="text-xs md:text-sm font-medium">
                  {language === 'mg' ? 'Daty' : language === 'fr' ? 'Date' : 'Date'}
                </span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{project.startDate}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4 text-[#ee5253]" />
                <span className="text-xs md:text-sm font-medium">
                  {language === 'mg' ? 'Toerana' : language === 'fr' ? 'Localisation' : 'Location'}
                </span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{project.location}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaUserTie className="w-4 h-4 text-[#ee5253]" />
                <span className="text-xs md:text-sm font-medium">
                  {language === 'mg' ? 'Mpikarakara' : language === 'fr' ? 'Responsable' : 'Manager'}
                </span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base truncate">{project.contactPerson}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaUsers className="w-4 h-4 text-[#ee5253]" />
                <span className="text-xs md:text-sm font-medium">
                  {language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaires' : 'Partners'}
                </span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{project.partners.length}</p>
            </div>
          </div>
        </motion.header>

        {/* IMAGE PRINCIPALE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-2xl group">
            <div className="relative h-100 md:h-125 overflow-hidden">
              <img
                src={project.image}
                alt={project.title[language]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* PROGRESS OVERLAY - MÊME DESIGN SUR PC ET MOBILE */}
            {typeof project.progress === 'number' && (
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/95 via-black/85 to-transparent p-4 md:p-6">
                <div className="max-w-3xl mx-auto">
                  {/* Header avec pourcentage */}
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 md:p-2 bg-[#ee5253]/20 rounded-lg backdrop-blur-sm">
                        <FaChartLine className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#ee5253]" />
                      </div>
                      <span className="text-white/90 font-medium text-xs md:text-sm tracking-wide">
                        {language === 'mg' ? 'Fandrosoana' :
                          language === 'fr' ? 'Progression' :
                            'Progress'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-bold text-sm md:text-base bg-linear-to-r from-[#ee5253] to-[#932020] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg">
                        {project.progress}%
                      </span>
                    </div>
                  </div>

                  {/* Barre de progression */}
                  <div className="relative">
                    <div className="w-full h-2 md:h-2.5 bg-gray-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={`h-full rounded-full bg-linear-to-r ${config.progressColor} relative`}
                      >
                        {/* Effet de brillance */}
                        <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent w-1/3 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* TABS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as never)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-linear-to-r from-[#ee5253] to-[#932020] text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm md:text-base">{tab.label[language]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* CONTENU DES TABS */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          {/* ===== OVERVIEW ===== */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* DESCRIPTION */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center lg:justify-between justify-center gap-3 mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {language === 'mg' ? 'Fampidirana' : language === 'fr' ? 'Description' : 'Description'}
                  </h3>
                </div>
                <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                  {project.description[language].map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-4 border-l-4 border-[#ee5253] hover:border-l-8 transition-all duration-300"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>

              {/* GALERIE */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {language === 'mg' ? 'Sary' : language === 'fr' ? 'Galerie' : 'Gallery'}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {project.gallery.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8 }}
                        onClick={() => setSelectedImage(img)}
                        className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <span className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                              <FaImage className="w-4 h-4 inline mr-2" />
                              {language === 'mg' ? 'Hijery' : language === 'fr' ? 'Voir' : 'View'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== OBJECTIFS ===== */}
          {activeTab === 'objectives' && (
            <div className="space-y-12">
              {/* OBJECTIFS */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {language === 'mg' ? 'Tanjona' : language === 'fr' ? 'Objectifs' : 'Objectives'}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {project.objectives[language].map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="group relative p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-linear-to-br from-[#ee5253] to-[#932020] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className={`p-3 ${config.lightBg} rounded-xl`}>
                          <FaBullseye className={`w-6 h-6 text-[#ee5253]`} />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-base font-medium pr-12">
                          {objective}
                        </p>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#ee5253] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RÉALISATIONS */}
              {project.achievements && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {language === 'mg' ? 'Zava-bita' : language === 'fr' ? 'Réalisations' : 'Achievements'}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {project.achievements[language].map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="flex items-start gap-4 p-5 bg-linear-to-br from-[#e38282]/10 to-white dark:from-[#932020]/20 dark:to-gray-900 rounded-xl border border-[#e38282]/30 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="p-2.5 bg-[#ee5253]/20 rounded-lg">
                          <FaCheckCircle className="w-5 h-5 text-[#ee5253]" />
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 flex-1">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== PROGRESSION ===== */}
          {activeTab === 'progress' && (
            <div className="space-y-12">
              {/* DATES CLÉS */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {language === 'mg' ? 'Daty Manan-danja' : language === 'fr' ? 'Dates Importantes' : 'Key Dates'}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-5 p-5 bg-linear-to-r from-white to-[#ee5253]/5 dark:from-gray-900 dark:to-[#932020]/10 rounded-xl border border-[#ee5253]/20 shadow-md"
                  >
                    <div className="p-3 bg-[#ee5253]/20 rounded-xl">
                      <FaCalendarAlt className="w-6 h-6 text-[#ee5253]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-lg">
                        {language === 'mg' ? 'Daty nanombohana' : language === 'fr' ? 'Date de début' : 'Start date'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">{project.startDate}</p>
                    </div>
                  </motion.div>

                  {project.endDate && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-5 p-5 bg-linear-to-r from-white to-[#932020]/5 dark:from-gray-900 dark:to-[#e38282]/10 rounded-xl border border-[#932020]/20 shadow-md"
                    >
                      <div className="p-3 bg-[#932020]/20 rounded-xl">
                        <FaCheckCircle className="w-6 h-6 text-[#932020]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white text-lg">
                          {language === 'mg' ? 'Daty farany' : language === 'fr' ? 'Date de fin' : 'End date'}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{project.endDate}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* STATISTIQUES DE PROGRESSION */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {language === 'mg' ? 'Fampitana ny Fandrosoana' : language === 'fr' ? 'Détails de Progression' : 'Progress Details'}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* PARTENAIRES */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-linear-to-br from-white to-[#ee5253]/5 dark:from-gray-900 dark:to-[#932020]/10 rounded-2xl border border-[#ee5253]/20 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-[#ee5253]/20 rounded-xl">
                        <FaUsers className="w-6 h-6 text-[#ee5253]" />
                      </div>
                      <div className="text-3xl font-bold text-[#ee5253]">
                        {project.partners.length}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                      {language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaires' : 'Partners'}
                    </p>
                  </motion.div>

                  {/* PROGRESSION */}
                  {typeof project.progress === 'number' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="p-6 bg-linear-to-br from-white to-[#932020]/5 dark:from-gray-900 dark:to-[#ee5253]/10 rounded-2xl border border-[#932020]/20 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#932020]/20 rounded-xl">
                          <FaChartLine className="w-6 h-6 text-[#932020]" />
                        </div>
                        <div className="text-3xl font-bold text-[#932020]">
                          {project.progress}%
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                        {language === 'mg' ? 'Fandrosoana' : language === 'fr' ? 'Progression' : 'Progress'}
                      </p>
                    </motion.div>
                  )}

                  {/* STATUT */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 bg-linear-to-br from-white to-[#e38282]/5 dark:from-gray-900 dark:to-[#e38282]/10 rounded-2xl border border-[#e38282]/20 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 ${status.bg} rounded-xl`}>
                        <div className={`w-6 h-6 ${status.text}`}>
                          {status.icon}
                        </div>
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {status.label}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {status.label}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {/* ===== PARTENAIRES ===== */}
          {activeTab === 'partners' && (
            <div className="space-y-12">
              {/* GRILLE PARTENAIRES */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaires' : 'Partners'}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {project.partners.map((partner, index) => {
                    const logo = getPartnerLogo(partner);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="group relative p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`p-4 rounded-2xl ${logo.bg} mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center w-20 h-20`}>
                            <div className="text-3xl">
                              {logo.icon}
                            </div>
                          </div>

                          <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                            {partner}
                          </h4>

                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-[#ee5253]/10 to-[#932020]/10 rounded-full mt-2">
                            <FaHandshake className="w-3 h-3 text-[#ee5253]" />
                            <span className="text-xs font-medium text-[#ee5253]">
                              {language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaire' : 'Partner'}
                            </span>
                          </div>
                        </div>

                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ee5253]/20 rounded-2xl transition-all duration-300 pointer-events-none" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* PROJETS SIMILAIRES */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {language === 'mg' ? 'Tetikasa Mifandraika' :
                      language === 'fr' ? 'Projets Similaires' :
                        'Related Projects'}
                  </h2>
                </div>
              </div>

              <Link to="/projects">
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 text-[#ee5253] font-semibold rounded-xl border border-[#ee5253]/30 hover:border-[#ee5253] shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <span className="text-sm md:text-base">
                    {language === 'mg' ? 'Hijery ny rehetra' :
                      language === 'fr' ? 'Voir tout' :
                        'View all'}
                  </span>
                  <FaChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {relatedProjects.map((relatedProject, index) => (
                <ProjectCard
                  key={relatedProject.id}
                  project={relatedProject}
                  index={index}
                  viewMode="grid"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* BOUTON RETOUR */}
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-[#ee5253] to-[#932020] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>
              {language === 'mg' ? 'Hiverina amin\'ny tetikasa rehetra' :
                language === 'fr' ? 'Retour à tous les projets' :
                  'Back to all projects'}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;