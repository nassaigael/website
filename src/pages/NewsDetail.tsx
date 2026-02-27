import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    MapPin,
    User,
    ArrowLeft,
    Share2,
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
    Camera,
    X,
    Grid,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { newsArticles, getRelatedArticles } from '../data/index';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import NewsCard from '../components/cards/NewsCard';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    const [readProgress, setReadProgress] = useState(0);
    const [selectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImageIndex, setGalleryImageIndex] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

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

    // Gérer le overflow du body
    useEffect(() => {
        if (isModalOpen || isGalleryOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen, isGalleryOpen]);

    if (!article) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#1e293b] flex items-center justify-center px-4">
                <div className="text-center max-w-lg mx-auto">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-9xl text-[#ee5253]/10 dark:text-[#ee5253]/20 mb-6 font-bold"
                    >
                        404
                    </motion.div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
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
            lightBg: 'bg-[#ee5253]/10',
            lightText: 'text-[#ee5253]'
        },
        project: {
            label: { mg: 'TETIKASA', fr: 'PROJET', en: 'PROJECT' },
            bgColor: 'bg-[#ee5253]',
            textColor: 'text-white',
            icon: Target,
            lightBg: 'bg-[#ee5253]/10',
            lightText: 'text-[#ee5253]'
        },
        announcement: {
            label: { mg: 'FANAMBARANA', fr: 'ANNONCE', en: 'ANNOUNCEMENT' },
            bgColor: 'bg-[#ee5253]',
            textColor: 'text-white',
            icon: Award,
            lightBg: 'bg-[#ee5253]/10',
            lightText: 'text-[#ee5253]'
        },
        culture: {
            label: { mg: 'KOLONTSAINA', fr: 'CULTURE', en: 'CULTURE' },
            bgColor: 'bg-[#ee5253]',
            textColor: 'text-white',
            icon: BookOpen,
            lightBg: 'bg-[#ee5253]/10',
            lightText: 'text-[#ee5253]'
        },
        heritage: {
            label: { mg: 'VAKOKA', fr: 'PATRIMOINE', en: 'HERITAGE' },
            bgColor: 'bg-[#ee5253]',
            textColor: 'text-white',
            icon: Award,
            lightBg: 'bg-[#ee5253]/10',
            lightText: 'text-[#ee5253]'
        }
    };

    const config = categoryConfig[article.category];
    const Icon = config.icon;

    // Créer un tableau d'images pour la galerie
    const galleryImages = article.gallery ? [article.image, ...article.gallery] : [article.image];

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
            case 'email': {
                const mailtoLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
                window.open(mailtoLink, '_blank');
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

    const openGallery = (index: number = 0) => {
        setGalleryImageIndex(index);
        setIsGalleryOpen(true);
    };

    const closeGallery = () => {
        setIsGalleryOpen(false);
    };

    const nextImage = () => {
        setGalleryImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setGalleryImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

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
            className="min-h-screen bg-white dark:bg-[#1e293b] pb-16 md:pb-20 relative overflow-hidden pt-8"
        >
            {/* Galerie Premium - Nouvelle page */}
            <AnimatePresence>
                {isGalleryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-black"
                    >
                        {/* Fond avec particules animées */}
                        <div className="absolute inset-0 overflow-hidden">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                    rotate: [0, 90, 0],
                                }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(238,82,83,0.15) 0%, transparent 70%)',
                                }}
                            />

                            {/* Grille décorative */}
                            <div className="absolute inset-0" style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(238,82,83,0.1) 1px, transparent 0)`,
                                backgroundSize: '50px 50px'
                            }} />
                        </div>

                        {/* Bouton fermer */}
                        <motion.button
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            onClick={closeGallery}
                            className="absolute top-6 right-6 z-50 p-4 bg-white/10 backdrop-blur-md hover:bg-[#ee5253] text-white rounded-2xl shadow-2xl transition-all duration-300 border border-white/20"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        {/* Image principale */}
                        <div className="relative h-full flex items-center justify-center px-4 lg:px-20">
                            <motion.div
                                key={galleryImageIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="relative max-w-7xl w-full"
                            >
                                <img
                                    src={galleryImages[galleryImageIndex]}
                                    alt={`Gallery ${galleryImageIndex + 1}`}
                                    className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                                />
                            </motion.div>

                            {/* Navigation flèches */}
                            {galleryImages.length > 1 && (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.1, x: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={prevImage}
                                        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md hover:bg-[#ee5253] text-white rounded-full shadow-2xl transition-all duration-300 border border-white/20"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.1, x: 4 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={nextImage}
                                        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md hover:bg-[#ee5253] text-white rounded-full shadow-2xl transition-all duration-300 border border-white/20"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </motion.button>
                                </>
                            )}
                        </div>

                        {/* Barre d'informations - CORRIGÉE */}
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-8 px-4"
                        >
                            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
                                {/* Compteur */}
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-[#ee5253] flex items-center justify-center text-white font-bold text-lg">
                                        {galleryImageIndex + 1}
                                    </div>
                                    <span className="text-white/60 text-lg">
                                        / {galleryImages.length}
                                    </span>
                                </div>

                                {/* Miniatures */}
                                <div className="flex gap-2 overflow-x-auto pb-2 max-w-full scrollbar-thin scrollbar-thumb-[#ee5253] scrollbar-track-transparent">
                                    {galleryImages.map((img, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ y: -4, scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setGalleryImageIndex(idx)}
                                            className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${idx === galleryImageIndex
                                                    ? 'border-[#ee5253] shadow-xl shadow-[#ee5253]/30 scale-110'
                                                    : 'border-white/20 hover:border-white/40'
                                                }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`Thumbnail ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {idx === galleryImageIndex && (
                                                <div className="absolute inset-0 bg-[#ee5253]/20" />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Titre - CORRIGÉ avec galleryImageIndex */}
                                <p className="text-white/80 text-sm max-w-md text-center lg:text-right">
                                    {galleryImageIndex === 0
                                        ? (language === 'mg' ? 'Sary fototra' :
                                            language === 'fr' ? 'Image principale' :
                                                'Main image')
                                        : (language === 'mg' ? `Sary ${galleryImageIndex}` :
                                            language === 'fr' ? `Photo ${galleryImageIndex}` :
                                                `Photo ${galleryImageIndex}`)
                                    }
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modale d'image simple (pour compatibilité) */}
            <AnimatePresence>
                {isModalOpen && selectedImage && !isGalleryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative max-w-6xl max-h-[90vh] mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Gallery"
                                className="max-w-full max-h-[90vh] object-contain rounded-2xl"
                            />
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute -top-4 -right-4 p-3 bg-[#ee5253] text-white rounded-full shadow-xl hover:bg-[#932020] transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Éléments décoratifs d'arrière-plan */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-20 w-96 h-96 bg-[#ee5253]/5 dark:bg-[#ee5253]/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-[#932020]/5 dark:bg-[#932020]/5 rounded-full blur-3xl"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,82,83,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(147,32,32,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />
                <div className="absolute top-40 right-40 w-32 h-32 border border-[#ee5253]/10 rounded-full" />
                <div className="absolute bottom-40 left-40 w-48 h-48 border border-[#932020]/10 rotate-45" />
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
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
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
                {/* Header */}
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
                        className="group flex items-center gap-3 px-5 py-3 bg-gray-100 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#ee5253] hover:bg-gray-50 dark:hover:bg-[#1a1f2e] transition-all"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-[#ee5253] group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-gray-700 dark:text-white group-hover:text-[#ee5253] transition-colors">
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
                                className="p-3 bg-gray-100 dark:bg-[#0f172a] text-gray-700 dark:text-white rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#ee5253] hover:bg-gray-50 dark:hover:bg-[#1a1f2e] flex items-center gap-2 transition-all"
                            >
                                <Share2 className="w-5 h-5 text-gray-700 dark:text-[#ee5253]" />
                                <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${showShareMenu ? 'rotate-180' : ''}`} />
                            </motion.button>

                            <AnimatePresence>
                                {showShareMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full mt-2 right-0 w-16 bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                                    >
                                        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-center">
                                            <h4 className="font-light text-[12px] text-gray-500 dark:text-white">
                                                {language === 'mg' ? 'Zaraho' : language === 'fr' ? 'Partager' : 'Share'}
                                            </h4>
                                        </div>
                                        <div className="p-2">
                                            {[
                                                { icon: Facebook, platform: 'facebook' },
                                                { icon: Linkedin, platform: 'linkedin' },
                                                { icon: Mail, platform: 'email' },
                                                { icon: LinkIcon, platform: 'copy' }
                                            ].map((item, index) => (
                                                <motion.button
                                                    key={item.platform}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    onClick={() => shareNews(item.platform)}
                                                    className="flex items-center gap-1 w-full px-4 py-3 rounded-xl hover:bg-[#ee5253] hover:text-white text-gray-700 dark:text-gray-300 transition-colors group"
                                                >
                                                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
                                <Icon className="w-6 h-6 text-[#ee5253]" />
                            </div>
                            <span className={`px-5 py-2.5 rounded-full font-bold text-sm tracking-wider ${config.bgColor} ${config.textColor} shadow-lg`}>
                                {config.label[language]}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
                        >
                            {article.title[language]}
                        </motion.h1>

                        {/* Meta Info */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-6 mb-8"
                        >
                            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-800">
                                <Calendar className="w-5 h-5 text-[#ee5253]" />
                                <span className="font-semibold text-gray-700 dark:text-white">{article.date}</span>
                            </div>

                            {article.location && (
                                <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-800">
                                    <MapPin className="w-5 h-5 text-[#ee5253]" />
                                    <span className="font-semibold text-gray-700 dark:text-white">{article.location}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-800">
                                <User className="w-5 h-5 text-[#ee5253]" />
                                <span className="font-semibold text-gray-700 dark:text-white">{article.author}</span>
                            </div>
                        </motion.div>

                        {/* Excerpt */}
                        <motion.div
                            variants={itemVariants}
                            className="relative"
                        >
                            <div className="absolute -left-8 top-0 text-6xl text-[#ee5253]/10 dark:text-[#ee5253]/20">"</div>
                            <p className="text-2xl sm:text-3xl text-gray-700 dark:text-white leading-relaxed font-light pl-8">
                                {article.excerpt[language]}
                            </p>
                        </motion.div>
                    </motion.header>

                    {/* Image principale de l'article */}
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-12"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 group flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <img
                                src={article.image}
                                alt={article.title[language]}
                                className="w-[70%] h-80 object-contain"
                            />

                            {/* Bouton pour ouvrir la galerie complète */}
                            {galleryImages.length > 1 && (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => openGallery(0)}
                                    className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md hover:bg-[#ee5253] text-white rounded-xl transition-all duration-300 border border-white/20"
                                >
                                    <Grid className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {language === 'mg' ? 'Jereo ny sary rehetra' :
                                            language === 'fr' ? 'Voir toutes les photos' :
                                                'View all photos'}
                                    </span>
                                    <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                        {galleryImages.length}
                                    </span>
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    {/* Aperçu de la galerie (miniatures) */}
                    {galleryImages.length > 1 && (
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-16"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Camera className="w-5 h-5 text-[#ee5253]" />
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {language === 'mg' ? "Sary mampiseho" :
                                            language === 'fr' ? "Aperçu de la galerie" :
                                                "Gallery preview"}
                                    </h3>
                                </div>
                                <button
                                    onClick={() => openGallery(0)}
                                    className="text-sm text-[#ee5253] hover:text-[#932020] transition-colors flex items-center gap-1"
                                >
                                    {language === 'mg' ? "Jereo daholo" :
                                        language === 'fr' ? "Voir tout" :
                                            "View all"}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                                {galleryImages.slice(0, 6).map((image, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => openGallery(index)}
                                        className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                                    >
                                        <img
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {index === 5 && galleryImages.length > 6 && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                                                +{galleryImages.length - 5}
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Article Content */}
                    <motion.div
                        ref={contentRef}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-20"
                    >
                        <div className="relative">
                            <div className="absolute -left-8 top-0 w-1 h-full bg-linear-to-b from-[#ee5253] via-[#ee5253]/50 to-transparent"></div>

                            <div className="space-y-8 text-gray-700 dark:text-white text-lg leading-relaxed">
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
                        className="flex flex-col lg:flex-row items-center justify-between gap-8 py-10 px-8 bg-gray-100 dark:bg-[#0f172a] rounded-3xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-gray-800 mb-20"
                    >
                        <div className="text-center lg:text-left">
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-[#ee5253]" />
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
                                    className="p-4 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#ee5253] hover:text-[#ee5253] hover:bg-gray-50 dark:hover:bg-[#1e293b]/80 transition-all"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.button>
                            ))}
                            <motion.button
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => shareNews('copy')}
                                className="p-4 bg-white dark:bg-[#1e293b] text-gray-700 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#ee5253] hover:text-[#ee5253] hover:bg-gray-50 dark:hover:bg-[#1e293b]/55 transition-all"
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
                                    className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                                >
                                    {language === 'mg' ? 'Vaovao mifandraika' :
                                        language === 'fr' ? 'Articles similaires' :
                                            'Related articles'}
                                </motion.h2>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
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
                                    className="group inline-flex items-center gap-4 px-10 py-4 bg-[#ee5253] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
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
                            className="group inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-[#0f172a] hover:bg-gray-200 dark:hover:bg-[#1a1f2e] text-gray-700 dark:text-white font-bold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-800/35 transition-all"
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