import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Globe, BookOpen, Award, Target, Heart, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const HomePage = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=80",
      title: {
        mg: "FIZANAKARA",
        fr: "FIZANAKARA",
        en: "FIZANAKARA"
      },
      subtitle: {
        mg: "Fikambanan'ny Zanak'Anakara",
        fr: "Association des Descendants Anakara",
        en: "Anakara Descendants Association"
      },
      description: {
        mg: "Andao isika hiara-hiasa hampandrosoana ny ANAKARA mba hananan-tsika fireharehàna sy fahatsapana fa masina sy manan-danja io Tanindrazantsika io.",
        fr: "Travaillons ensemble pour faire progresser les ANAKARA afin que nous ayons la fierté et le sentiment que notre Patrie est sacrée et importante.",
        en: "Let's work together to advance the ANAKARA so that we have pride and the feeling that our Homeland is sacred and important."
      }
    },
    {
      image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1920&q=80",
      title: {
        mg: "VAKOKA NENTIN-DRAZANA",
        fr: "PATRIMOINE ANCESTRAL",
        en: "ANCESTRAL HERITAGE"
      },
      subtitle: {
        mg: "Hitahiry ny lova tsara navelan'ny razantsika",
        fr: "Préserver le bon héritage laissé par nos ancêtres",
        en: "Preserve the good heritage left by our ancestors"
      },
      description: {
        mg: "Miarova sy mitahiry ny kolontsaina, fomba amam-panao, ary ny soratra nentin-drazana Anakara.",
        fr: "Défendre et préserver la culture, les traditions et l'écriture ancestrale Anakara.",
        en: "Defend and preserve the culture, traditions and ancestral Anakara writing."
      }
    },
    {
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=80",
      title: {
        mg: "FIARAHAMONINA MIRAY",
        fr: "COMMUNAUTÉ UNIE",
        en: "UNITED COMMUNITY"
      },
      subtitle: {
        mg: "Mahery ny 10.000 mpikambana eran-tany",
        fr: "Plus de 10.000 membres à travers le monde",
        en: "Over 10,000 members worldwide"
      },
      description: {
        mg: "Mampifandray ny taranaka Anakara manerana izao tontolo izao mba hanamafisana ny fifandraisana sy ny firaisana.",
        fr: "Relier les générations Anakara à travers le monde pour renforcer les liens et l'unité.",
        en: "Connecting Anakara generations worldwide to strengthen bonds and unity."
      }
    },
    {
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
      title: {
        mg: "FANABEAZANA SY FAMPIROBOROBOANA",
        fr: "ÉDUCATION ET PROMOTION",
        en: "EDUCATION AND PROMOTION"
      },
      subtitle: {
        mg: "Manohana ny tanora sy ny fahaizana",
        fr: "Soutenir la jeunesse et les compétences",
        en: "Support youth and skills"
      },
      description: {
        mg: "Mandray anjara amin'ny fanomezana fahaizana sy fanampiana ho an'ny tanora Anakara mba hahatratrarany ny fivoarana.",
        fr: "Contribuer à donner des compétences et de l'aide aux jeunes Anakara pour atteindre le développement.",
        en: "Contribute to providing skills and assistance to Anakara youth to achieve development."
      }
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const content = {
    mg: {
      about: {
        title: "Iza moa Fizanakara?",
        description: "Ny FIZANAKARA dia fikambanan'ireo taranak'i Ali Tawarath, izay avy ao Vatomasina Vohipeno, faritra Fitovinany. Niorina tamin'ny taona 1970 tao Antananarivo.",
        members: "Mahery ny 10.000 ny mpikambana ankehitriny izay misandrahaka manerana ny nosy sy any andilam-bato.",
        mission: "Hampitoetra maharitra mandrakizay ireo vakoka sy kolotsaina sarobidy nomen'Andriamanitra azy ireo.",
        goals: [
          "Fiarovana ireo vakoka sy ny kolotsaina napetrakin'ny razam-be",
          "Fampahafantarana sy fanaparitahana ny hasarobidin'ireo vakoka",
          "Fanohanana ny isam-batan'olona mba hanànan'ny fivoarana"
        ]
      },
      projects: {
        title: "Tetik'asan'ny fikambanana",
        items: [
          {
            icon: <Award size={24} />,
            title: "Voninahitra ho an'ny Fahaizana",
            description: "Fizarana diplaoma ho an'ireo tanora nahavita fiofanana, fandalinana, na fianarana ambony."
          },
          {
            icon: <BookOpen size={24} />,
            title: "Cartable iray, Fahazavana iray",
            description: "Hanome kitapo sy fitaovam-pianarana ho an'ireo mpianatra sahirana ao amin'ny faritra onenan'ny foko ANAKARA."
          },
          {
            icon: <Heart size={24} />,
            title: "Vakoka velona",
            description: "Hitahiry, hanangona ary hampita amin'ny taranaka mifandimby ireo fomban-drazana sy zavakanto nentin-drazana anakara."
          },
          {
            icon: <Target size={24} />,
            title: "Mahafantatra ny niaviana",
            description: "Atrikasa ho an'ny tanora ANAKARA mikasika ny tantaran'ny foko sy ny razam-be."
          }
        ]
      },
      anakara: {
        title: "Iza moa i Anakara?",
        description: "Ny ANAKARA dia Foko iray ao anatin'ny Antemoro (iray vondrona amin'ny Antalaotra). Taranak'i Ali Tawarath, izay mielipatrana manerana izao tontolo izao.",
        history: "Araka ny boky nosaratan'ny Katibo MAHEFAMANANA MOSA dia Ali Tawarath no razan'ny ANAKARA izay tonga teto Madagasikara tamin'ny taona 1495."
      }
    },
    fr: {
      about: {
        title: "Qui est Fizanakara?",
        description: "FIZANAKARA est l'association des descendants d'Ali Tawarath, originaires de Vatomasina Vohipeno, région Fitovinany. Fondée en 1970 à Antananarivo.",
        members: "Plus de 10.000 membres actuellement disséminés dans toute l'île et à l'étranger.",
        mission: "Perpétuer pour toujours les valeurs et la culture précieuses données par Dieu.",
        goals: [
          "Protéger les valeurs et la culture héritées des ancêtres",
          "Faire connaître et diffuser la richesse des valeurs qui caractérisent les Anakara",
          "Soutenir le développement individuel de chaque personne"
        ]
      },
      projects: {
        title: "Projets de l'association",
        items: [
          {
            icon: <Award size={24} />,
            title: "Honneur pour la Compétence",
            description: "Distribution de diplômes pour les jeunes ayant terminé des formations, études ou enseignement supérieur."
          },
          {
            icon: <BookOpen size={24} />,
            title: "Un cartable, Une lumière",
            description: "Fournir des cartables et du matériel scolaire aux élèves Anakara en difficulté."
          },
          {
            icon: <Heart size={24} />,
            title: "Patrimoine vivant",
            description: "Sauvegarder, collecter et transmettre le patrimoine culturel et artistique hérité des Anakara."
          },
          {
            icon: <Target size={24} />,
            title: "Connaître ses origines",
            description: "Atelier pour la jeunesse Anakara concernant l'histoire du clan et des ancêtres."
          }
        ]
      },
      anakara: {
        title: "Qui sont les Anakara?",
        description: "Les ANAKARA sont un clan au sein des Antemoro (un sous-groupe des Antalaotra). Descendants d'Ali Tawarath, dispersés à travers le monde.",
        history: "Selon le livre écrit par le Katibo MAHEFAMANANA MOSA, Ali Tawarath, ancêtre des ANAKARA, est arrivé à Madagascar en 1495."
      }
    },
    en: {
      about: {
        title: "Who is Fizanakara?",
        description: "FIZANAKARA is the association of descendants of Ali Tawarath, from Vatomasina Vohipeno, Fitovinany region. Founded in 1970 in Antananarivo.",
        members: "Over 10,000 members currently spread across the island and abroad.",
        mission: "To perpetuate forever the valuable values and culture given by God.",
        goals: [
          "Protect the values and culture inherited from ancestors",
          "Make known and disseminate the richness of values that characterize the Anakara",
          "Support the individual development of each person"
        ]
      },
      projects: {
        title: "Association Projects",
        items: [
          {
            icon: <Award size={24} />,
            title: "Honor for Competence",
            description: "Diploma distribution for youth who have completed training, studies, or higher education."
          },
          {
            icon: <BookOpen size={24} />,
            title: "One backpack, One light",
            description: "Provide backpacks and school supplies to struggling Anakara students."
          },
          {
            icon: <Heart size={24} />,
            title: "Living Heritage",
            description: "Preserve, collect, and transmit cultural and artistic heritage inherited from the Anakara."
          },
          {
            icon: <Target size={24} />,
            title: "Know your origins",
            description: "Workshop for Anakara youth about clan and ancestor history."
          }
        ]
      },
      anakara: {
        title: "Who are the Anakara?",
        description: "The ANAKARA are a clan within the Antemoro (a subgroup of the Antalaotra). Descendants of Ali Tawarath, scattered worldwide.",
        history: "According to the book written by Katibo MAHEFAMANANA MOSA, Ali Tawarath, ancestor of the ANAKARA, arrived in Madagascar in 1495."
      }
    }
  };

  const t = content[language];
  const currentSlideData = carouselSlides[currentSlide];

  return (
    <div className="min-h-screen">
      {/* Full Screen Carousel */}
      <section className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentSlideData.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex items-center justify-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-4xl mx-auto text-center text-white"
                >
                  <div className="inline-flex items-center gap-3 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/10">
                    <Globe className="text-[#ee5253]" size={20} />
                    <span className="text-sm font-medium">
                      {language === 'mg' ? 'Fikambanana eran-tany' : 
                       language === 'fr' ? 'Association mondiale' : 
                       'Worldwide association'}
                    </span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
                    {currentSlideData.title[language]}
                  </h1>
                  <p className="text-2xl md:text-3xl lg:text-4xl text-[#ee5253] font-bold mb-8">
                    {currentSlideData.subtitle[language]}
                  </p>
                  <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                    {currentSlideData.description[language]}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#ee5253] hover:bg-[#d94646] text-white font-bold py-4 px-10 rounded-full text-lg transition-colors shadow-2xl shadow-[#ee5253]/30"
                    >
                      {language === 'mg' ? 'Hijery bebe kokoa' : 
                       language === 'fr' ? 'Voir plus' : 
                       'See more'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full text-lg transition-colors hover:bg-white/10"
                    >
                      {language === 'mg' ? 'Mifandray' : 
                       language === 'fr' ? 'Nous contacter' : 
                       'Contact us'}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>

            {/* Navigation Dots */}
            <div className="flex gap-3">
              {carouselSlides.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-[#ee5253] scale-125'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Slide Indicator */}
        <div className="absolute bottom-4 right-4 z-20">
          <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentSlide + 1} / {carouselSlides.length}
          </div>
        </div>
      </section>

      {/* About Fizanakara */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  {t.about.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {t.about.description}
                </p>
                <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl">
                  <Users className="text-[#ee5253]" size={24} />
                  <span className="font-semibold">{t.about.members}</span>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4 text-[#ee5253]">
                  {language === 'mg' ? 'Vonin\'ny fikambanana' : 
                   language === 'fr' ? 'Vision de l\'association' : 
                   'Association Vision'}
                </h3>
                <p className="text-gray-300 mb-6">{t.about.mission}</p>
                <ul className="space-y-3">
                  {t.about.goals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#ee5253] rounded-full mt-2"></div>
                      <span className="text-gray-300">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-3xl p-10 shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-8">
                  {t.anakara.title}
                </h3>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {t.anakara.description}
                  </p>
                  <div className="bg-black/50 p-6 rounded-xl border-l-4 border-[#ee5253]">
                    <p className="text-gray-300 italic">
                      {t.anakara.history}
                    </p>
                    <p className="text-gray-500 text-sm mt-3">
                      — {language === 'mg' ? 'Katibo MAHEFAMANANA MOSA' : 
                         language === 'fr' ? 'Katibo MAHEFAMANANA MOSA' : 
                         'Katibo MAHEFAMANANA MOSA'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Badge de fondation */}
              <div className="absolute -top-5 -right-5 bg-[#ee5253] text-white px-6 py-3 rounded-full shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold">1970</div>
                  <div className="text-xs opacity-90">
                    {language === 'mg' ? 'Taona nioriana' : 
                     language === 'fr' ? 'Année de fondation' : 
                     'Year founded'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t.projects.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'mg' 
                ? 'Miompana amin\'ny kolotsaina, sosialy sy fanabeazana'
                : language === 'fr'
                ? 'Axé sur la culture, le social et l\'éducation'
                : 'Focused on culture, social and education'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.projects.items.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow border border-gray-200 hover:border-[#ee5253]/20"
              >
                <div className="w-14 h-14 bg-[#ee5253]/10 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-[#ee5253]">
                    {project.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-600">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
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