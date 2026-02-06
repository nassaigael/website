// pages/ContactPage.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from '../components/layout/Footer';

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
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', industry: '', message: '' });
      
      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };
  
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
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#ee5253] hover:bg-[#d94646] text-white font-bold py-4 px-10 rounded-full text-lg transition-colors shadow-2xl shadow-[#ee5253]/30"
            >
              {t.hero.cta}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {t.sections.help.title}
              </h2>
              <p className="text-2xl text-[#ee5253] font-bold mb-4">
                {t.sections.help.subtitle}
              </p>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.sections.help.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-1 bg-gray-50 p-8 rounded-2xl border border-gray-200"
              >
                <div className="space-y-8">
                  {/* Email */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#ee5253] rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-black">
                          {t.sections.contactInfo.email}
                        </h3>
                        <p className="text-gray-600">soluvent***@gmail.com</p>
                      </div>
                    </div>
                    <a 
                      href="mailto:soluvent***@gmail.com"
                      className="text-[#ee5253] hover:text-[#d94646] font-medium inline-block"
                    >
                      {language === 'mg' ? 'Ampidiro email' : 
                       language === 'fr' ? 'Envoyer un email' : 
                       'Send email'}
                    </a>
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#ee5253] rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-black">
                          {t.sections.contactInfo.phone}
                        </h3>
                        <p className="text-gray-600">+123 - 456 - 7890</p>
                      </div>
                    </div>
                    <a 
                      href="tel:+1234567890"
                      className="text-[#ee5253] hover:text-[#d94646] font-medium inline-block"
                    >
                      {language === 'mg' ? 'Antsoy izao' : 
                       language === 'fr' ? 'Appeler maintenant' : 
                       'Call now'}
                    </a>
                  </div>

                  {/* Locations */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-black mb-4">
                      {t.sections.locations.title}
                    </h3>
                    <div className="space-y-3">
                      {locations.map((location, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-[#ee5253] mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-gray-800 font-medium">{location.name}</p>
                            <p className="text-gray-600 text-sm">{location.phone}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-200 shadow-lg"
              >
                <h2 className="text-3xl font-bold text-black mb-8">
                  {t.sections.form.title}
                </h2>
                
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="text-green-800 text-lg font-medium">
                      {t.sections.form.success}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          {t.sections.form.name}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ee5253] focus:border-transparent outline-none transition-all"
                          placeholder="Jane Smith"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          {t.sections.form.email}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ee5253] focus:border-transparent outline-none transition-all"
                          placeholder="jane.smith@example.com"
                        />
                      </div>
                    </div>

                    {/* Industry */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        {t.sections.form.industry.label}
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ee5253] focus:border-transparent outline-none transition-all"
                      >
                        <option value="">{t.sections.form.industry.placeholder}</option>
                        {t.sections.form.industry.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        {t.sections.form.message}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ee5253] focus:border-transparent outline-none transition-all resize-none"
                        placeholder={t.sections.form.messagePlaceholder}
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#ee5253] hover:bg-[#d94646]'
                      } text-white shadow-lg shadow-[#ee5253]/30`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {language === 'mg' ? 'Eo am-pandalovana...' : 
                           language === 'fr' ? 'Envoi en cours...' : 
                           'Sending...'}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          {t.sections.form.submit}
                        </span>
                      )}
                    </motion.button>
                  </form>
                )}
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