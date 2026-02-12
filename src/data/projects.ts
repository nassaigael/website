export type ProjectStatus = 'ongoing' | 'completed' | 'upcoming' | 'planning';
export type ProjectCategory = 'education' | 'culture' | 'social' | 'infrastructure' | 'heritage' | 'environment';

export interface Project {
  id: number;
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
  description: {
    mg: string[];
    fr: string[];
    en: string[];
  };
  category: ProjectCategory;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  location: string;
  budget?: string;
  partners: string[];
  image: string;
  gallery?: string[];
  objectives: {
    mg: string[];
    fr: string[];
    en: string[];
  };
  achievements?: {
    mg: string[];
    fr: string[];
    en: string[];
  };
  contactPerson: string;
  website?: string;
  featured?: boolean;
  progress?: number; 
}

export const projectsData = {
  mg: {
    title: 'Tetikasa',
    subtitle: 'Asa atao mba hanatsarana ny fiainana',
    description: 'Mijery ny tetikasa rehetra ataon\'ny Fikambanana mba hampandrosoana ny fiarahamonina sy hitahiry ny kolontsaina.',
    categories: {
      education: 'Fampianarana',
      culture: 'Kolontsaina',
      social: 'Sosialy',
      infrastructure: 'Fitaovana',
      heritage: 'Vakoka',
      environment: 'Tontolo iainana'
    },
    statuses: {
      ongoing: 'Mbola mitohy',
      completed: 'Vita',
      upcoming: 'Ho atao',
      planning: 'Eo am-panomanana'
    },
    cta: 'Hijery ny tetikasa'
  },
  fr: {
    title: 'Projets',
    subtitle: 'Travaux réalisés pour améliorer les conditions de vie',
    description: 'Découvrez tous les projets menés par l\'Association pour développer la communauté et préserver la culture.',
    categories: {
      education: 'Éducation',
      culture: 'Culture',
      social: 'Social',
      infrastructure: 'Infrastructure',
      heritage: 'Patrimoine',
      environment: 'Environnement'
    },
    statuses: {
      ongoing: 'En cours',
      completed: 'Terminé',
      upcoming: 'À venir',
      planning: 'En planification'
    },
    cta: 'Voir le projet'
  },
  en: {
    title: 'Projects',
    subtitle: 'Works undertaken to improve living conditions',
    description: 'Discover all projects carried out by the Association to develop the community and preserve culture.',
    categories: {
      education: 'Education',
      culture: 'Culture',
      social: 'Social',
      infrastructure: 'Infrastructure',
      heritage: 'Heritage',
      environment: 'Environment'
    },
    statuses: {
      ongoing: 'Ongoing',
      completed: 'Completed',
      upcoming: 'Upcoming',
      planning: 'Planning'
    },
    cta: 'View Project'
  }
};

