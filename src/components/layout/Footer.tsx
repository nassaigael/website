// components/Footer.tsx
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext'; // Même hook que Header
import { footerData } from '../../data/footer';

const Footer = () => {
  const { language } = useLanguage(); // Utiliser le hook du contexte
  const t = footerData[language]; // Récupérer les données selon la langue actuelle

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Colonne 1: Logo et description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{t.organization.name}</h2>
                <p className="text-gray-300 text-sm">
                  {t.organization.subtitle}
                </p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-sm">
              {t.organization.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {t.address}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Colonne 2: Liens rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-gray-700">
              {t.quickLinks.title}
            </h3>
            <ul className="space-y-3">
              {t.quickLinks.links.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-2 py-1 text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    <span>{link.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Colonne 3: Articles récents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-gray-700">
              {t.recentPosts.title}
            </h3>
            <div className="space-y-4">
              {t.recentPosts.posts.map((post, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <p className="text-gray-300 text-sm group-hover:text-red-500 transition-colors leading-relaxed">
                    {post.content}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Colonne 4: Contact et réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-4 pb-2 border-b border-gray-700">
                {t.contact.title}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <a 
                    href={`mailto:${t.contact.email}`}
                    className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                  >
                    {t.contact.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <a 
                    href={`tel:${t.contact.phone.replace(/\D/g, '')}`}
                    className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                  >
                    {t.contact.phone}
                  </a>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300 text-sm font-medium mb-1">
                        {t.contact.emergency.label}
                      </p>
                      <a 
                        href={`tel:${t.contact.emergency.phone.replace(/\D/g, '')}`}
                        className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                      >
                        {t.contact.emergency.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                {t.socialMedia.title}
              </h3>
              <div className="flex gap-4">
                {t.socialMedia.platforms.map((platform, index) => {
                  const Icon = {
                    'Facebook': Facebook,
                    'Instagram': Instagram,
                    'Twitter': Twitter,
                    'YouTube': Youtube
                  }[platform];
                  
                  return (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300"
                      aria-label={platform}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bas de page */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              {t.copyright.text}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors text-sm"
            >
              {t.copyright.links.terms}
            </a>
            <a 
              href="#"
              className="text-gray-400 hover:text-red-500 transition-colors text-sm"
            >
              {t.copyright.links.privacy}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;