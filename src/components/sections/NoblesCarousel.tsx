import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, Calendar, Target } from 'lucide-react';
import { type NobleFigure } from '../../data/index';
import { useLanguage } from '../../contexts/LanguageContext';

interface NoblesCarouselProps {
  nobles: NobleFigure[];
}

const NoblesCarousel = ({ nobles }: NoblesCarouselProps) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % nobles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + nobles.length) % nobles.length);
  };

  const currentNoble = nobles[currentIndex];

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-900/20 to-amber-800/10 border border-amber-500/20 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
          {/* Image Section */}
          <div className="relative">
            <div className="relative h-75 lg:h-100 rounded-2xl overflow-hidden">
              <img
                src={currentNoble.image}
                alt={currentNoble.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {currentNoble.name}
                    </h3>
                    <p className="text-amber-200">
                      {currentNoble.title[language]}
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-500/30">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-300" />
                      <span className="text-amber-100 text-sm">{currentNoble.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full mb-4">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300 font-medium">
                  {language === 'mg' ? 'Andriana Anakara' : 
                   language === 'fr' ? 'Noble Anakara' : 
                   'Anakara Noble'}
                </span>
              </div>
              
              <p className="text-gray-300 text-lg mb-6">
                {currentNoble.description[language]}
              </p>

              {/* Achievements */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-400" />
                  {language === 'mg' ? 'Zava-bita' : 
                   language === 'fr' ? 'Réalisations' : 
                   'Achievements'}
                </h4>
                <ul className="space-y-3">
                  {currentNoble.achievements[language].map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="p-1 bg-amber-500/20 rounded mt-1">
                        <div className="w-2 h-2 bg-amber-400 rounded-full" />
                      </div>
                      <span className="text-gray-300">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {nobles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                  ? 'bg-amber-400 scale-125'
                  : 'bg-amber-400/50 hover:bg-amber-400/80'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoblesCarousel;