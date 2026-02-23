// pages/PartnersPage.tsx
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import PartnersHero from '../components/sections/PartnersHero';
import PartnersGrid from '../components/grids/PartnersGrid';
import { Star, Users, Award, Mail } from 'lucide-react';

const PartnersPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-[#1e293b]">
      {/* Hero section */}
      <PartnersHero />

      {/* Grille des partenaires */}
      <section 
        id="partners-grid" 
        className="py-16 md:py-20 bg-linear-to-b from-gray-50 to-white dark:from-[#1e293b] dark:to-[#162231] overflow-hidden relative"
      >
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#ee5253]/5 dark:bg-[#ee5253]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#932020]/5 dark:bg-[#932020]/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* En-tête de section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'mg' ? 'Mpiara-miasa aminay' : 
                 language === 'fr' ? 'Nos partenaires' : 
                 'Our partners'}
              </h2>
              <div className="w-24 h-1 bg-[#ee5253]/30 mx-auto rounded-full" />
            </motion.div>

            <PartnersGrid showSearch={true} />
          </div>
        </div>
      </section>

      {/* Devenir partenaire */}
      <section className="py-20 bg-linear-to-br from-[#ee5253] to-[#932020] text-white relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10`} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >

            {/* Titre avec effet */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="relative inline-block">
                <span className="relative z-10">
                  {language === 'mg' ? 'Te ho Mpanohana ve ianao?' : 
                   language === 'fr' ? 'Devenir partenaire ?' : 
                   'Become a partner?'}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-white/20 -z-10"></span>
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              {language === 'mg' ? 'Miaraha aminay hanohana sy hampiroborobo ny kolontsaina malagasy' : 
               language === 'fr' ? 'Rejoignez-nous pour soutenir et promouvoir le patrimoine malgache' : 
               'Join us to support and promote Malagasy heritage'}
            </p>

            {/* Avantages en grille */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              {[
                {
                  icon: <Star className="w-6 h-6" />,
                  title: { mg: 'Fahitana', fr: 'Visibilité', en: 'Visibility' },
                  desc: { mg: 'Ampahafantaro ny marikao', fr: 'Augmentez la visibilité de votre marque', en: 'Increase your brand visibility' }
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: { mg: 'Fiaraha-miasa', fr: 'Collaboration', en: 'Collaboration' },
                  desc: { mg: 'Mifandray amin\'ny vondrom-piarahamonina', fr: 'Connectez-vous avec la communauté', en: 'Connect with the community' }
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: { mg: 'Fahombiazana', fr: 'Impact', en: 'Impact' },
                  desc: { mg: 'Hanampy amin\'ny fiarovana ny vakoka', fr: 'Contribuez à la préservation du patrimoine', en: 'Help preserve heritage' }
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title[language]}</h3>
                  <p className="text-sm text-white/80">{item.desc[language]}</p>
                </motion.div>
              ))}
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-white text-[#ee5253] font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  {language === 'mg' ? 'Mifandray aminay' : 
                   language === 'fr' ? 'Nous contacter' : 
                   'Contact us'}
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              <motion.a
                href="#partners-grid"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Award className="w-5 h-5" />
                  {language === 'mg' ? 'Jereo ny mpanohana' : 
                   language === 'fr' ? 'Voir les partenaires' : 
                   'View partners'}
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Vague décorative en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;