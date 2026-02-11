import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    MapPin,
    User,
    ArrowLeft,
    Share2,
    ChevronLeft,
    ChevronRight,
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    Link as LinkIcon,
    Eye,
    BookOpen,
    Heart,
    Bookmark,
    Target,
    Award,
    ChevronDown,
    ExternalLink
} from 'lucide-react';
import { newsArticles, getRelatedArticles } from '../data/index';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import NewsCard from '../components/cards/NewsCard';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [currentImage, setCurrentImage] = useState(0);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [readProgress, setReadProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const [carouselHeight, setCarouselHeight] = useState('32rem');
    const carouselRef = useRef<HTMLDivElement>(null);

    const article = newsArticles.find(a => a.id === parseInt(id || '0'));
    const relatedArticles = article ? getRelatedArticles(article.id) : [];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.pageYOffset;
                const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
                setReadProgress(Math.min(progress, 100));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fixer la hauteur du carousel en fonction de l'image
    useEffect(() => {
        const updateCarouselHeight = () => {
            const carousel = carouselRef.current;
            if (carousel) {
                // Hauteur fixe pour toutes les images (600px = 37.5rem)
                setCarouselHeight('37.5rem'); // 600px
            }
        };

        updateCarouselHeight();
        window.addEventListener('resize', updateCarouselHeight);
        return () => window.removeEventListener('resize', updateCarouselHeight);
    }, [currentImage]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1e293b]">
                <div className="text-center max-w-lg mx-auto px-4">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-9xl text-[#ee5253]/20 mb-6 font-bold"
                    >
                        404
                    </motion.div>
                    <h1 className="text-4xl font-bold text-[#000000] dark:text-white mb-6">
                        {language === 'mg' ? 'Tsy hita ny vaovao' :
                            language === 'fr' ? 'Article non trouvé' :
                                'Article not found'}
                    </h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/news')}
                        className="px-8 py-4 bg-[#ee5253] hover:bg-[#932020] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        {language === 'mg' ? 'Hiverina amin\'ny lisitra' :
                            language === 'fr' ? 'Retour à la liste' :
                                'Back to list'}
                    </motion.button>
                </div>
            </div>
        );
    }

    const categoryConfig = {
        event: {
            label: { mg: 'HETSIKA', fr: 'ÉVÉNEMENT', en: 'EVENT' },
            bgColor: 'bg-[#932020]',
            textColor: 'text-white',
            icon: Target
        },
        project: {
            label: { mg: 'TETIKASA', fr: 'PROJET', en: 'PROJECT' },
            bgColor: 'bg-[#932020]',
            textColor: 'text-white',
            icon: Target
        },
        announcement: {
            label: { mg: 'FANAMBARANA', fr: 'ANNONCE', en: 'ANNOUNCEMENT' },
            bgColor: 'bg-[#932020]',
            textColor: 'text-white',
            icon: Award
        },
        culture: {
            label: { mg: 'KOLONTSAINA', fr: 'CULTURE', en: 'CULTURE' },
            bgColor: 'bg-[#932020]',
            textColor: 'text-white',
            icon: BookOpen
        },
        heritage: {
            label: { mg: 'VAKOKA', fr: 'PATRIMOINE', en: 'HERITAGE' },
            bgColor: 'bg-[#932020]',
            textColor: 'text-white',
            icon: Award
        }
    };

    const config = categoryConfig[article.category];
    const Icon = config.icon;
    const images = article.gallery ? [article.image, ...article.gallery] : [article.image];

    const shareNews = (platform: string) => {
        const url = window.location.href;
        const title = article.title[language];
        const text = article.excerpt[language];

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank', 'noopener,noreferrer');
                break;
            case 'email':
                {
                    const emailLink = document.createElement('a');
                    emailLink.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
                    emailLink.click();
                    break;
                }
            case 'copy':
                navigator.clipboard.writeText(url);
                setShowCopyAlert(true);
                setTimeout(() => setShowCopyAlert(false), 2000);
                break;
        }
        setShowShareMenu(false);
    };

    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setShowCopyAlert(true);
        setTimeout(() => setShowCopyAlert(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-white dark:bg-[#1e293b] pt-24 pb-32 relative"
        >
            {/* Reading Progress Bar */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${readProgress}%` }}
                className="fixed top-0 left-0 h-1 bg-[#ee5253] z-50"
            />

            {/* Copy Alert */}
            <AnimatePresence>
                {showCopyAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed bottom-8 right-8 z-50"
                    >
                        <div className="bg-[#ee5253] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <LinkIcon className="w-5 h-5" />
                            </motion.div>
                            <span className="font-semibold">
                                {language === 'mg' ? 'Ny rohy nohoraofina' :
                                    language === 'fr' ? 'Lien copié' :
                                        'Link copied'}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Premium Header with Back & Actions */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-12 bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                    <motion.button
                        whileHover={{ x: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/news')}
                        className="group flex items-center gap-3 px-5 py-3 bg-white dark:bg-[#1e293b] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl shadow border border-gray-300 dark:border-gray-600 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-[#ee5253] transition-colors" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#ee5253] transition-colors">
                            {language === 'mg' ? 'Hiverina' :
                                language === 'fr' ? 'Retour' :
                                    'Back'}
                        </span>
                    </motion.button>

                    <div className="flex items-center gap-4">
                        {/* Share Button */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className="p-3 bg-[#ee5253] hover:bg-[#932020] text-white rounded-xl shadow flex items-center gap-2 transition-all"
                            >
                                <Share2 className="w-5 h-5" />
                                <ChevronDown className={`w-4 h-4 transition-transform ${showShareMenu ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {showShareMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-[#1e293b] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                                    >
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                            <h4 className="font-bold text-gray-900 dark:text-white">
                                                {language === 'mg' ? 'Zaraho' : language === 'fr' ? 'Partager' : 'Share'}
                                            </h4>
                                        </div>
                                        <div className="p-2">
                                            {[
                                                { icon: Facebook, label: 'Facebook', platform: 'facebook', color: 'text-blue-600' },
                                                { icon: Twitter, label: 'Twitter', platform: 'twitter', color: 'text-blue-400' },
                                                { icon: Linkedin, label: 'LinkedIn', platform: 'linkedin', color: 'text-blue-700' },
                                                { icon: Mail, label: 'Email', platform: 'email', color: 'text-gray-600 dark:text-gray-400' },
                                                { icon: LinkIcon, label: language === 'mg' ? 'Hakana rohy' : language === 'fr' ? 'Copier le lien' : 'Copy link', platform: 'copy', color: 'text-gray-600 dark:text-gray-400' }
                                            ].map((item, index) => (
                                                <motion.button
                                                    key={item.platform}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    onClick={() => shareNews(item.platform)}
                                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                                                >
                                                    <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Premium Article Container */}
                <div className="relative">
                    {/* Sticky Sidebar */}
                    <div className="hidden lg:block absolute left-0 top-0 w-20">
                        <div className="sticky top-32 space-y-4">
                            {[
                                { icon: Heart, label: 'Like', action: () => console.log('liked') },
                                { icon: Bookmark, label: 'Save', action: () => setIsSaved(!isSaved) },
                                { icon: Share2, label: 'Share', action: () => setShowShareMenu(true) }
                            ].map((item, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.1, x: 4 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={item.action}
                                    className="flex items-center justify-center w-12 h-12 bg-white dark:bg-[#1e293b] rounded-xl shadow border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:ml-24">
                        {/* Article Header - Premium */}
                        <motion.header
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-16"
                        >
                            {/* Premium Category Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-3 mb-8"
                            >
                                <div className={`p-3 rounded-xl ${config.bgColor} shadow`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <span className={`px-5 py-2.5 rounded-full font-bold text-sm tracking-wider ${config.bgColor} ${config.textColor} shadow`}>
                                    {config.label[language]}
                                </span>
                            </motion.div>

                            {/* Article Title */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                                {article.title[language]}
                            </h1>

                            {/* Premium Meta Info */}
                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                <div className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                    <Calendar className="w-5 h-5 text-[#ee5253]" />
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">{article.date}</span>
                                </div>

                                {article.location && (
                                    <div className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                        <MapPin className="w-5 h-5 text-[#ee5253]" />
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">{article.location}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                                    <User className="w-5 h-5 text-[#ee5253]" />
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">{article.author}</span>
                                </div>
                            </div>

                            {/* Premium Excerpt */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="relative"
                            >
                                <div className="absolute -left-8 top-0 text-6xl text-[#ee5253]/20">"</div>
                                <p className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed font-light pl-8">
                                    {article.excerpt[language]}
                                </p>
                            </motion.div>
                        </motion.header>

                        {/* Premium Image Gallery - FIXED HEIGHT CAROUSEL */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-20"
                        >
                            <div 
                                ref={carouselRef}
                                className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#1e293b] shadow-2xl border border-gray-200 dark:border-gray-700"
                                style={{ height: carouselHeight }}
                            >
                                <div className="relative w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                                    <img
                                        src={images[currentImage]}
                                        alt={`${article.title[language]} - Image ${currentImage + 1}`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>

                                {/* Premium Gallery Navigation */}
                                {images.length > 1 && (
                                    <>
                                        <motion.button
                                            whileHover={{ scale: 1.1, x: -4 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setCurrentImage(prev => (prev - 1 + images.length) % images.length)}
                                            className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-3 rounded-full shadow-2xl transition-all"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.1, x: 4 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setCurrentImage(prev => (prev + 1) % images.length)}
                                            className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/80 text-white p-3 rounded-full shadow-2xl transition-all"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </motion.button>

                                        {/* Premium Dots Indicator */}
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                                            {images.map((_, index) => (
                                                <motion.button
                                                    key={index}
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setCurrentImage(index)}
                                                    className={`w-3 h-3 rounded-full transition-all ${index === currentImage
                                                        ? 'bg-[#ee5253] scale-125 shadow-lg'
                                                        : 'bg-white/50 hover:bg-white/80'
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        {/* Image Counter */}
                                        <div className="absolute top-8 right-8 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                                            {currentImage + 1} / {images.length}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            {images.length > 1 && (
                                <div className="flex gap-4 mt-8 overflow-x-auto pb-4 scrollbar-hide">
                                    {images.map((img, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05, y: -4 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCurrentImage(index)}
                                            className={`shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all relative ${index === currentImage
                                                ? 'border-[#ee5253] shadow-lg shadow-[#ee5253]/30'
                                                : 'border-transparent hover:border-gray-300'
                                                }`}
                                        >
                                            <img 
                                                src={img} 
                                                alt={`Thumbnail ${index + 1}`} 
                                                className="w-full h-full object-cover" 
                                            />
                                            {index === currentImage && (
                                                <div className="absolute inset-0 bg-[#ee5253]/20" />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Premium Article Content */}
                        <motion.div
                            ref={contentRef}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="prose prose-lg dark:prose-invert max-w-none mb-20 prose-headings:font-bold"
                        >
                            <div className="relative">
                                {/* Decorative Elements */}
                                <div className="absolute -left-8 top-0 w-1 h-full bg-[#ee5253]/20"></div>
                                
                                <div className="space-y-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                                    {article.content[language].map((paragraph, index) => (
                                        <motion.p
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ delay: index * 0.1 }}
                                            className="mb-8 text-xl"
                                        >
                                            {paragraph}
                                        </motion.p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Premium Share & Actions Footer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col lg:flex-row items-center justify-between gap-8 py-10 px-8 bg-white dark:bg-[#1e293b] rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 mb-20"
                        >
                            <div className="text-center lg:text-left">
                                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    {language === 'mg' ? 'Zarao ity vaovao ity' : 
                                     language === 'fr' ? 'Partagez cet article' : 
                                     'Share this article'}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {language === 'mg' ? 'Zarao amin\'ny namanao' : 
                                     language === 'fr' ? 'Partagez avec vos amis' : 
                                     'Share with your friends'}
                                </p>
                            </div>
                            
                            <div className="flex gap-3">
                                {[Facebook, Twitter, Linkedin, Mail].map((Icon, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.1, y: -4 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => shareNews(['facebook', 'twitter', 'linkedin', 'email'][index])}
                                        className="p-4 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 rounded-xl shadow border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.button>
                                ))}
                                {/* Bouton Copier Lien direct */}
                                <motion.button
                                    whileHover={{ scale: 1.1, y: -4 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={copyToClipboard}
                                    className="p-4 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-300 rounded-xl shadow border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                                >
                                    <LinkIcon className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Premium Related Articles */}
                        {relatedArticles.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mb-16"
                            >
                                {/* Premium Header */}
                                <div className="text-center mb-16">
                                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                        {language === 'mg' ? 'Vaovao mifandraika' :
                                            language === 'fr' ? 'Articles similaires' :
                                                'Related articles'}
                                    </h2>
                                    
                                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                        {language === 'mg' ? 'Mijery ireo vaovao hafa mety ho liana aminao' :
                                            language === 'fr' ? 'Découvrez d\'autres articles qui pourraient vous intéresser' :
                                                'Discover other articles you might be interested in'}
                                    </p>
                                </div>

                                {/* Premium Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {relatedArticles.map((relatedArticle, index) => (
                                        <motion.div
                                            key={relatedArticle.id}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + index * 0.1 }}
                                        >
                                            <NewsCard
                                                article={relatedArticle}
                                                index={index}
                                                viewMode="grid"
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* View All Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className="text-center mt-16"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(238, 82, 83, 0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate('/news')}
                                        className="group inline-flex items-center gap-4 px-10 py-4 bg-[#ee5253] hover:bg-[#932020] text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
                                    >
                                        <Eye className="w-6 h-6" />
                                        <span>
                                            {language === 'mg' ? 'Hijery ny vaovao rehetra' :
                                                language === 'fr' ? 'Voir toutes les actualités' :
                                                    'View all news'}
                                        </span>
                                        <ExternalLink className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Premium Back Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="text-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/news')}
                                className="group inline-flex items-center gap-3 px-12 py-5 bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-900 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                                <span>
                                    {language === 'mg' ? 'Hiverina' :
                                        language === 'fr' ? 'Retour' :
                                            'Back'}
                                </span>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsDetail;