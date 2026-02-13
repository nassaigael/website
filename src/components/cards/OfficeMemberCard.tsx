import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { type OfficeMember } from '../../data/office_manager';

// Icônes react-icons
import { FaFacebookF, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface OfficeMemberCardProps {
  member: OfficeMember;
  index: number;
}

const OfficeMemberCard = ({ member, index }: OfficeMemberCardProps) => {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay - Apparait au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Contact Icons - Apparaissent au hover */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20"
        >
          {/* Facebook */}
          {member.contacts.facebook && (
            <motion.a
              href={member.contacts.facebook}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-[#ee5253] text-white rounded-full flex items-center justify-center border border-white/30 hover:border-transparent transition-all duration-300 shadow-lg"
            >
              <FaFacebookF className="w-4 h-4" />
            </motion.a>
          )}
          
          {/* LinkedIn */}
          {member.contacts.linkedin && (
            <motion.a
              href={member.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-[#0077b5] text-white rounded-full flex items-center justify-center border border-white/30 hover:border-transparent transition-all duration-300 shadow-lg"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </motion.a>
          )}
          
          {/* Twitter */}
          {member.contacts.twitter && (
            <motion.a
              href={member.contacts.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-[#1DA1F2] text-white rounded-full flex items-center justify-center border border-white/30 hover:border-transparent transition-all duration-300 shadow-lg"
            >
              <FaTwitter className="w-4 h-4" />
            </motion.a>
          )}
          
          {/* Phone */}
          {member.contacts.phone && (
            <motion.a
              href={`tel:${member.contacts.phone}`}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-green-600 text-white rounded-full flex items-center justify-center border border-white/30 hover:border-transparent transition-all duration-300 shadow-lg"
            >
              <FaPhoneAlt className="w-4 h-4" />
            </motion.a>
          )}
          
          {/* Email */}
          {member.contacts.email && (
            <motion.a
              href={`mailto:${member.contacts.email}`}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-[#ea4335] text-white rounded-full flex items-center justify-center border border-white/30 hover:border-transparent transition-all duration-300 shadow-lg"
            >
              <FaEnvelope className="w-4 h-4" />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#ee5253] transition-colors duration-300">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-[#ee5253] dark:text-[#ee5253] mb-3 uppercase tracking-wider">
          {member.role[language]}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {member.bio[language]}
        </p>
        
        {/* Lien de contact supplémentaire (optionnel) */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Link 
            to={`/team/${member.id}`}
            className="inline-flex items-center gap-2 text-xs text-[#ee5253] font-medium hover:gap-3 transition-all duration-300"
          >
            <span>{language === 'mg' ? 'Hijery antsipiriany' : language === 'fr' ? 'Voir le profil' : 'View profile'}</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ee5253] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};

export default OfficeMemberCard;