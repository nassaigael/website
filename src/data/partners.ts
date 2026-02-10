import axian from "../assets/images/partners/axian.png";
import henriFraise from "../assets/images/partners/henri_fraise.png";
import starMadagascar from "../assets/images/partners/star_madagascar.png";

export type PartnerCategory = 'foundation' | 'corporate' | 'food_beverage' | 'equipment_distribution';

export interface Partner {
  id: number;
  name: string;
  category: PartnerCategory;
  logo: string;
  website: string;
  description: {
    mg: string;
    fr: string;
    en: string;
  };
  featured: boolean;
  location: string;
  foundingYear?: number;
  keyFigures?: Record<string, string>;
  partnershipFocus?: string[];
}

export const partnersData = {
  mg: {
    title: 'Mpanohana sy Mpiara-miasa',
    subtitle: 'Izay miara-miasa amintsika',
    description: 'Miaraka amin\'ireo mpanohana sy mpiara-miasa malaza izahay mba hanatanterahana ny tanjona rehetra.',
    categories: {
      foundation: 'Fondasy',
      corporate: 'Orinasa',
      food_beverage: 'Sakafo sy zava-pisotro',
      equipment_distribution: 'Fizarana fitaovana'
    },
    cta: 'Mba ho Mpanohana'
  },
  fr: {
    title: 'Partenaires et Supporters',
    subtitle: 'Ceux qui collaborent avec nous',
    description: 'Nous travaillons avec des partenaires et supporters prestigieux pour atteindre tous nos objectifs.',
    categories: {
      foundation: 'Fondation',
      corporate: 'Entreprise',
      food_beverage: 'Alimentation et Boissons',
      equipment_distribution: 'Distribution d\'équipements'
    },
    cta: 'Devenir Partenaire'
  },
  en: {
    title: 'Partners and Supporters',
    subtitle: 'Those who collaborate with us',
    description: 'We work with prestigious partners and supporters to achieve all our goals.',
    categories: {
      foundation: 'Foundation',
      corporate: 'Corporate',
      food_beverage: 'Food & Beverage',
      equipment_distribution: 'Equipment Distribution'
    },
    cta: 'Become a Partner'
  }
};

export const partners: Partner[] = [
  {
    id: 1,
    name: 'Fondation AXIAN',
    category: 'foundation',
    logo: axian,
    website: 'https://www.fondation-axian.org/',
    description: {
      mg: 'Fondation AXIAN dia manangona ny loharanon-karena olombelona, ara-bola ary ara-bokatra avy amin\'ny orinasa ao amin\'ny Vondrona AXIAN mba hanatanterahana tetikasa ho an\'ny tombontsoa iraisana. Miasa amin\'ny sehatra telo fototra: Fampianarana, Fahasalamana, ary ny Fandrosoana maharitra sy fanampiana ara-panentanana.',
      fr: 'La Fondation AXIAN mutualise les ressources humaines, financières et matérielles des entreprises du Groupe AXIAN pour déployer des programmes au service de l\'intérêt général. Elle intervient dans trois domaines principaux : Éducation, Santé, et Développement communautaire durable et aide humanitaire.',
      en: 'The AXIAN Foundation pools human, financial, and material resources from AXIAN Group companies to deploy programs serving the public interest. It operates in three main areas: Education, Health, and Sustainable Community Development and Humanitarian Aid.'
    },
    featured: true,
    location: 'Antananarivo, Madagascar',
    keyFigures: {
      schools: '207 Sekoly Yas construites et réhabilitées à Madagascar',
      beneficiaries: '294,700 bénéficiaires des infrastructures de santé',
      volunteers: '2,000 ACTers mobilisés sur le terrain depuis 2021',
      programs: '9 programmes entreprise déployés dans 4 pays'
    },
    partnershipFocus: ['éducation', 'santé', 'développement communautaire', 'environnement']
  },
  {
    id: 2,
    name: 'Henri Fraise Fils & Cie',
    category: 'equipment_distribution',
    logo: henriFraise,
    website: 'https://henrifraise.com/',
    description: {
      mg: 'Henri Fraise Fils & Cie dia mpizara sy mpanome tolotra aorian\'ny fivarotana ho an\'ny milina sy fitaovana Caterpillar eto Madagasikara. Manome vokatra sy tolotra manokana ho an\'ny sehatry ny fanorenana, ny angovo, ary ny asa lehibe.',
      fr: 'Henri Fraise Fils & Cie est un distributeur et prestataire de services après-vente pour les machines et équipements Caterpillar à Madagascar. L\'entreprise fournit des produits et services spécialisés pour les secteurs de la construction, de l\'énergie et des grands travaux.',
      en: 'Henri Fraise Fils & Cie is a distributor and after-sales service provider for Caterpillar machinery and equipment in Madagascar. The company provides specialized products and services for the construction, energy, and major works sectors.'
    },
    featured: true,
    location: 'Antananarivo, Madagascar',
    keyFigures: {
      expertise: 'Expertise unique dédiée à la maintenance des machines',
      solutions: 'Solutions d\'énergie thermiques et renouvelables',
      logistics: 'Logistique optimisée pour les pièces détachées OEM'
    },
    partnershipFocus: ['équipements', 'infrastructure', 'développement industriel', 'formation technique']
  },
  {
    id: 3,
    name: 'STAR Madagascar',
    category: 'food_beverage',
    logo: starMadagascar,
    website: 'https://www.star.mg/',
    description: {
      mg: 'STAR, izay Malagasy hatramin\'ny 1953, dia marika malagasy voalohany amin\'ny zava-pisotro. Manantitra ny fahaizana Malagasy, ny saina famoronana ary ny voninahitra Malagasy. Manohana ny tantsaha Malagasy miisa 18,000 ary mampiasa mpiasa 1,650 manerana an\'i Madagasikara.',
      fr: 'STAR, fièrement Malagasy depuis 1953, est une marque de boissons emblématique de Madagascar. Elle valorise le savoir-faire local, l\'esprit d\'innovation et la fierté malgache. STAR soutient 18,000 agriculteurs locaux et emploie 1,650 collaborateurs à travers Madagascar.',
      en: 'STAR, proudly Malagasy since 1953, is an iconic beverage brand from Madagascar. It promotes local know-how, innovative spirit, and Malagasy pride. STAR supports 18,000 local farmers and employs 1,650 staff members across Madagascar.'
    },
    featured: true,
    location: 'Antananarivo, Madagascar',
    keyFigures: {
      farmers: '18,000 agriculteurs locaux soutenus',
      salesPoints: '20,000 points de vente',
      dailyProduction: '2,000,000 de bouteilles transportées par jour',
      employees: '1,650 collaborateurs dans tout Madagascar'
    },
    partnershipFocus: ['développement rural', 'économie locale', 'emploi', 'savoir-faire malgache']
  }
];