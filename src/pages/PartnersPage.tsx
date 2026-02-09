import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Users,
  Award,
  Building,
  BookOpen,
  Radio,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { partnersData, partners, type PartnerCategory } from '../data/index';

const PartnersPage = () => {
  const { language } = useLanguage();
  const t = partnersData[language];
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | 'all'>('all');
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  // Ordre des catégories (utilisé seulement pour l'affichage groupé)
  const categoryOrder: PartnerCategory[] = [
    'institutional',
    'cultural',
    'academic',
    'media',
    'community',
  ];

  const getCategoryIcon = (category: PartnerCategory) => {
    switch (category) {
      case 'institutional': return <Building className="w-6 h-6" />;
      case 'cultural':      return <Award className="w-6 h-6" />;
      case 'academic':      return <BookOpen className="w-6 h-6" />;
      case 'media':         return <Radio className="w-6 h-6" />;
      case 'community':     return <Users className="w-6 h-6" />;
      default:              return <Users className="w-6 h-6" />;
    }
  };

  // Détermine ce qu'on affiche
  const isAllSelected = selectedCategory === 'all';

  // Pour le mode "tous" → tous les partenaires triés alphabétiquement
  const allPartnersSorted = [...partners].sort((a, b) =>
    a.name.localeCompare(b.name, language)
  );

  // Pour le mode catégorie unique
  const partnersInCategory = isAllSelected
    ? []
    : partners
        .filter((p) => p.category === selectedCategory)
        .sort((a, b) => a.name.localeCompare(b.name, language));

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section – inchangée */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/20">
              <Globe className="text-[#ee5253]" size={20} />
              <span className="text-sm font-medium">
                {language === 'mg' ? 'Fiaraha-miasa eran-tany' : language === 'fr' ? 'Collaboration mondiale' : 'Global Collaboration'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">{t.title}</h1>
            <p className="text-2xl md:text-3xl text-[#ee5253] font-bold mb-8">{t.subtitle}</p>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.description}
            </p>

            <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-12">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-1">30+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {language === 'mg' ? 'Taona' : language === 'fr' ? 'Années' : 'Years'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-1">{partners.length}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {language === 'mg' ? 'Mpanohana' : language === 'fr' ? 'Partenaires' : 'Partners'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-1">5</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  {language === 'mg' ? 'Sokajy' : language === 'fr' ? 'Catégories' : 'Categories'}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('partners-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#ee5253] hover:bg-[#d32f2f] text-white font-bold py-4 px-12 rounded-full text-lg transition shadow-xl shadow-[#ee5253]/30 inline-flex items-center gap-3"
            >
              <Users size={22} />
              {t.cta}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Filtres – inchangés */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {language === 'mg' ? 'Safidio ny sokajy' : language === 'fr' ? 'Filtrer par catégorie' : 'Filter by Category'}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {language === 'mg' ? 'Jereo ireo mpanohana araka ny sokajiny' : language === 'fr' ? 'Découvrez nos partenaires par catégorie' : 'Browse our partners by category'}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 text-sm md:text-base ${
                isAllSelected ? 'bg-[#ee5253] text-white shadow-lg shadow-[#ee5253]/30' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Heart size={18} />
              {language === 'mg' ? 'Rehetra' : language === 'fr' ? 'Tous' : 'All'}
            </motion.button>

            {categoryOrder.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-full font-medium transition-all flex items-center gap-2 text-sm md:text-base ${
                  selectedCategory === cat ? 'bg-[#ee5253] text-white shadow-lg shadow-[#ee5253]/30' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {getCategoryIcon(cat)}
                {t.categories[cat]}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des partenaires */}
      <section id="partners-grid" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {isAllSelected ? (
              // Mode "Tous" → grille unique sans titres de catégorie
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                {allPartnersSorted.map((partner) => (
                  <PartnerCard
                    key={partner.id}
                    partner={partner}
                    language={language}
                    t={t}
                    hoveredPartner={hoveredPartner}
                    setHoveredPartner={setHoveredPartner}
                    getCategoryIcon={getCategoryIcon}
                  />
                ))}
              </motion.div>
            ) : (
              // Mode catégorie unique → avec titre
              partnersInCategory.length > 0 ? (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#ee5253]/10 p-3.5 rounded-xl">
                      {getCategoryIcon(selectedCategory)}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {t.categories[selectedCategory]}
                      </h2>
                      <p className="text-gray-500 text-sm md:text-base mt-1">
                        {partnersInCategory.length}{' '}
                        {language === 'mg' ? 'mpanohana' : language === 'fr' ? 'partenaires' : 'partners'}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                  >
                    {partnersInCategory.map((partner) => (
                      <PartnerCard
                        key={partner.id}
                        partner={partner}
                        language={language}
                        t={t}
                        hoveredPartner={hoveredPartner}
                        setHoveredPartner={setHoveredPartner}
                        getCategoryIcon={getCategoryIcon}
                      />
                    ))}
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {language === 'mg' ? 'Tsy misy mpanohana' : 'Aucun partenaire trouvé'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'mg' ? 'Andramo sokajy hafa' : 'Try another category'}
                  </p>
                </div>
              )
            )}

          </div>
        </div>
      </section>

      {/* Section devenir partenaire – inchangée */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'mg' ? 'Te ho Mpanohana ve ianao?' : 'Devenir partenaire ?'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              {language === 'mg' ? 'Miaraha aminay hanohana sy hampiroborobo ny kolontsaina malagasy' : 'Rejoignez-nous pour soutenir et promouvoir le patrimoine malgache'}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button className="bg-[#ee5253] hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition shadow-lg">
                {language === 'mg' ? 'Mifandray aminay' : 'Contactez-nous'}
              </button>
              <button className="border-2 border-white/40 hover:border-white text-white font-bold py-4 px-10 rounded-full text-lg transition">
                {language === 'mg' ? 'Vakio ny fepetra' : 'En savoir plus'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Composant extrait pour éviter la duplication du code de la carte
const PartnerCard = ({ partner, language, t, hoveredPartner, setHoveredPartner, getCategoryIcon }) => (
  <motion.div
    variants={{
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    }}
    className="group"
    onMouseEnter={() => setHoveredPartner(partner.id)}
    onMouseLeave={() => setHoveredPartner(null)}
  >
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
      <div className="h-40 bg-gradient-to-b from-gray-50 to-white p-8 flex items-center justify-center">
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-h-20 max-w-full object-contain transition-transform duration-400 group-hover:scale-110"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#ee5253]">{getCategoryIcon(partner.category)}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {t.categories[partner.category]}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{partner.name}</h3>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {partner.description[language]}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          {partner.website && partner.website !== '#' ? (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ee5253] hover:text-red-700 font-medium text-sm flex items-center gap-1.5 transition-colors"
            >
              {language === 'mg' ? 'Hitsidiha' : language === 'fr' ? 'Visiter' : 'Visit'}
              <ExternalLink size={14} />
            </a>
          ) : (
            <span className="text-gray-400 text-sm">
              {language === 'mg' ? 'Tsy misy tranokala' : 'No website'}
            </span>
          )}

          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
            {language === 'mg' ? 'Mpanohana' : language === 'fr' ? 'Partenaire' : 'Partner'}
          </span>
        </div>
      </div>

      <div
        className={`h-1 bg-gradient-to-r from-[#ee5253] to-[#ff6b6b] transition-transform duration-400 origin-left ${
          hoveredPartner === partner.id ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </div>
  </motion.div>
);

export default PartnersPage;