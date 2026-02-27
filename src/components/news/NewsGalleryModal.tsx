import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewsGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
    currentIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onSelectImage: (index: number) => void;
}

export const NewsGalleryModal = ({
    isOpen,
    onClose,
    images,
    currentIndex,
    onNext,
    onPrev,
    onSelectImage
}: NewsGalleryModalProps) => {
    const { language } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-black"
                >
                    {/* Fond avec particules */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                                rotate: [0, 90, 0],
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(238,82,83,0.15) 0%, transparent 70%)',
                            }}
                        />
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
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-4 bg-white/10 backdrop-blur-md hover:bg-[#ee5253] text-white rounded-2xl shadow-2xl transition-all duration-300 border border-white/20"
                    >
                        <X className="w-6 h-6" />
                    </motion.button>

                    {/* Image principale */}
                    <div className="relative h-full flex items-center justify-center px-4 lg:px-20">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-7xl w-full"
                        >
                            <img
                                src={images[currentIndex]}
                                alt={`Gallery ${currentIndex + 1}`}
                                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                            />
                        </motion.div>

                        {/* Navigation flèches */}
                        {images.length > 1 && (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1, x: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onPrev}
                                    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md hover:bg-[#ee5253] text-white rounded-full shadow-2xl transition-all duration-300 border border-white/20"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1, x: 4 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onNext}
                                    className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md hover:bg-[#ee5253] text-white rounded-full shadow-2xl transition-all duration-300 border border-white/20"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </motion.button>
                            </>
                        )}
                    </div>

                    {/* Barre d'informations */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/80 to-transparent pt-20 pb-8 px-4"
                    >
                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
                            {/* Compteur */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#ee5253] flex items-center justify-center text-white font-bold text-lg">
                                    {currentIndex + 1}
                                </div>
                                <span className="text-white/60 text-lg">/ {images.length}</span>
                            </div>

                            {/* Miniatures */}
                            <div className="flex gap-2 overflow-x-auto pb-2 max-w-full scrollbar-thin scrollbar-thumb-[#ee5253] scrollbar-track-transparent">
                                {images.map((img, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ y: -4, scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => onSelectImage(idx)}
                                        className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                                            idx === currentIndex
                                                ? 'border-[#ee5253] shadow-xl shadow-[#ee5253]/30 scale-110'
                                                : 'border-white/20 hover:border-white/40'
                                        }`}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                        {idx === currentIndex && <div className="absolute inset-0 bg-[#ee5253]/20" />}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Titre */}
                            <p className="text-white/80 text-sm max-w-md text-center lg:text-right">
                                {currentIndex === 0
                                    ? (language === 'mg' ? 'Sary fototra' : language === 'fr' ? 'Image principale' : 'Main image')
                                    : (language === 'mg' ? `Sary ${currentIndex}` : language === 'fr' ? `Photo ${currentIndex}` : `Photo ${currentIndex}`)
                                }
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};