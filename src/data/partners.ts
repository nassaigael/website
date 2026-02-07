export type PartnerCategory = 'institutional' | 'cultural' | 'academic' | 'media' | 'community';

export interface Partner {
  id: number;
  name: string;
  category: PartnerCategory;
  logo: string;
  website?: string;
  description: {
    mg: string;
    fr: string;
    en: string;
  };
}

export const partnersData = {
  mg: {
    title: 'Mpanohana sy Mpiara-miasa',
    subtitle: 'Izay miara-miasa amintsika',
    description: 'Miaraka amin\'ireo mpanohana sy mpiara-miasa malaza izahay mba hanatanterahana ny tanjona rehetra.',
    categories: {
      institutional: 'Fikambanana',
      cultural: 'Kolontsaina',
      academic: 'Fampianarana',
      media: 'Haino Aman-jery',
      community: 'Fiarahamonina'
    },
    cta: 'Mba ho Mpanohana'
  },
  fr: {
    title: 'Partenaires et Supporters',
    subtitle: 'Ceux qui collaborent avec nous',
    description: 'Nous travaillons avec des partenaires et supporters prestigieux pour atteindre tous nos objectifs.',
    categories: {
      institutional: 'Institutionnel',
      cultural: 'Culturel',
      academic: 'Académique',
      media: 'Médias',
      community: 'Communautaire'
    },
    cta: 'Devenir Partenaire'
  },
  en: {
    title: 'Partners and Supporters',
    subtitle: 'Those who collaborate with us',
    description: 'We work with prestigious partners and supporters to achieve all our goals.',
    categories: {
      institutional: 'Institutional',
      cultural: 'Cultural',
      academic: 'Academic',
      media: 'Media',
      community: 'Community'
    },
    cta: 'Become a Partner'
  }
};

// Données des partenaires
export const partners: Partner[] = [
  {
    id: 1,
    name: 'Ministère de la Culture',
    category: 'institutional',
    logo: './assets/partners/axian.png',
    website: 'https://culture.gov.mg',
    description: {
      mg: 'Minisiteran\'ny Kolontsaina - Fiarovana ny vakoka',
      fr: 'Ministère de la Culture - Protection du patrimoine',
      en: 'Ministry of Culture - Heritage protection'
    }
  },
  {
    id: 2,
    name: 'UNESCO Madagascar',
    category: 'institutional',
    logo: './assets/partners/axian.png',
    website: 'https://unesco.org',
    description: {
      mg: 'Fampandriam-paharoa ny lova tsy mifindra',
      fr: 'Promotion du patrimoine immatériel',
      en: 'Promotion of intangible heritage'
    }
  },
  {
    id: 3,
    name: 'Université d\'Antananarivo',
    category: 'academic',
    logo: './assets/partners/axian.png',
    website: 'https://univ-antananarivo.mg',
    description: {
      mg: 'Fikarohana sy fanabeazana momba ny vakoka',
      fr: 'Recherche et éducation sur le patrimoine',
      en: 'Research and education on heritage'
    }
  },
  {
    id: 4,
    name: 'Radio Nationale Malagasy',
    category: 'media',
    logo: './assets/partners/axian.png',
    website: 'https://rnm.mg',
    description: {
      mg: 'Fampielezan-dahatsoratra momba ny kolontsaina',
      fr: 'Diffusion de contenus culturels',
      en: 'Broadcasting cultural content'
    }
  },
  {
    id: 5,
    name: 'MadaCulture',
    category: 'cultural',
    logo: './assets/partners/axian.png',
    website: 'https://madaculture.mg',
    description: {
      mg: 'Fampiroboroboana ny zavakanto malagasy',
      fr: 'Promotion des arts malgaches',
      en: 'Promotion of Malagasy arts'
    }
  },
  {
    id: 6,
    name: 'Fikambanan\'ny Ray aman-dreny',
    category: 'community',
    logo: './assets/partners/axian.png',
    website: '#',
    description: {
      mg: 'Fiaraha-miasa eo amin\'ny fiarahamonina',
      fr: 'Collaboration communautaire',
      en: 'Community collaboration'
    }
  },
  {
    id: 7,
    name: 'TV Plus Madagascar',
    category: 'media',
    logo: '../assets/partners/axian.png',
    website: 'https://tvplus.mg',
    description: {
      mg: 'Fampielezan-tsary momba ny fomban-drazana',
      fr: 'Diffusion de documentaires sur les traditions',
      en: 'Broadcasting documentaries on traditions'
    }
  },
  {
    id: 8,
    name: 'Centre Culturel Albert Camus',
    category: 'cultural',
    logo: './assets/partners/axian.png',
    website: 'https://ccac.mg',
    description: {
      mg: 'Tranonkala ho an\'ny kolontsaina sy ny zavakanto',
      fr: 'Espace pour la culture et les arts',
      en: 'Space for culture and arts'
    }
  }
];