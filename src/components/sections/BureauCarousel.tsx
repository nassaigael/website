import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Phone, Quote } from 'lucide-react';
import { type BureauMember } from '../../data/index';
import { useLanguage } from '../../contexts/LanguageContext';

interface BureauCarouselProps {
  members: BureauMember[];
}

const BureauCarousel = ({ members }: BureauCarouselProps) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % members.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentMember = members[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-black shadow-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="p-8 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Image */}
              <div className="relative">
                <div className="relative h-100 lg:h-125 rounded-2xl overflow-hidden">
                  <img
                    src={currentMember.image}
                    alt={currentMember.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                </div>
                
                {/* Position Badge */}
                <div className="absolute bottom-6 left-6">
                  <div className="px-4 py-2 bg-linear-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {currentMember.position[language]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                    {currentMember.name}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {currentMember.description[language]}
                  </p>
                </div>

                {/* Quote */}
                {currentMember.quote && (
                  <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <Quote className="w-6 h-6 text-emerald-400 mt-1 shrink-0" />
                      <p className="text-gray-200 italic text-lg">
                        "{currentMember.quote[language]}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="space-y-4">
                  {currentMember.email && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-5 h-5 text-emerald-400" />
                      <a 
                        href={`mailto:${currentMember.email}`}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {currentMember.email}
                      </a>
                    </div>
                  )}
                  
                  {currentMember.phone && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-5 h-5 text-emerald-400" />
                      <a 
                        href={`tel:${currentMember.phone.replace(/\D/g, '')}`}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {currentMember.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-4 mt-8 overflow-x-auto pb-2">
        {members.map((member, index) => (
          <motion.button
            key={member.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goToSlide(index)}
            className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${index === currentIndex
                ? 'border-emerald-500 shadow-lg'
                : 'border-transparent hover:border-gray-300'
              }`}
          >
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BureauCarousel;