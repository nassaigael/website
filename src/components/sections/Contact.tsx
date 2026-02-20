// components/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations, type LanguageKey } from '../../data/index';

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

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', industry: '', message: '' });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section className="bg-[#1e293b] py-16 px-4"> {/* Changé de bg-gray-50 à bg-[#1e293b] */}
      <div className="mx-auto max-w-6xl rounded-3xl bg-[#1e293b] p-8 md:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10"> {/* Changé de bg-white à bg-[#1e293b] */}
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-gray-300 uppercase mb-2"> {/* Changé de text-gray-500 à text-gray-300 */}
            {t.title}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4"> {/* Changé de text-gray-900 à text-white */}
            <span className="text-[#ee5253]">{t.subtitle}</span> <br />
            <span className="text-[#ee5253]">{t.highlighted}</span> <br />
            {t.continuation}
          </h2>

          <p className="text-gray-300 mb-8 max-w-md"> {/* Changé de text-gray-600 à text-gray-300 */}
            {t.description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ee5253]/20 text-[#ee5253]"> {/* Changé de bg-red-50 à bg-[#ee5253]/20 */}
                <Mail size={20} />
              </div>
              <span className="text-gray-300"> {/* Changé de text-gray-700 à text-gray-300 */}
                contact@fizanakara.mg
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#ee5253]/20 text-[#ee5253]"> {/* Changé de bg-red-50 à bg-[#ee5253]/20 */}
                <Phone size={20} />
              </div>
              <span className="text-gray-300"> {/* Changé de text-gray-700 à text-gray-300 */}
                (+261) 38 90 065 67
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-[#0f172a] rounded-2xl p-6 md:p-8 shadow-md"> {/* Changé de bg-gray-50 à bg-[#0f172a] */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-900/30 border border-green-700 rounded-xl p-6 text-center"
            >
              <div className="h-12 w-12 bg-green-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-green-400 text-lg font-medium">
                {t.form.success}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-1"> {/* Changé de text-gray-600 à text-gray-300 */}
                  {t.form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={t.form.namePlaceholder}
                  className="w-full rounded-lg border border-gray-700 bg-[#1e293b] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ee5253] transition-all placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1"> {/* Changé de text-gray-600 à text-gray-300 */}
                  {t.form.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t.form.emailPlaceholder}
                  className="w-full rounded-lg border border-gray-700 bg-[#1e293b] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ee5253] transition-all placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1"> {/* Changé de text-gray-600 à text-gray-300 */}
                  {t.form.industry}
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-700 bg-[#1e293b] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ee5253] transition-all"
                >
                  <option value="" className="bg-[#1e293b] text-white">{t.form.industryPlaceholder}</option>
                  {t.form.industryOptions.map((option: string, index: number) => (
                    <option key={index} value={option} className="bg-[#1e293b] text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1"> {/* Changé de text-gray-600 à text-gray-300 */}
                  {t.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={t.form.messagePlaceholder}
                  className="w-full rounded-lg border border-gray-700 bg-[#1e293b] text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ee5253] transition-all resize-none placeholder-gray-500"
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