import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Shield, 
  Handshake,
  History,
  Star,
  Award,
  Globe,
  BookOpen,
  Home
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  aboutData, 
  sectionContents, 
  timelineEvents, 
  bureauMembers, 
  nobleFigures 
} from '../data/about';
import Timeline from '../components/sections/Timeline';
import BureauCarousel from '../components/sections/BureauCarousel';
import NoblesCarousel from '../components/sections/NoblesCarousel';

const AboutPage = () => {
  const { language } = useLanguage();
  const t = aboutData[language];

  const values = [
    { icon: Users, label: t.sections.values, description: sectionContents.values[language][0] },
    { icon: Shield, label: 'INTÉGRITÉ', description: sectionContents.values[language][1] },
    { icon: Heart, label: 'RESPECT', description: sectionContents.values[language][2] },
    { icon: Handshake, label: 'HARMONIE', description: sectionContents.values[language][3] },
    { icon: BookOpen, label: 'PRÉSERVATION', description: sectionContents.values[language][4] }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 pt-24 pb-32"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-600 rounded-full blur-xl opacity-75" />
              <div className="relative px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 rounded-full">
                <span className="text-white font-bold tracking-wider text-lg">
                  {t.title}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-emerald-600 dark:from-white dark:via-gray-300 dark:to-emerald-500">
              {t.heroTitle}
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t.heroSubtitle}
          </motion.p>
        </motion.div>

        {/* History Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <History className="w-6 h-6 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t.sections.history}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                {sectionContents.history[language].map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="grid grid-cols-3 gap-6 mt-12"
              >
                {[
                  { value: '1970', label: { mg: 'Taona nioriana', fr: 'Année de fondation', en: 'Year founded' } },
                  { value: '10,000+', label: { mg: 'Mpikambana', fr: 'Membres', en: 'Members' } },
                  { value: '6', label: { mg: 'Faritra', fr: 'Régions', en: 'Regions' } }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label[language]}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-teal-600 rounded-3xl blur-xl opacity-20" />
              <div className="relative bg-linear-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full mb-4">
                    <Home className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300 font-medium">
                      {language === 'mg' ? 'Fotodrazana' : language === 'fr' ? 'Origines' : 'Origins'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === 'mg' ? 'Vatomasina Vohipeno' : 'Vatomasina Vohipeno'}
                  </h3>
                  <p className="text-gray-400">
                    {language === 'mg' ? 'Faritra Fitovinany' : 
                     language === 'fr' ? 'Région Fitovinany' : 
                     'Fitovinany Region'}
                  </p>
                </div>
                <div className="h-64 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80" 
                    alt="Vatomasina"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Mission, Vision & Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              className="bg-linear-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl p-8 border border-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Target className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.sections.mission}
                </h3>
              </div>
              <ul className="space-y-4">
                {sectionContents.mission[language].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-blue-500/20 rounded mt-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="bg-linear-to-br from-purple-500/5 to-pink-500/5 rounded-3xl p-8 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Eye className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.sections.vision}
                </h3>
              </div>
              <ul className="space-y-4">
                {sectionContents.vision[language].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-purple-500/20 rounded mt-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 }}
              className="bg-linear-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl p-8 border border-emerald-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Star className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.sections.values}
                </h3>
              </div>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl"
                  >
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <value.icon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {value.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {value.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Award className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t.sections.timeline}
            </h2>
          </div>

          <div className="relative">
            <Timeline events={timelineEvents} />
          </div>
        </motion.section>

        {/* Bureau Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t.sections.bureau}
              </h2>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'mg' ? 'Mpitarika ankehitriny' : 
               language === 'fr' ? 'Direction actuelle' : 
               'Current leadership'}
            </div>
          </div>

          <BureauCarousel members={bureauMembers} />
        </motion.section>

        {/* Noble Figures Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <Globe className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t.sections.nobles}
              </h2>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'mg' ? 'Tantara sy lova' : 
               language === 'fr' ? 'Histoire et héritage' : 
               'History and heritage'}
            </div>
          </div>

          <NoblesCarousel nobles={nobleFigures} />
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="text-center"
        >
          <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-emerald-500 to-teal-600 p-12 shadow-2xl">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-6">
                {language === 'mg' ? 'Mba ho mpikambana' : 
                 language === 'fr' ? 'Rejoignez-nous' : 
                 'Join us'}
              </h3>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                {language === 'mg' ? 'Miaraha hiara-hiasa isika mba hanatanterahana ny anjara asa manandratra ny maha-izy Anakara antsika.' :
                 language === 'fr' ? 'Travaillons ensemble pour accomplir notre mission de valorisation de notre identité Anakara.' :
                 'Let\'s work together to accomplish our mission of enhancing our Anakara identity.'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-xl transition-all"
              >
                {t.cta}
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default AboutPage;