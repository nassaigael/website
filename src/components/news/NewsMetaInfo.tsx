import { motion } from 'framer-motion';
import { Calendar, MapPin, User } from 'lucide-react';

interface NewsMetaInfoProps {
    date: string;
    location?: string;
    author: string;
}

export const NewsMetaInfo = ({ date, location, author }: NewsMetaInfoProps) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            className="flex flex-wrap items-center gap-6 mb-8"
        >
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-800">
                <Calendar className="w-5 h-5 text-[#ee5253]" />
                <span className="font-semibold text-gray-700 dark:text-white">{date}</span>
            </div>

            {location && (
                <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-800">
                    <MapPin className="w-5 h-5 text-[#ee5253]" />
                    <span className="font-semibold text-gray-700 dark:text-white">{location}</span>
                </div>
            )}

            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-100 dark:bg-[#0f172a] rounded-xl border border-gray-200 dark:border-gray-800">
                <User className="w-5 h-5 text-[#ee5253]" />
                <span className="font-semibold text-gray-700 dark:text-white">{author}</span>
            </div>
        </motion.div>
    );
};