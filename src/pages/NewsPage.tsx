import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Calendar,
    TrendingUp,
    Megaphone,
    Palette,
    Castle,
    Sparkles,
    X,
    ChevronDown,
} from 'lucide-react';
import NewsCard from '../components/cards/NewsCard';
import { newsArticles } from '../data/news';
import { useLanguage } from '../contexts/LanguageContext';

const NewsPage = () => {
    const { language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'featured'>('newest');

    // Déterminer automatiquement le mode d'affichage selon l'appareil
    useEffect(() => {
        const checkDevice = () => {
            if (window.innerWidth < 768) {
                setViewMode('grid'); // Mobile = grille
            } else {
                setViewMode('list'); // Desktop = liste
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    const categories = [
        {
            id: 'all',
            icon: Sparkles,
            label: { mg: 'REHETRA', fr: 'TOUS', en: 'ALL' },
            color: 'bg-[#ee5253]'
        },
        {
            id: 'event',
            icon: Calendar,
            label: { mg: 'HETSIKA', fr: 'ÉVÉNEMENTS', en: 'EVENTS' },
            color: 'bg-[#ee5253]'
        },
        {
            id: 'project',
            icon: TrendingUp,
            label: { mg: 'TETIKASA', fr: 'PROJETS', en: 'PROJECTS' },
            color: 'bg-[#ee5253]'
        },
        {
            id: 'announcement',
            icon: Megaphone,
            label: { mg: 'FANAMBARANA', fr: 'ANNONCES', en: 'ANNOUNCEMENTS' },
            color: 'bg-[#ee5253]'
        },
        {
            id: 'culture',
            icon: Palette,
            label: { mg: 'KOLONTSAINA', fr: 'CULTURE', en: 'CULTURE' },
            color: 'bg-[#ee5253]'
        },
        {
            id: 'heritage',
            icon: Castle,
            label: { mg: 'VAKOKA', fr: 'PATRIMOINE', en: 'HERITAGE' },
            color: 'bg-[#ee5253]'
        }
    ];

    // Fonction pour convertir la date malgache en Date object
    const parseMalagasyDate = (dateStr: string): Date => {
        const months: { [key: string]: string } = {
            'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04', 'mai': '05', 'juin': '06',
            'juillet': '07', 'août': '08', 'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12',
            'janary': '01', 'febroary': '02', 'martsa': '03', 'aprily': '04', 'mey': '05', 'jona': '06',
            'jolay': '07', 'aogositra': '08', 'septambra': '09', 'oktobra': '10', 'novambra': '11', 'desambra': '12'
        };

        const parts = dateStr.toLowerCase().split(' ');
        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = months[parts[1]] || '01';
            const year = parts[2];
            return new Date(`${year}-${month}-${day}`);
        }
        return new Date();
    };

    // Filter and sort articles
    const filteredArticles = newsArticles
        .filter(article => {
            const matchesSearch =
                article.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === 'all' || article.category === selectedCategory;

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') {
                return parseMalagasyDate(b.date).getTime() - parseMalagasyDate(a.date).getTime();
            } else if (sortBy === 'oldest') {
                return parseMalagasyDate(a.date).getTime() - parseMalagasyDate(b.date).getTime();
            } else {
                return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
            }
        });

    const featuredArticles = newsArticles.filter(article => article.featured);
    const regularArticles = filteredArticles.filter(article => !article.featured);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900 pt-24 pb-32"
        >
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-block mb-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#ee5253] rounded-full opacity-75" />
                            <div className="relative px-8 py-3 bg-[#ee5253] rounded-full">
                                <span className="text-white font-bold tracking-wider">
                                    {language === 'mg' ? 'VAOVAO FARANY' :
                                        language === 'fr' ? 'ACTUALITÉS' :
                                            'LATEST NEWS'}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        {language === 'mg' ? 'Mijery ny zava-baovao, hetsika ary tetikasa rehetra momba ny Fikambanana Fizanakara. Miaraha miaina ny tantaranay isika.' :
                            language === 'fr' ? 'Découvrez toutes les nouvelles, événements et projets de l\'Association Fizanakara. Partageons notre histoire ensemble.' :
                                'Discover all news, events and projects of the Fizanakara Association. Let\'s share our story together.'}
                    </motion.p>
                </motion.div>

                {/* Featured Articles Carousel */}
                {featuredArticles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mb-16"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featuredArticles.map((article, index) => (
                                <NewsCard
                                    key={article.id}
                                    article={article}
                                    index={index}
                                    viewMode="featured"
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Control Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="sticky top-24 z-30 mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-200/50 dark:border-gray-800/50"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Search */}
                        <div className="flex-1 w-full">
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder={
                                        language === 'mg' ? 'Hikaroka vaovao, hetsika, tetikasa...' :
                                            language === 'fr' ? 'Rechercher des actualités, événements, projets...' :
                                                'Search news, events, projects...'
                                    }
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-14 pr-12 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300/50 dark:border-gray-700/50 rounded-xl focus:border-[#ee5253] focus:ring-4 focus:ring-[#ee5253]/20 outline-none transition-all placeholder-gray-500 dark:placeholder-gray-400"
                                />
                                {searchTerm && (
                                    <motion.button
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#ee5253] transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        {/* Sort Dropdown seulement */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {sortBy === 'newest' ? (language === 'mg' ? 'Vaovao indrindra' : language === 'fr' ? 'Plus récent' : 'Newest') :
                                        sortBy === 'oldest' ? (language === 'mg' ? 'Taloha indrindra' : language === 'fr' ? 'Plus ancien' : 'Oldest') :
                                            (language === 'mg' ? 'Voavoatra' : language === 'fr' ? 'À la une' : 'Featured')}
                                </span>
                                <ChevronDown className="w-4 h-4" />
                            </motion.button>

                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-40"
                                    >
                                        {['newest', 'oldest', 'featured'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setSortBy(option as 'newest' | 'oldest' | 'featured');
                                                    setShowFilters(false);
                                                }}
                                                className={`w-full px-4 py-3 text-left transition-colors ${sortBy === option
                                                    ? 'bg-[#ee5253]/10 text-[#ee5253]'
                                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`}
                                            >
                                                {option === 'newest' ? (language === 'mg' ? 'Vaovao indrindra' : language === 'fr' ? 'Plus récent' : 'Newest') :
                                                    option === 'oldest' ? (language === 'mg' ? 'Taloha indrindra' : language === 'fr' ? 'Plus ancien' : 'Oldest') :
                                                        (language === 'mg' ? 'Voavoatra' : language === 'fr' ? 'À la une' : 'Featured')}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Category Filters - CENTRÉ */}
                    <motion.div
                        className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-800/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex justify-center">
                            <div className="flex flex-wrap gap-3 justify-center">
                                {categories.map((cat, index) => {
                                    const Icon = cat.icon;
                                    return (
                                        <motion.button
                                            key={cat.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${selectedCategory === cat.id
                                                ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="font-medium text-sm">
                                                {cat.label[language]}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Articles Grid/List */}
                <AnimatePresence mode="wait">
                    {filteredArticles.length > 0 ? (
                        <motion.div
                            key={`${viewMode}-${selectedCategory}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className={viewMode === 'grid'
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                                : "flex flex-col gap-6"
                            }
                        >
                            {regularArticles.map((article, index) => (
                                <NewsCard
                                    key={article.id}
                                    article={article}
                                    index={index}
                                    viewMode={viewMode}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-48 h-48 mx-auto mb-8 relative"
                            >
                                <div className="absolute inset-0 bg-[#ee5253] rounded-full blur-2xl opacity-20" />
                                <Search className="w-48 h-48 text-gray-300 dark:text-gray-700" />
                            </motion.div>

                            <motion.h3
                                className="text-3xl font-bold mb-4"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ type: "spring" }}
                            >
                                {language === 'mg' ? 'Tsy misy vaovao hita' :
                                    language === 'fr' ? 'Aucun résultat trouvé' :
                                        'No results found'}
                            </motion.h3>

                            <motion.p
                                className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {language === 'mg' ? `Tsy misy vaovao mifanaraka amin'ny safidy nataonao. Andramo ny manova ny teny fikarohana na ny karazana safidy.` :
                                    language === 'fr' ? `Aucun article ne correspond à vos critères. Essayez de modifier vos termes de recherche ou vos filtres.` :
                                        `No articles match your criteria. Try adjusting your search terms or filters.`}
                            </motion.p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                    setSortBy('newest');
                                }}
                                className="px-8 py-3.5 bg-[#ee5253] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                {language === 'mg' ? 'Hamafa ny safidy rehetra' :
                                    language === 'fr' ? 'Réinitialiser tous les filtres' :
                                        'Reset all filters'}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default NewsPage;