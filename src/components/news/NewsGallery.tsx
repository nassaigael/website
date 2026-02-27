import { motion } from 'framer-motion';
import { Camera, Grid, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewsGalleryProps {
    images: string[];
    mainImage: string;
    title: string;
    onOpenGallery: (index: number) => void;
}

export const NewsGallery = ({ images, mainImage, title, onOpenGallery }: NewsGalleryProps) => {
    const { language } = useLanguage();

    return (
        <>
            {/* Image principale */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 group flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <img
                        src={mainImage}
                        alt={title}
                        className="w-[70%] h-80 object-contain"
                    />

                    {/* Bouton pour ouvrir la galerie */}
                    {images.length > 1 && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            onClick={() => onOpenGallery(0)}
                            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md hover:bg-[#ee5253] text-white rounded-xl transition-all duration-300 border border-white/20"
                        >
                            <Grid className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {language === 'mg' ? 'Jereo ny sary rehetra' :
                                    language === 'fr' ? 'Voir toutes les photos' :
                                        'View all photos'}
                            </span>
                            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                {images.length}
                            </span>
                        </motion.button>
                    )}
                </div>
            </motion.div>

            {/* Aperçu des miniatures */}
            {images.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
                            onClick={() => onOpenGallery(0)}
                            className="text-sm text-[#ee5253] hover:text-[#932020] transition-colors flex items-center gap-1"
                        >
                            {language === 'mg' ? "Jereo daholo" :
                                language === 'fr' ? "Voir tout" :
                                    "View all"}
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {images.slice(0, 6).map((image, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onOpenGallery(index)}
                                className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <img src={image} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                {index === 5 && images.length > 6 && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg">
                                        +{images.length - 5}
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </>
    );
};