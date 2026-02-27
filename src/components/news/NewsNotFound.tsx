import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewsNotFoundProps {
    onBack: () => void;
}

export const NewsNotFound = ({ onBack }: NewsNotFoundProps) => {
    const { language } = useLanguage();

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
                    onClick={onBack}
                    className="px-8 py-4 bg-[#ee5253] hover:bg-[#932020] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                    {language === 'mg' ? 'Hiverina amin\'ny lisitra' :
                        language === 'fr' ? 'Retour à la liste' :
                            'Back to list'}
                </motion.button>
            </div>
        </div>
    );
};