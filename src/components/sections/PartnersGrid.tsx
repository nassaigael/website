import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building,
    Award,
    BookOpen,
    Radio,
    Users,
    Globe,
    ChevronRight,
    Star,
    Search,
    X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { partnersData, partners, type PartnerCategory } from '../../data/partners';

interface PartnersGridProps {
    showSearch?: boolean;
    showStats?: boolean;
}

const PartnersGrid = ({
    showSearch = true,
}: PartnersGridProps) => {
    const { language } = useLanguage();
    const t = partnersData[language];
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | 'all'>('all');

    // Tous les partenaires triés alphabétiquement
    const allPartnersSorted = [...partners].sort((a, b) =>
        a.name.localeCompare(b.name, language)
    );

    // Filtrer par recherche
    const filteredPartners = searchTerm
        ? allPartnersSorted.filter(partner =>
            partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            partner.description[language].toLowerCase().includes(searchTerm.toLowerCase())
        )
        : allPartnersSorted;

    // Filtrer par catégorie si sélectionnée
    const finalPartners = selectedCategory === 'all'
        ? filteredPartners
        : filteredPartners.filter(partner => partner.category === selectedCategory);

    const getCategoryIcon = (category: PartnerCategory) => {
        switch (category) {
            case 'institutional': return <Building className="w-5 h-5" />;
            case 'cultural': return <Award className="w-5 h-5" />;
            case 'academic': return <BookOpen className="w-5 h-5" />;
            case 'media': return <Radio className="w-5 h-5" />;
            case 'community': return <Users className="w-5 h-5" />;
            default: return <Users className="w-5 h-5" />;
        }
    };

    const getCategoryColor = (category: PartnerCategory) => {
        switch (category) {
            case 'institutional': return 'from-blue-500 to-cyan-500';
            case 'cultural': return 'from-purple-500 to-pink-500';
            case 'academic': return 'from-emerald-500 to-green-500';
            case 'media': return 'from-orange-500 to-amber-500';
            case 'community': return 'from-rose-500 to-red-500';
            default: return 'from-gray-500 to-gray-700';
        }
    };


    return (
        <section id="partners-grid" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#ee5253]/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16"
                >
                    <div className="text-center max-w-4xl mx-auto mb-10">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                {language === 'mg' ? 'Ireo Mpanohana Rehetra' : 'Our Valued Partners'}
                            </span>
                        </h2>

                        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                            {language === 'mg'
                                ? 'Fikambanana sy orinasa miara-miasa aminay hanohana ny sehatra samihafa'
                                : 'Organizations and companies collaborating with us across various domains'}
                        </p>
                    </div>

                    {/* Search Bar */}
                    {showSearch && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-2xl mx-auto mb-10"
                        >
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder={
                                        language === 'mg'
                                            ? 'Hikaroka mpanohana, sehatra, fanjakana...'
                                            : 'Search partners, domains, countries...'
                                    }
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-14 pr-12 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:border-[#ee5253] focus:ring-4 focus:ring-[#ee5253]/20 outline-none transition-all placeholder-gray-500 shadow-lg"
                                />
                                {searchTerm && (
                                    <motion.button
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-[#ee5253] transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Partners Grid */}
                <AnimatePresence mode="wait">
                    {finalPartners.length > 0 ? (
                        <motion.div
                            key="partners-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                        >
                            {finalPartners.map((partner, index) => (
                                <motion.div
                                    key={partner.id}
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: index * 0.05, duration: 0.5 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    onMouseEnter={() => setHoveredPartner(partner.id)}
                                    onMouseLeave={() => setHoveredPartner(null)}
                                    className="group relative"
                                >
                                    {/* Card Container */}
                                    <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50">

                                        {/* Card Header with Gradient */}
                                        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-white p-8 flex items-center justify-center overflow-hidden">
                                            {/* Animated Background Gradient */}
                                            <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(partner.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                            {/* Partner Logo */}
                                            <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110">
                                                <img
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    className="max-h-20 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full border border-white/20 shadow-md">
                                                    <span className="text-[#ee5253]">
                                                        {getCategoryIcon(partner.category)}
                                                    </span>
                                                    <span className="text-xs font-semibold text-gray-700">
                                                        {t.categories[partner.category]}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Featured Badge */}
                                            {partner.featured && (
                                                <div className="absolute top-4 right-4 z-20">
                                                    <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg">
                                                        <Star className="w-4 h-4 text-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            {/* Partner Name */}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#ee5253] transition-colors">
                                                {partner.name}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                                                {partner.description[language]}
                                            </p>

                                            {/* Additional Info */}
                                            {partner.location && (
                                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                                    <Globe className="w-4 h-4" />
                                                    <span>{partner.location}</span>
                                                </div>
                                            )}

                                            {/* Action Button */}
                                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                                                {partner.website && partner.website !== '#' ? (
                                                    <a
                                                        href={partner.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/btn flex items-center gap-2 text-[#ee5253] hover:text-[#d32f2f] font-medium text-sm transition-colors"
                                                    >
                                                        <span>
                                                            {language === 'mg' ? 'Hitsidiha' : 'Visit Website'}
                                                        </span>
                                                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm italic">
                                                        {language === 'mg' ? 'Tsy misy tranokala' : 'Website coming soon'}
                                                    </span>
                                                )}

                                                <span className="text-xs bg-gradient-to-r from-[#ee5253]/10 to-[#ff6b6b]/10 text-[#ee5253] px-3 py-1.5 rounded-full font-semibold">
                                                    {t.categories[partner.category]}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hover Effect Line */}
                                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(partner.category)} transition-transform duration-500 origin-left ${hoveredPartner === partner.id ? 'scale-x-100' : 'scale-x-0'
                                            }`} />
                                    </div>

                                    {/* Glow Effect */}
                                    <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-[#ee5253]/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        // No Results State
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="text-center py-20"
                        >
                            <div className="relative inline-block mb-8">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ee5253]/20 to-purple-500/20 rounded-full blur-2xl" />
                                <Users className="w-32 h-32 text-gray-300 relative" />
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                {language === 'mg' ? 'Tsy misy mpanohana hita' : 'No partners found'}
                            </h3>

                            <p className="text-gray-600 max-w-md mx-auto mb-8">
                                {language === 'mg'
                                    ? 'Tsy misy mpanohana mifanaraka amin\'ny fikarohana. Andramo ny manova ny teny fikarohana na ny sokajy.'
                                    : 'No partners match your search criteria. Try adjusting your search terms or category.'}
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('all');
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ee5253] to-[#ff6b6b] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                <X className="w-4 h-4" />
                                {language === 'mg' ? 'Hamafa ny safidy' : 'Clear filters'}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default PartnersGrid;