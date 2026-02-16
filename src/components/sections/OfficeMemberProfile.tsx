import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { type OfficeMember } from '../../data/office_manager';

import {
    FaFacebookF,
    FaLinkedinIn,
    FaPhoneAlt,
    FaEnvelope,
    FaTwitter,
    FaQuoteLeft,
    FaCrown,
    FaMedal,
    FaTimes,
} from 'react-icons/fa';
import { RiVipCrownLine } from 'react-icons/ri';
import { IoMdMail } from 'react-icons/io';

interface OfficeMemberProfileProps {
    member: OfficeMember;
    isOpen: boolean;
    onClose: () => void;
}

const OfficeMemberProfile = ({ member, isOpen, onClose }: OfficeMemberProfileProps) => {
    const { language } = useLanguage();
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // BADGE SELON LE RANG
    const getRankBadge = () => {
        const role = member.role.en;

        if (role === 'President') {
            return {
                icon: <FaCrown className="w-3 h-3" />,
                text: { mg: 'Filoha', fr: 'Président', en: 'President' },
                bg: 'bg-gradient-to-r from-[#ee5253] to-[#932020]',
                description: {
                    mg: 'Mpitarika ny fikambanana',
                    fr: 'Leader de l\'association',
                    en: 'Association leader'
                }
            };
        } else if (role === 'Secretary') {
            return {
                icon: <FaMedal className="w-3 h-3" />,
                text: { mg: 'Sekretera', fr: 'Secrétaire', en: 'Secretary' },
                bg: 'bg-gradient-to-r from-[#4299e1] to-[#2b6cb0]',
                description: {
                    mg: 'Mpitantana ny raharaha',
                    fr: 'Gestionnaire des affaires',
                    en: 'Business manager'
                }
            };
        } else if (role === 'Treasurer') {
            return {
                icon: <RiVipCrownLine className="w-3 h-3" />,
                text: { mg: 'Mpitahiry vola', fr: 'Trésorier', en: 'Treasurer' },
                bg: 'bg-gradient-to-r from-[#ee5253] to-[#932020]',
                description: {
                    mg: 'Mpitantana ny vola',
                    fr: 'Gestionnaire financier',
                    en: 'Financial manager'
                }
            };
        }
        return null;
    };

    const rankBadge = getRankBadge();

    // DISCOURS PERSONNALISÉ
    const getSpeech = () => {
        const role = member.role.en;

        if (role === 'President') {
            return {
                mg: `Miarahaba anareo rehetra. Ny tanjona dia ny hampandroso ny fiarahamonina sy hitahiry ny kolontsaina.`,
                fr: `Je suis honoré de diriger cette association. Notre mission est de développer notre communauté tout en préservant notre patrimoine culturel.`,
                en: `I am honored to lead this association. Our mission is to develop our community while preserving our cultural heritage.`
            };
        } else if (role === 'Secretary') {
            return {
                mg: `Ny raharaha sy ny fandaminana no andraikiko. Miezaka hanatsara ny fifandraisana sy ny fandraisana andraikitra.`,
                fr: `Mon rôle est d'assurer une gestion efficace et transparente. Je m'engage à maintenir une communication fluide.`,
                en: `My role is to ensure effective and transparent management. I am committed to smooth communication.`
            };
        } else if (role === 'Treasurer') {
            return {
                mg: `Ny fitantanam-bola no andraikiko. Miantoka ny fahamarinana sy ny mangarahara.`,
                fr: `La gestion financière est ma priorité. Je garantis la transparence et l'intégrité.`,
                en: `Financial management is my priority. I guarantee transparency and integrity.`
            };
        } else {
            return {
                mg: `Faly aho miasa ho an'ny fikambanana. Hiara-hiasa isika rehetra.`,
                fr: `Je suis heureux de contribuer à notre association. Travaillons ensemble.`,
                en: `I am happy to contribute to our association. Let's work together.`
            };
        }
    };

    const speech = getSpeech();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 30, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 30, opacity: 0 }}
                        transition={{ duration: 0.4, type: "spring", damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
                    >
                        {/* BOUTON FERMER */}
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={onClose}
                            whileHover={{ scale: 1.1, backgroundColor: '#ee5253' }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-3 right-3 z-20 w-9 h-9 bg-white dark:bg-gray-800 hover:bg-[#ee5253] text-gray-600 dark:text-gray-300 hover:text-white rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
                        >
                            <FaTimes className="w-4 h-4" />
                        </motion.button>

                        {/* CONTENU RESPONSIVE */}
                        <div className="flex flex-col lg:flex-row">
                            
                            {/* COLONNE GAUCHE - PHOTO */}
                            <div className="relative w-full lg:w-2/5 h-75 sm:h-87.5 lg:h-125 overflow-hidden">
                                {/* Image */}
                                {!imageLoaded && (
                                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                                )}
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    onLoad={() => setImageLoaded(true)}
                                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                                        imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                                
                                {/* Overlay dégradé */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                                
                                {/* Contenu overlay - visible seulement sur mobile/tablet */}
                                <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
                                    {rankBadge && (
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${rankBadge.bg} rounded-full text-xs font-bold text-white mb-2`}>
                                            {rankBadge.icon}
                                            <span>{rankBadge.text[language]}</span>
                                        </div>
                                    )}
                                    <h2 className="text-2xl font-bold">{member.name}</h2>
                                    <p className="text-sm text-white/80">{rankBadge?.description[language]}</p>
                                </div>
                            </div>

                            {/* COLONNE DROITE - INFOS */}
                            <div className="hidden lg:flex lg:w-3/5 p-6 lg:p-8 flex-col">
                                <div className="mb-6">
                                    {rankBadge && (
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 ${rankBadge.bg} rounded-xl text-white font-bold text-sm mb-4`}>
                                            {rankBadge.icon}
                                            <span>{rankBadge.text[language]}</span>
                                        </div>
                                    )}
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{rankBadge?.description[language]}</p>
                                </div>

                                {/* DISCOURS */}
                                <div className="flex-1 cursor-auto">
                                    <div className="relative">
                                        <FaQuoteLeft className="absolute -top-2 -left-2 w-6 h-6 text-[#ee5253]/20" />
                                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                                            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed italic">
                                                "{speech[language]}"
                                            </p>
                                            <div className="mt-4 flex items-center justify-end gap-2">
                                                <div className="h-px w-12 bg-linear-to-r from-[#ee5253] to-[#4299e1]" />
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{member.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CONTACT ICONS */}
                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                        {language === 'mg' ? 'FIFANDRAISANA' : language === 'fr' ? 'CONTACT' : 'CONTACT'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {member.contacts.facebook && (
                                            <a href={member.contacts.facebook} target="_blank" rel="noopener noreferrer"
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#1877f2] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaFacebookF className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.contacts.linkedin && (
                                            <a href={member.contacts.linkedin} target="_blank" rel="noopener noreferrer"
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#0077b5] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaLinkedinIn className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.contacts.twitter && (
                                            <a href={member.contacts.twitter} target="_blank" rel="noopener noreferrer"
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#1da1f2] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaTwitter className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.contacts.phone && (
                                            <a href={`tel:${member.contacts.phone}`}
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#10b981] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaPhoneAlt className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.contacts.email && (
                                            <a href={`mailto:${member.contacts.email}`}
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#ea4335] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaEnvelope className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* EMAIL DIRECT */}
                                {member.contacts.email && (
                                    <div className="mt-4 p-3 bg-linear-to-r from-[#ee5253]/5 to-[#4299e1]/5 rounded-lg border border-[#ee5253]/20 cursor-auto">
                                        <div className="flex items-center gap-3">
                                            <IoMdMail className="w-5 h-5 text-[#ee5253]" />
                                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{member.contacts.email}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* VERSION MOBILE/TABLET - INFOS EN BAS */}
                            <div className="lg:hidden p-5 bg-white dark:bg-gray-900">
                                {/* DISCOURS MOBILE */}
                                <div className="mb-5">
                                    <div className="relative">
                                        <FaQuoteLeft className="absolute -top-2 -left-2 w-5 h-5 text-[#ee5253]/20" />
                                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                            <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                                                "{speech[language]}"
                                            </p>
                                            <div className="mt-3 flex items-center justify-end gap-2">
                                                <div className="h-px w-10 bg-linear-to-r from-[#ee5253] to-[#4299e1]" />
                                                <span className="text-xs font-medium text-gray-900 dark:text-white">{member.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CONTACT ICONS MOBILE */}
                                <div className="mb-4">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                                        {language === 'mg' ? 'FIFANDRAISANA' : language === 'fr' ? 'CONTACT' : 'CONTACT'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {member.contacts.facebook && (
                                            <a href={member.contacts.facebook} target="_blank" rel="noopener noreferrer"
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#1877f2] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaFacebookF className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.contacts.linkedin && (
                                            <a href={member.contacts.linkedin} target="_blank" rel="noopener noreferrer"
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#0077b5] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaLinkedinIn className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.contacts.twitter && (
                                            <a href={member.contacts.twitter} target="_blank" rel="noopener noreferrer"
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#1da1f2] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaTwitter className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.contacts.phone && (
                                            <a href={`tel:${member.contacts.phone}`}
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#10b981] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaPhoneAlt className="w-4 h-4" />
                                            </a>
                                        )}
                                        {member.contacts.email && (
                                            <a href={`mailto:${member.contacts.email}`}
                                                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-[#ea4335] text-gray-600 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                                <FaEnvelope className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* EMAIL MOBILE */}
                                {member.contacts.email && (
                                    <div className="p-3 bg-linear-to-r from-[#ee5253]/5 to-[#4299e1]/5 rounded-lg border border-[#ee5253]/20">
                                        <div className="flex items-center gap-3">
                                            <IoMdMail className="w-4 h-4 text-[#ee5253]" />
                                            <span className="text-xs text-gray-700 dark:text-gray-300 truncate">{member.contacts.email}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfficeMemberProfile;