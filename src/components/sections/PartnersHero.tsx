import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { partnersData, partners } from '../../data/index';

const PartnersHero = () => {
    const { language } = useLanguage();
    const t = partnersData[language];

    const stats = [
        {
            value: '30+',
            label: { mg: 'Taona', fr: 'Années', en: 'Years' },
            icon: TrendingUp,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            value: partners.length.toString(),
            label: { mg: 'Mpanohana', fr: 'Partenaires', en: 'Partners' },
            icon: Users,
            color: 'from-purple-500 to-pink-500'
        },
        {
            value: '5',
            label: { mg: 'Sokajy', fr: 'Catégories', en: 'Categories' },
            icon: Award,
            color: 'from-emerald-500 to-green-500'
        }
    ];

    const scrollToPartners = () => {
        document.getElementById('partners-grid')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-fixed" />

            {/* Animated Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-gray-900/90" />

            {/* Floating Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ee5253]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl" />

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
                        className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 tracking-tight leading-tight"
                    >
                        <span className="bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
                            {t.title}
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="relative inline-block mb-8 md:mb-10"
                    >
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ee5253] via-[#ff6b6b] to-[#d32f2f] bg-clip-text text-transparent">
                            {t.subtitle}
                        </p>
                        <div className="absolute -bottom-3 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#ee5253] to-transparent rounded-full" />
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 md:mb-14 max-w-3xl mx-auto leading-relaxed font-light px-4"
                    >
                        {t.description}
                    </motion.p>

                    {/* Stats Cards - Responsive Grid */}
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
                                    <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl overflow-hidden">
                                        {/* Animated Gradient Border */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                        {/* Icon Container */}
                                        <div className="inline-flex p-3 md:p-4 rounded-xl bg-gradient-to-br from-white/10 to-transparent mb-4 md:mb-6">
                                            <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                        </div>

                                        {/* Value */}
                                        <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                                            {stat.value}
                                        </div>

                                        {/* Label */}
                                        <div className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">
                                            {typeof stat.label === 'object' ? stat.label[language] : stat.label}
                                        </div>

                                        {/* Hover Effect Line */}
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(238, 82, 83, 0.3)"
                            }}
                            whileTap={{ scale: 0.97 }}
                            onClick={scrollToPartners}
                            className="group relative overflow-hidden bg-gradient-to-r from-[#ee5253] via-[#ff6b6b] to-[#d32f2f] text-white font-bold py-4 px-8 md:py-5 md:px-14 rounded-full text-lg md:text-xl transition-all duration-300 shadow-2xl shadow-[#ee5253]/30"
                        >
                            {/* Button Content */}
                            <span className="relative z-10 flex items-center justify-center gap-3 md:gap-4">
                                <Users className="w-6 h-6 md:w-7 md:h-7" />
                                <span className="tracking-wide">{t.cta}</span>
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="hidden sm:block"
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </motion.div>
                            </span>

                            {/* Button Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#d32f2f] via-[#ee5253] to-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Shine Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                            </div>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};

export default PartnersHero;