export const projects: Project[] = [
  {
    id: 1,
    title: {
      mg: 'Tetikasa "Cartable iray, Fahazavana iray"',
      fr: 'Projet "Un Cartable, Une Lumière" EPP Vatomasina',
      en: 'Project "One Bag, One Light"'
    },
    excerpt: {
      mg: 'Fanomezana kitapo sy fitaovam-pianarana ho an\'ny mpianatra sahirana',
      fr: 'Distribution de cartables et de fournitures scolaires aux élèves défavorisés',
      en: 'Distribution of bags and school supplies to underprivileged students'
    },
    description: {
      mg: [
        'Ity tetikasa ity dia natao hanohanana ny fianaran\'ny ankizy sy ny tanora ao amin\'ny faritra Anakara.',
        'Ny tanjona dia ny hanomezana fitaovam-pianarana tsara ho an\'ny mpianatra rehetra mba hahafahany mianatra tsara.',
        'Efa nomena mihoatra ny 1,000 kitapo sy fitaovam-pianarana ny mpianatra tamin\'ny taona 2024.',
        'Ity tetikasa ity dia mitohy isan-taona ary manantena ny hanatratra ankizy 2,000 amin\'ny taona 2025.'
      ],
      fr: [
        'Ce projet vise à soutenir l\'éducation des enfants et des jeunes dans les régions Anakara.',
        'L\'objectif est de fournir du matériel scolaire de qualité à tous les élèves pour leur permettre d\'étudier dans de bonnes conditions.',
        'Plus de 1,000 cartables et fournitures scolaires ont déjà été distribués en 2024.',
        'Ce projet se poursuit chaque année et vise à atteindre 2,000 enfants en 2025.'
      ],
      en: [
        'This project aims to support the education of children and youth in Anakara regions.',
        'The goal is to provide quality school materials to all students to enable them to study in good conditions.',
        'Over 1,000 bags and school supplies have already been distributed in 2024.',
        'This project continues each year and aims to reach 2,000 children in 2025.'
      ]
    },
    category: 'education',
    status: 'ongoing',
    startDate: '01 Janoary 2023',
    location: 'Manakara, Vatomasina, Vohipeno',
    budget: '25,000,000 Ariary',
    partners: ['Ministère de l\'Éducation', 'UNICEF Madagascar', 'Entreprises Locales'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80'
    ],
    objectives: {
      mg: [
        'Hanome fitaovam-pianarana ho an\'ny mpianatra 2,000',
        'Hanatsara ny tahan\'ny fianarana',
        'Hanamaivana ny fandaniana fianarana ho an\'ny ray aman-dreny'
      ],
      fr: [
        'Fournir du matériel scolaire à 2,000 élèves',
        'Améliorer le taux de scolarisation',
        'Alléger les dépenses scolaires pour les parents'
      ],
      en: [
        'Provide school materials to 2,000 students',
        'Improve enrollment rate',
        'Reduce school expenses for parents'
      ]
    },
    achievements: {
      mg: [
        '1,250 kitapo nofantenana tamin\'ny 2024',
        '5 sekoly no nahazo fanampiana',
        'Tahan\'ny fianarana nitombo 15%'
      ],
      fr: [
        '1,250 cartables distribués en 2024',
        '5 écoles bénéficiaires',
        'Taux de scolarisation augmenté de 15%'
      ],
      en: [
        '1,250 bags distributed in 2024',
        '5 beneficiary schools',
        'Enrollment rate increased by 15%'
      ]
    },
    contactPerson: 'Département Social',
    progress: 75,
    featured: true
  },
  {
    id: 2,
    title: {
      mg: 'Vakoka Velona - Fiarovana ny Soratra Anakara',
      fr: 'Vakoka Vivant - Préservation de l\'Écriture Anakara',
      en: 'Living Vakoka - Preservation of Anakara Script'
    },
    excerpt: {
      mg: 'Fampianarana sy fiarovana ny soratra nentin-drazana ho an\'ny taranaka vaovao',
      fr: 'Enseignement et préservation de l\'écriture ancestrale pour les nouvelles générations',
      en: 'Teaching and preservation of ancestral writing for new generations'
    },
    description: {
      mg: [
        'Tetikasa manan-danja hampitana ny fahafantarana momba ny soratra tranain\'ny Anakara.',
        'Atrikasa fanofanana no atao ho an\'ny tanora sy ny mpianatra mba hahafantarana sy hampiasa ny soratra.',
        'Efa nisy atrikasa 12 no natao tany Manakara, Vatomasina ary Antananarivo.',
        'Ny tanjona dia ny hamorona sehatra iarahana hianarana sy hitahiry ny soratra.'
      ],
      fr: [
        'Projet crucial pour transmettre la connaissance de l\'écriture ancienne des Anakara.',
        'Ateliers de formation organisés pour les jeunes et étudiants pour apprendre et utiliser l\'écriture.',
        '12 ateliers déjà réalisés à Manakara, Vatomasina et Antananarivo.',
        'L\'objectif est de créer une plateforme collaborative d\'apprentissage et de préservation.'
      ],
      en: [
        'Crucial project to transmit knowledge of ancient Anakara writing.',
        'Training workshops organized for youth and students to learn and use the writing.',
        '12 workshops already conducted in Manakara, Vatomasina and Antananarivo.',
        'Goal is to create a collaborative learning and preservation platform.'
      ]
    },
    category: 'heritage',
    status: 'ongoing',
    startDate: '15 Martsa 2024',
    location: 'Manakara, Vatomasina, Antananarivo',
    budget: '15,000,000 Ariary',
    partners: ['Ministère de la Culture', 'Université d\'Antananarivo', 'MadaCulture'],
    image: 'https://images.unsplash.com/photo-1544716278-e513176f20b5?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80',
      'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&q=80'
    ],
    objectives: {
      mg: [
        'Hanofana tanora 500 amin\'ny soratra Anakara',
        'Hanangona soratra tranainy 1,000',
        'Hamorona boky fampianarana'
      ],
      fr: [
        'Former 500 jeunes à l\'écriture Anakara',
        'Collecter 1,000 écrits anciens',
        'Créer un manuel d\'apprentissage'
      ],
      en: [
        'Train 500 youth in Anakara script',
        'Collect 1,000 ancient writings',
        'Create a learning manual'
      ]
    },
    achievements: {
      mg: [
        'Tanora 250 no nofarana',
        'Soratra 350 no voangona',
        'Atrikasa 12 no natao'
      ],
      fr: [
        '250 jeunes formés',
        '350 écrits collectés',
        '12 ateliers réalisés'
      ],
      en: [
        '250 youth trained',
        '350 writings collected',
        '12 workshops conducted'
      ]
    },
    contactPerson: 'Département Culturel',
    progress: 60,
    featured: true
  },
  {
    id: 3,
    title: {
      mg: 'Famokarana Rano Madio ho an\'ny Vohitra',
      fr: 'Production d\'Eau Potable pour les Villages',
      en: 'Clean Water Production for Villages'
    },
    excerpt: {
      mg: 'Fananganana tohodrano sy rafitra fanadiovana rano ho an\'ny vohitra tsy manana rano madio',
      fr: 'Construction de forages et systèmes de purification d\'eau pour les villages sans eau potable',
      en: 'Construction of boreholes and water purification systems for villages without clean water'
    },
    description: {
      mg: [
        'Tetikasa mpiantraika amin\'ny fahasalamana sy ny fiainan\'ny mponina.',
        'Ny tohodrano vaovao dia hanome rano madio ho an\'ny olona 5,000 ao amin\'ny faritra 4.',
        'Ny rafitra fanadiovana rano dia ahafahana misotro rano tsy misy aretina.',
        'Ity tetikasa ity dia manampy amin\'ny fihenan\'ny aretina mifandray amin\'ny rano.'
      ],
      fr: [
        'Projet impactant sur la santé et la vie des populations.',
        'Les nouveaux forages fourniront de l\'eau potable à 5,000 personnes dans 4 régions.',
        'Les systèmes de purification permettent de boire de l\'eau sans maladies.',
        'Ce projet contribue à réduire les maladies liées à l\'eau.'
      ],
      en: [
        'Project impacting health and lives of populations.',
        'New boreholes will provide clean water to 5,000 people in 4 regions.',
        'Purification systems allow drinking water without diseases.',
        'This project helps reduce water-related diseases.'
      ]
    },
    category: 'infrastructure',
    status: 'completed',
    startDate: '01 Jona 2023',
    endDate: '30 Desambra 2024',
    location: 'Vohipeno, Farafangana, Vangaindrano',
    budget: '50,000,000 Ariary',
    partners: ['Ministère de l\'Eau', 'UNICEF', 'Croix-Rouge Malagasy'],
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1200&q=80',
    objectives: {
      mg: [
        'Hanome rano madio ho an\'ny olona 5,000',
        'Hanao tohodrano 10',
        'Hanangana rafitra fanadiovana 4'
      ],
      fr: [
        'Fournir de l\'eau potable à 5,000 personnes',
        'Construire 10 forages',
        'Établir 4 systèmes de purification'
      ],
      en: [
        'Provide clean water to 5,000 people',
        'Build 10 boreholes',
        'Establish 4 purification systems'
      ]
    },
    achievements: {
      mg: [
        'Tohodrano 12 no natao',
        'Olona 6,500 no nahazo rano madio',
        'Aretina mifandray amin\'ny rano nihena 40%'
      ],
      fr: [
        '12 forages construits',
        '6,500 personnes ont accès à l\'eau potable',
        'Maladies liées à l\'eau réduites de 40%'
      ],
      en: [
        '12 boreholes built',
        '6,500 people have access to clean water',
        'Water-related diseases reduced by 40%'
      ]
    },
    contactPerson: 'Département Infrastructures',
    progress: 100
  },
  {
    id: 4,
    title: {
      mg: 'Trano Fampandrosoana ny Tanora',
      fr: 'Centre de Développement des Jeunes',
      en: 'Youth Development Center'
    },
    excerpt: {
      mg: 'Fananganana toerana hanaovana fanofanana sy hetsika ho an\'ny tanora',
      fr: 'Construction d\'un espace pour les formations et activités des jeunes',
      en: 'Construction of a space for youth training and activities'
    },
    description: {
      mg: [
        'Trano iray manokana ho an\'ny tanora mba hanaovana fanofanana sy hetsika.',
        'Ahitana efitrano fianarana, efitrano fivoriana, ary kianja filalaovana.',
        'Ity toerana ity dia hanampy amin\'ny fivoaran\'ny tanora amin\'ny lafiny rehetra.',
        'Hanokatra isan\'andro ho an\'ny tanora rehetra ny tranokala.'
      ],
      fr: [
        'Un bâtiment dédié aux jeunes pour les formations et activités.',
        'Comprend des salles d\'étude, de réunion, et un terrain de sport.',
        'Cet espace aidera au développement complet des jeunes.',
        'Le centre sera ouvert quotidiennement à tous les jeunes.'
      ],
      en: [
        'A building dedicated to youth for training and activities.',
        'Includes study rooms, meeting rooms, and a sports field.',
        'This space will help in comprehensive youth development.',
        'The center will be open daily to all youth.'
      ]
    },
    category: 'social',
    status: 'upcoming',
    startDate: '01 Mey 2025',
    location: 'Vatomasina, Vohipeno',
    budget: '75,000,000 Ariary',
    partners: ['Ministère de la Jeunesse', 'PNUD', 'Entreprises Partenaires'],
    image: 'https://images.unsplash.com/photo-1519452639340-94f596443f09?w=1200&q=80',
    objectives: {
      mg: [
        'Hanangana trano 1,000 m²',
        'Hanofana tanora 1,000 isan-taona',
        'Hampandroso ny talenta sy fahaizana'
      ],
      fr: [
        'Construire un bâtiment de 1,000 m²',
        'Former 1,000 jeunes par an',
        'Développer les talents et compétences'
      ],
      en: [
        'Build a 1,000 m² building',
        'Train 1,000 youth annually',
        'Develop talents and skills'
      ]
    },
    contactPerson: 'Département Jeunesse',
    progress: 15
  },
  {
    id: 5,
    title: {
      mg: 'Fambolena Harena Aina',
      fr: 'Agriculture Durable',
      en: 'Sustainable Agriculture'
    },
    excerpt: {
      mg: 'Fampianarana fambolena maharitra sy fanomezana zava-pamokarana ho an\'ny tantsaha',
      fr: 'Enseignement de l\'agriculture durable et fourniture d\'intrants aux agriculteurs',
      en: 'Teaching sustainable agriculture and providing inputs to farmers'
    },
    description: {
      mg: [
        'Tetikasa hanampy ny tantsaha amin\'ny fambolena maharitra.',
        'Fanomezana voa, zezika, sy fitaovana fambolena.',
        'Fampianarana momba ny fambolena organika sy ny fikojakojana ny tany.',
        'Hanatsara ny fidiram-bola sy ny sakafon\'ny ankohonana.'
      ],
      fr: [
        'Projet d\'aide aux agriculteurs pour une agriculture durable.',
        'Distribution de semences, engrais, et outils agricoles.',
        'Enseignement de l\'agriculture biologique et de la conservation des sols.',
        'Améliorera les revenus et l\'alimentation des familles.'
      ],
      en: [
        'Project to help farmers with sustainable agriculture.',
        'Distribution of seeds, fertilizers, and farming tools.',
        'Teaching organic farming and soil conservation.',
        'Will improve family income and nutrition.'
      ]
    },
    category: 'environment',
    status: 'ongoing',
    startDate: '01 Septambra 2024',
    location: 'Anosy, Androy, Atsimo-Andrefana',
    budget: '30,000,000 Ariary',
    partners: ['Ministère de l\'Agriculture', 'FAO', 'Organisations Paysannes'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    objectives: {
      mg: [
        'Hanome zava-pamokarana ho an\'ny tantsaha 500',
        'Hampianatra teknika fambolena maharitra',
        'Hanatsara ny vokatra isan-taona 30%'
      ],
      fr: [
        'Fournir des intrants à 500 agriculteurs',
        'Enseigner des techniques agricoles durables',
        'Augmenter la production annuelle de 30%'
      ],
      en: [
        'Provide inputs to 500 farmers',
        'Teach sustainable farming techniques',
        'Increase annual production by 30%'
      ]
    },
    contactPerson: 'Département Environnement',
    progress: 45
  },
  {
    id: 6,
    title: {
      mg: 'Fikojakojana ny Ala Masina',
      fr: 'Conservation de la Forêt Sacrée',
      en: 'Sacred Forest Conservation'
    },
    excerpt: {
      mg: 'Fiarovana ny ala masina sy ny zavamananaina manokana ho an\'ny foko Anakara',
      fr: 'Protection de la forêt sacrée et de la biodiversité unique du peuple Anakara',
      en: 'Protection of sacred forest and unique biodiversity of the Anakara people'
    },
    description: {
      mg: [
        'Tetikasa mba hitazonana ny ala masina izay manan-danja ara-kolontsaina sy ara-tontolo iainana.',
        'Fanamafisana ny fomba nentin-drazana amin\'ny fikojakojana ny ala.',
        'Fampidirana ny taranaka vaovao amin\'ny fomba fanao masina.',
        'Fikarohana ny zavamananaina manokana ao amin\'ny ala.'
      ],
      fr: [
        'Projet pour préserver la forêt sacrée importante culturellement et écologiquement.',
        'Renforcement des pratiques traditionnelles de conservation forestière.',
        'Initiation des nouvelles générations aux pratiques sacrées.',
        'Recherche sur la biodiversité unique de la forêt.'
      ],
      en: [
        'Project to preserve sacred forest important culturally and ecologically.',
        'Strengthening traditional forest conservation practices.',
        'Initiating new generations into sacred practices.',
        'Research on unique forest biodiversity.'
      ]
    },
    category: 'environment',
    status: 'planning',
    startDate: '01 Janoary 2026',
    location: 'Vatomasina, Manakara',
    budget: '20,000,000 Ariary',
    partners: ['Ministère de l\'Environnement', 'WWF', 'Communautés Locales'],
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
    objectives: {
      mg: [
        'Hiaro ala 500 hektara',
        'Hanofana mpiaro ala 50',
        'Hanao fikarohana momba ny zavamananaina'
      ],
      fr: [
        'Protéger 500 hectares de forêt',
        'Former 50 gardes-forestiers',
        'Conduire des recherches sur la biodiversité'
      ],
      en: [
        'Protect 500 hectares of forest',
        'Train 50 forest guards',
        'Conduct biodiversity research'
      ]
    },
    contactPerson: 'Comité Environnement',
    progress: 5
  }
];

export const getRelatedProjects = (currentId: number, limit: number = 3): Project[] => {
  return projects
    .filter(project => project.id !== currentId)
    .slice(0, limit);
};