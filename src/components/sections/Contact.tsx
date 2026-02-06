// components/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// Définir les types
interface Translation {
  title: string;
  subtitle: string;
  highlighted: string;
  continuation: string;
  description: string;
  emailLabel: string;
  phoneLabel: string;
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    industry: string;
    industryPlaceholder: string;
    industryOptions: string[];
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
  };
}

type LanguageKey = 'mg' | 'fr' | 'en';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const translations: Record<LanguageKey, Translation> = {
    mg: {
      title: "ETO IZAHAY HANAMPY ANAREO",
      subtitle: "Resaho ny",
      highlighted: "Tetikasa",
      continuation: "Anakara Ilainao",
      description: "Mikasa ny hanohana ny tetikasa anakara ho an ny fiarovana ny vakoka sy ny fanabeazana? Mifandraisa aminay.",
      emailLabel: "Email",
      phoneLabel: "Laharana finday",
      form: {
        name: "Anarana",
        namePlaceholder: "Jane Smith",
        email: "Email",
        emailPlaceholder: "jane.smith@example.com",
        industry: "Saha",
        industryPlaceholder: "Safidio",
        industryOptions: [
          "Fiarovana vakoka",
          "Fanabeazana",
          "Fampandrosoana anjara asa",
          "Tetikasam-piarahamonina",
          "Haino aman-jery",
          "Hetsika kolontsaina"
        ],
        message: "Hafatra",
        messagePlaceholder: "Misaotra anao no nifandray taminao. Mankasitraka ny fiahianao ny tetikasantsika. Raha manana fanontaniana ianao na mila fanazavana fanampiny, azafady aza misalasala mifandray aminay.",
        submit: "Alefa hafatra",
        submitting: "Eo am-pandalovana...",
        success: "Nalefa soa aman-tsara ny hafatrao!"
      }
    },
    fr: {
      title: "NOUS SOMMES LÀ POUR VOUS AIDER",
      subtitle: "Discutez de vos",
      highlighted: "Projets",
      continuation: "Anakara",
      description: "Vous cherchez à soutenir des projets anakara pour la protection du patrimoine et l'éducation ? Contactez-nous.",
      emailLabel: "E-mail",
      phoneLabel: "Numéro de téléphone",
      form: {
        name: "Nom",
        namePlaceholder: "Jane Smith",
        email: "E-mail",
        emailPlaceholder: "jane.smith@example.com",
        industry: "Secteur",
        industryPlaceholder: "Sélectionner",
        industryOptions: [
          "Protection du patrimoine",
          "Éducation",
          "Développement communautaire",
          "Projets sociaux",
          "Médias",
          "Événements culturels"
        ],
        message: "Message",
        messagePlaceholder: "Merci de nous avoir contactés. Nous apprécions votre intérêt pour nos projets. Si vous avez des questions ou besoin de plus d'informations, n'hésitez pas à nous contacter.",
        submit: "Envoyer le message",
        submitting: "Envoi en cours...",
        success: "Votre message a été envoyé avec succès!"
      }
    },
    en: {
      title: "WE'RE HERE TO HELP YOU",
      subtitle: "Discuss Your",
      highlighted: "Anakara",
      continuation: "Project Needs",
      description: "Looking to support anakara projects for heritage protection and education? Reach out to us.",
      emailLabel: "E-mail",
      phoneLabel: "Phone number",
      form: {
        name: "Name",
        namePlaceholder: "Jane Smith",
        email: "Email",
        emailPlaceholder: "jane.smith@example.com",
        industry: "Industry",
        industryPlaceholder: "Select",
        industryOptions: [
          "Heritage Protection",
          "Education",
          "Community Development",
          "Social Projects",
          "Media",
          "Cultural Events"
        ],
        message: "Message",
        messagePlaceholder: "Thank you for reaching out. We appreciate your interest in our projects. If you have any questions or need further information, please don't hesitate to contact us.",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Your message has been sent successfully!"
      }
    }
  };

  // Type assertion pour garantir que language est bien un LanguageKey
  const currentLanguage = language as LanguageKey;
  const t = translations[currentLanguage];

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

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 md:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-gray-500 uppercase mb-2">
            {t.title}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            <span className="text-[#ee5253]">{t.subtitle}</span> <br />
            <span className="text-[#ee5253]">{t.highlighted}</span> <br />
            {t.continuation}
          </h2>

          <p className="text-gray-600 mb-8 max-w-md">
            {t.description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-50 text-[#ee5253]">
                <Mail size={20} />
              </div>
              <span className="text-gray-700">
                contact@fizanakara.mg
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-50 text-[#ee5253]">
                <Phone size={20} />
              </div>
              <span className="text-gray-700">
                (+261) 38 90 065 67
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-md">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
            >
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-green-800 text-lg font-medium">
                {t.form.success}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t.form.namePlaceholder}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ee5253] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t.form.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.form.emailPlaceholder}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ee5253] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t.form.industry}
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#ee5253] transition-all"
                >
                  <option value="">{t.form.industryPlaceholder}</option>
                  {t.form.industryOptions.map((option: string, index: number) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {t.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={t.form.messagePlaceholder}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ee5253] transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 rounded-full bg-[#ee5253] px-6 py-4 font-semibold text-white hover:bg-[#d94646] transition w-full disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t.form.submitting}</span>
                  </>
                ) : (
                  <>
                    <span className="h-8 w-8 rounded-full bg-white text-[#ee5253] flex items-center justify-center">
                      <Send size={16} />
                    </span>
                    <span>{t.form.submit}</span>
                  </>
                )}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;