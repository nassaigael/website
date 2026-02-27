import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, LinkIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNewsDetail } from '../hooks/useNewsDetail';
import { categoryConfig } from '../config/newsCategoryConfig';
import { shareNews } from '../utils/shareUtils';
import { NewsNotFound } from '../components/news/NewsNotFound';
import { NewsHeader } from '../components/news/NewsHeader';
import { NewsMetaInfo } from '../components/news/NewsMetaInfo';
import { NewsGallery } from '../components/news/NewsGallery';
import { NewsGalleryModal } from '../components/news/NewsGalleryModal';
import { NewsContent } from '../components/news/NewsContent';
import NewsCard from '../components/cards/NewsCard';

const NewsDetail = () => {
    const { language } = useLanguage();
    const {
        navigate,
        article,
        relatedArticles,
        galleryImages,
        showShareMenu,
        setShowShareMenu,
        showCopyAlert,
        setShowCopyAlert,
        readProgress,
        isGalleryOpen,
        galleryImageIndex,
        contentRef,
        openGallery,
        closeGallery,
        nextImage,
        prevImage,
        setGalleryImageIndex
    } = useNewsDetail();

    if (!article) return <NewsNotFound onBack={() => navigate('/news')} />;

    const config = categoryConfig[article.category];
    const Icon = config.icon;
    const articleUrl = window.location.href;

    const handleShare = (platform: string) => {
        shareNews(
            platform,
            articleUrl,
            article.title[language],
            article.excerpt[language],
            setShowCopyAlert,
            setShowShareMenu
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
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
            {/* Galerie Modale */}
            <NewsGalleryModal
                isOpen={isGalleryOpen}
                onClose={closeGallery}
                images={galleryImages}
                currentIndex={galleryImageIndex}
                onNext={nextImage}
                onPrev={prevImage}
                onSelectImage={setGalleryImageIndex}
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

            {/* Éléments décoratifs */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-20 left-20 w-96 h-96 bg-[#ee5253]/5 rounded-full blur-3xl" />
                <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-20 right-20 w-96 h-96 bg-[#932020]/5 rounded-full blur-3xl" />
            </div>

            {/* Progress Bar */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${readProgress}%` }}
                className="fixed top-0 left-0 h-1 bg-[#ee5253] z-50"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header avec bouton retour et partage */}
                <NewsHeader
                    onBack={() => navigate('/news')}
                    showShareMenu={showShareMenu}
                    setShowShareMenu={setShowShareMenu}
                    articleTitle={article.title[language]}
                    articleExcerpt={article.excerpt[language]}
                    articleUrl={articleUrl}
                    onShare={handleShare}
                />

                {/* Contenu principal */}
                <div className="lg:ml-0">
                    {/* En-tête de l'article */}
                    <motion.header variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-8">
                            <div className={`p-3 rounded-xl ${config.lightBg} border border-[#ee5253]/20`}>
                                <Icon className="w-6 h-6 text-[#ee5253]" />
                            </div>
                            <span className={`px-5 py-2.5 rounded-full font-bold text-sm tracking-wider ${config.bgColor} ${config.textColor} shadow-lg`}>
                                {config.label[language]}
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                            {article.title[language]}
                        </motion.h1>

                        <NewsMetaInfo
                            date={article.date}
                            location={article.location}
                            author={article.author}
                        />

                        <motion.div variants={itemVariants} className="relative">
                            <div className="absolute -left-8 top-0 text-6xl text-[#ee5253]/10">"</div>
                            <p className="text-2xl sm:text-3xl text-gray-700 dark:text-white leading-relaxed font-light pl-8">
                                {article.excerpt[language]}
                            </p>
                        </motion.div>
                    </motion.header>

                    {/* Galerie d'images */}
                    <NewsGallery
                        images={galleryImages}
                        mainImage={article.image}
                        title={article.title[language]}
                        onOpenGallery={openGallery}
                    />

                    {/* Contenu de l'article */}
                    <NewsContent
                        ref={contentRef}
                        content={article.content[language]}
                        language={language}
                    />

                    {/* Articles similaires */}
                    {relatedArticles.length > 0 && (
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
                            <div className="text-center mb-16">
                                <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                    {language === 'mg' ? 'Vaovao mifandraika' : language === 'fr' ? 'Articles similaires' : 'Related articles'}
                                </motion.h2>
                                <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                    {language === 'mg' ? 'Mijery ireo vaovao hafa mety ho liana aminao' :
                                        language === 'fr' ? 'Découvrez d\'autres articles qui pourraient vous intéresser' :
                                            'Discover other articles you might be interested in'}
                                </motion.p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedArticles.map((relatedArticle, index) => (
                                    <motion.div key={relatedArticle.id} variants={itemVariants} custom={index}>
                                        <NewsCard article={relatedArticle} index={index} viewMode="grid" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Bouton retour */}
                    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/news')}
                            className="group inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-[#0f172a] hover:bg-gray-200 dark:hover:bg-[#1a1f2e] text-gray-700 dark:text-white font-bold rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-800/35 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform text-[#ee5253]" />
                            <span>{language === 'mg' ? 'Hiverina' : language === 'fr' ? 'Retour' : 'Back'}</span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default NewsDetail;