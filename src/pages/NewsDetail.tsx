import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    MapPin,
    Clock,
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
    ArrowRight
} from 'lucide-react';
import { newsArticles, getRelatedArticles } from '../data/news';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import NewsCard from '../components/sections/NewsCard';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [currentImage, setCurrentImage] = useState(0);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showCopyAlert, setShowCopyAlert] = useState(false);

    const article = newsArticles.find(a => a.id === parseInt(id || '0'));
    const relatedArticles = article ? getRelatedArticles(article.id) : [];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
                <div className="text-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-9xl text-[#ee5253]/20 mb-6"
                    >
                        404
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {language === 'mg' ? 'Tsy hita ny vaovao' :
                            language === 'fr' ? 'Article non trouvé' :
                                'Article not found'}
                    </h1>
                    <button
                        onClick={() => navigate('/news')}
                        className="px-6 py-3 bg-linear-to-r from-[#ee5253] to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                        {language === 'mg' ? 'Hiverina amin\'ny lisitra' :
                            language === 'fr' ? 'Retour à la liste' :
                                'Back to list'}
                    </button>
                </div>
            </div>
        );
    }

    const categoryConfig = {
        event: {
            label: { mg: 'HETSIKA', fr: 'ÉVÉNEMENT', en: 'EVENT' },
            color: 'bg-[#ee5253]'
        },
        project: {
            label: { mg: 'TETIKASA', fr: 'PROJET', en: 'PROJECT' },
            color: 'bg-[#ee5253]'
        },
        announcement: {
            label: { mg: 'FANAMBARANA', fr: 'ANNONCE', en: 'ANNOUNCEMENT' },
            color: 'bg-[#ee5253]'
        },
        culture: {
            label: { mg: 'KOLONTSAINA', fr: 'CULTURE', en: 'CULTURE' },
            color: 'bg-[#ee5253]'
        },
        heritage: {
            label: { mg: 'VAKOKA', fr: 'PATRIMOINE', en: 'HERITAGE' },
            color: 'bg-[#ee5253]'
        }
    };

    const config = categoryConfig[article.category];
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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 pt-24 pb-20"
        >
            {/* Copy Alert */}
            <AnimatePresence>
                {showCopyAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed bottom-6 right-6 z-50"
                    >
                        <div className="bg-[#ee5253] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
                            <LinkIcon className="w-5 h-5" />
                            <span>
                                {language === 'mg' ? 'Ny rohy nohoraofina' :
                                    language === 'fr' ? 'Lien copié' :
                                        'Link copied'}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button & Actions */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <motion.button
                        whileHover={{ x: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/news')}
                        className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl hover:bg-[#ee5253] border border-gray-200 dark:border-gray-800 transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
                        <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors">
                            {language === 'mg' ? 'Hiverina' :
                                language === 'fr' ? 'Retour' :
                                    'Back'}
                        </span>
                    </motion.button>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className="p-3 bg-[#ee5253] text-white rounded-xl shadow-lg hover:shadow-xl"
                            >
                                <Share2 className="w-5 h-5" />
                            </motion.button>

                            <AnimatePresence>
                                {showShareMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50"
                                    >
                                        {[
                                            { icon: Facebook, label: 'Facebook', platform: 'facebook' },
                                            { icon: Twitter, label: 'Twitter', platform: 'twitter' },
                                            { icon: Linkedin, label: 'LinkedIn', platform: 'linkedin' },
                                            { icon: Mail, label: 'Email', platform: 'email' },
                                            { icon: LinkIcon, label: 'Copier le lien', platform: 'copy' }
                                        ].map((item, index) => (
                                            <motion.button
                                                key={item.platform}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => shareNews(item.platform)}
                                                className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            >
                                                <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Article Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className={`px-4 py-2 rounded-full ${config.color} text-white font-bold text-sm tracking-wider`}>
                            {config.label[language]}
                        </span>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{article.date}</span>
                            </div>

                            {article.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{article.location}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime} min {language === 'mg' ? 'faharoa' : language === 'fr' ? 'de lecture' : 'read'}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{article.author}</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                        {article.title[language]}
                    </h1>

                    <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {article.excerpt[language]}
                    </p>
                </motion.header>

                {/* Main Image Gallery */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <div className="relative rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-2xl">
                        <img
                            src={images[currentImage]}
                            alt={`${article.title[language]} - Image ${currentImage + 1}`}
                            className="w-full h-125 sm:h-150 object-cover"
                        />

                        {/* Gallery Navigation */}
                        {images.length > 1 && (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setCurrentImage(prev => (prev - 1 + images.length) % images.length)}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setCurrentImage(prev => (prev + 1) % images.length)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </motion.button>

                                {/* Dots */}
                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                                    {images.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setCurrentImage(index)}
                                            className={`w-3 h-3 rounded-full transition-all ${index === currentImage
                                                    ? 'bg-white scale-125'
                                                    : 'bg-white/50 hover:bg-white/80'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                            {images.map((img, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentImage(index)}
                                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImage
                                            ? 'border-[#ee5253] shadow-lg'
                                            : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </motion.button>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="prose prose-lg dark:prose-invert max-w-none mb-16"
                >
                    <div className="text-gray-700 dark:text-gray-300 space-y-6 text-lg leading-relaxed">
                        {article.content[language].map((paragraph, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="mb-6"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>

                {/* Tags & Share Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-b border-gray-200 dark:border-gray-800 mb-16"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                            {language === 'mg' ? 'Zarao :' : language === 'fr' ? 'Partager :' : 'Share :'}
                        </span>
                        <div className="flex gap-2">
                            {[Facebook, Twitter, Linkedin].map((Icon, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => shareNews(['facebook', 'twitter', 'linkedin'][index])}
                                    className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mb-16"
                    >
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {language === 'mg' ? 'Vaovao mifandraika' :
                                        language === 'fr' ? 'Articles similaires' :
                                            'Related articles'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {language === 'mg' ? 'Mijery ireo vaovao hafa mety ho liana aminao' :
                                        language === 'fr' ? 'Découvrez d\'autres articles qui pourraient vous intéresser' :
                                            'Discover other articles you might be interested in'}
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/news')}
                                className="flex items-center gap-2 text-[#ee5253] font-semibold group"
                            >
                                <span>
                                    {language === 'mg' ? 'Hijery ny rehetra' :
                                        language === 'fr' ? 'Voir tout' :
                                            'View all'}
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArticles.map((relatedArticle, index) => (
                                <NewsCard
                                    key={relatedArticle.id}
                                    article={relatedArticle}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Back to News Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/news')}
                        className="px-10 py-4 bg-[#ee5253] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        {language === 'mg' ? 'Hiverina amin\'ny vaovao rehetra' :
                            language === 'fr' ? 'Retour à toutes les actualités' :
                                'Back to all news'}
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default NewsDetail;