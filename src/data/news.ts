export interface NewsArticle {
  id: number;
  date: string; // Format: "14 Mey 2025"
  title: {
    mg: string;
    fr: string;
    en: string;
  };
  excerpt: {
    mg: string;
    fr: string;
    en: string;
  };
  content: {
    mg: string[];
    fr: string[];
    en: string[];
  };
  category: 'event' | 'project' | 'announcement' | 'culture';
  image: string;
  gallery?: string[];
  location?: string;
  author: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    date: "14 Mey 2025",
    title: {
      mg: "Fanombohana Ofisialy ny Tranonkalan'ny ANAKARA",
      fr: "Lancement Officiel du Site Web ANAKARA",
      en: "Official Launch of the ANAKARA Website"
    },
    excerpt: {
      mg: "Tafapetraka amin'ny fomba ofisialy ny tranonkalan'ny Fikambanana ANAKARA",
      fr: "Le site web de l'Association ANAKARA est désormais officiellement lancé",
      en: "The ANAKARA Association website is now officially launched"
    },
    content: {
      mg: [
        "Tamin'ny 14 Mey 2025 no nanokafana ofisialy ny tranonkalana vaovao ho an'ny Fikambanana ANAKARA.",
        "Ity sehatra ity dia hanampy amin'ny fanaparitahana sy fampahafantarana amin'ny fomba maharitra ireo vakoka sy kolotsaina navelan'ny razantsika.",
        "Tongava mandray anjara amin'ny fanamafisana ny maha-izy ANAKARA antsika!"
      ],
      fr: [
        "Le 14 mai 2025, le nouveau site web de l'Association ANAKARA a été officiellement lancé.",
        "Cette plateforme aidera à diffuser et à faire connaître durablement les héritages et cultures laissés par nos ancêtres.",
        "Venez participer au renforcement de notre identité ANAKARA !"
      ],
      en: [
        "On May 14, 2025, the new website of the ANAKARA Association was officially launched.",
        "This platform will help disseminate and sustainably promote the heritage and cultures left by our ancestors.",
        "Come participate in strengthening our ANAKARA identity!"
      ]
    },
    category: "announcement",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    author: "Patrick RAMONJAVELO"
  },
  {
    id: 2,
    date: "05 Mey 2025",
    title: {
      mg: "SAKANDRO 2025",
      fr: "SAKANDRO 2025",
      en: "SAKANDRO 2025"
    },
    excerpt: {
      mg: "Hananamafy ny fifankatiavana sy ny firaisan-kina eo amin'ny mpikambana",
      fr: "Renforcer l'amitié et l'unité entre les membres",
      en: "Strengthen friendship and unity among members"
    },
    content: {
      mg: [
        "Tanjon'ny Sakandro 2025 ny hanamafy ny fifankatiavana sy ny firaisan-kina eo amin'ny mpikambana.",
        "Hanohy ny iraka masina amin'ny fiarovana ny kolontsaina sy vakoka navelan'ny razam-be.",
        "Hampitohy ny taranaka vaovao amin'ny niaviany."
      ],
      fr: [
        "L'objectif de Sakandro 2025 est de renforcer l'amitié et l'unité entre les membres.",
        "Poursuivre la mission sacrée de protéger la culture et l'héritage laissés par les ancêtres.",
        "Relier les nouvelles générations à leurs origines."
      ],
      en: [
        "The goal of Sakandro 2025 is to strengthen friendship and unity among members.",
        "Continue the sacred mission of protecting the culture and heritage left by ancestors.",
        "Connect new generations to their origins."
      ]
    },
    category: "event",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w-800&q=80",
    location: "Vatomasina, Vohipeno",
    author: "Comité d'Organisation"
  },
  {
    id: 3,
    title: {
      mg: "Tetikasa 'Cartable iray, Fahazavana iray'",
      fr: "Projet 'Un Cartable, Une Lumière'",
      en: "Project 'One Bag, One Light'"
    },
    excerpt: {
      mg: "Hanome kitapo sy fitaovam-pianarana ho an'ny mpianatra sahirana",
      fr: "Fournir des cartables et du matériel scolaire aux élèves défavorisés",
      en: "Provide bags and school supplies to underprivileged students"
    },
    content: {
      mg: [
        "Natomboka ny tetikasa 'Cartable iray, Fahazavana iray'.",
        "Mikendry ny hanome kitapo sy fitaovam-pianarana ho an'ireo mpianatra sahirana ao amin'ny faritra onenan'ny foko ANAKARA.",
        "Efa nomena mihoatra ny 500 kitapo tamin'ny taona 2024."
      ],
      fr: [
        "Le projet 'Un Cartable, Une Lumière' a été lancé.",
        "Il vise à fournir des cartables et du matériel scolaire aux élèves défavorisés dans les régions habitées par le peuple ANAKARA.",
        "Plus de 500 cartables ont déjà été distribués en 2024."
      ],
      en: [
        "The 'One Bag, One Light' project has been launched.",
        "It aims to provide bags and school supplies to underprivileged students in areas inhabited by the ANAKARA people.",
        "Over 500 bags were already distributed in 2024."
      ]
    },
    date: "10 Aprily 2025",
    category: "project",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w-800&q=80",
    author: "Département Social"
  },
  {
    id: 4,
    title: {
      mg: "Vakoka Velona - Fampiasana ny Soratra Anakara",
      fr: "Vakoka Vivant - Utilisation de l'Écriture Anakara",
      en: "Living Vakoka - Using Anakara Script"
    },
    excerpt: {
      mg: "Fanofanana ny soratra tranainy ho an'ny tanora",
      fr: "Formation des jeunes à l'écriture ancienne",
      en: "Training youth in ancient writing"
    },
    content: {
      mg: [
        "Atrikasa fanofanana ny soratra Anakara ho an'ny tanora tany Manakara.",
        "Ny tanora 45 no nandray anjara tamin'ity atrikasa ity.",
        "Hampitsoina amin'ny taranaka mifandimby ny fahafantarana momba ny soratra nentin-drazana."
      ],
      fr: [
        "Atelier de formation à l'écriture Anakara pour les jeunes à Manakara.",
        "45 jeunes ont participé à cet atelier.",
        "Transmettre la connaissance de l'écriture ancestrale aux générations futures."
      ],
      en: [
        "Training workshop on Anakara script for youth in Manakara.",
        "45 youth participated in this workshop.",
        "Pass on knowledge of ancestral writing to future generations."
      ]
    },
    date: "22 Martsa 2025",
    category: "culture",
    image: "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=800&q=80",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80"
    ],
    author: "Département Culturel"
  }
];