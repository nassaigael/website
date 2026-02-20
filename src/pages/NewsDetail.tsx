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
    Target,
    Award,
    ChevronDown,
    ExternalLink,
    Sparkles,
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
    const [readProgress, setReadProgress] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);
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

    if (!article) {
        return (
            <div className="min-h-screen bg-[#1e293b] flex items-center justify-center px-4">
                <div className="text-center max-w-lg mx-auto">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-9xl text-[#ee5253]/20 mb-6 font-bold"
                    >
                        404
                    </motion.div>
                    <h1 className="text-4xl font-bold text-white mb-6">
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
            bgColor: 'bg-[#ee5253]',
            textColor: 'text-white',
            icon: Target,
            lightBg: 'bg-[#ee5253]'
        },
        project: {
            label: { mg: 'TETIKASA', fr: 'PROJET', en: 'PROJECT' },
            bgColor: 'bg-[#ee5253]',
            textColor: 'text-white',
            icon: Target,
            lightBg: 'bg-[#ee5253]'
        },
        announcement: {
            label: { mg: 'FANAMBARANA', fr: 'ANNONCE', en: 'ANNOUNCEMENT' },
            bgColor: 'bg-[#ee5253]',
            textColor: 'text-white',
            icon: Award,
            lightBg: 'bg-[#ee5253]'
        },
        culture: {
            label: { mg: 'KOLONTSAINA', fr: 'CULTURE', en: 'CULTURE' },
            bgColor: 'bg-[#ee5253]',
            textColor: 'text-white',
            icon: BookOpen,
            lightBg: 'bg-[#ee5253]'
        },
        heritage: {
            label: { mg: 'VAKOKA', fr: 'PATRIMOINE', en: 'HERITAGE' },
            bgColor: 'bg-[#ee5253]',
            textColor: 'text-white',
            icon: Award,
            lightBg: 'bg-[#ee5253]'
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
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'email':
                // eslint-disable-next-line react-hooks/immutability
                window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                setShowCopyAlert(true);
                setTimeout(() => setShowCopyAlert(false), 2000);
                break;
        }
        setShowShareMenu(false);
    };

    // Variants d'animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#1e293b] pb-16 md:pb-20 relative overflow-hidden pt-8"
        >
            {/* Éléments décoratifs d'arrière-plan */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-20 w-96 h-96 bg-linear-to-r from-[#ee5253]/5 to-[#932020]/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-linear-to-r from-[#932020]/5 to-[#ee5253]/5 rounded-full blur-3xl"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,82,83,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(147,32,32,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />
            </div>

            {/* Lignes décoratives */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#ee5253]/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#932020]/30 to-transparent" />

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
                {/* Premium Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center justify-between mb-12"
                >
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ x: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/news')}
                        className="group flex items-center gap-3 px-5 py-3 bg-[#0f172a] rounded-xl border border-gray-800 hover:border-[#ee5253] transition-all"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#ee5253] group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-gray-300 group-hover:text-white transition-colors">
                            {language === 'mg' ? 'Hiverina' :
                                language === 'fr' ? 'Retour' :
                                    'Back'}
                        </span>
                    </motion.button>

                    <motion.div variants={itemVariants} className="flex items-center gap-4">
                        {/* Share Button */}
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className="p-3 bg-[#0f172a] text-white rounded-xl border border-gray-800 hover:border-[#ee5253] flex items-center gap-2 transition-all"
                            >
                                <Share2 className="w-5 h-5 text-[#ee5253]" />
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showShareMenu ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {showShareMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full mt-2 right-0 w-64 bg-[#0f172a] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden z-50"
                                    >
                                        <div className="p-4 border-b border-gray-800">
                                            <h4 className="font-bold text-white">
                                                {language === 'mg' ? 'Zaraho' : language === 'fr' ? 'Partager' : 'Share'}
                                            </h4>
                                        </div>
                                        <div className="p-2">
                                            {[
                                                { icon: Facebook, label: 'Facebook', platform: 'facebook' },
                                                { icon: Twitter, label: 'Twitter', platform: 'twitter' },
                                                { icon: Linkedin, label: 'LinkedIn', platform: 'linkedin' },
                                                { icon: Mail, label: 'Email', platform: 'email' },
                                                { icon: LinkIcon, label: language === 'mg' ? 'Hakana rohy' : language === 'fr' ? 'Copier le lien' : 'Copy link', platform: 'copy' }
                                            ].map((item, index) => (
                                                <motion.button
                                                    key={item.platform}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    onClick={() => shareNews(item.platform)}
                                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors group"
                                                >
                                                    <item.icon className="w-5 h-5 text-[#ee5253] group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm text-gray-300 group-hover:text-white font-medium">{item.label}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Main Content */}
                <div className="lg:ml-0">
                    {/* Article Header */}
                    <motion.header
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-16"
                    >
                        {/* Category Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-3 mb-8"
                        >
                            <div className={`p-3 rounded-xl ${config.lightBg} border border-[#ee5253]/20`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className={`px-5 py-2.5 rounded-full font-bold text-sm tracking-wider ${config.bgColor} ${config.textColor} shadow-lg`}>
                                {config.label[language]}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight"
                        >
                            {article.title[language]}
                        </motion.h1>

                        {/* Meta Info */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-6 mb-8"
                        >
                            <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0f172a] rounded-xl border border-gray-800">
                                <Calendar className="w-5 h-5 text-[#ee5253]" />
                                <span className="font-semibold text-white">{article.date}</span>
                            </div>

                            {article.location && (
                                <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0f172a] rounded-xl border border-gray-800">
                                    <MapPin className="w-5 h-5 text-[#ee5253]" />
                                    <span className="font-semibold text-white">{article.location}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0f172a] rounded-xl border border-gray-800">
                                <User className="w-5 h-5 text-[#ee5253]" />
                                <span className="font-semibold text-white">{article.author}</span>
                            </div>
                        </motion.div>

                        {/* Excerpt */}
                        <motion.div
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="absolute -left-8 top-0 text-6xl text-[#ee5253]/20">"</div>
                            <p className="text-2xl sm:text-3xl text-white leading-relaxed font-light pl-8">
                                {article.excerpt[language]}
                            </p>
                        </motion.div>
                    </motion.header>

                    {/* Image Gallery */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-20"
                    >
                        <div 
                            ref={carouselRef}
                            className="relative rounded-3xl overflow-hidden bg-[#0f172a] shadow-2xl border border-gray-800"
                            style={{ height: '37.5rem' }}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                {isImageLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 border-4 border-[#ee5253]/30 border-t-[#ee5253] rounded-full animate-spin" />
                                    </div>
                                )}
                                <img
                                    src={images[currentImage]}
                                    alt={`${article.title[language]} - Image ${currentImage + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                    onLoad={() => setIsImageLoading(false)}
                                />
                            </div>

                            {images.length > 1 && (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.1, x: -4 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setCurrentImage(prev => (prev - 1 + images.length) % images.length)}
                                        className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#ee5253] text-white p-3 rounded-full shadow-2xl transition-all"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.1, x: 4 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setCurrentImage(prev => (prev + 1) % images.length)}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#ee5253] text-white p-3 rounded-full shadow-2xl transition-all"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </motion.button>

                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, index) => (
                                            <motion.button
                                                key={index}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setCurrentImage(index)}
                                                className={`w-3 h-3 rounded-full transition-all ${index === currentImage
                                                    ? 'bg-linear-to-r from-[#ee5253] to-[#932020] scale-125 shadow-lg'
                                                    : 'bg-gray-600 hover:bg-gray-500'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <div className="absolute top-8 right-8 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                                        {currentImage + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="flex gap-4 mt-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#ee5253]/20 scrollbar-track-transparent">
                                {images.map((img, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setCurrentImage(index)}
                                        className={`shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all relative ${
                                            index === currentImage
                                                ? 'border-[#ee5253] shadow-lg shadow-[#ee5253]/30'
                                                : 'border-transparent hover:border-gray-600'
                                        }`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Thumbnail ${index + 1}`} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Article Content */}
                    <motion.div
                        ref={contentRef}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-20"
                    >
                        <div className="relative">
                            <div className="absolute -left-8 top-0 w-1 h-full bg-linear-to-b from-[#ee5253] via-[#932020] to-transparent"></div>
                            
                            <div className="space-y-8 text-white text-lg leading-relaxed">
                                {article.content[language].map((paragraph, index) => (
                                    <motion.p
                                        key={index}
                                        variants={itemVariants}
                                        className="mb-8 text-xl hover:translate-x-2 transition-transform duration-300"
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Share Footer */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col lg:flex-row items-center justify-between gap-8 py-10 px-8 bg-[#0f172a] rounded-3xl shadow-2xl border border-gray-800 mb-20"
                    >
                        <div className="text-center lg:text-left">
                            <h4 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-[#ee5253]" />
                                {language === 'mg' ? 'Zarao ity vaovao ity' : 
                                 language === 'fr' ? 'Partagez cet article' : 
                                 'Share this article'}
                            </h4>
                            <p className="text-white">
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
                                    className="p-4 bg-[#1e293b] text-white rounded-xl border border-gray-700 hover:border-[#ee5253] hover:text-[#ee5253] hover:bg-[#1e293b]/80 transition-all"
                                >
                                    <Icon className="w-5 h-5 text-white" />
                                </motion.button>
                            ))}
                            <motion.button
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => shareNews('copy')}
                                className="p-4 bg-[#1e293b] text-gray-300 rounded-xl border border-gray-700 hover:border-[#ee5253] hover:text-[#ee5253] hover:bg-[#1e293b]/80 transition-all"
                            >
                                <LinkIcon className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-16"
                        >
                            <div className="text-center mb-16">
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-4xl sm:text-5xl font-bold text-white mb-6"
                                >
                                    {language === 'mg' ? 'Vaovao mifandraika' :
                                        language === 'fr' ? 'Articles similaires' :
                                            'Related articles'}
                                </motion.h2>
                                
                                <motion.p
                                    variants={itemVariants}
                                    className="text-xl text-white max-w-2xl mx-auto"
                                >
                                    {language === 'mg' ? 'Mijery ireo vaovao hafa mety ho liana aminao' :
                                        language === 'fr' ? 'Découvrez d\'autres articles qui pourraient vous intéresser' :
                                            'Discover other articles you might be interested in'}
                                </motion.p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedArticles.map((relatedArticle, index) => (
                                    <motion.div
                                        key={relatedArticle.id}
                                        variants={itemVariants}
                                        custom={index}
                                    >
                                        <NewsCard
                                            article={relatedArticle}
                                            index={index}
                                            viewMode="grid"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                variants={itemVariants}
                                className="text-center mt-16"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => navigate('/news')}
                                    className="group inline-flex items-center gap-4 px-10 py-4 bg-gradient-to-r from-[#ee5253] to-[#932020] text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
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

                    {/* Back Button */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/news')}
                            className="group inline-flex items-center gap-3 px-12 py-5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl border border-gray-800 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform text-[#ee5253]" />
                            <span>
                                {language === 'mg' ? 'Hiverina' :
                                    language === 'fr' ? 'Retour' :
                                        'Back'}
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsDetail;