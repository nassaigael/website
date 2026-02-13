import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { type OfficeMember } from '../../data/office_manager';
import OfficeMemberProfile from '../sections/OfficeMemberProfile';

import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaTwitter,
  FaQuoteRight,
  FaCrown,
  FaMedal
} from 'react-icons/fa';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { RiShieldFlashLine, RiVipCrownLine } from 'react-icons/ri';
import { GoVerified } from 'react-icons/go';

interface OfficeMemberCardProps {
  member: OfficeMember;
  index: number;
}

const OfficeMemberCard = ({ member, index }: OfficeMemberCardProps) => {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // BADGES SELON LE RANG
  const getRankBadge = () => {
    const role = member.role.en; 
    
    if (role === 'President') {
      return {
        icon: <FaCrown className="w-3 h-3" />,
        text: { mg: 'Filoha', fr: 'Président', en: 'President' },
        bg: 'bg-[#ee5253]',
        shadow: 'shadow-amber-500/30'
      };
    } else if (role === 'Secretary') {
      return {
        icon: <FaMedal className="w-3 h-3" />,
        text: { mg: 'Sekretera', fr: 'Secrétaire', en: 'Secretary' },
        bg: 'bg-[#ee5253]',
        shadow: 'shadow-gray-500/30'
      };
    } else if (role === 'Treasurer') {
      return {
        icon: <RiVipCrownLine className="w-3 h-3" />,
        text: { mg: 'Mpitahiry vola', fr: 'Trésorier', en: 'Treasurer' },
        bg: 'bg-[#ee5253]',
        shadow: 'shadow-amber-700/30'
      };
    }
    return null;
  };

  const rankBadge = getRankBadge();

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover={{ 
          y: -12,
          scale: 1.02,
          transition: { 
            duration: 0.4, 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative w-full bg-linear-to-br from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-4xl border border-gray-200/50 dark:border-gray-800/50 transition-all duration-700 perspective-1000"
      >
        {/* BADGE DE RANG PREMIUM - basé sur le rôle réel */}
        {rankBadge && (
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className={`absolute top-3 left-3 z-30 ${rankBadge.shadow}`}
          >
            <div className={`flex items-center gap-1.5 px-3 py-1.5 ${rankBadge.bg} rounded-full shadow-xl`}>
              {rankBadge.icon}
              <span className="text-[9px] font-bold text-white uppercase tracking-wider drop-shadow-md">
                {rankBadge.text[language]}
              </span>
            </div>
          </motion.div>
        )}

        {/* BADGE VERIFIED */}
        <div className="absolute top-3 right-3 z-30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-md animate-pulse" />
            <div className="relative w-7 h-7 bg-linear-to-br from-[#ee5253] to-[#932020] rounded-full flex items-center justify-center shadow-xl border border-white/30">
              <GoVerified className="w-3.5 h-3.5 text-white" />
            </div>
          </motion.div>
        </div>

        {/* IMAGE CONTAINER */}
        <div className="relative h-80 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-shimmer" />
          )}
          
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10" />
          
          <motion.div
            animate={{ 
              scale: isHovered ? 1.15 : 1.05,
              rotate: isHovered ? 2 : 0
            }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <img
              src={member.image}
              alt={member.name}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-1500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 via-40% to-transparent opacity-90" />
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(238,82,83,0.15),transparent_70%)]" />
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0.5px,transparent_0.5px)] bg-size-[16px_16px] opacity-20 pointer-events-none" />
          
          {/* CONTACT ICONS */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 30 
            }}
            transition={{ 
              duration: 0.5, 
              delay: isHovered ? 0.2 : 0,
              type: "spring",
              stiffness: 200,
              damping: 25
            }}
            className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20"
          >
            {/* Facebook */}
            {member.contacts.facebook && (
              <motion.a
                href={member.contacts.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -6, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-10 h-10 bg-gray-200 hover:bg-[#1877f2] text-gray-700 hover:text-white rounded-xl flex items-center justify-center border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-white/80 transition-all duration-300 shadow-lg group/icon"
              >
                <FaFacebookF className="w-3.5 h-3.5 relative z-10" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[8px] font-medium rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  Facebook
                </span>
              </motion.a>
            )}
            
            {/* LinkedIn */}
            {member.contacts.linkedin && (
              <motion.a
                href={member.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -6, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-10 h-10 bg-gray-200 hover:bg-[#0077b5] text-gray-700 hover:text-white rounded-xl flex items-center justify-center border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-white/80 transition-all duration-300 shadow-lg group/icon"
              >
                <FaLinkedinIn className="w-3.5 h-3.5 relative z-10" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[8px] font-medium rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  LinkedIn
                </span>
              </motion.a>
            )}
            
            {/* Twitter */}
            {member.contacts.twitter && (
              <motion.a
                href={member.contacts.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -6, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-10 h-10 bg-gray-200 hover:bg-[#1da1f2] text-gray-700 hover:text-white rounded-xl flex items-center justify-center border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-white/80 transition-all duration-300 shadow-lg group/icon"
              >
                <FaTwitter className="w-3.5 h-3.5 relative z-10" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[8px] font-medium rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  Twitter
                </span>
              </motion.a>
            )}
            
            {/* Phone */}
            {member.contacts.phone && (
              <motion.a
                href={`tel:${member.contacts.phone}`}
                whileHover={{ scale: 1.2, y: -6, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-10 h-10 bg-gray-200 hover:bg-[#10b981] text-gray-700 hover:text-white rounded-xl flex items-center justify-center border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-white/80 transition-all duration-300 shadow-lg group/icon"
              >
                <FaPhoneAlt className="w-3.5 h-3.5 relative z-10" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[8px] font-medium rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  {member.contacts.phone}
                </span>
              </motion.a>
            )}
            
            {/* Email */}
            {member.contacts.email && (
              <motion.a
                href={`mailto:${member.contacts.email}`}
                whileHover={{ scale: 1.2, y: -6, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-10 h-10 bg-gray-200 hover:bg-[#ea4335] text-gray-700 hover:text-white rounded-xl flex items-center justify-center border border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-white/80 transition-all duration-300 shadow-lg group/icon"
              >
                <FaEnvelope className="w-3.5 h-3.5 relative z-10" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[8px] font-medium rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  {member.contacts.email}
                </span>
              </motion.a>
            )}
          </motion.div>

          {/* QUOTE ICON */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.3, rotate: -45 }}
            animate={{ 
              opacity: isHovered ? 0.15 : 0,
              scale: isHovered ? 1.2 : 0.3,
              rotate: isHovered ? 0 : -45
            }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-3 right-3 text-white/40"
          >
            <FaQuoteRight className="w-10 h-10" />
          </motion.div>

          {/* Effet de lumière sur l'image */}
          <motion.div 
            animate={{ 
              x: isHovered ? '100%' : '-100%'
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
          />
        </div>

        {/* CONTENT */}
        <div className="relative p-5 text-center bg-linear-to-b from-white via-white to-gray-50/80 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/80">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-linear-to-r from-transparent via-[#ee5253] to-transparent" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#ee5253] shadow-lg shadow-[#ee5253]/50" />
          
          {/* Avatar */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-lg opacity-50 animate-pulse-slow" />
              <div className="relative w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 shadow-2xl overflow-hidden bg-linear-to-br from-[#ee5253] to-[#932020] p-0.5">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/30">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 border border-[#ee5253]/30 rounded-full border-dashed"
              />
            </div>
          </div>

          {/* Nom */}
          <div className="mt-10 mb-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              <span className="bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {member.name}
              </span>
            </h3>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <HiOutlineBadgeCheck className="w-3.5 h-3.5 text-[#ee5253]" />
              <p className="text-xs font-semibold text-[#ee5253] uppercase tracking-[0.15em]">
                {member.role[language]}
              </p>
            </div>
          </div>
          
          {/* Bio */}
          <div className="relative mt-4 px-3 py-3 bg-linear-to-br from-gray-50/80 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <FaQuoteRight className="absolute -left-1.5 -top-1.5 w-4 h-4 text-[#ee5253]/30 rotate-180" />
            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed line-clamp-2 font-light italic">
              "{member.bio[language]}"
            </p>
            <FaQuoteRight className="absolute -right-1.5 -bottom-1.5 w-4 h-4 text-[#ee5253]/30" />
          </div>
          
          {/* Lien de profil - OUVRE LE POPUP */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="relative inline-flex items-center gap-2 px-5 py-2.5 mt-4 bg-linear-to-r from-[#ee5253] to-[#932020] text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 group/link overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/link:translate-y-0 transition-transform duration-500" />
            <RiShieldFlashLine className="w-3.5 h-3.5 relative z-10 group-hover/link:animate-pulse" />
            <span className="text-[10px] tracking-wider relative z-10">
              {language === 'mg' ? 'PROFIL' : 
               language === 'fr' ? 'PROFIL' : 
               'PROFILE'}
            </span>
            <span className="relative z-10 transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>

        {/* BORDURE DYNAMIQUE */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#ee5253]/30 transition-all duration-700 pointer-events-none" />
        
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#ee5253]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#932020]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </motion.div>

      {/* POPUP DE PROFIL */}
      <OfficeMemberProfile
        member={member}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};

export default OfficeMemberCard;