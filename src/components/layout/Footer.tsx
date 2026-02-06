import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { footerData } from '../../data/footer';

const Footer = () => {
    const { language } = useLanguage();
    const t = footerData[language];

    return (
        <footer className="bg-linear-to-b from-gray-900 to-black text-white pt-12 pb-10">
            <div className="container mx-auto px-5 sm:px-6 lg:px-8">
                {/* Grille principale avec espacement amélioré */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

                    {/* Colonne 1: Logo et description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Logo */}
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-linear-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                                <Heart className="w-7 h-7 text-white" fill="white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight">{t.organization.name}</h2>
                                <p className="text-gray-300 text-sm mt-1">
                                    {t.organization.subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 leading-relaxed text-sm">
                            {t.organization.description}
                        </p>

                        {/* Adresse */}
                        <div className="flex items-start gap-3 pt-2">
                            <MapPin className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                            <span className="text-gray-300 text-sm leading-relaxed">
                                {t.address}
                            </span>
                        </div>
                    </motion.div>

                    {/* Colonne 2: Liens rapides */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <h3 className="text-lg font-bold text-white mb-5 pb-2 border-b border-gray-800">
                            {t.quickLinks.title}
                        </h3>
                        <ul className="space-y-3">
                            {t.quickLinks.links.map((link, index) => (
                                <motion.li
                                    key={index}
                                    whileHover={{ x: 4 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-3 py-2 group"
                                    >
                                        <span className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></span>
                                        <span className="text-sm">{link.label}</span>
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Colonne 3: Articles récents */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className="text-lg font-bold text-white mb-5 pb-2 border-b border-gray-800">
                            {t.recentPosts.title}
                        </h3>
                        <div className="space-y-5">
                            {t.recentPosts.posts.map((post, index) => (
                                <div key={index} className="group cursor-pointer">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                                        <Calendar className="w-4 h-4 text-red-500" />
                                        <span>{post.date}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm group-hover:text-red-500 transition-colors leading-relaxed">
                                        {post.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Colonne 4: Contact et réseaux sociaux */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div>
                            <h3 className="text-lg font-bold text-white mb-5 pb-2 border-b border-gray-800">
                                {t.contact.title}
                            </h3>
                            <div className="space-y-5">
                                {/* Email */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <a
                                            href={`mailto:${t.contact.email}`}
                                            className="text-gray-300 hover:text-red-500 transition-colors text-sm font-medium block"
                                        >
                                            {t.contact.email}
                                        </a>
                                        <p className="text-gray-400 text-xs mt-0.5">
                                            {language === 'mg' ? 'Email' :
                                                language === 'fr' ? 'Email' :
                                                    'Email'}
                                        </p>
                                    </div>
                                </div>

                                {/* Téléphone principal */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <a
                                            href={`tel:${t.contact.phone.replace(/\D/g, '')}`}
                                            className="text-gray-300 hover:text-red-500 transition-colors text-sm font-medium block"
                                        >
                                            {t.contact.phone}
                                        </a>
                                        <p className="text-gray-400 text-xs mt-0.5">
                                            {language === 'mg' ? 'Laharana finday' :
                                                language === 'fr' ? 'Téléphone' :
                                                    'Phone'}
                                        </p>
                                    </div>
                                </div>

                                {/* Téléphone d'urgence */}
                                <div className="pt-4 border-t border-gray-800">
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center shrink-0">
                                            <Phone className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-gray-300 text-sm font-medium mb-1">
                                                {t.contact.emergency.label}
                                            </p>
                                            <a
                                                href={`tel:${t.contact.emergency.phone.replace(/\D/g, '')}`}
                                                className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                                            >
                                                {t.contact.emergency.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Réseaux sociaux */}
                        <div className="pt-4">
                            <h3 className="text-lg font-bold text-white mb-4">
                                {t.socialMedia.title}
                            </h3>
                            <div className="flex gap-3">
                                {t.socialMedia.platforms.map((platform, index) => {
                                    const Icon = {
                                        'Facebook': Facebook,
                                        'Instagram': Instagram,
                                        'Twitter': Twitter,
                                        'YouTube': Youtube
                                    }[platform];

                                    return (
                                        <motion.a
                                            key={index}
                                            href="#"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
                                            aria-label={platform}
                                        >
                                            {Icon && <Icon className="w-5 h-5" />}
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Ligne de séparation */}
                <div className="border-t border-gray-800 my-10"></div>

                {/* Bas de page - Amélioré pour mobile */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-gray-400 text-sm mb-2">
                            © 2026 FIZANAKARA. {language === 'mg' ? 'Zon\'ny rehetra voatokana' :
                                language === 'fr' ? 'Tous droits réservés' :
                                    'All rights reserved'}
                        </p>
                        <p className="text-gray-500 text-xs">
                            {language === 'mg' ? 'Niorina tamin\'ny 1970 tao Antananarivo' :
                                language === 'fr' ? 'Fondé en 1970 à Antananarivo' :
                                    'Founded in 1970 in Antananarivo'}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-5 md:gap-6">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium"
                        >
                            {t.copyright.links.terms}
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium"
                        >
                            {t.copyright.links.privacy}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;