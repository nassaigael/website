// pages/NewsPage.tsx
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
import { newsArticles } from '../data/index';
import { useLanguage } from '../contexts/LanguageContext';
import NoResultsState from '../components/states/NoResultsState';

const NewsPage = () => {
    const { language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'featured'>('newest');

    useEffect(() => {
        const checkDevice = () => {
            if (window.innerWidth < 768) {
                setViewMode('grid');
            } else {
                setViewMode('list');
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
            className="min-h-screen bg-white dark:bg-gray-950 pt-8 pb-32"
        >
            {/* Animated Background - Version Light améliorée */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ee5253]/5 dark:bg-[#ee5253]/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#932020]/5 dark:bg-[#932020]/5 rounded-full blur-3xl"
                />
                {/* Grille subtile */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,82,83,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(147,32,32,0.02)_1px,transparent_1px)] bg-size-[50px_50px] dark:opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    {/* Main Title */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                        <span className="relative">
                            <span className="relative z-10 capitalize">
                                {language === 'mg' ? 'Vaovao farany' :
                                    language === 'fr' ? 'actualités' :
                                        'Latest news'}
                            </span>
                            <span className="absolute -bottom-2 left-0 right-0 h-3 bg-[#ee5253] dark:bg-[#ee5253] -z-10"></span>
                        </span>
                    </h1>

                    {/* Premium Subtitle */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="max-w-3xl mx-auto mb-12"
                    >
                        <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                            {language === 'mg' ? 'Mijery ny zava-baovao, hetsika ary tetikasa rehetra momba ny Fikambanana Fizanakara. Miaraha miaina ny tantaranay isika.' :
                                language === 'fr' ? 'Découvrez toutes les nouvelles, événements et projets de l\'Association Fizanakara. Partageons notre histoire ensemble.' :
                                    'Discover all news, events and projects of the Fizanakara Association. Let\'s share our story together.'}
                        </p>
                    </motion.div>
                    <div className="flex items-center justify-center gap-4 mb-16">
                        <div className="w-12 h-0.5 bg-[#ee5253] dark:bg-[#ee5253]"></div>
                        <div className="w-4 h-4 border-2 border-[#ee5253] rotate-45"></div>
                        <div className="w-12 h-0.5 bg-[#ee5253] dark:bg-[#ee5253]"></div>
                    </div>
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

                {/* Control Bar - Version Light améliorée */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="sticky top-24 z-30 mb-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-2xl p-6 border border-gray-200 dark:border-gray-800/50"
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Search */}
                        <div className="flex-1 w-full">
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder={
                                        language === 'mg' ? 'Hikaroka vaovao, hetsika, tetikasa...' :
                                            language === 'fr' ? 'Rechercher des actualités, événements, projets...' :
                                                'Search news, events, projects...'
                                    }
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-14 pr-12 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700/50 rounded-xl focus:border-[#ee5253] focus:ring-4 focus:ring-[#ee5253]/10 dark:focus:ring-[#ee5253]/20 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
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
                                <Filter className="w-4 h-4 text-gray-700 dark:text-white" />
                                <span className="text-sm text-gray-700 dark:text-white font-medium">
                                    {sortBy === 'newest' ? (language === 'mg' ? 'Vaovao indrindra' : language === 'fr' ? 'Plus récent' : 'Newest') :
                                        sortBy === 'oldest' ? (language === 'mg' ? 'Taloha indrindra' : language === 'fr' ? 'Plus ancien' : 'Oldest') :
                                            (language === 'mg' ? 'Voavoatra' : language === 'fr' ? 'À la une' : 'Featured')}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-700 dark:text-white transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {showFilters && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full mt-2 right-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-40"
                                    >
                                        {['newest', 'oldest', 'featured'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setSortBy(option as 'newest' | 'oldest' | 'featured');
                                                    setShowFilters(false);
                                                }}
                                                className={`w-full px-4 py-3 text-left transition-colors ${
                                                    sortBy === option
                                                        ? 'bg-[#ee5253]/10 text-[#ee5253]'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white'
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
                        className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800/50"
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
                                            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                                                selectedCategory === cat.id
                                                    ? `bg-[#ee5253] text-white shadow-lg`
                                                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white'
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
                        <NoResultsState
                            entityType="news"
                            onResetFilters={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                                setSortBy('newest');
                            }}
                            searchTerm={searchTerm}
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default NewsPage;