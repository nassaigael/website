import president from "../assets/images/offices/president.jpg";

export interface OfficeMember {
  id: number;
  name: string;
  role: {
    mg: string;
    fr: string;
    en: string;
  };
  image: string;
  bio: {
    mg: string;
    fr: string;
    en: string;
  };
  contacts: {
    facebook?: string;
    linkedin?: string;
    phone?: string;
    email?: string;
    twitter?: string;
  };
  order: number;
  isKing?: boolean;
}

export const officeMembers: OfficeMember[] = [
  {
    id: 1,
    name: 'Andriamanjato RANDRIANARIVO',
    role: {
      mg: 'Mpanjaka',
      fr: 'Roi',
      en: 'King'
    },
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80', // Image royale
    bio: {
      mg: 'Mpanjaka nentim-paharazana mitarika sy mitahiry ny fomban-drazana Anakara. Mpanelanelana eo amin\'ny razana sy ny taranaka ankehitriny.',
      fr: 'Roi traditionnel guidant et préservant les coutumes Anakara. Médiateur entre les ancêtres et les générations actuelles.',
      en: 'Traditional King guiding and preserving Anakara customs. Mediator between ancestors and current generations.'
    },
    contacts: {
      email: 'roi.anakara@fizanakara.mg',
      phone: '+261 34 00 000 00'
    },
    order: 0, // Mis en premier
    isKing: true
  },
  {
    id: 2,
    name: 'Patrick RAMONJAVELO',
    role: {
      mg: 'Filoha',
      fr: 'Président',
      en: 'President'
    },
    image: president,
    bio: {
      mg: 'Lorem Ipsum dia lahatsoratra fanontana sy fanoratana. Omar dia nitondra ny fikambanana hatramin\'ny 2010.',
      fr: 'Lorem Ipsum est simplement un texte factice de l\'industrie de l\'impression et de la composition. Omar dirige l\'association depuis 2010.',
      en: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Omar has been leading the association since 2010.'
    },
    contacts: {
      facebook: 'https://facebook.com/omar.mehri',
      linkedin: 'https://linkedin.com/in/omar-mehri',
      email: 'omar.mehri@association.org',
      phone: '+261 34 12 345 67'
    },
    order: 1
  },
  {
    id: 3,
    name: 'Layla Samuel',
    role: {
      mg: 'Sekretera',
      fr: 'Secrétaire',
      en: 'Secretary'
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: {
      mg: 'Layla dia miantoka ny fitantanana sy ny fandaminana ny raharaha ao amin\'ny fikambanana.',
      fr: 'Layla assure la gestion et l\'organisation des affaires de l\'association.',
      en: 'Layla ensures the management and organization of the association\'s affairs.'
    },
    contacts: {
      linkedin: 'https://linkedin.com/in/layla-samuel',
      email: 'layla.samuel@association.org',
      phone: '+261 34 23 456 78'
    },
    order: 2
  },
  {
    id: 4,
    name: 'Draper Timothy',
    role: {
      mg: 'Mpitahiry vola',
      fr: 'Trésorier',
      en: 'Treasurer'
    },
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    bio: {
      mg: 'Draper no mitantana ny vola sy ny fitantanam-bola ao amin\'ny fikambanana.',
      fr: 'Draper gère les finances et la comptabilité de l\'association.',
      en: 'Draper manages the finances and accounting of the association.'
    },
    contacts: {
      facebook: 'https://facebook.com/draper.timothy',
      linkedin: 'https://linkedin.com/in/draper-timothy',
      email: 'draper.timothy@association.org'
    },
    order: 3
  },
  {
    id: 5,
    name: 'Mariam Shah',
    role: {
      mg: 'Mpanolo-tsaina',
      fr: 'Conseillère',
      en: 'Advisor'
    },
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: {
      mg: 'Mariam dia manome toro-hevitra stratejika ho an\'ny fikambanana.',
      fr: 'Mariam fournit des conseils stratégiques à l\'association.',
      en: 'Mariam provides strategic advice to the association.'
    },
    contacts: {
      linkedin: 'https://linkedin.com/in/mariam-shah',
      twitter: 'https://twitter.com/mariam_shah',
      email: 'mariam.shah@association.org',
      phone: '+261 34 45 678 90'
    },
    order: 4
  },
  {
    id: 6,
    name: 'Jean Rakoto',
    role: {
      mg: 'Mpitantana tetikasa',
      fr: 'Chef de projet',
      en: 'Project Manager'
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: {
      mg: 'Jean no mitarika ny tetikasa rehetra ao amin\'ny fikambanana.',
      fr: 'Jean dirige tous les projets au sein de l\'association.',
      en: 'Jean leads all projects within the association.'
    },
    contacts: {
      facebook: 'https://facebook.com/jean.rakoto',
      linkedin: 'https://linkedin.com/in/jean-rakoto',
      email: 'jean.rakoto@association.org',
      phone: '+261 34 56 789 01'
    },
    order: 5
  },
  {
    id: 7,
    name: 'Sarah Rabe',
    role: {
      mg: 'Mpitantana fifandraisana',
      fr: 'Responsable communication',
      en: 'Communication Manager'
    },
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=80',
    bio: {
      mg: 'Sarah no miandraikitra ny fifandraisana sy ny dokam-barotra.',
      fr: 'Sarah est responsable de la communication et des relations publiques.',
      en: 'Sarah is in charge of communication and public relations.'
    },
    contacts: {
      linkedin: 'https://linkedin.com/in/sarah-rabe',
      twitter: 'https://twitter.com/sarah_rabe',
      email: 'sarah.rabe@association.org',
      phone: '+261 34 67 890 12'
    },
    order: 6
  },
  {
    id: 8,
    name: 'Michael Rasoa',
    role: {
      mg: 'Mpanolotsaina ara-dalàna',
      fr: 'Conseiller juridique',
      en: 'Legal Advisor'
    },
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80',
    bio: {
      mg: 'Michael no miantoka ny lafiny ara-dalàna rehetra ao amin\'ny fikambanana.',
      fr: 'Michael assure tous les aspects juridiques de l\'association.',
      en: 'Michael handles all legal aspects of the association.'
    },
    contacts: {
      linkedin: 'https://linkedin.com/in/michael-rasoa',
      email: 'michael.rasoa@association.org',
      phone: '+261 34 78 901 23'
    },
    order: 7
  }
];

export const getOfficeMembersByOrder = (): OfficeMember[] => {
  return [...officeMembers].sort((a, b) => a.order - b.order);
};

export const getOfficeMemberById = (id: number): OfficeMember | undefined => {
  return officeMembers.find(member => member.id === id);
};