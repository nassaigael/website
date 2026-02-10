import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import PartnersHero from '../components/sections/PartnersHero';
import PartnersGrid from '../components/grids/PartnersGrid';

const PartnersPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <PartnersHero />

      {/* Grille des partenaires - Tous affichés directement */}
      <section id="partners-grid" className="py-6 md:py-4 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <PartnersGrid showSearch={true} />
          </div>
        </div>
      </section>

      {/* Section devenir partenaire */}
      <section className="py-6 bg-linear-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-2 sm:px-2 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'mg' ? 'Te ho Mpanohana ve ianao?' : language === 'fr' ? 'Devenir partenaire ?' : 'Become a partner?'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              {language === 'mg' ? 'Miaraha aminay hanohana sy hampiroborobo ny kolontsaina malagasy' : language === 'fr' ? 'Rejoignez-nous pour soutenir et promouvoir le patrimoine malgache' : 'Join us to support and promote Malagasy heritage'}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button className="bg-[#ee5253] hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full text-lg transition shadow-lg">
                {language === 'mg' ? 'Mifandray aminay' : language === 'fr' ? 'Contactez-nous' : 'Contact us'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;