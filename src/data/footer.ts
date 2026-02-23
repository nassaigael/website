export type FooterTranslations = {
  description: string;
  quickLinks: {
    title: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
    regions: string[];
  };
  copyright: string;
  officeHours: string;
};

export const footerData = {
  mg: {
    organization: {
      name: "FIZANAKARA",
      subtitle: "Fikambanan'ny Zanak'Anakara",
      description: "Andao isika hiara-hiasa hampandrosoana ny ANAKARA mba hananan-tsika fireharehàna sy fahatsapana fa masina sy manan-danja io Tanindrazantsika io."
    },
    address: "Vatomasina Vohipeno, Faritra Fitovinany",
    quickLinks: {
      title: "Rohy Haingana",
      links: [
        { label: "A propos", href: "/about" },
        { label: "Vaovao fikambanana", href: "/news" },
        { label: "Mpanohana", href: "/partners" },
        { label: "Fifandraisana", href: "/contact" },
        { label: "Tetik'asa", href: "/projects" },
      ]
    },
    recentPosts: {
      title: "Lahatsoratra Vao Haingana",
      posts: [
        {
          date: "12 Mey 2025",
          content: "Misy karazany maro amin'ny andahateny ny"
        },
        {
          date: "10 Mey 2025",
          content: "Misy karazany maro amin'ny andahateny ny"
        }
      ]
    },
    contact: {
      title: "Mifandraisa Aminay",
      email: "contact@fizanakara.mg",
      phone: "(+261)38 90 065 67",
      emergency: {
        label: "Antso Vonjy Maika",
        phone: "(+261)34 21 787 64"
      }
    },
    socialMedia: {
      title: "Haino Aman-jery Sosialy",
      platforms: ["Facebook", "Instagram", "Twitter", "YouTube"]
    },
    copyright: {
      text: "© 2026 FIZANAKARA. Zon'ny rehetra voatokana",
      links: {
        terms: "Fepetra sy Fitsipika",
        privacy: "Politika Fiarovana"
      }
    }
  },
  fr: {
    organization: {
      name: "FIZANAKARA",
      subtitle: "Association des Descendants Anakara",
      description: "Travaillons ensemble pour faire progresser les ANAKARA afin que nous ayons la fierté et le sentiment que notre Patrie est sacrée et importante."
    },
    address: "Vatomasina Vohipeno, Région Fitovinany",
    quickLinks: {
      title: "Liens Rapides",
      links: [
        { label: "Acceuil", href: "/about" },
        { label: "Actualités", href: "/news" },
        { label: "Projets", href: "/projects" },
        { label: "Partenaires", href: "/partners" },
        { label: "Contact", href: "/contact" },

      ]
    },
    recentPosts: {
      title: "Articles Récents",
      posts: [
        {
          date: "12 Mai 2025",
          content: "Il existe de nombreuses variantes de passages de"
        },
        {
          date: "10 Mai 2025",
          content: "Il existe de nombreuses variantes de passages de"
        }
      ]
    },
    contact: {
      title: "Contactez-nous",
      email: "contact@fizanakara.mg",
      phone: "(+261)38 90 065 67",
      emergency: {
        label: "Appel d'Urgence",
        phone: "(+261)34 21 787 64"
      }
    },
    socialMedia: {
      title: "Réseaux Sociaux",
      platforms: ["Facebook", "Instagram", "Twitter", "YouTube"]
    },
    copyright: {
      text: "© 2026 FIZANAKARA. Tous droits réservés",
      links: {
        terms: "Termes & Conditions",
        privacy: "Politique de Confidentialité"
      }
    }
  },
  en: {
    organization: {
      name: "FIZANAKARA",
      subtitle: "Association of Anakara Descendants",
      description: "Let's work together to advance the ANAKARA so that we have pride and the feeling that our Homeland is sacred and important."
    },
    address: "Vatomasina Vohipeno, Fitovinany Region",
    quickLinks: {
      title: "Quick Links",
      links: [
        { label: "About Fizanakara", href: "/about" },
        { label: "News", href: "/news" },
        { label: "partners", href: "/partners" },
        { label: "Contact", href: "/contact" },
        { label: "Projects", href: "/projects" },
      ]
    },
    recentPosts: {
      title: "Recent Posts",
      posts: [
        {
          date: "May 12, 2025",
          content: "There are many variations of passages of"
        },
        {
          date: "May 10, 2025",
          content: "There are many variations of passages of"
        }
      ]
    },
    contact: {
      title: "Contact Us",
      email: "contact@fizanakara.mg",
      phone: "(+261)38 90 065 67",

    },
    socialMedia: {
      title: "Social Media",
      platforms: ["Facebook", "Instagram", "Twitter"]
    },
    copyright: {
      text: "© 2026 FIZANAKARA. All rights reserved",
      links: {
        terms: "Terms & Conditions",
        privacy: "Privacy Policy"
      }
    }
  }
};