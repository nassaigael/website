// pages/PartnersPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Award, Building, BookOpen, Radio, Heart, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { partnersData, partners, type PartnerCategory } from '../data/index';

const PartnersPage = () => {
  const { language } = useLanguage();
  const t = partnersData[language];
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory | 'all'>('all');
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  // Filtrer les partenaires par catégorie
  const filteredPartners = selectedCategory === 'all' 
    ? partners 
    : partners.filter(partner => partner.category === selectedCategory);

  // Obtenir l'icône pour chaque catégorie
  const getCategoryIcon = (category: PartnerCategory) => {
    switch(category) {
      case 'institutional': return <Building className="w-5 h-5" />;
      case 'cultural': return <Award className="w-5 h-5" />;
      case 'academic': return <BookOpen className="w-5 h-5" />;
      case 'media': return <Radio className="w-5 h-5" />;
      case 'community': return <Users className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/10">
              <Globe className="text-[#ee5253]" size={20} />
              <span className="text-sm font-medium">
                {language === 'mg' ? 'Fiaraha-miasa eran-tany' : 
                 language === 'fr' ? 'Collaboration mondiale' : 
                 'Global Collaboration'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {t.title}
            </h1>
            <p className="text-2xl md:text-3xl text-[#ee5253] font-bold mb-8">
              {t.subtitle}
            </p>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.description}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">30+</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">
                  {language === 'mg' ? 'Taona' : language === 'fr' ? 'Années' : 'Years'}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{partners.length}</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">
                  {language === 'mg' ? 'Mpanohana' : language === 'fr' ? 'Partenaires' : 'Partners'}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">5</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">
                  {language === 'mg' ? 'Sokajy' : language === 'fr' ? 'Catégories' : 'Categories'}
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('partners-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#ee5253] hover:bg-[#d94646] text-white font-bold py-4 px-10 rounded-full text-lg transition-colors shadow-2xl shadow-[#ee5253]/30 inline-flex items-center gap-3"
            >
              <Users size={20} />
              {t.cta}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Filtres de catégories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'mg' ? 'Safidio ny sokajy' : 
                 language === 'fr' ? 'Filtrer par catégorie' : 
                 'Filter by Category'}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {language === 'mg' ? 'Jereo ireo mpanohana amin\'ny sokajy rehetra' : 
                 language === 'fr' ? 'Découvrez nos partenaires dans toutes les catégories' : 
                 'Discover our partners across all categories'}
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {/* Tous */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                  selectedCategory === 'all'
                    ? 'bg-[#ee5253] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Heart size={16} />
                {language === 'mg' ? 'Rehetra' : language === 'fr' ? 'Tous' : 'All'}
              </motion.button>

              {/* Catégories */}
              {(['institutional', 'cultural', 'academic', 'media', 'community'] as PartnerCategory[]).map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-[#ee5253] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {getCategoryIcon(category)}
                  {t.categories[category]}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grille des partenaires */}
      <section id="partners-grid" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredPartners.map((partner) => (
                <motion.div
                  key={partner.id}
                  variants={itemVariants}
                  className="group"
                  onMouseEnter={() => setHoveredPartner(partner.id)}
                  onMouseLeave={() => setHoveredPartner(null)}
                >
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 h-full overflow-hidden hover:-translate-y-2">
                    {/* Logo */}
                    <div className="p-8 flex items-center justify-center h-40 bg-linear-to-b from-gray-50 to-white">
                      <div className="relative w-48 h-20 flex items-center justify-center">
                        {/* Logo principal */}
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
                        />
                        
                        {/* Overlay au hover */}
                        <div className={`absolute inset-0 bg-linear-to-r from-[#ee5253]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`} />
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      {/* Catégorie */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="text-[#ee5253]">
                          {getCategoryIcon(partner.category)}
                        </div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.categories[partner.category]}
                        </span>
                      </div>

                      {/* Nom */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {partner.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                        {partner.description[language]}
                      </p>

                      {/* Bouton et infos supplémentaires */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        {partner.website && partner.website !== '#' ? (
                          <motion.a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="text-[#ee5253] hover:text-[#d94646] font-medium text-sm flex items-center gap-2"
                          >
                            {language === 'mg' ? 'Hitsidiha' : language === 'fr' ? 'Visiter' : 'Visit'}
                            <ExternalLink size={14} />
                          </motion.a>
                        ) : (
                          <span className="text-gray-400 text-sm">
                            {language === 'mg' ? 'Tsy misy tranokala' : language === 'fr' ? 'Site non disponible' : 'No website'}
                          </span>
                        )}

                        {/* Badge de statut */}
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                          {language === 'mg' ? 'Mpanohana' : language === 'fr' ? 'Partenaire' : 'Partner'}
                        </span>
                      </div>
                    </div>

                    {/* Effet de bordure colorée */}
                    <div className={`h-1 w-full bg-linear-to-r from-[#ee5253] to-[#ff6b6b] transform transition-transform duration-300 ${hoveredPartner === partner.id ? 'scale-x-100' : 'scale-x-0'}`} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Message si aucun partenaire */}
            {filteredPartners.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'mg' ? 'Tsy misy mpanohana' : 
                   language === 'fr' ? 'Aucun partenaire' : 
                   'No partners found'}
                </h3>
                <p className="text-gray-600">
                  {language === 'mg' ? 'Tsy misy mpanohana amin\'ity sokajy ity fa mifidiana sokajy hafa' : 
                   language === 'fr' ? 'Aucun partenaire dans cette catégorie, essayez une autre catégorie' : 
                   'No partners in this category, try another category'}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Section Devenir Partenaire */}
      <section className="py-20 bg-linear-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/10">
                <Heart className="text-[#ee5253]" size={20} />
                <span className="text-sm font-medium">
                  {language === 'mg' ? 'Mba ho eo aminay' : 
                   language === 'fr' ? 'Rejoignez-nous' : 
                   'Join Us'}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {language === 'mg' ? 'Te ho Mpanohana ve ianao?' : 
                 language === 'fr' ? 'Voulez-vous devenir Partenaire?' : 
                 'Want to become a Partner?'}
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                {language === 'mg' 
                  ? 'Miaraha-miasa aminay hanohana sy hampiroborobo ny lova nentim-paharazana anakara.'
                  : language === 'fr'
                  ? 'Collaborez avec nous pour soutenir et promouvoir le patrimoine traditionnel anakara.'
                  : 'Collaborate with us to support and promote traditional anakara heritage.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#ee5253] hover:bg-[#d94646] text-white font-bold py-4 px-8 rounded-full text-lg transition-colors shadow-lg"
                >
                  {language === 'mg' ? 'Mifandray aminay' : 
                   language === 'fr' ? 'Contactez-nous' : 
                   'Contact Us'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white/30 hover:border-white text-white font-bold py-4 px-8 rounded-full text-lg transition-colors"
                >
                  {language === 'mg' ? 'Vakio ny fepetra' : 
                   language === 'fr' ? 'Lire les conditions' : 
                   'Read Terms'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;