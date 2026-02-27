import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsArticles, getRelatedArticles } from '../data/index';

export const useNewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    const [readProgress, setReadProgress] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryImageIndex, setGalleryImageIndex] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const article = newsArticles.find(a => a.id === parseInt(id || '0'));
    const relatedArticles = article ? getRelatedArticles(article.id) : [];
    const galleryImages = article?.gallery ? [article.image, ...article.gallery] : (article ? [article.image] : []);

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

    useEffect(() => {
        if (isGalleryOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isGalleryOpen]);

    const openGallery = (index: number = 0) => {
        setGalleryImageIndex(index);
        setIsGalleryOpen(true);
    };

    const closeGallery = () => setIsGalleryOpen(false);
    
    const nextImage = () => setGalleryImageIndex((prev) => (prev + 1) % galleryImages.length);
    const prevImage = () => setGalleryImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

    return {
        id,
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
    };
};