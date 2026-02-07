// pages/ContactPage.tsx
import { motion } from 'framer-motion';
import { Globe, MapPin, Phone } from 'lucide-react'; // Import manquant
import { useLanguage } from '../contexts/LanguageContext';
import Contact from '../components/sections/Contact'; // Vérifiez ce chemin

// Données de traduction pour la page contact
const contactTranslations = {
  mg: {
    hero: {
      title: 'FIFANDRAISANA',
      subtitle: 'Miaraka aminay',
      description: 'Mifandray aminay mba hiara-hiasa amin ny fiarovana sy fampitana ny lova nentim-paharazana anakara.',
      cta: 'Hanomboka resaka'
    },
    sections: {
      help: {
        title: 'ETO IZAHAY HANAMPY ANAREO',
        subtitle: 'Resaho ny olanao momba ny tetikasa anakara',
        description: 'Mikasa ny hanohana ny tetikasa anakara ho an ny fiarovana ny vakoka sy ny fanabeazana? Mifandraisa aminay.'
      },
      locations: {
        title: 'Toerana misy antsika',
        antananarivo: 'Antananarivo',
        vatomasina: 'Vatomasina',
        manakara: 'Manakara',
        fianarantsoa: 'Fianarantsoa',
        mahajanga: 'Mahajanga',
        toamasina: 'Toamasina'
      }
    }
  },
  fr: {
    hero: {
      title: 'CONTACT',
      subtitle: 'Avec nous',
      description: 'Contactez-nous pour collaborer à la protection et à la transmission du patrimoine traditionnel anakara.',
      cta: 'Commencer une discussion'
    },
    sections: {
      help: {
        title: 'NOUS SOMMES LÀ POUR VOUS AIDER',
        subtitle: 'Discutez de vos besoins en projets anakara',
        description: 'Vous cherchez à soutenir des projets anakara pour la protection du patrimoine et l\'éducation ? Contactez-nous.'
      },
      locations: {
        title: 'Nos emplacements',
        antananarivo: 'Antananarivo',
        vatomasina: 'Vatomasina',
        manakara: 'Manakara',
        fianarantsoa: 'Fianarantsoa',
        mahajanga: 'Mahajanga',
        toamasina: 'Toamasina'
      }
    }
  },
  en: {
    hero: {
      title: 'CONTACT',
      subtitle: 'With us',
      description: 'Contact us to collaborate on the protection and transmission of traditional anakara heritage.',
      cta: 'Start a discussion'
    },
    sections: {
      help: {
        title: 'WE\'RE HERE TO HELP YOU',
        subtitle: 'Discuss Your Anakara Project Needs',
        description: 'Looking to support anakara projects for heritage protection and education? Reach out to us.'
      },
      locations: {
        title: 'Our Locations',
        antananarivo: 'Antananarivo',
        vatomasina: 'Vatomasina',
        manakara: 'Manakara',
        fianarantsoa: 'Fianarantsoa',
        mahajanga: 'Mahajanga',
        toamasina: 'Toamasina'
      }
    }
  }
};

const ContactPage = () => {
  const { language } = useLanguage();

  // Type assertion pour TypeScript
  const t = contactTranslations[language as keyof typeof contactTranslations];

  const locations = [
    { name: t.sections.locations.antananarivo, phone: '+261 38 90 065 67' },
    { name: t.sections.locations.vatomasina, phone: '+261 34 21 787 64' },
    { name: t.sections.locations.manakara, phone: '+261 38 90 065 67' },
    { name: t.sections.locations.fianarantsoa, phone: '+261 38 90 065 67' },
    { name: t.sections.locations.mahajanga, phone: '+261 38 90 065 67' },
    { name: t.sections.locations.toamasina, phone: '+261 34 21 787 64' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center"></div>
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
                {language === 'mg' ? 'Fikambanana eran-tany' :
                  language === 'fr' ? 'Association mondiale' :
                    'Worldwide association'}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-2xl md:text-3xl text-[#ee5253] font-bold mb-8">
              {t.hero.subtitle}
            </p>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#ee5253] hover:bg-[#d94646] text-white font-bold py-4 px-10 rounded-full text-lg transition-colors shadow-2xl shadow-[#ee5253]/30"
            >
              {t.hero.cta}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section (composant ContactSection) */}
      <section id="contact-section" className="py-12 bg-white">
        <Contact />
      </section>

      {/* Additional Contact Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                {t.sections.help.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.sections.help.description}
              </p>
            </motion.div>

            {/* Contact Cards - Version élégante & professionnelle */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
              {/* Locations Card principale - plus large sur desktop */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="col-span-1 md:col-span-2 lg:col-span-3 bg-white/95 backdrop-blur-sm rounded-3xl border border-gray-100/80 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Header élégant */}
                <div className="bg-linear-to-r from-[#ee5253] to-red-700 px-8 py-10 text-white">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                      <MapPin className="w-8 h-8 text-white" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {t.sections.locations.title}
                      </h3>
                      <p className="text-red-100/90 mt-1.5 text-lg font-light">
                        {language === 'mg' ? "Manerana an'i Madagasikara" :
                          language === 'fr' ? "À travers toute Madagascar" :
                            "Présent à travers Madagascar"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contenu des localisations */}
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
                    {locations.map((location, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group bg-gray-50/70 hover:bg-white border border-gray-200 hover:border-red-200/60 rounded-2xl p-6 transition-all duration-400 hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                              <MapPin className="w-5 h-5 text-[#ee5253]" strokeWidth={2} />
                            </div>
                          </div>

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-lg group-hover:text-[#ee5253] transition-colors">
                              {location.name}
                            </h4>
                            {location.phone && (
                              <p className="mt-2 text-gray-600 font-medium flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                {location.phone}
                              </p>
                            )}

                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Petit footer subtil optionnel */}
                <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 text-center text-sm text-gray-500">
                  {language === 'mg' ? "Antsoina ho an'ny fiaraha-miasa" :
                    language === 'fr' ? "Contactez-nous pour toute collaboration" :
                      "Contact us for any partnership"}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;