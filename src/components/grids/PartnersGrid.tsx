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

    // Fonction pour obtenir la couleur de catégorie
    const getCategoryColor = (category: PartnerCategory) => {
        switch (category) {
            case 'foundation': return 'from-blue-500 to-cyan-500';
            case 'equipment_distribution': return 'from-emerald-500 to-green-500';
            case 'food_beverage': return 'from-orange-500 to-amber-500';
            default: return 'from-purple-500 to-pink-500';
        }
    };

    // Fonction pour obtenir le nom de la catégorie
    const getCategoryName = (category: PartnerCategory): string => {
        return t.categories[category] || category;
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function setSelectedCategory(_arg0: string) {
        throw new Error('Function not implemented.');
    }

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

                    {/* Premium Search Bar */}
                    {showSearch && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.9, type: "spring" }}
                            className="max-w-2xl mx-auto mb-16"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
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
                                        className="w-full pl-16 pr-14 py-5 bg-gray-700/50 backdrop-blur-xl border-2 border-white/50 rounded-2xl focus:border-[#ee5253] focus:ring-4 focus:ring-[#ee5253]/20 outline-none transition-all placeholder-gray-400 shadow-2xl text-lg"
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
                </motion.div>

                {/* Centered Partners Grid */}
                <AnimatePresence mode="wait">
                    {filteredPartners.length > 0 ? (
                        <motion.div
                            key="partners-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-7xl mx-auto"
                        >
                            {filteredPartners.map((partner, index) => (
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
                                    {/* Premium Card Container - MODIFIÉ AVEC bg-[#1e293b] */}
                                    <div className="relative h-full bg-[#1e293b] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-700/50">

                                        {/* Animated Background Layer */}
                                        <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-white/5" />

                                        {/* Card Header with Premium Effects */}
                                        <div className="relative h-56 bg-linear-to-br from-gray-800/80 to-gray-900/60 p-10 flex items-center justify-center overflow-hidden">
                                            <div className={`absolute inset-0 bg-linear-to-r ${getCategoryColor(partner.category)} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

                                            {/* Partner Logo Container */}
                                            <div className="relative z-20">
                                                <div className="relative p-6 bg-[#1e293b]/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/30">
                                                    <img
                                                        src={partner.logo}
                                                        alt={partner.name}
                                                        className="max-h-24 max-w-50 object-contain transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale-0"
                                                        onError={handleImageError}
                                                    />
                                                </div>
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-5 left-5 z-30">
                                                <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#1e293b]/95 backdrop-blur-xl rounded-full border border-gray-700/50 shadow-xl">
                                                    <span className="text-[#ee5253]">
                                                        {getCategoryIcon(partner.category)}
                                                    </span>
                                                    <span className="text-sm font-bold text-white tracking-wide">
                                                        {getCategoryName(partner.category)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Premium Featured Badge */}
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

                                        {/* Premium Card Content */}
                                        <div className="relative p-8 flex flex-col grow bg-linear-to-b from-[#1e293b] via-[#1e293b] to-[#1a1f2e]">
                                            {/* Partner Name with Gradient */}
                                            <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-[#ee5253] group-hover:to-[#d32f2f] transition-all duration-500">
                                                {partner.name}
                                            </h3>

                                            {/* Premium Description */}
                                            <p className="text-gray-300 mb-6 grow leading-relaxed text-base line-clamp-3">
                                                {getPartnerDescription(partner)}
                                            </p>

                                            {/* Additional Info - Premium */}
                                            <div className="space-y-3 mb-8">
                                                {partner.location && (
                                                    <div className="flex items-center gap-3 text-gray-400">
                                                        <Globe className="w-5 h-5" />
                                                        <span className="font-medium">{partner.location}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Premium Action Area */}
                                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-700/50">
                                                {/* Website Link */}
                                                {partner.website && partner.website !== '#' ? (
                                                    <a
                                                        href={partner.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/btn flex items-center gap-3 text-[#ee5253] hover:text-[#ff6b6b] font-bold transition-all"
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
                                                    <span className="text-gray-500 font-medium italic">
                                                        {language === 'mg' ? 'Tsy misy tranokala' : language === 'fr' ? 'Site web bientôt disponible' : 'Website coming soon'}
                                                    </span>
                                                )}

                                            </div>
                                        </div>

                                        {/* Premium Hover Effects */}
                                        <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r ${getCategoryColor(partner.category)} transition-transform duration-700 origin-left ${hoveredPartner === partner.id ? 'scale-x-100' : 'scale-x-0'}`} />

                                        {/* Corner Accents */}
                                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ee5253]/30 rounded-tl-3xl" />
                                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ee5253]/30 rounded-tr-3xl" />
                                    </div>

                                    {/* Premium Glow Effect */}
                                    <div className="absolute -inset-4 bg-linear-to-r from-transparent via-[#ee5253]/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                                </motion.div>
                            ))}
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