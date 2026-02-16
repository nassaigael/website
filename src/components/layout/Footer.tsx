import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Facebook, Instagram, Twitter, Mail, Phone, Heart, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { footerData } from '../../data/footer';
import logo from "../../assets/images/logo.png";

const Footer = () => {
    const { language } = useLanguage();
    const t = footerData[language];

    const socialIcons = {
        Facebook: Facebook,
        Instagram: Instagram,
        Twitter: Twitter,
        YouTube: Globe
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="relative bg-gray-950 text-white overflow-hidden">
            {/* Éléments décoratifs d'arrière-plan */}
            <div className="absolute inset-0 pointer-events-none">

                {/* Cercles flous */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#ee5253]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#932020]/10 rounded-full blur-3xl" />
            </div>

            {/* Ligne décorative supérieure */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#ee5253] to-transparent" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">

                    {/* Logo & Description */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <Link to="/" className="inline-flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#ee5253] rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                                <img
                                    src={logo}
                                    alt="Logo Fizanakara"
                                    className="relative h-14 w-14 sm:h-16 sm:w-16 object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="font-extrabold tracking-tight text-white text-2xl sm:text-3xl group-hover:text-[#ee5253] transition-colors">
                                    FIZANAKARA
                                </h1>
                                <p className="text-xs text-gray-400 font-medium">
                                    {t.organization.subtitle}
                                </p>
                            </div>
                        </Link>

                        <div className="relative">
                            <div className="absolute -left-2 top-0 w-1 h-full bg-[#ee5253]" />
                            <p className="text-sm leading-relaxed text-gray-300 md:text-base italic pl-4">
                                "{t.organization.description}"
                            </p>
                        </div>

                        <div className="flex items-start gap-3 text-sm text-gray-300 bg-gray-900/30 p-4 rounded-xl border border-gray-800/50 hover:border-[#ee5253]/30 transition-all duration-300">
                            <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#ee5253]" />
                            <span className="leading-relaxed">{t.address}</span>
                        </div>

                        {/* Année de fondation */}
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Heart className="w-4 h-4 text-[#ee5253]" />
                            <span>
                                {language === 'mg' ? 'Niorina tamin\'ny 1970' :
                                    language === 'fr' ? 'Fondé en 1970' :
                                        'Founded in 1970'}
                            </span>
                        </div>
                    </motion.div>

                    {/* LIENS RAPIDES */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white relative inline-block">
                            {t.quickLinks.title}
                            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#ee5253]" />
                        </h3>

                        <div className="space-y-3">
                            {t.quickLinks.links.map((link, i) => (
                                <Link
                                    key={i}
                                    to={link.href}
                                    className="group flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800/50 hover:border-[#ee5253] hover:bg-gray-900/50 transition-all duration-300"
                                >
                                    <ChevronRight className="w-4 h-4 text-[#ee5253] opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white relative inline-block">
                            {t.contact.title}
                            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#ee5253]" />
                        </h3>

                        {/* Email */}
                        <div className="group p-5 bg-gray-900/30 rounded-xl border border-gray-800/50 hover:border-[#ee5253] transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-[#ee5253] rounded-lg shadow-lg shadow-[#ee5253]/20 group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-[#ee5253] font-semibold uppercase tracking-wider mb-1">
                                        {language === 'mg' ? 'EMAIL' : 'EMAIL'}
                                    </p>
                                    <a href={`mailto:${t.contact.email}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                        {t.contact.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Téléphone */}
                        <div className="group p-5 bg-gray-900/30 rounded-xl border border-gray-800/50 hover:border-[#ee5253] transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-[#ee5253] rounded-lg shadow-lg shadow-[#ee5253]/20 group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-[#ee5253] font-semibold uppercase tracking-wider mb-1">
                                        {language === 'mg' ? 'TELEFONINA' : 'TÉLÉPHONE'}
                                    </p>
                                    <a href={`tel:${t.contact.phone.replace(/\D/g, '')}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                        {t.contact.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* RÉSEAUX SOCIAUX & COPYRIGHT */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 pt-8 border-t border-gray-800"
                >
                    {/* Réseaux sociaux */}
                    <div className="text-center mb-8">
                        <h3 className="text-lg font-semibold text-gray-300 mb-5">
                            {t.socialMedia.title}
                        </h3>
                        <div className="flex justify-center gap-4 sm:gap-5">
                            {t.socialMedia.platforms.map((platform, i) => {
                                const Icon = socialIcons[platform as keyof typeof socialIcons] || Globe;
                                return (
                                    <a
                                        key={i}
                                        href="#"
                                        className="relative group"
                                    >
                                        <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                                        <div className="relative w-12 h-12 bg-gray-800 group-hover:bg-[#ee5253] rounded-full flex items-center justify-center border border-gray-700 group-hover:border-transparent transition-all duration-300 shadow-lg">
                                            <Icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* COPYRIGHT, TERMES, CONFIDENTIALITÉ */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-sm">
                        {/* Copyright */}
                        <p className="text-gray-400 text-center lg:text-left order-1">
                            {t.copyright.text}
                        </p>

                        {/* Developed by Gaël */}
                        <div className="flex items-center gap-2 order-3">
                            <span className="text-xs text-gray-500">
                                {language === 'mg' ? 'Namboarin\'i' :
                                    language === 'fr' ? 'Développé par' :
                                        'Developed by'}
                            </span>
                            <span className="text-sm font-medium text-white hover:text-[#ee5253] transition-colors cursor-default">
                                Gaël RAMAHANDRISOA
                            </span>
                        </div>

                        {/* Termes et Confidentialité */}
                        <div className="flex items-center gap-4 order-2">
                            {t.copyright.links && (
                                <>
                                    <a href="#" className="text-gray-400 hover:text-[#ee5253] transition-colors relative group">
                                        {t.copyright.links.terms}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ee5253] group-hover:w-full transition-all duration-300" />
                                    </a>
                                    <span className="w-1 h-1 bg-[#ee5253] rounded-full" />
                                    <a href="#" className="text-gray-400 hover:text-[#ee5253] transition-colors relative group">
                                        {t.copyright.links.privacy}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ee5253] group-hover:w-full transition-all duration-300" />
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;