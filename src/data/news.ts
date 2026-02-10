export interface NewsArticle {
  id: number;
  date: string;
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
  category: 'event' | 'project' | 'announcement' | 'culture' | 'heritage';
  image: string;
  gallery?: string[];
  location?: string;
  author: string;
  featured?: boolean;
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
    author: "Patrick RAMONJAVELO",
    featured: true
  },
  {
    id: 2,
    date: "05 Mey 2025",
    title: {
      mg: "SAKANDRO 2025 - Fihaonambe Ara-kolontsaina",
      fr: "SAKANDRO 2025 - Rassemblement Culturel",
      en: "SAKANDRO 2025 - Cultural Gathering"
    },
    excerpt: {
      mg: "Hetsika lehibe mampivondrona ny taranaka rehetra mba hanamafisana ny fifandraisana sy hitazonana ny vakoka nentin-drazana.",
      fr: "Grand événement rassemblant toutes les générations pour renforcer les liens et préserver l'héritage ancestral.",
      en: "Major event bringing together all generations to strengthen bonds and preserve ancestral heritage."
    },
    content: {
      mg: [
        "Sakandro 2025 dia fihaonambe ara-kolontsaina lehibe izay hanangona ny taranak'Anakara manerana izao tontolo izao.",
        "Ity hetsika ity dia hanamafy ny fifandraisana eo amin'ny mpikambana sy hanentana ny firaisana eo amin'ny taranaka samy hafa.",
        "Hampiseho ny zavakanto nentin-drazana, ny fomba amam-panao, ary ny sakafo malagasy manokana ho an'ny vahiny sy ny mpikambana."
      ],
      fr: [
        "Sakandro 2025 est un grand rassemblement culturel qui réunira les descendants Anakara du monde entier.",
        "Cet événement renforcera les liens entre les membres et encouragera l'unité entre les différentes générations.",
        "Il mettra en valeur l'art ancestral, les traditions et la cuisine malgache unique pour les invités et les membres."
      ],
      en: [
        "Sakandro 2025 is a major cultural gathering that will bring together Anakara descendants from around the world.",
        "This event will strengthen bonds between members and encourage unity among different generations.",
        "It will showcase ancestral art, traditions, and unique Malagasy cuisine for guests and members."
      ]
    },
    category: "event",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    location: "Vatomasina, Vohipeno",
    author: "Comité d'Organisation",
    featured: true
  },
  {
    id: 3,
    date: "10 Aprily 2025",
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
    category: "project",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    author: "Département Social",
  },
  {
    id: 4,
    date: "22 Martsa 2025",
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
    category: "culture",
    image: "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544716278-e513176f20b5?w=800&q=80",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80"
    ],
    author: "Département Culturel",
  },
  {
    id: 5,
    date: "15 Febroary 2025",
    title: {
      mg: "Famoriam-bola ho an'ny Tanora Mpanara-dia",
      fr: "Collecte de Fonds pour les Jeunes Talents",
      en: "Fundraising for Young Talents"
    },
    excerpt: {
      mg: "Hanohana ny talenta tanora ao amin'ny fokonolona Anakara",
      fr: "Soutenir les jeunes talents au sein de la communauté Anakara",
      en: "Support young talents within the Anakara community"
    },
    content: {
      mg: [
        "Hetsika famoriam-bola ho an'ny tanora manana talenta ao amin'ny fokonolona.",
        "Ny vola azo dia hampiasaina amin'ny fanohanana ny fianarana sy ny fivoaran'ireo tanora.",
        "Tanisaina ny mankany amin'ny 5 tapitrisa Ariary ny tanjona."
      ],
      fr: [
        "Événement de collecte de fonds pour les jeunes talents de la communauté.",
        "Les fonds collectés seront utilisés pour soutenir les études et le développement des jeunes.",
        "Objectif fixé à 5 millions d'Ariary."
      ],
      en: [
        "Fundraising event for young talents in the community.",
        "Funds raised will be used to support studies and development of youth.",
        "Goal set at 5 million Ariary."
      ]
    },
    category: "event",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    location: "Antananarivo",
    author: "Comité de Développement",
  },
  {
    id: 6,
    date: "30 Janoary 2025",
    title: {
      mg: "Famerenana ny Tranon'ny Razana",
      fr: "Rénovation de la Maison des Ancêtres",
      en: "Renovation of the Ancestral House"
    },
    excerpt: {
      mg: "Fikarohana sy fanavaozana ny toerana masina nentin-drazana",
      fr: "Recherche et rénovation des sites sacrés ancestraux",
      en: "Research and renovation of sacred ancestral sites"
    },
    content: {
      mg: [
        "Tetikasa fanavaozana ny tranon'ny razana ao Vatomasina.",
        "Ity tetikasa ity dia mampiasa teknika nentin-drazana mba hitazonana ny maha-izy azy voalohany.",
        "Hanampy amin'ny fahafantarana ny tantara sy ny kolontsaina."
      ],
      fr: [
        "Projet de rénovation de la maison ancestrale à Vatomasina.",
        "Ce projet utilise des techniques traditionnelles pour préserver l'authenticité originelle.",
        "Contribuera à la connaissance de l'histoire et de la culture."
      ],
      en: [
        "Renovation project of the ancestral house in Vatomasina.",
        "This project uses traditional techniques to preserve original authenticity.",
        "Will contribute to knowledge of history and culture."
      ]
    },
    category: "heritage",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    location: "Vatomasina",
    author: "Comité du Patrimoine",
  },
  {
    id: 7,
    date: "10 Desambra 2024",
    title: {
      mg: "Fankalazana ny Krismasy miaraka amin'ny Ankizy",
      fr: "Célébration de Noël avec les Enfants",
      en: "Christmas Celebration with Children"
    },
    excerpt: {
      mg: "Fankalazana ny Krismasy miaraka amin'ny ankizy ao amin'ny faritra Anakara",
      fr: "Célébration de Noël avec les enfants des régions Anakara",
      en: "Christmas celebration with children from Anakara regions"
    },
    content: {
      mg: [
        "Fankalazana ny Krismasy tany Manakara miaraka amin'ny ankizy 200.",
        "Nomena fanomezana sy sakafo ny ankizy rehetra.",
        "Hetsika mampifandray ny kolontsaina kristiana sy ny fomban-drazana."
      ],
      fr: [
        "Célébration de Noël à Manakara avec 200 enfants.",
        "Tous les enfants ont reçu des cadeaux et de la nourriture.",
        "Événement mêlant culture chrétienne et traditions ancestrales."
      ],
      en: [
        "Christmas celebration in Manakara with 200 children.",
        "All children received gifts and food.",
        "Event combining Christian culture and ancestral traditions."
      ]
    },
    category: "event",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    location: "Manakara",
    author: "Comité Social",
  },
  {
    id: 8,
    date: "25 Novambra 2024",
    title: {
      mg: "Seminary momba ny Tantaran'ny Anakara",
      fr: "Séminaire sur l'Histoire des Anakara",
      en: "Seminar on Anakara History"
    },
    excerpt: {
      mg: "Fampahafantarana momba ny tantara sy ny fiavian'ny foko Anakara",
      fr: "Sensibilisation sur l'histoire et l'origine du peuple Anakara",
      en: "Awareness about the history and origin of the Anakara people"
    },
    content: {
      mg: [
        "Seminary natao tany Toamasina ho an'ny mpianatra sy ny mpikambana.",
        "Niresaka momba ny tantara, ny fiaviana, ary ny zava-nitranga manan-danja ny foko.",
        "Nandray anjara olona 150 tamin'ity seminary ity."
      ],
      fr: [
        "Séminaire organisé à Toamasina pour les étudiants et les membres.",
        "Discussions sur l'histoire, l'origine et les événements importants du peuple.",
        "150 personnes ont participé à ce séminaire."
      ],
      en: [
        "Seminar organized in Toamasina for students and members.",
        "Discussions on history, origin and important events of the people.",
        "150 people participated in this seminar."
      ]
    },
    category: "culture",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    location: "Toamasina",
    author: "Département Historique",
  }
];

export const getRelatedArticles = (currentId: number, limit: number = 3): NewsArticle[] => {
  return newsArticles
    .filter(article => article.id !== currentId)
    .slice(0, limit);
};