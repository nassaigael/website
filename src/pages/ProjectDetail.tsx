// pages/ProjectDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
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
  FaImage,
  FaShare,
  FaCopy,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
} from 'react-icons/fa';
import { GiProgression, GiCheckMark, GiSandsOfTime, GiGearHammer, GiTheater, GiHandSaw, GiCrane, GiStoneTower, GiForest } from 'react-icons/gi';
import { IoMdSchool } from 'react-icons/io';
import { MdAgriculture, MdWaterDrop } from 'react-icons/md';
import { HiOutlineSparkles } from 'react-icons/hi';
import { FiShare2 } from 'react-icons/fi';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = projectsData[language];

  const project = projects.find(p => p.id === parseInt(id || '0'));
  const relatedProjects = project ? getRelatedProjects(project.id) : [];

  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'progress' | 'partners'>('overview');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
        setReadProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareProject = (platform: string) => {
    const url = window.location.href;
    const title = project?.title[language] || '';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email': {
        const mailtoLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Découvrez ce projet: ${url}`)}`;
        window.open(mailtoLink, '_blank');
        break;
      }
      case 'copy':
        navigator.clipboard.writeText(url);
        setShowCopyAlert(true);
        setTimeout(() => setShowCopyAlert(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1e293b] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl text-[#ee5253]/10 dark:text-[#ee5253]/20 mb-6 font-bold"
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

  // Configuration des couleurs pour le mode light
  const categoryConfig = {
    education: {
      label: t.categories.education,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: <IoMdSchool className="w-5 h-5" />,
      progressColor: 'bg-[#ee5253]',
      lightBg: 'bg-[#ee5253]/10',
      lightText: 'text-[#ee5253]',
      border: 'border-[#ee5253]/20',
      gradient: 'from-blue-500 to-cyan-500'
    },
    culture: {
      label: t.categories.culture,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: <GiTheater className="w-5 h-5" />,
      progressColor: 'bg-[#ee5253]',
      lightBg: 'bg-[#ee5253]/10',
      lightText: 'text-[#ee5253]',
      border: 'border-[#ee5253]/20',
      gradient: 'from-purple-500 to-pink-500'
    },
    social: {
      label: t.categories.social,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: <GiHandSaw className="w-5 h-5" />,
      progressColor: 'bg-[#ee5253]',
      lightBg: 'bg-[#ee5253]/10',
      lightText: 'text-[#ee5253]',
      border: 'border-[#ee5253]/20',
      gradient: 'from-emerald-500 to-green-500'
    },
    infrastructure: {
      label: t.categories.infrastructure,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: <GiCrane className="w-5 h-5" />,
      progressColor: 'bg-[#ee5253]',
      lightBg: 'bg-[#ee5253]/10',
      lightText: 'text-[#ee5253]',
      border: 'border-[#ee5253]/20',
      gradient: 'from-amber-500 to-orange-500'
    },
    heritage: {
      label: t.categories.heritage,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: <GiStoneTower className="w-5 h-5" />,
      progressColor: 'bg-[#ee5253]',
      lightBg: 'bg-[#ee5253]/10',
      lightText: 'text-[#ee5253]',
      border: 'border-[#ee5253]/20',
      gradient: 'from-rose-500 to-red-500'
    },
    environment: {
      label: t.categories.environment,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      icon: <GiForest className="w-5 h-5" />,
      progressColor: 'bg-[#ee5253]',
      lightBg: 'bg-[#ee5253]/10',
      lightText: 'text-[#ee5253]',
      border: 'border-[#ee5253]/20',
      gradient: 'from-teal-500 to-emerald-500'
    }
  };

  const statusConfig = {
    ongoing: {
      label: t.statuses.ongoing,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      border: 'border-white',
      icon: <GiProgression className="w-4 h-4" />,
      lightBg: 'bg-emerald-500/10',
      lightText: 'text-emerald-600'
    },
    completed: {
      label: t.statuses.completed,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      border: 'border-white',
      icon: <GiCheckMark className="w-4 h-4" />,
      lightBg: 'bg-blue-500/10',
      lightText: 'text-blue-600'
    },
    upcoming: {
      label: t.statuses.upcoming,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      border: 'border-white',
      icon: <GiSandsOfTime className="w-4 h-4" />,
      lightBg: 'bg-amber-500/10',
      lightText: 'text-amber-600'
    },
    planning: {
      label: t.statuses.planning,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      border: 'border-white',
      icon: <GiGearHammer className="w-4 h-4" />,
      lightBg: 'bg-purple-500/10',
      lightText: 'text-purple-600'
    }
  };

  const config = categoryConfig[project.category];
  const status = statusConfig[project.status];

  // LOGOS PARTENAIRES
  const getPartnerLogo = (partner: string) => {
    const logos: Record<string, { icon: JSX.Element; bg: string }> = {
      'Ministère de l\'Éducation': {
        icon: <FaBuilding />,
        bg: 'bg-blue-500/10 text-blue-600'
      },
      'UNICEF Madagascar': {
        icon: <FaUsers />,
        bg: 'bg-cyan-500/10 text-cyan-600'
      },
      'Entreprises Locales': {
        icon: <FaBuilding />,
        bg: 'bg-emerald-500/10 text-emerald-600'
      },
      'Ministère de la Culture': {
        icon: <GiTheater />,
        bg: 'bg-purple-500/10 text-purple-600'
      },
      'Université d\'Antananarivo': {
        icon: <IoMdSchool />,
        bg: 'bg-amber-500/10 text-amber-600'
      },
      'MadaCulture': {
        icon: <GiStoneTower />,
        bg: 'bg-rose-500/10 text-rose-600'
      },
      'Ministère de l\'Eau': {
        icon: <MdWaterDrop />,
        bg: 'bg-sky-500/10 text-sky-600'
      },
      'Croix-Rouge Malagasy': {
        icon: <FaHandshake />,
        bg: 'bg-red-500/10 text-red-600'
      },
      'Ministère de la Jeunesse': {
        icon: <FaUsers />,
        bg: 'bg-green-500/10 text-green-600'
      },
      'PNUD': {
        icon: <FaExternalLinkAlt />,
        bg: 'bg-indigo-500/10 text-indigo-600'
      },
      'Ministère de l\'Agriculture': {
        icon: <MdAgriculture />,
        bg: 'bg-lime-500/10 text-lime-600'
      },
      'FAO': {
        icon: <FaUsers />,
        bg: 'bg-orange-500/10 text-orange-600'
      },
      'Organisations Paysannes': {
        icon: <GiHandSaw />,
        bg: 'bg-yellow-500/10 text-yellow-600'
      },
      'Ministère de l\'Environnement': {
        icon: <GiForest />,
        bg: 'bg-teal-500/10 text-teal-600'
      },
      'WWF': {
        icon: <FaStar />,
        bg: 'bg-emerald-500/10 text-emerald-600'
      },
      'Communautés Locales': {
        icon: <FaUsers />,
        bg: 'bg-violet-500/10 text-violet-600'
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

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-[#1e293b] pb-16 md:pb-20 relative overflow-hidden pt-8"
    >
      {/* Éléments décoratifs d'arrière-plan - Version Light premium */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-[#ee5253]/5 dark:bg-[#ee5253]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#932020]/5 dark:bg-[#932020]/5 rounded-full blur-3xl"
        />
        
        {/* Grille subtile premium */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,82,83,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(147,32,32,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />
        
        {/* Éléments géométriques décoratifs */}
        <div className="absolute top-40 right-40 w-32 h-32 border border-[#ee5253]/10 rounded-full" />
        <div className="absolute bottom-40 left-40 w-48 h-48 border border-[#932020]/10 rotate-45" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 border border-[#ee5253]/5 rounded-full" />
      </div>

      {/* Lignes décoratives */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#ee5253]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#932020]/30 to-transparent" />

      {/* Reading Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${readProgress}%` }}
        className="fixed top-0 left-0 h-1 bg-[#ee5253] z-50"
      />

      {/* Copy Alert */}
      <AnimatePresence>
        {showCopyAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="bg-[#ee5253] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaCopy className="w-5 h-5" />
              </motion.div>
              <span className="font-semibold">
                {language === 'mg' ? 'Ny rohy nohoraofina' :
                  language === 'fr' ? 'Lien copié' :
                    'Link copied'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                onLoad={() => setIsImageLoading(false)}
              />
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-[#ee5253]/30 border-t-[#ee5253] rounded-full animate-spin" />
                </div>
              )}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* BOUTON RETOUR ET SHARE - Version Light premium */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/projects')}
            className="flex items-center gap-3 group"
          >
            <div className="p-2 bg-gray-100 dark:bg-[#ee5253]/10 rounded-lg group-hover:bg-[#ee5253]/20 dark:group-hover:bg-[#ee5253]/20 transition-all duration-300">
              <FaArrowLeft className="w-4 h-4 text-gray-700 dark:text-[#ee5253] group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#ee5253] transition-colors">
              {language === 'mg' ? 'Hiverina' :
                language === 'fr' ? 'Retour' :
                  'Back'}
            </span>
          </motion.button>

          {/* Share Button */}
          <div className="relative">
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-3 bg-gray-100 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#ee5253] hover:bg-gray-50 dark:hover:bg-[#1a1f2e] transition-all flex items-center gap-2"
            >
              <FiShare2 className="w-5 h-5 text-gray-700 dark:text-[#ee5253]" />
            </motion.button>

            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-[#0f172a] rounded-xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {language === 'mg' ? 'Zarao' : language === 'fr' ? 'Partager' : 'Share'}
                    </p>
                  </div>
                  <div className="p-2">
                    {[
                      { icon: FaFacebookF, platform: 'facebook', label: 'Facebook' },
                      { icon: FaTwitter, platform: 'twitter', label: 'Twitter' },
                      { icon: FaLinkedinIn, platform: 'linkedin', label: 'LinkedIn' },
                      { icon: FaEnvelope, platform: 'email', label: 'Email' },
                      { icon: FaCopy, platform: 'copy', label: 'Copier le lien' }
                    ].map((item, index) => (
                      <motion.button
                        key={item.platform}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => shareProject(item.platform)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-[#ee5253]/10 text-gray-700 dark:text-gray-300 hover:text-[#ee5253] transition-colors text-sm"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* HEADER */}
        <motion.header
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          {/* BADGES - Version Light améliorée */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-4 py-2.5 rounded-full ${config.bg} ${config.text} font-bold text-sm tracking-wider flex items-center gap-2 shadow-lg`}>
              {config.icon} {config.label}
            </span>
            <span className={`px-3 py-1.5 rounded-full ${status.bg} ${status.text} border ${status.border} font-semibold text-sm flex items-center gap-1.5 shadow-md`}>
              {status.icon} {status.label}
            </span>
            {project.featured && (
              <span className="px-3 py-1.5 bg-amber-500 text-white font-semibold text-sm rounded-full flex items-center gap-1.5 shadow-lg">
                <FaStar className="w-3.5 h-3.5" />
                {language === 'mg' ? 'Voavoatra' : language === 'fr' ? 'Prioritaire' : 'Featured'}
              </span>
            )}
          </motion.div>

          {/* TITRE - Version Light */}
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {project.title[language]}
          </motion.h1>

          {/* EXTRAIT - Version Light premium */}
          <motion.div variants={itemVariants} className="relative mb-8">
            <div className="absolute -left-2 top-0 w-1 h-full bg-[#ee5253]/30 rounded-full" />
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed pl-6 italic">
              {project.excerpt[language]}
            </p>
          </motion.div>

          {/* STATISTIQUES RAPIDES - Version Light premium */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-2 bg-gray-50 dark:bg-transparent p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaCalendarAlt className="w-4 h-4 text-[#ee5253]" />
                <span className="text-xs md:text-sm font-medium">
                  {language === 'mg' ? 'Daty' : language === 'fr' ? 'Date' : 'Date'}
                </span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{project.startDate}</p>
            </div>

            <div className="space-y-2 bg-gray-50 dark:bg-transparent p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4 text-[#ee5253]" />
                <span className="text-xs md:text-sm font-medium">
                  {language === 'mg' ? 'Toerana' : language === 'fr' ? 'Localisation' : 'Location'}
                </span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{project.location}</p>
            </div>

            <div className="space-y-2 bg-gray-50 dark:bg-transparent p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaUserTie className="w-4 h-4 text-[#ee5253]" />
                <span className="text-xs md:text-sm font-medium">
                  {language === 'mg' ? 'Mpikarakara' : language === 'fr' ? 'Responsable' : 'Manager'}
                </span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base truncate">{project.contactPerson}</p>
            </div>

            <div className="space-y-2 bg-gray-50 dark:bg-transparent p-3 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <FaUsers className="w-4 h-4 text-[#ee5253]" />
                <span className="text-xs md:text-sm font-medium">
                  {language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaires' : 'Partners'}
                </span>
              </div>
              <p className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{project.partners.length}</p>
            </div>
          </motion.div>
        </motion.header>

        {/* IMAGE PRINCIPALE - Version Light premium */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#0f172a] shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-800 group">
            <div className="relative h-100 md:h-125 overflow-hidden">
              <img
                src={project.image}
                alt={project.title[language]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Badge de progression flottant - Version Light */}
              {typeof project.progress === 'number' && (
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <FaChartLine className="w-4 h-4 text-[#ee5253]" />
                      <span className="text-sm font-medium text-gray-700 dark:text-white">
                        {language === 'mg' ? 'Fandrosoana' :
                          language === 'fr' ? 'Progression' :
                            'Progress'}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#ee5253]">{project.progress}%</span>
                  </div>
                </div>
              )}

              {/* Barre de progression améliorée au bas de l'image */}
              {typeof project.progress === 'number' && (
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/95 via-black/85 to-transparent p-4 md:p-6">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 md:p-2 bg-[#ee5253] rounded-lg backdrop-blur-sm shadow-lg">
                          <FaChartLine className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                        </div>
                        <span className="text-white/90 font-medium text-xs md:text-sm tracking-wide">
                          {language === 'mg' ? 'Fandrosoana' :
                            language === 'fr' ? 'Progression' :
                              'Progress'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold text-sm md:text-base bg-[#ee5253] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg">
                          {project.progress}%
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      {/* Barre de progression avec effet de brillance */}
                      <div className="w-full h-2 md:h-2.5 bg-gray-800/80 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                          className={`h-full rounded-full bg-linear-to-r ${config.progressColor} relative`}
                        >
                          {/* Effet de brillance animé */}
                          <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent w-1/3"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* TABS  */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as never)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#ee5253] text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
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
          ref={contentRef}
        >
          {/* ===== OVERVIEW AMÉLIORÉ - Premium Light ===== */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* Description avec effet de carte premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                {/* Éléments décoratifs */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#ee5253]/5 rounded-full blur-2xl group-hover:bg-[#ee5253]/10 transition-all duration-500" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#932020]/5 rounded-full blur-2xl group-hover:bg-[#932020]/10 transition-all duration-500" />
                
                <div className="relative bg-white dark:bg-[#0f172a] rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                  {/* En-tête avec icône décorative */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-[#ee5253]/10 rounded-2xl">
                      <FaChartBar className="w-6 h-6 text-[#ee5253]" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {language === 'mg' ? 'Fampidirana' : language === 'fr' ? 'Description' : 'Description'}
                    </h3>
                    <div className="flex-1 h-px bg-linear-to-r from-[#ee5253]/30 to-transparent ml-4" />
                  </div>

                  {/* Contenu avec paragraphes stylisés */}
                  <div className="space-y-6">
                    {project.description[language].map((paragraph, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group/paragraph"
                      >
                        {/* Ligne de citation élégante */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-[#ee5253] via-[#ee5253]/50 to-transparent rounded-full transform scale-y-0 group-hover/paragraph:scale-y-100 transition-transform duration-300 origin-top" />
                        
                        <div className="pl-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                          {paragraph}
                        </div>
                        
                        {/* Effet de surbrillance au hover */}
                        <div className="absolute inset-0 bg-[#ee5253]/5 rounded-2xl opacity-0 group-hover/paragraph:opacity-100 transition-opacity duration-300 -z-10" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Galerie */}
              {project.gallery && project.gallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {language === 'mg' ? 'Sary' : language === 'fr' ? 'Galerie' : 'Gallery'}
                    </h3>
                    <div className="w-20 h-1 bg-[#ee5253]/30 mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {project.gallery.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        onClick={() => setSelectedImage(img)}
                        className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-800"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={img}
                            alt={`Galerie ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          
                          {/* Overlay élégant */}
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Badge de vue */}
                          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                            <FaImage className="w-3 h-3 inline mr-1" />
                            {language === 'mg' ? 'Hijery' : language === 'fr' ? 'Voir' : 'View'}
                          </div>
                          
                          {/* Numéro d'image */}
                          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                            {index + 1} / {project.gallery?.length}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* ===== OBJECTIFS AMÉLIORÉS - Premium Light ===== */}
          {activeTab === 'objectives' && (
            <div className="space-y-12">
              {/* Objectifs principaux */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-[#ee5253]/10 rounded-2xl">
                    <FaBullseye className="w-6 h-6 text-[#ee5253]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {language === 'mg' ? 'Tanjona' : language === 'fr' ? 'Objectifs' : 'Objectives'}
                  </h3>
                  <div className="flex-1 h-px bg-linear-to-r from-[#ee5253]/30 to-transparent ml-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {project.objectives[language].map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="group relative"
                    >
                      {/* Carte avec design premium */}
                      <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Bande de couleur latérale */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b ${config.gradient}`} />
                        
                        <div className="p-6 pl-8">
                          {/* Numéro avec design circulaire */}
                          <div className="absolute top-4 right-4">
                            <div className="relative">
                              <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-md opacity-30" />
                              <div className="relative w-8 h-8 bg-[#ee5253] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                {index + 1}
                              </div>
                            </div>
                          </div>

                          {/* Icône et texte */}
                          <div className="flex items-start gap-4">
                            <div className={`p-3 ${config.lightBg} rounded-xl`}>
                              <FaBullseye className={`w-5 h-5 ${config.lightText}`} />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-700 dark:text-gray-300 text-base font-medium leading-relaxed pr-12">
                                {objective}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Effet de brillance au hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Réalisations */}
              {project.achievements && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl">
                      <FaCheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {language === 'mg' ? 'Zava-bita' : language === 'fr' ? 'Réalisations' : 'Achievements'}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent ml-4" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.achievements[language].map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-4 p-5 bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-500/10 dark:to-transparent rounded-xl border border-emerald-200 dark:border-emerald-500/20 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-500 rounded-full blur-sm opacity-30" />
                          <div className="relative p-2.5 bg-emerald-500 text-white rounded-lg">
                            <FaCheckCircle className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 flex-1 text-sm md:text-base">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* ===== PROGRESSION AMÉLIORÉE - Premium Light ===== */}
          {activeTab === 'progress' && (
            <div className="space-y-12">
              {/* Dates clés avec timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-amber-500/10 rounded-2xl">
                    <FaCalendarAlt className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {language === 'mg' ? 'Daty Manan-danja' : language === 'fr' ? 'Dates Importantes' : 'Key Dates'}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent ml-4" />
                </div>

                {/* Timeline design */}
                <div className="relative">
                  {/* Ligne de timeline */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ee5253] via-[#ee5253]/50 to-transparent" />
                  
                  <div className="space-y-6">
                    {/* Date de début */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative flex items-start gap-5 pl-16"
                    >
                      <div className="absolute left-0 top-0 w-16 flex justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-md opacity-30" />
                          <div className="relative w-10 h-10 bg-[#ee5253] rounded-full flex items-center justify-center shadow-lg">
                            <FaCalendarAlt className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-white dark:bg-[#0f172a] rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-md">
                        <p className="font-semibold text-gray-900 dark:text-white text-lg">
                          {language === 'mg' ? 'Daty nanombohana' : language === 'fr' ? 'Date de début' : 'Start date'}
                        </p>
                        <p className="text-[#ee5253] font-medium mt-1">{project.startDate}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          {language === 'mg' ? 'Nanomboka ny tetikasa' : language === 'fr' ? 'Lancement du projet' : 'Project launched'}
                        </div>
                      </div>
                    </motion.div>

                    {/* Date de fin (si disponible) */}
                    {project.endDate && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative flex items-start gap-5 pl-16"
                      >
                        <div className="absolute left-0 top-0 w-16 flex justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-30" />
                            <div className="relative w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                              <FaCheckCircle className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 bg-white dark:bg-[#0f172a] rounded-xl p-5 border border-gray-200 dark:border-gray-800 shadow-md">
                          <p className="font-semibold text-gray-900 dark:text-white text-lg">
                            {language === 'mg' ? 'Daty farany' : language === 'fr' ? 'Date de fin' : 'End date'}
                          </p>
                          <p className="text-emerald-600 font-medium mt-1">{project.endDate}</p>
                          <div className="mt-2 text-xs text-gray-500">
                            {language === 'mg' ? 'Vita ny tetikasa' : language === 'fr' ? 'Projet terminé' : 'Project completed'}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Détails de progression avec cartes statistiques */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-500/10 rounded-2xl">
                    <FaChartLine className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {language === 'mg' ? 'Fampitana ny Fandrosoana' : language === 'fr' ? 'Détails de Progression' : 'Progress Details'}
                  </h3>
                  <div className="flex-1 h-px bg-linear-to-r from-blue-500/30 to-transparent ml-4" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                  {/* Carte Progression */}
                  {typeof project.progress === 'number' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-md opacity-30" />
                            <div className="relative p-3 bg-linear-to-br from-emerald-500 to-green-500 rounded-xl">
                              <FaChartLine className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-emerald-600">
                              {project.progress}%
                            </div>
                            <div className="text-xs text-gray-500">complété</div>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                          {language === 'mg' ? 'Fandrosoana' : language === 'fr' ? 'Progression' : 'Progress'}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Carte Statut */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-amber-500 rounded-xl blur-md opacity-30" />
                          <div className={`relative p-3 bg-linear-to-br ${status.lightBg} rounded-xl`}>
                            {status.icon}
                          </div>
                        </div>
                        <div>
                          <div className={`text-xl font-bold ${status.lightText}`}>
                            {status.label}
                          </div>
                          <div className="text-xs text-gray-500">statut actuel</div>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {language === 'mg' ? 'Toerana' : language === 'fr' ? 'Statut' : 'Status'}
                      </p>
                      
                      {/* Badge de statut */}
                      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 rounded-full">
                        <span className={`w-2 h-2 rounded-full ${status.lightText.replace('text', 'bg')}`} />
                        <span className={`text-xs font-medium ${status.lightText}`}>{status.label}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}

          {/* ===== PARTENAIRES AMÉLIORÉS - Premium Light ===== */}
          {activeTab === 'partners' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-indigo-500/10 rounded-2xl">
                  <FaUsers className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaires' : 'Partners'}
                </h3>
                <div className="flex-1 h-px bg-linear-to-r from-indigo-500/30 to-transparent ml-4" />
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
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="group relative"
                    >
                      {/* Carte partenaire premium */}
                      <div className="relative bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Bande décorative supérieure */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${logo.bg.replace('/10', '')}`} />
                        
                        <div className="p-6 text-center">
                          {/* Logo avec effet de glow */}
                          <div className="relative mb-4">
                            <div className={`absolute inset-0 ${logo.bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                            <div className={`relative w-24 h-24 mx-auto rounded-2xl ${logo.bg} flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <div className="text-4xl">
                                {logo.icon}
                              </div>
                            </div>
                          </div>

                          {/* Nom du partenaire */}
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg group-hover:text-[#ee5253] transition-colors">
                            {partner}
                          </h4>

                          {/* Type de partenariat */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ee5253]/10 rounded-full">
                            <FaHandshake className="w-3 h-3 text-[#ee5253]" />
                            <span className="text-xs font-medium text-[#ee5253]">
                              {language === 'mg' ? 'Mpiara-miasa' : language === 'fr' ? 'Partenaire' : 'Partner'}
                            </span>
                          </div>

                          {/* Icônes de contact (si disponibles) */}
                          <div className="mt-4 flex justify-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#ee5253] hover:text-white transition-colors cursor-pointer">
                              <FaExternalLinkAlt className="w-3 h-3" />
                            </div>
                          </div>
                        </div>

                        {/* Effet de brillance */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {language === 'mg' ? 'Tetikasa Mifandraika' :
                    language === 'fr' ? 'Projets Similaires' :
                      'Related Projects'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {language === 'mg' ? 'Ireo tetikasa hafa mety ho liana aminao' :
                    language === 'fr' ? 'D\'autres projets qui pourraient vous intéresser' :
                      'Other projects you might be interested in'}
                </p>
              </div>

              <Link to="/projects">
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 dark:bg-[#0f172a] text-[#ee5253] font-semibold rounded-xl border border-gray-200 dark:border-[#ee5253]/30 hover:border-[#ee5253] shadow-md hover:shadow-lg transition-all duration-300 group"
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ee5253] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
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