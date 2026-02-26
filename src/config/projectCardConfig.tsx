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
import { IoMdSchool } from 'react-icons/io';
import { projectsData } from '../data/projects';
import type { ProjectCategory, ProjectStatus } from '../data/projects';
import type { JSX } from 'react';

// Types
export type ViewMode = 'grid' | 'featured';

// Interface pour les configurations
export interface CategoryConfig {
  label: string;
  bg: string;
  text: string;
  progressColor: string;
  icon: JSX.Element;
  featuredIcon: JSX.Element;
}

export interface StatusConfig {
  label: string;
  bg: string;
  text: string;
  border: string;
  icon: JSX.Element;
}

// Icônes par catégorie (taille normale)
export const categoryIcons = {
  education: <IoMdSchool className="w-4 h-4" />,
  culture: <GiTheater className="w-4 h-4" />,
  social: <GiHandSaw className="w-4 h-4" />,
  infrastructure: <GiCrane className="w-4 h-4" />,
  heritage: <GiStoneTower className="w-4 h-4" />,
  environment: <GiForest className="w-4 h-4" />
};

// Icônes pour le mode featured (plus grandes)
export const featuredCategoryIcons = {
  education: <IoMdSchool className="w-5 h-5" />,
  culture: <GiTheater className="w-5 h-5" />,
  social: <GiHandSaw className="w-5 h-5" />,
  infrastructure: <GiCrane className="w-5 h-5" />,
  heritage: <GiStoneTower className="w-5 h-5" />,
  environment: <GiForest className="w-5 h-5" />
};

// Icônes pour les statuts
export const statusIcons = {
  ongoing: <GiProgression className="w-3.5 h-3.5" />,
  completed: <GiCheckMark className="w-3.5 h-3.5" />,
  upcoming: <GiSandsOfTime className="w-3.5 h-3.5" />,
  planning: <GiGearHammer className="w-3.5 h-3.5" />
};

// Fonction pour générer la configuration des catégories
export const getCategoryConfig = (language: string): Record<ProjectCategory, CategoryConfig> => {
  const t = projectsData[language as keyof typeof projectsData];

  return {
    education: {
      label: t.categories.education,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      progressColor: 'bg-[#ee5253]',
      icon: categoryIcons.education,
      featuredIcon: featuredCategoryIcons.education
    },
    culture: {
      label: t.categories.culture,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      progressColor: 'bg-[#ee5253]',
      icon: categoryIcons.culture,
      featuredIcon: featuredCategoryIcons.culture
    },
    social: {
      label: t.categories.social,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      progressColor: 'bg-[#ee5253]',
      icon: categoryIcons.social,
      featuredIcon: featuredCategoryIcons.social
    },
    infrastructure: {
      label: t.categories.infrastructure,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      progressColor: 'bg-[#ee5253]',
      icon: categoryIcons.infrastructure,
      featuredIcon: featuredCategoryIcons.infrastructure
    },
    heritage: {
      label: t.categories.heritage,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      progressColor: 'bg-[#ee5253]',
      icon: categoryIcons.heritage,
      featuredIcon: featuredCategoryIcons.heritage
    },
    environment: {
      label: t.categories.environment,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      progressColor: 'bg-[#ee5253]',
      icon: categoryIcons.environment,
      featuredIcon: featuredCategoryIcons.environment
    }
  };
};

// Fonction pour générer la configuration des statuts
export const getStatusConfig = (language: string): Record<ProjectStatus, StatusConfig> => {
  const t = projectsData[language as keyof typeof projectsData];

  return {
    ongoing: {
      label: t.statuses.ongoing,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      border: 'border-white',
      icon: statusIcons.ongoing
    },
    completed: {
      label: t.statuses.completed,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      border: 'border-white',
      icon: statusIcons.completed
    },
    upcoming: {
      label: t.statuses.upcoming,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      border: 'border-white',
      icon: statusIcons.upcoming
    },
    planning: {
      label: t.statuses.planning,
      bg: 'bg-[#ee5253]',
      text: 'text-white',
      border: 'border-white',
      icon: statusIcons.planning
    }
  };
};

// Texte pour les badges
export const getFeaturedText = (language: string) => {
  return {
    mg: 'VOAVOATRA',
    fr: 'PRIORITAIRE',
    en: 'FEATURED'
  }[language] || 'FEATURED';
};

// Classes CSS communes
export const cardClasses = {
  container: "group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300",
  imageContainer: "relative h-56 overflow-hidden",
  image: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500",
  content: "p-6",
  title: "text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 h-14 group-hover:text-[#ee5253] transition-colors",
  description: "text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed text-sm h-16",
  footer: "flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800",
  button: "px-4 py-2 bg-[#ee5253] text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300",
  hoverLine: "absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#ee5253] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
};

// Animations Framer Motion
export const animations = {
  grid: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 },
    whileHover: { y: -12, scale: 1.02 }
  },
  featured: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    whileHover: { y: -8 }
  }
};