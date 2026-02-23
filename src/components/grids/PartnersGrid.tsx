// components/grids/PartnersGrid.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Globe,
    Star,
    X,
    Building,
    Award,
    Heart,
    ExternalLink,
    Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { partnersData, partners, type PartnerCategory } from '../../data/index';
import NoResultsState from '../states/NoResultsState';

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
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    // eslint-disable-next-line no-empty-pattern
    const [] = useState(false);

    // Catégories pour le filtre
    const categories = [
        { id: 'all', label: { mg: 'Rehetra', fr: 'Tous', en: 'All' }, icon: Sparkles, color: 'gray' },
        { id: 'foundation', label: { mg: 'Fondasy', fr: 'Fondation', en: 'Foundation' }, icon: Heart, color: 'blue' },
        { id: 'corporate', label: { mg: 'Orinasa', fr: 'Entreprise', en: 'Corporate' }, icon: Building, color: 'purple' },
        { id: 'food_beverage', label: { mg: 'Sakafo sy zava-pisotro', fr: 'Alimentation et Boissons', en: 'Food & Beverage' }, icon: Award, color: 'amber' },
        { id: 'equipment_distribution', label: { mg: 'Fizarana fitaovana', fr: "Distribution d'équipements", en: 'Equipment Distribution' }, icon: Users, color: 'emerald' },
    ];

    // Tous les partenaires triés alphabétiquement
    const allPartnersSorted = [...partners].sort((a, b) =>
        a.name.localeCompare(b.name, language)
    );

    // Filtrer par recherche et catégorie
    const filteredPartners = allPartnersSorted.filter(partner => {
        const matchesSearch = searchTerm
            ? partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              partner.description[language].toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        
        const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Gestionnaire d'erreur pour les images
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.style.display = 'none';
    };

    // Fonction pour obtenir la description du partenaire
    const getPartnerDescription = (partner: typeof partners[0]): string => {
        const description = partner.description[language];
        return typeof description === 'string' ? description : String(description || '');
    };

    // Fonction pour obtenir l'icône de catégorie
    const getCategoryIcon = (category: PartnerCategory) => {
        switch (category) {
            case 'foundation': return <Heart className="w-5 h-5" />;
            case 'equipment_distribution': return <Building className="w-5 h-5" />;
            case 'food_beverage': return <Award className="w-5 h-5" />;
            default: return <Users className="w-5 h-5" />;
        }
    };

    // Fonction pour obtenir la couleur de catégorie - Version Light
    const getCategoryColor = (category: PartnerCategory) => {
        switch (category) {
            case 'foundation': return 'from-blue-500 to-cyan-500 bg-blue-50 text-blue-600';
            case 'equipment_distribution': return 'from-emerald-500 to-green-500 bg-emerald-50 text-emerald-600';
            case 'food_beverage': return 'from-orange-500 to-amber-500 bg-orange-50 text-orange-600';
            default: return 'from-purple-500 to-pink-500 bg-purple-50 text-purple-600';
        }
    };

    // Fonction pour obtenir le nom de la catégorie
    const getCategoryName = (category: PartnerCategory): string => {
        return t.categories[category] || category;
    };

    return (
        <section id="partners-grid" className="py-2 md:py-4 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Premium Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="mb-16 md:mb-24"
                >
                    {/* Premium Search Bar - Version Light */}
                    {showSearch && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.9, type: "spring" }}
                            className="max-w-2xl mx-auto mb-8"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#ee5253]/20 to-[#932020]/20 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={
                                            language === 'mg'
                                                ? 'Hikaroka mpanohana, sehatra, fanjakana...'
                                                : language === 'fr' ? 'Rechercher un partenaire, secteur, localisation...'
                                                    : 'Search for a partner, sector, location...'
                                        }
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-16 pr-14 py-5 bg-white dark:bg-gray-800/50 backdrop-blur-xl border-2 border-gray-200 dark:border-white/10 rounded-2xl focus:border-[#ee5253] focus:ring-4 focus:ring-[#ee5253]/10 dark:focus:ring-[#ee5253]/20 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500 shadow-lg text-lg text-gray-900 dark:text-white"
                                    />
                                    {searchTerm && (
                                        <motion.button
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#ee5253] transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Category Filters - Version Light */}
                    <div className="flex justify-center mb-8">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((cat, index) => {
                                const Icon = cat.icon;
                                return (
                                    <motion.button
                                        key={cat.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                                            selectedCategory === cat.id
                                                ? `bg-[#ee5253] text-white shadow-lg`
                                                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="font-medium text-sm">
                                            {cat.label[language]}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Centered Partners Grid - Version Light améliorée */}
                <AnimatePresence mode="wait">
                    {filteredPartners.length > 0 ? (
                        <motion.div
                            key="partners-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-7xl mx-auto"
                        >
                            {filteredPartners.map((partner, index) => {
                                const categoryColors = getCategoryColor(partner.category).split(' ');
                                const gradientClass = categoryColors[0];
                                const bgLightClass = categoryColors[1];
                                const textLightClass = categoryColors[2];
                                
                                return (
                                    <motion.div
                                        key={partner.id}
                                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.6,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        whileHover={{
                                            y: -12,
                                            scale: 1.03,
                                            transition: { duration: 0.3 }
                                        }}
                                        onMouseEnter={() => setHoveredPartner(partner.id)}
                                        onMouseLeave={() => setHoveredPartner(null)}
                                        className="group relative flex-1 min-w-75 max-w-100"
                                    >
                                        {/* Premium Card Container - Version Light */}
                                        <div className="relative h-full bg-white dark:bg-[#1e293b] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700/50">

                                            {/* Animated Background Layer */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:to-white/5" />

                                            {/* Card Header with Premium Effects - Version Light */}
                                            <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-900/60 p-10 flex items-center justify-center overflow-hidden">
                                                <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-700`} />

                                                {/* Partner Logo Container - Version Light */}
                                                <div className="relative z-20">
                                                    <div className="relative p-6 bg-white dark:bg-[#1e293b]/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700/30">
                                                        <img
                                                            src={partner.logo}
                                                            alt={partner.name}
                                                            className="max-h-24 max-w-50 object-contain transition-all duration-500 group-hover:scale-110"
                                                            onError={handleImageError}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Category Badge - Version Light */}
                                                <div className="absolute top-5 left-5 z-30">
                                                    <div className={`flex items-center gap-2.5 px-4 py-2.5 ${bgLightClass} dark:bg-[#1e293b]/95 backdrop-blur-xl rounded-full border border-gray-200 dark:border-gray-700/50 shadow-lg`}>
                                                        <span className={textLightClass}>
                                                            {getCategoryIcon(partner.category)}
                                                        </span>
                                                        <span className={`text-sm font-bold ${textLightClass} dark:text-white tracking-wide`}>
                                                            {getCategoryName(partner.category)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Premium Featured Badge - Version Light */}
                                                {partner.featured && (
                                                    <div className="absolute top-5 right-5 z-30">
                                                        <motion.div
                                                            animate={{ rotate: [0, 10, -10, 0] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="p-2.5 bg-[#ee5253] rounded-full shadow-2xl"
                                                        >
                                                            <Star className="w-5 h-5 text-white" />
                                                        </motion.div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Premium Card Content - Version Light */}
                                            <div className="relative p-8 flex flex-col grow bg-gradient-to-b from-white via-white to-gray-50/80 dark:from-[#1e293b] dark:via-[#1e293b] dark:to-[#1a1f2e]">
                                                {/* Partner Name with Gradient - Version Light */}
                                                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-[#ee5253] transition-colors duration-500">
                                                    {partner.name}
                                                </h3>

                                                {/* Premium Description - Version Light */}
                                                <p className="text-gray-600 dark:text-gray-300 mb-6 grow leading-relaxed text-base line-clamp-3">
                                                    {getPartnerDescription(partner)}
                                                </p>

                                                {/* Additional Info - Premium */}
                                                <div className="space-y-3 mb-8">
                                                    {partner.location && (
                                                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                                            <Globe className="w-5 h-5" />
                                                            <span className="font-medium">{partner.location}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Premium Action Area - Version Light */}
                                                <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-200 dark:border-gray-700/50">
                                                    {/* Website Link - Version Light */}
                                                    {partner.website && partner.website !== '#' ? (
                                                        <a
                                                            href={partner.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group/btn flex items-center gap-3 text-[#ee5253] hover:text-[#d32f2f] font-bold transition-all"
                                                        >
                                                            <span className="relative">
                                                                <span className="relative z-10">
                                                                    {language === 'mg' ? 'Hitsidiha Tranokala' : language === 'fr' ? 'Visiter le site web' : 'Visit Website'}
                                                                </span>
                                                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ee5253] group-hover/btn:w-full transition-all duration-300" />
                                                            </span>
                                                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-400 dark:text-gray-500 font-medium italic">
                                                            {language === 'mg' ? 'Tsy misy tranokala' : language === 'fr' ? 'Site web bientôt disponible' : 'Website coming soon'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Premium Hover Effects - Version Light */}
                                            <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradientClass} transition-transform duration-700 origin-left ${hoveredPartner === partner.id ? 'scale-x-100' : 'scale-x-0'}`} />

                                            {/* Corner Accents - Version Light */}
                                            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ee5253]/30 rounded-tl-3xl" />
                                            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ee5253]/30 rounded-tr-3xl" />
                                        </div>

                                        {/* Premium Glow Effect - Version Light */}
                                        <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-[#ee5253]/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <NoResultsState
                            entityType="partners"
                            onResetFilters={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                            }}
                            searchTerm={searchTerm}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default PartnersGrid;