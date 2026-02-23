// src/hooks/useCookieConsent.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { type CookieConsent, type CookieCategory } from '../types/cookies';

const COOKIE_CONSENT_KEY = 'fizanakara-cookie-consent';
const COOKIE_EXPIRY_DAYS = 365;

// Types stricts pour Google Analytics
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

type GTagFunction = {
  (command: 'js', date: Date): void;
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'event', action: string, params?: Record<string, unknown>): void;
  (...args: unknown[]): void;
};

// Déclaration des types pour window avec typages stricts
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    gtag: GTagFunction;
  }
}

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Utiliser useRef pour éviter les re-rendus inutiles
  const initialLoadRef = useRef(true);

  // Charger les préférences au démarrage - version corrigée
  useEffect(() => {
    // Ne pas exécuter si ce n'est pas le premier chargement
    if (!initialLoadRef.current) return;
    
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CookieConsent;
        // Valider que parsed a la bonne structure
        if (parsed && typeof parsed === 'object' && 'necessary' in parsed) {
          setConsent(parsed);
        } else {
          setShowBanner(true);
        }
      } catch (e) {
        console.error('Erreur chargement préférences cookies:', e);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
    
    initialLoadRef.current = false;
  }, []); // Dépendances vides car on utilise ref pour le contrôle

  // Sauvegarder les préférences
  const saveConsent = useCallback((newConsent: CookieConsent) => {
    const consentWithTimestamp = {
      ...newConsent,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentWithTimestamp));
    setConsent(consentWithTimestamp);
    setShowBanner(false);
    setShowModal(false);

    // Appliquer les choix
    applyConsent(newConsent);
  }, []);

  // Accepter tous les cookies
  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    });
  }, [saveConsent]);

  // Refuser tous les cookies non nécessaires
  const rejectAll = useCallback(() => {
    saveConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    });
  }, [saveConsent]);

  // Sauvegarder les préférences personnalisées
  const savePreferences = useCallback((preferences: Omit<CookieConsent, 'necessary' | 'timestamp'>) => {
    saveConsent({
      necessary: true,
      ...preferences,
      timestamp: new Date().toISOString()
    });
  }, [saveConsent]);

  // Appliquer les choix
  const applyConsent = useCallback((consent: CookieConsent) => {
    if (consent.analytics) {
      loadGoogleAnalytics();
    }
    
    // Activer les cookies fonctionnels
    if (consent.functional) {
      enableFunctionalCookies();
    }
    
    // Activer le tracking marketing
    if (consent.marketing) {
      loadMarketingScripts();
    }
  }, []);

  // Fonction pour charger Google Analytics avec typage strict
  const loadGoogleAnalytics = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('google-analytics')) return;

    const script = document.createElement('script');
    script.id = 'google-analytics';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    script.async = true;
    script.onload = () => {
      // Initialiser dataLayer si nécessaire
      window.dataLayer = window.dataLayer || [];
      
      // Définir gtag avec typage correct
      window.gtag = function(this: unknown, ...args: unknown[]): void {
        window.dataLayer.push(args);
      };
      
      // Appels initiaux avec typage correct
      (window.gtag as GTagFunction)('js', new Date());
      (window.gtag as GTagFunction)('config', 'G-XXXXXXXXXX', {
        anonymize_ip: !consent?.analytics, // Anonymiser si pas de consentement
      });
    };
    
    document.head.appendChild(script);
  }, [consent?.analytics]);

  // Activer les cookies fonctionnels
  const enableFunctionalCookies = useCallback(() => {
    // Exemple : sauvegarder les préférences de langue
    document.cookie = `functional_enabled=true; path=/; max-age=${60 * 60 * 24 * COOKIE_EXPIRY_DAYS}; SameSite=Lax`;
  }, []);

  // Charger les scripts marketing
  const loadMarketingScripts = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Exemple avec Facebook Pixel (à configurer avec votre vrai Pixel ID)
    if (!document.getElementById('facebook-pixel')) {
      const script = document.createElement('script');
      script.id = 'facebook-pixel';
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }
  }, []);

  // Vérifier si une catégorie est acceptée
  const isAccepted = useCallback((category: CookieCategory): boolean => {
    if (!consent) return false;
    return consent[category];
  }, [consent]);

  return {
    consent,
    showBanner,
    showModal,
    setShowModal,
    acceptAll,
    rejectAll,
    savePreferences,
    isAccepted
  };
};