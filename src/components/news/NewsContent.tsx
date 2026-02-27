import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface NewsContentProps {
    content: string[];
    language: string;
}

export const NewsContent = forwardRef<HTMLDivElement, NewsContentProps>(({ content }, ref) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
            }}
            initial="hidden"
            animate="visible"
            className="mb-20"
        >
            <div className="relative">
                <div className="absolute -left-8 top-0 w-1 h-full bg-linear-to-b from-[#ee5253] via-[#ee5253]/50 to-transparent" />
                <div className="space-y-8 text-gray-700 dark:text-white text-lg leading-relaxed">
                    {content.map((paragraph, index) => (
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
    );
});

NewsContent.displayName = 'NewsContent';