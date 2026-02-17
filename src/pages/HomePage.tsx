import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Award, Target, Star, MapPin,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Import des composants
import Carousel from '../components/sections/HomeCarousel';

// Import des données
import { carouselSlides, stats } from '../data/index';
import OfficeSection from '../components/sections/OfficeSection';



const HomePage = () => {
  const { language } = useLanguage();
  const location = useLocation();

  // Sélectionner le contenu en fonction de la langue

  // Valeurs aléatoires stables pour les animations (calculées une seule fois)
  const [randomValues] = useState(() => ({
    stars: [...Array(15)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 5
    })),
    circles: [
      { scale: 1 + Math.random() * 0.5, duration: 8 + Math.random() * 5 },
      { scale: 1 + Math.random() * 0.5, duration: 10 + Math.random() * 5 }
    ]
  }));

  return (
    <div
      className={`
        relative 
        overflow-x-hidden
        ${location.pathname === '/' ? '' : 'pt-0'}
      `}
    >
      {/* Premium Carousel Section */}
      <div className="relative w-full h-screen">
        <Carousel slides={carouselSlides} />
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#ee5253]/10 to-[#932020]/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#932020]" />
                  </div>
                  <div className="text-4xl font-bold text-gray-800 dark:text-white mb-2 bg-linear-to-r from-[#932020] to-[#ee5253] bg-clip-text">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label[language]}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Fizanakara - Section Ultra Premium */}
      <section className="py-24 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-[#ee5253]/5 to-[#932020]/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-r from-[#932020]/5 to-[#ee5253]/5 rounded-full blur-3xl"
          />

          {/* Grille subtile */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,82,83,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(147,32,32,0.02)_1px,transparent_1px)] bg-size-[50px_50px]" />

          {/* Étoiles scintillantes */}
          {randomValues.stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#ee5253]/20 rounded-full"
              initial={{
                x: `${star.x}%`,
                y: `${star.y}%`,
                scale: 0
              }}
              animate={{
                x: [`${star.x}%`, `${(star.x + 20) % 100}%`, `${star.x}%`],
                y: [`${star.y}%`, `${(star.y + 10) % 100}%`, `${star.y}%`],
                scale: [0, 1, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay
              }}
            />
          ))}
        </div>

        {/* Lignes décoratives */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#ee5253]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#932020]/30 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* En-tête de section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Badge premium */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-[#ee5253] to-[#932020] rounded-full blur-xl opacity-75" />
                <div className="relative px-8 py-3 bg-linear-to-r from-[#ee5253] to-[#932020] rounded-full">
                  <span className="text-white font-bold tracking-wider text-sm">
                    {language === 'mg' ? 'FOTOTRA SY LOVA' :
                      language === 'fr' ? 'FONDATION ET HÉRITAGE' :
                        'FOUNDATION & HERITAGE'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Titre principal */}
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:via-gray-300 dark:to-gray-500">
                {language === 'mg' ? 'Ny maha-izy anay' :
                  language === 'fr' ? 'Notre identité' :
                    'Our identity'}
              </span>
            </motion.h2>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            >
              {language === 'mg'
                ? 'Fikambanan\'ny taranak\'i Ali Tawarath, miaro sy manandratra ny vakoka nentin-drazana'
                : language === 'fr'
                  ? 'Association des descendants d\'Ali Tawarath, préservant et valorisant l\'héritage ancestral'
                  : 'Association of Ali Tawarath descendants, preserving and enhancing ancestral heritage'}
            </motion.p>

            {/* Séparateur */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-1 bg-linear-to-r from-[#ee5253] to-[#932020] mx-auto mt-8 rounded-full"
            />
          </motion.div>

          {/* Grille principale - 3 colonnes */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">

            {/* Carte 1 - Les Anakara (origine) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-full bg-linear-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-amber-200/50 dark:border-gray-700 overflow-hidden"
              >
                {/* Éléments décoratifs */}
                <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl"
                    >
                      <Star className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'mg' ? 'Ny Anakara' :
                          language === 'fr' ? 'Les Anakara' :
                            'The Anakara'}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-sm text-gray-500">1495</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {language === 'mg'
                      ? 'Foko iray ao anatin\'ny Antemoro, taranak\'i Ali Tawarath izay tonga teto Madagasikara tamin\'ny taona 1495.'
                      : language === 'fr'
                        ? 'Un clan au sein des Antemoro, descendants d\'Ali Tawarath arrivé à Madagascar en 1495.'
                        : 'A clan within the Antemoro, descendants of Ali Tawarath who arrived in Madagascar in 1495.'}
                  </p>

                  <div className="bg-amber-100/50 dark:bg-gray-800 p-4 rounded-xl border border-amber-200/50 dark:border-gray-700">
                    <p className="text-sm text-amber-800 dark:text-amber-300 italic">
                      <span className="font-bold">"</span>
                      {language === 'mg'
                        ? 'Araka ny Katibo MAHEFAMANANA MOSA, Ali Tawarath dia tonga teto Madagasikara tamin\'ny taona 1495.'
                        : language === 'fr'
                          ? 'Selon Katibo MAHEFAMANANA MOSA, Ali Tawarath est arrivé à Madagascar en 1495.'
                          : 'According to Katibo MAHEFAMANANA MOSA, Ali Tawarath arrived in Madagascar in 1495.'}
                      <span className="font-bold">"</span>
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Vatomasina Vohipeno, Fitovinany</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Carte 2 - Fondateurs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-full bg-linear-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-emerald-200/50 dark:border-gray-700 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: -360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl"
                    >
                      <Award className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'mg' ? 'Mpanorina' :
                          language === 'fr' ? 'Fondateurs' :
                            'Founders'}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-sm text-gray-500">1970</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      'MARSON Evariste',
                      'TSARAMONINA Jean Abraham',
                      'RANDRIAMAMPIONONA Franciscain'
                    ].map((founder, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 p-3 bg-emerald-100/50 dark:bg-gray-800 rounded-xl"
                      >
                        <div className="w-8 h-8 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {founder.charAt(0)}
                        </div>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">{founder}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-emerald-200/50 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Filoha mpitantana:</span>{' '}
                      Patrick RAMONJAVELO
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Carte 3 - Vision & Impact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-full bg-linear-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-2xl border border-purple-200/50 dark:border-gray-700 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl"
                    >
                      <Target className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'mg' ? 'Fisiana' :
                          language === 'fr' ? 'Présence' :
                            'Presence'}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-purple-100/50 dark:bg-gray-800 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300">Mpikambana</span>
                      <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">10k+</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Antananarivo', icon: MapPin },
                        { label: 'Vatomasina', icon: MapPin },
                        { label: 'Manakara', icon: MapPin },
                        { label: 'Toamasina', icon: MapPin },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-gray-800/50 rounded-lg">
                          <item.icon className="w-3 h-3 text-purple-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-purple-200/50 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Contact</span>
                      <span className="text-purple-600 dark:text-purple-400 font-medium">24/7</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Badge de fondation central */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.6 }}
            className="mt-16 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-6 px-8 py-4 bg-linear-to-r from-[#ee5253]/10 to-[#932020]/10 rounded-full border border-[#ee5253]/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#ee5253] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {language === 'mg' ? 'Niorina tamin\'ny' :
                    language === 'fr' ? 'Fondé en' :
                      'Founded in'}
                </span>
              </div>
              <span className="text-2xl font-bold text-[#ee5253]">1970</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {language === 'mg' ? 'Antananarivo' :
                    language === 'fr' ? 'Antananarivo' :
                      'Antananarivo'}
                </span>
                <div className="w-3 h-3 bg-[#932020] rounded-full animate-pulse" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <OfficeSection />

      {/* Call to Action */}
      <section className="py-20 bg-linear-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {language === 'mg'
                ? 'Miaraka aminay'
                : language === 'fr'
                  ? 'Rejoignez-nous'
                  : 'Join us'}
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {language === 'mg'
                ? 'Indro ny tanako mivelatra ho an\'ny rehetra, indrindra ho an\'ireo taranaka Anakara manerana izao tontolo izao.'
                : language === 'fr'
                  ? 'Voici ma main tendue à tous, particulièrement aux générations Anakara à travers le monde.'
                  : 'Here is my hand extended to all, especially to Anakara generations around the world.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ee5253] hover:bg-[#d94646] text-white font-bold py-4 px-8 rounded-full text-lg transition-colors"
              >
                {language === 'mg' ? 'Hifandray' : language === 'fr' ? 'Nous contacter' : 'Contact us'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-white/10 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors border border-white/30"
              >
                {language === 'mg' ? 'Hijery vaovao' : language === 'fr' ? 'Voir les actualités' : 'See news'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;