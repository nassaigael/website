import { motion, AnimatePresence } from 'framer-motion';
import { Share2, ChevronDown, Facebook, Linkedin, Mail, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface NewsShareMenuProps {
    showShareMenu: boolean;
    setShowShareMenu: (show: boolean) => void;
    articleTitle: string;
    articleExcerpt: string;
    articleUrl: string;
    onShare: (platform: string) => void;
}

export const NewsShareMenu = ({
    showShareMenu,
    setShowShareMenu,
    onShare
}: NewsShareMenuProps) => {
    const { language } = useLanguage();

    const shareItems = [
        { icon: Facebook, platform: 'facebook' },
        { icon: Linkedin, platform: 'linkedin' },
        { icon: Mail, platform: 'email' },
        { icon: LinkIcon, platform: 'copy' }
    ];

    return (
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
                            {shareItems.map((item, index) => (
                                <motion.button
                                    key={item.platform}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => onShare(item.platform)}
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
    );
};