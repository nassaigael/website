import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';           // ← ajouté
import { MapPin, Calendar, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { footerData } from '../../data/footer';
import logo from "../../assets/images/logo.png";


const Footer = () => {
    const { language } = useLanguage();
    const t = footerData[language];

    return (
        <footer className="bg-linear-to-b from-gray-950 via-gray-950 to-black text-white">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6 text-center md:text-left"
                    >
                        {/* Logo */}
                        <Link to="/" className="flex items-center justify-center gap-2.5 cursor-pointer shrink-0 md:justify-start">
                            <motion.div
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center gap-2.5"
                            >
                                <img
                                    src={logo}
                                    alt="Logo Fizanakara"
                                    className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 object-contain"
                                />
                                <div className="flex flex-col leading-tight">
                                    <h1 className="font-extrabold tracking-tight text-[#ee5253] text-lg sm:text-xl md:text-[1.38rem] lg:text-2xl">
                                        FIZANAKARA
                                    </h1>
                                    <p className="text-xs text-gray-400 font-medium hidden lg:block">
                                        {language === 'mg' ? "Fikambanan'ny Zanak'Anakara" :
                                            language === 'fr' ? "Association des Descendants Anakara" :
                                                "Association of Anakara Descendants"}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>

                        <p className="text-sm leading-relaxed text-gray-300 md:text-base">
                            {t.organization.description}
                        </p>

                        <div className="flex items-start justify-center gap-3 text-sm text-gray-300 md:justify-start">
                            <MapPin className="mt-1 h-5 w-5 shrink-0 text-red-500" />
                            <span className="leading-relaxed">{t.address}</span>
                        </div>
                    </motion.div>

                    {/* Liens rapides */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="space-y-6 text-center md:text-left"
                    >
                        <h3 className="border-b border-gray-700 pb-3 text-xl font-semibold">
                            {t.quickLinks.title}
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {t.quickLinks.links.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.href}
                                        className="group inline-flex items-center gap-2.5 text-gray-300 transition-colors hover:text-red-400"
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-red-500/60 group-hover:scale-125 transition-transform" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Articles récents */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="space-y-6 text-center md:text-left"
                    >
                        <h3 className="border-b border-gray-700 pb-3 text-xl font-semibold">
                            {t.recentPosts.title}
                        </h3>
                        <div className="space-y-6 text-sm">
                            {t.recentPosts.posts.map((post, i) => (
                                <div key={i} className="group">
                                    <div className="mb-2 flex items-center justify-center gap-2 text-xs text-gray-500 md:justify-start">
                                        <Calendar className="h-4 w-4 text-red-500" />
                                        <span>{post.date}</span>
                                    </div>
                                    <p className="leading-relaxed text-gray-300 group-hover:text-red-400 transition-colors">
                                        {post.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="space-y-8 text-center"
                    >
                        <h3 className="border-b border-gray-700 pb-3 text-xl font-semibold">
                            {t.contact.title}
                        </h3>

                        <div className="space-y-7">
                            {/* Email */}
                            <div className="flex flex-col items-center gap-2">
                                <a
                                    href={`mailto:${t.contact.email}`}
                                    className="text-base font-medium text-gray-100 hover:text-red-400"
                                >
                                    {t.contact.email}
                                </a>
                                <span className="hidden text-xs text-gray-500 md:block">Email</span>
                            </div>

                            {/* Téléphone */}
                            <div className="flex flex-col items-center gap-2">
                                <a
                                    href={`tel:${t.contact.phone.replace(/\D/g, '')}`}
                                    className="text-base font-medium text-gray-100 hover:text-red-400"
                                >
                                    {t.contact.phone}
                                </a>
                                <span className="hidden text-xs text-gray-500 md:block">
                                    {language === 'mg' ? 'Téléphone' : 'Téléphone'}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="border-t border-gray-800/70 pt-10 pb-12">
                    <div className="flex flex-col items-center gap-8 text-center">
                        {/* Réseaux sociaux */}
                        <div className="space-y-5">
                            <h3 className="text-xl font-semibold tracking-wide">
                                {t.socialMedia.title}
                            </h3>
                            <div className="flex justify-center gap-5 sm:gap-7">
                                {t.socialMedia.platforms.map((platform, i) => {
                                    const Icon = { Facebook, Instagram, Twitter }[platform];
                                    return (
                                        <motion.a
                                            key={i}
                                            href="#"
                                            whileHover={{ scale: 1.2, y: -4 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800/70 text-gray-200 transition-all hover:bg-red-600 hover:text-white hover:shadow-xl hover:shadow-red-900/40"
                                            aria-label={platform}
                                        >
                                            {Icon && <Icon className="h-7 w-7" />}
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="space-y-3 text-sm text-gray-400">
                            <p>
                                © {new Date().getFullYear()} FIZANAKARA.{' '}
                                {language === 'mg'
                                    ? "Zon'ny rehetra voatokana"
                                    : language === 'fr'
                                        ? 'Tous droits réservés'
                                        : 'All rights reserved'}
                            </p>
                            <p className="text-xs text-gray-600">
                                {language === 'mg'
                                    ? "Niorina tamin'ny 1970 tao Antananarivo"
                                    : language === 'fr'
                                        ? 'Fondé en 1970 à Antananarivo'
                                        : 'Founded in 1970 in Antananarivo'}
                            </p>

                            <div className="flex justify-center gap-6 pt-2 text-gray-400">
                                <a href="#" className="hover:text-red-400 transition-colors">
                                    {t.copyright?.links?.terms || 'Conditions'}
                                </a>
                                <a href="#" className="hover:text-red-400 transition-colors">
                                    {t.copyright?.links?.privacy || 'Confidentialité'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;