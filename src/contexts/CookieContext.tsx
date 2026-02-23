// src/contexts/CookieContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useRef } from 'react';
import { type CookieConsent, type CookieCategory } from '../types/cookies';

interface CookieContextType {
  consent: CookieConsent | null;
  showBanner: boolean;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: Omit<CookieConsent, 'necessary' | 'timestamp'>) => void;
  isAccepted: (category: CookieCategory) => boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = 'fizanakara-cookie-consent';
const COOKIE_EXPIRY_DAYS = 365;

// Types stricts pour Google Analytics et Facebook Pixel
type GTagFunction = {
  (command: 'js', date: Date): void;
  (command: 'config', targetId: string, config?: Record<string, unknown>): void;
  (command: 'event', action: string, params?: Record<string, unknown>): void;
  (...args: unknown[]): void;
};

type FBQFunction = {
  (command: 'init', pixelId: string): void;
  (command: 'track', event: string, params?: Record<string, unknown>): void;
  (...args: unknown[]): void;
};

// Déclaration des types pour window - version corrigée
declare global {
  // Au lieu d'étendre l'interface Window, on utilise declare const
  const dataLayer: unknown[] | undefined;
  
  interface Window {
    gtag: GTagFunction;
    fbq: FBQFunction;
    _fbq?: unknown;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCookieConsentContext = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieConsentContext must be used within a CookieProvider');
  }
  return context;
};

interface CookieProviderProps {
  children: ReactNode;
}

export const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const initialLoadRef = useRef(true);

  // Fonction pour charger Google Analytics
  const loadGoogleAnalytics = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('google-analytics')) return;

    const script = document.createElement('script');
    script.id = 'google-analytics';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    script.async = true;
    script.onload = () => {
      // Initialiser dataLayer sur window
      if (!window.dataLayer) {
        window.dataLayer = [];
      }
      
      // Définir gtag avec typage correct
      window.gtag = function(...args: unknown[]): void {
        if (window.dataLayer) {
          window.dataLayer.push(args);
        }
      };
      
      // Appels initiaux
      window.gtag('js', new Date());
      window.gtag('config', 'G-XXXXXXXXXX', {
        anonymize_ip: !consent?.analytics,
      });
    };
    
    document.head.appendChild(script);
  }, [consent?.analytics]);

  // Activer les cookies fonctionnels
  const enableFunctionalCookies = useCallback(() => {
    document.cookie = `functional_enabled=true; path=/; max-age=${60 * 60 * 24 * COOKIE_EXPIRY_DAYS}; SameSite=Lax`;
  }, []);

  // Charger les scripts marketing
  const loadMarketingScripts = useCallback(() => {
    if (typeof window === 'undefined') return;
    
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

  // Appliquer les choix
  const applyConsent = useCallback((consentData: CookieConsent) => {
    if (consentData.analytics) {
      loadGoogleAnalytics();
    }

    if (consentData.functional) {
      enableFunctionalCookies();
    }

    if (consentData.marketing) {
      loadMarketingScripts();
    }
  }, [loadGoogleAnalytics, enableFunctionalCookies, loadMarketingScripts]);

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

    applyConsent(newConsent);
  }, [applyConsent]);

  // Charger les préférences au démarrage
  useEffect(() => {
    const loadPreferences = () => {
      const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
      
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as CookieConsent;
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
    };

    if (initialLoadRef.current) {
      loadPreferences();
      initialLoadRef.current = false;
    }
  }, []);

  // Actions utilisateur
  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    });
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    saveConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    });
  }, [saveConsent]);

  const savePreferences = useCallback((preferences: Omit<CookieConsent, 'necessary' | 'timestamp'>) => {
    saveConsent({
      necessary: true,
      ...preferences,
      timestamp: new Date().toISOString()
    });
  }, [saveConsent]);

  const isAccepted = useCallback((category: CookieCategory): boolean => {
    if (!consent) return false;
    return consent[category];
  }, [consent]);

  const value = {
    consent,
    showBanner,
    showModal,
    setShowModal,
    acceptAll,
    rejectAll,
    savePreferences,
    isAccepted
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
};