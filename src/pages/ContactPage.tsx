// components/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations, type LanguageKey } from '../data/index';

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
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const currentLanguage = language as LanguageKey;
  const t = translations[currentLanguage];

  // Liste des provinces avec leurs contacts
  const provinces = [
    {
      name: 'Antananarivo',
      phone: '+261 38 90 065 67',
      email: 'tana@fizanakara.mg',
      address: 'Lot IVH 76, Antananarivo',
      responsable: 'Patrick RAMONJAVELO'
    },
    {
      name: 'Vatomasina',
      phone: '+261 34 21 787 64',
      email: 'vatomasina@fizanakara.mg',
      address: 'Vatomasina, Vohipeno',
      responsable: 'MARSON Evariste'
    },
    {
      name: 'Manakara',
      phone: '+261 38 90 065 67',
      email: 'manakara@fizanakara.mg',
      address: 'Manakara Centre',
      responsable: 'TSARAMONINA Jean Abraham'
    },
    {
      name: 'Fianarantsoa',
      phone: '+261 38 90 065 67',
      email: 'fianar@fizanakara.mg',
      address: 'Fianarantsoa Ville',
      responsable: 'RANDRIAMAMPIONONA Franciscain'
    },
    {
      name: 'Mahajanga',
      phone: '+261 38 90 065 67',
      email: 'mahajanga@fizanakara.mg',
      address: 'Mahajanga Beach',
      responsable: 'RAKOTOMALALA Marie'
    },
    {
      name: 'Toamasina',
      phone: '+261 34 21 787 64',
      email: 'toamasina@fizanakara.mg',
      address: 'Toamasina Port',
      responsable: 'RAZAFINDRABE Jean'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', industry: '', message: '' });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  // Variants d'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative bg-linear-to-br from-[#1e293b] via-[#1a1f2e] to-[#0f172a] py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-linear-to-r from-[#ee5253]/5 to-[#932020]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-linear-to-r from-[#932020]/5 to-[#ee5253]/5 rounded-full blur-3xl"
        />

        {/* Grille subtile */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,82,83,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(147,32,32,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />
      </div>

      {/* Lignes décoratives */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#ee5253]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#932020]/30 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative z-10 mx-auto max-w-7xl"
      >
        {/* Badge premium */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight"
          >
            <span className="relative inline-block">
              <span className="relative z-10">
                {language === 'mg' ? 'Fifandraisana' :
                  language === 'fr' ? 'Contact' :
                    'Contact'}
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-2 md:h-3 bg-[#ee5253]/20 -z-10"></span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mb-10 md:mb-12 px-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              {language === 'mg' ? 'Eto izahay hamaly ny fanontanianao' :
                language === 'fr' ? 'Nous sommes là pour répondre à vos questions' :
                  "We're here to answer your questions"}            </p>
          </motion.div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16">
            <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]/30"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-[#ee5253] rotate-45"></div>
            <div className="w-8 md:w-12 h-0.5 bg-[#ee5253]/30"></div>
          </div>
        </motion.div>

        {/* Grille principale */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Carte des provinces */}
          <motion.div
            variants={itemVariants}
            className="bg-linear-to-br from-[#0f172a] to-[#1a1f2e] rounded-3xl p-8 border border-gray-800/50 shadow-2xl h-fit lg:h-full"
          >
            <div className="flex items-center gap-2 mb-6">
              <h3 className="text-xl font-bold text-white">
                {language === 'mg' ? 'Nosy rehetra' :
                  language === 'fr' ? 'Nos antennes' :
                    'Our offices'}
              </h3>
            </div>

            <div className="space-y-3 max-h-125 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#ee5253]/20 scrollbar-track-transparent">
              {provinces.map((province, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => setSelectedProvince(selectedProvince === province.name ? null : province.name)}
                  className={`p-4 bg-[#1e293b] rounded-xl border transition-all duration-300 cursor-pointer ${selectedProvince === province.name
                    ? 'border-[#ee5253] shadow-lg shadow-[#ee5253]/10'
                    : 'border-gray-800/50 hover:border-[#ee5253]/30'
                    }`}
                >
                  <div className="flex items-start gap-3">

                    <div className="flex-1">
                      <h4 className="font-bold text-white flex items-center gap-2">
                        {province.name}
                        {selectedProvince === province.name}
                      </h4>

                      <motion.div
                        initial={false}
                        animate={{ height: selectedProvince === province.name ? 'auto' : 0 }}
                        className="overflow-hidden"
                      >
                        {selectedProvince === province.name && (
                          <div className="mt-3 space-y-2 pt-2 border-t border-gray-700/50">
                            <p className="text-xs text-gray-400 flex items-center gap-2">
                              <Phone className="w-3 h-3 text-[#ee5253]" />
                              <a href={`tel:${province.phone}`} className="text-white hover:text-[#ee5253] transition-colors">
                                {province.phone}
                              </a>
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-2">
                              <Mail className="w-3 h-3 text-[#ee5253]" />
                              <a href={`mailto:${province.email}`} className="text-white hover:text-[#932020] transition-colors">
                                {province.email}
                              </a>
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-2">
                              <MapPin className="w-3 h-3 text-[#ee5253]" />
                              <span className="text-white">{province.address}</span>
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-2 mt-2">
                              <Users className="w-3 h-3 text-[#ee5253]" />
                              <span className="text-white">{province.responsable}</span>
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT FORM - Formulaire premium */}
          <motion.div
            variants={itemVariants}
            className="bg-linear-to-br from-[#0f172a] to-[#1a1f2e] rounded-3xl p-8 shadow-2xl border border-gray-800/50 h-fit lg:h-full"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 h-full"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 animate-pulse" />
                  <div className="relative w-20 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.form.success}</h3>
                <p className="text-gray-400 text-center">
                  {language === 'mg' ? 'Hamaly anao haingana izahay' :
                    language === 'fr' ? 'Nous vous répondrons rapidement' :
                      "We'll get back to you soon"}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {language === 'mg' ? 'Alefaso hafatra' :
                    language === 'fr' ? 'Envoyez un message' :
                      'Send a message'}
                </h3>

                {/* Nom */}
                <motion.div
                  animate={focusedField === 'name' ? { scale: 1.02 } : { scale: 1 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    {t.form.name}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder={t.form.namePlaceholder}
                      className="w-full bg-[#1e293b] border-2 border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#ee5253] focus:ring-2 focus:ring-[#ee5253]/20 transition-all outline-none"
                    />
                    {focusedField === 'name' && (
                      <motion.div
                        layoutId="focus-indicator"
                        className="absolute bg-[#ee5253]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  animate={focusedField === 'email' ? { scale: 1.02 } : { scale: 1 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    {t.form.email}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder={t.form.emailPlaceholder}
                      className="w-full bg-[#1e293b] border-2 border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#ee5253] focus:ring-2 focus:ring-[#ee5253]/20 transition-all outline-none"
                    />
                  </div>
                </motion.div>

                {/* Secteur */}
                <motion.div
                  animate={focusedField === 'industry' ? { scale: 1.02 } : { scale: 1 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    {t.form.industry}
                  </label>
                  <div className="relative">
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('industry')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-[#1e293b] border-2 border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#ee5253] focus:ring-2 focus:ring-[#ee5253]/20 transition-all outline-none appearance-none"
                    >
                      <option value="" className="bg-[#1e293b]">{t.form.industryPlaceholder}</option>
                      {t.form.industryOptions.map((option: string, index: number) => (
                        <option key={index} value={option} className="bg-[#1e293b]">
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  animate={focusedField === 'message' ? { scale: 1.02 } : { scale: 1 }}
                  className="space-y-2 flex-grow"
                >
                  <label className="block text-sm font-medium text-gray-300">
                    {t.form.message}
                  </label>
                  <div className="relative h-full">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      placeholder={t.form.messagePlaceholder}
                      className="w-full bg-[#1e293b] border-2 border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#ee5253] focus:ring-2 focus:ring-[#ee5253]/20 transition-all outline-none resize-none h-32"
                    />
                  </div>
                </motion.div>

                {/* Bouton submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full overflow-hidden group mt-auto"
                >
                  <div className="absolute inset-0 bg-[#ee5253] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-3 bg-[#ee5253] px-6 py-4 rounded-xl font-semibold text-white shadow-xl">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{t.form.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <Send size={16} className="text-white" />
                        </span>
                        <span>{t.form.submit}</span>
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;