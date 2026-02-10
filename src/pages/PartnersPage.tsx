import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import PartnersHero from '../components/sections/PartnersHero';
import PartnersGrid from '../components/sections/PartnersGrid';

const PartnersPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <PartnersHero />

      {/* Grille des partenaires - Tous affichés directement */}
      <section id="partners-grid" className="py-8 md:py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Grille des partenaires */}
            <PartnersGrid showSearch={true} showStats={true} />
          </div>
        </div>
      </section>

      {/* Section devenir partenaire */}
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

export default PartnersPage;