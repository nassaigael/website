import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from '../components/layout/Footer';
import ContactSection from '../components/sections/Contact';

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
      contactInfo: {
        email: 'Email',
        phone: 'Laharana finday'
      },
      form: {
        title: 'Alefaso hafatra',
        name: 'Anarana',
        email: 'Email',
        industry: {
          label: 'Saha',
          placeholder: 'Safidio',
          options: [
            'Fiarovana vakoka',
            'Fanabeazana',
            'Fampandrosoana anjara asa',
            'Tetikasam-piarahamonina',
            'Haino aman-jery',
            'Hetsika kolontsaina'
          ]
        },
        message: 'Hafatra',
        messagePlaceholder: 'Misaotra anao no nifandray taminao. Mankasitraka ny fiahianao ny tetikasantsika. Raha manana fanontaniana ianao na mila fanazavana fanampiny, azafady aza misalasala mifandray aminay.',
        submit: 'Alefa hafatra',
        success: 'Nalefa soa aman-tsara ny hafatrao! Hifandray aminay haingana ianao.'
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
      contactInfo: {
        email: 'E-mail',
        phone: 'Numéro de téléphone'
      },
      form: {
        title: 'Envoyer un message',
        name: 'Nom',
        email: 'E-mail',
        industry: {
          label: 'Secteur',
          placeholder: 'Sélectionner',
          options: [
            'Protection du patrimoine',
            'Éducation',
            'Développement communautaire',
            'Projets sociaux',
            'Médias',
            'Événements culturels'
          ]
        },
        message: 'Message',
        messagePlaceholder: 'Merci de nous avoir contactés. Nous apprécions votre intérêt pour nos projets. Si vous avez des questions ou besoin de plus d\'informations, n\'hésitez pas à nous contacter.',
        submit: 'Envoyer le message',
        success: 'Votre message a été envoyé avec succès ! Nous vous contacterons rapidement.'
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
      contactInfo: {
        email: 'E-mail',
        phone: 'Phone number'
      },
      form: {
        title: 'Send Message',
        name: 'Name',
        email: 'Email',
        industry: {
          label: 'Industry',
          placeholder: 'Select',
          options: [
            'Heritage Protection',
            'Education',
            'Community Development',
            'Social Projects',
            'Media',
            'Cultural Events'
          ]
        },
        message: 'Message',
        messagePlaceholder: 'Thank you for reaching out. We appreciate your interest in our projects. If you have any questions or need further information, please don\'t hesitate to contact us.',
        submit: 'Send Message',
        success: 'Your message has been sent successfully! We\'ll contact you shortly.'
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
  const t = contactTranslations[language];
  
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
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-24 pb-20 md:pt-32 md:pb-28">
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
        <ContactSection />
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

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Locations Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow lg:col-span-3 md:col-span-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#ee5253] rounded-full flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black">
                      {t.sections.locations.title}
                    </h3>
                    <p className="text-gray-600">{language === 'mg' ? 'Manerana an\'i Madagasikara' : 
                                                language === 'fr' ? 'À travers Madagascar' : 
                                                'Across Madagascar'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {locations.map((location, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-[#ee5253] mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-800 font-medium">{location.name}</p>
                        <p className="text-gray-600 text-sm">{location.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;