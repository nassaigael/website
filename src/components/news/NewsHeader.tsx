import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { NewsShareMenu } from './NewsShareMenu';

interface NewsHeaderProps {
    onBack: () => void;
    showShareMenu: boolean;
    setShowShareMenu: (show: boolean) => void;
    articleTitle: string;
    articleExcerpt: string;
    articleUrl: string;
    onShare: (platform: string) => void;
}

export const NewsHeader = ({
    onBack,
    showShareMenu,
    setShowShareMenu,
    articleTitle,
    articleExcerpt,
    articleUrl,
    onShare
}: NewsHeaderProps) => {
    const { language } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-12"
        >
            <motion.button
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="group flex items-center gap-3 px-5 py-3 bg-gray-100 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#ee5253] hover:bg-gray-50 dark:hover:bg-[#1a1f2e] transition-all"
            >
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-[#ee5253] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-gray-700 dark:text-white group-hover:text-[#ee5253] transition-colors">
                    {language === 'mg' ? 'Hiverina' :
                        language === 'fr' ? 'Retour' :
                            'Back'}
                </span>
            </motion.button>

            <NewsShareMenu
                showShareMenu={showShareMenu}
                setShowShareMenu={setShowShareMenu}
                articleTitle={articleTitle}
                articleExcerpt={articleExcerpt}
                articleUrl={articleUrl}
                onShare={onShare}
            />
        </motion.div>
    );
};