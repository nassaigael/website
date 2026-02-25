// components/sections/PartnersHero.tsx
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { partnersData, partners } from '../../data/index';
import { Link } from 'react-router-dom';

const PartnersHero = () => {
    const { language } = useLanguage();
    const t = partnersData[language];

    const stats = [
        {
            value: '30+',
            label: { mg: 'Taona', fr: 'Années', en: 'Years' },
            icon: TrendingUp,
            colors: {
                light: {
                    bg: 'bg-purple-50',
                    text: 'text-[#ee5253]',
                    icon: 'text-[#ee5253]',
                    gradient: 'from-purple-500 to-pink-500'
                },
                dark: {
                    bg: 'bg-purple-500/20',
                    text: 'text-[#ee5253]',
                    icon: 'text-[#ee5253]',
                    gradient: 'from-purple-400 to-pink-400'
                }
            }
        },
        {
            value: partners.length.toString(),
            label: { mg: 'Mpanohana', fr: 'Partenaires', en: 'Partners' },
            icon: Users,
            colors: {
                light: {
                    bg: 'bg-purple-50',
                    text: 'text-[#ee5253]',
                    icon: 'text-[#ee5253]',
                    gradient: 'from-purple-500 to-pink-500'
                },
                dark: {
                    bg: 'bg-purple-500/20',
                    text: 'text-[#ee5253]',
                    icon: 'text-[#ee5253]',
                    gradient: 'from-purple-400 to-pink-400'
                }
            }
        },
        {
            value: '5',
            label: { mg: 'Sokajy', fr: 'Catégories', en: 'Categories' },
            icon: Award,
            colors: {
                light: {
                    bg: 'bg-purple-50',
                    text: 'text-[#ee5253]',
                    icon: 'text-[#ee5253]',
                    gradient: 'from-purple-500 to-pink-500'
                },
                dark: {
                    bg: 'bg-purple-500/20',
                    text: 'text-[#ee5253]',
                    icon: 'text-[#ee5253]',
                    gradient: 'from-purple-400 to-pink-400'
                }
            }
        }
    ];

    const scrollToPartners = () => {
        document.getElementById('partners-grid')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
            {/* Background Image avec overlay */}
            <div className="absolute inset-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 dark:opacity-10"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2070')"
                    }}
                />
            </div>

            <div className="absolute inset-0 bg-linear-to-br from-white/90 via-white/80 to-gray-50/90 dark:from-black/90 dark:via-black/80 dark:to-gray-900/90" />

            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ee5253]/10 dark:bg-[#ee5253]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="max-w-6xl mx-auto text-center pt-16 pb-20 md:pt-24 md:pb-32"
                >
                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight"
                    >
                        <span className="relative inline-block">
                            <span className="relative z-10">
                                {t.title}
                            </span>
                            <span className="absolute -bottom-2 left-0 right-0 h-2 md:h-3 bg-[#ee5253] dark:bg-[#ee5253] -z-10"></span>
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-3xl mx-auto mb-10 md:mb-12 px-4"
                    >
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                            {t.description}
                        </p>
                    </motion.div>

                    {/* Elegant Divider */}
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
                        <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]"></div>
                        <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-[#ee5253] rotate-45"></div>
                        <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]"></div>
                    </div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, staggerChildren: 0.15 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 max-w-4xl mx-auto px-2"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1 + index * 0.15 }}
                                    whileHover={{ y: -8, scale: 1.05 }}
                                    className="group relative"
                                >
                                    {/* Card Background */}
                                    <div className="relative bg-white dark:bg-black/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl overflow-hidden">
                                        <div className={`absolute inset-0 bg-linear-to-r ${stat.colors.light.gradient} opacity-0 group-hover:opacity-10 dark:opacity-0 dark:group-hover:opacity-20 transition-opacity duration-500`} />

                                        {/* Icon Container */}
                                        <div className={`inline-flex p-3 md:p-4 rounded-xl ${stat.colors.light.bg} dark:${stat.colors.dark.bg} mb-4 md:mb-6`}>
                                            <Icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.colors.light.icon} dark:${stat.colors.dark.icon}`} />
                                        </div>

                                        {/* Value */}
                                        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2">
                                            {stat.value}
                                        </div>

                                        {/* Label */}
                                        <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider">
                                            {typeof stat.label === 'object' ? stat.label[language] : stat.label}
                                        </div>

                                        {/* Hover Effect Line */}
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent via-[#ee5253] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 }}
                        className="relative"
                    >
                        <Link to={'/contact'}>
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(238, 82, 83, 0.3)"
                                }}
                                whileTap={{ scale: 0.97 }}
                                onClick={scrollToPartners}
                                className="group relative overflow-hidden bg-[#ee5253] text-white font-bold py-4 px-8 md:py-5 md:px-14 rounded-full text-lg md:text-xl transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer"
                            >
                                {/* Button Content */}
                                <span className="relative z-10 flex items-center justify-center gap-3 md:gap-4">
                                    <Heart className="w-6 h-6 md:w-7 md:h-7" />
                                    <span className="tracking-wide">{t.cta}</span>
                                    <motion.div
                                        animate={{ y: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="hidden sm:block"
                                    >
                                    </motion.div>
                                </span>

                                {/* Button Hover Effect */}
                                <div className="absolute inset-0 bg-linear-to-r from-[#d32f2f] to-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Shine Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                                    <div className="w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                                </div>
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent dark:from-black dark:to-transparent pointer-events-none" />
        </section>
    );
};

export default PartnersHero;