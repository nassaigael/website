import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface NoResultsStateProps {
  entityType?: 'news' | 'projects' | 'partners' | 'events';
  onResetFilters?: () => void;
  searchTerm?: string;
}

const NoResultsState = ({ 
  entityType = 'news', 
  onResetFilters, 
  searchTerm 
}: NoResultsStateProps) => {
  const { language } = useLanguage();

  const getEntityLabels = () => {
    switch (entityType) {
      case 'projects':
        return {
          singular: language === 'mg' ? 'tetikasa' : language === 'fr' ? 'projet' : 'project',
          plural: language === 'mg' ? 'tetikasa' : language === 'fr' ? 'projets' : 'projects'
        };
      case 'partners':
        return {
          singular: language === 'mg' ? 'mpanohana' : language === 'fr' ? 'partenaire' : 'partner',
          plural: language === 'mg' ? 'mpanohana' : language === 'fr' ? 'partenaires' : 'partners'
        };
      case 'events':
        return {
          singular: language === 'mg' ? 'hetsika' : language === 'fr' ? 'événement' : 'event',
          plural: language === 'mg' ? 'hetsika' : language === 'fr' ? 'événements' : 'events'
        };
      case 'news':
      default:
        return {
          singular: language === 'mg' ? 'vaovao' : language === 'fr' ? 'article' : 'article',
          plural: language === 'mg' ? 'vaovao' : language === 'fr' ? 'articles' : 'articles'
        };
    }
  };

  const getMessages = () => {
    const labels = getEntityLabels();
    
    if (searchTerm) {
      return {
        title: language === 'mg' ? `Tsy misy ${labels.plural} hita` :
               language === 'fr' ? `Aucun ${labels.singular} trouvé` :
               `No ${labels.plural} found`,
        description: language === 'mg' ? `Tsy misy ${labels.plural} mifanaraka amin'ny fikarohana "${searchTerm}". Andramo ny manova ny teny fikarohana na ny karazana safidy.` :
                     language === 'fr' ? `Aucun ${labels.singular} ne correspond à votre recherche "${searchTerm}". Essayez de modifier vos termes de recherche ou vos filtres.` :
                     `No ${labels.plural} match your search "${searchTerm}". Try adjusting your search terms or filters.`,
        button: language === 'mg' ? 'Hamafa ny fikarohana' :
                language === 'fr' ? 'Effacer la recherche' :
                'Clear search'
      };
    }

    return {
      title: language === 'mg' ? `Tsy misy ${labels.plural} hita` :
             language === 'fr' ? `Aucun ${labels.singular} trouvé` :
             `No ${labels.plural} found`,
      description: language === 'mg' ? `Tsy misy ${labels.plural} mifanaraka amin'ny safidy nataonao. Andramo ny manova ny teny fikarohana na ny karazana safidy.` :
                   language === 'fr' ? `Aucun ${labels.singular} ne correspond à vos critères. Essayez de modifier vos termes de recherche ou vos filtres.` :
                   `No ${labels.plural} match your criteria. Try adjusting your search terms or filters.`,
      button: language === 'mg' ? 'Hamafa ny safidy rehetra' :
              language === 'fr' ? 'Réinitialiser tous les filtres' :
              'Reset all filters'
    };
  };

  const messages = getMessages();

  return (
    <motion.div
      key="no-results"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center py-20"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-48 h-48 mx-auto mb-8 relative"
      >
        <div className="absolute inset-0 dark:bg-[#ee5253] rounded-full blur-2xl opacity-20" />
        <Search className="w-48 h-48 text-gray-300 dark:text-gray-700" />
      </motion.div>

      <motion.h3
        className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring" }}
      >
        {messages.title}
      </motion.h3>

      <motion.p
        className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {messages.description}
      </motion.p>

      {onResetFilters && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#ee5253] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          {searchTerm ? (
            <>
              <Search className="w-5 h-5" />
              {messages.button}
            </>
          ) : (
            <>
              <Filter className="w-5 h-5" />
              {messages.button}
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
};

export default NoResultsState;