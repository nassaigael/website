
export interface TimelineEvent {
    year: number;
    title: {
        mg: string;
        fr: string;
        en: string;
    };
    description: {
        mg: string;
        fr: string;
        en: string;
    };
    icon?: string;
}

export interface BureauMember {
    id: number;
    name: string;
    position: {
        mg: string;
        fr: string;
        en: string;
    };
    image: string;
    description: {
        mg: string;
        fr: string;
        en: string;
    };
    quote?: {
        mg: string;
        fr: string;
        en: string;
    };
    email?: string;
    phone?: string;
}

export interface NobleFigure {
    id: number;
    name: string;
    title: {
        mg: string;
        fr: string;
        en: string;
    };
    period: string;
    image: string;
    description: {
        mg: string;
        fr: string;
        en: string;
    };
    achievements: {
        mg: string[];
        fr: string[];
        en: string[];
    };
}

export interface SectionContent {
    mg: string[];
    fr: string[];
    en: string[];
}

export const aboutData = {
    mg: {
        title: 'MOMBA NY FIZANAKARA',
        heroTitle: 'Fikambanan\'ny Zanak\'Anakara',
        heroSubtitle: 'Miaro sy manandratra ny vakoka sy kolontsaina nentin-drazana',
        sections: {
            history: 'Tantaran\'ny Fizanakara',
            mission: 'Ny anjara asanay',
            vision: 'Ny fahitana ananantsika',
            values: 'Ny soatoavinay',
            timeline: 'Tantara',
            bureau: 'Ny Birao',
            nobles: 'Ny Andriana Anakara'
        },
        cta: 'Mba ho mpikambana'
    },
    fr: {
        title: 'À PROPOS DE FIZANAKARA',
        heroTitle: 'Association des Descendants Anakara',
        heroSubtitle: 'Préserver et valoriser l\'héritage et la culture ancestrale',
        sections: {
            history: 'Histoire de Fizanakara',
            mission: 'Notre mission',
            vision: 'Notre vision',
            values: 'Nos valeurs',
            timeline: 'Chronologie',
            bureau: 'Le Bureau',
            nobles: 'Les Nobles Anakara'
        },
        cta: 'Devenir membre'
    },
    en: {
        title: 'ABOUT FIZANAKARA',
        heroTitle: 'Association of Anakara Descendants',
        heroSubtitle: 'Preserve and enhance ancestral heritage and culture',
        sections: {
            history: 'History of Fizanakara',
            mission: 'Our mission',
            vision: 'Our vision',
            values: 'Our values',
            timeline: 'Timeline',
            bureau: 'The Bureau',
            nobles: 'The Anakara Nobles'
        },
        cta: 'Become a member'
    }
};

// Contenu des sections
export const sectionContents: Record<string, SectionContent> = {
    history: {
        mg: [
            'Ny FIZANAKARA dia fikambanana niorina tamin\'ny taona 1970 tao Antananarivo, izay nampivondronina ny taranak\'i Ali Tawarath avy ao Vatomasina Vohipeno, faritra Fitovinany.',
            'Ity fikambanana ity dia natao hiarovana sy hampandrosoana ny vakoka, ny fomban-drazana, ary ny kolontsaina nentin-drazan\'ny Anakara.',
            'Niorina tamin\'ny fikasana hamatotra ny fifandraisana eo amin\'ny taranaka rehetra sy hitazonana ny maha-izy antsika, dia nitombo hatrany ny Fizanakara ka nahatratra ny mpikambana mihoatra ny 10,000 ankehitriny.'
        ],
        fr: [
            'FIZANAKARA est une association fondée en 1970 à Antananarivo, rassemblant les descendants d\'Ali Tawarath originaires de Vatomasina Vohipeno, dans la région du Fitovinany.',
            'Cette association a été créée pour protéger et promouvoir l\'héritage, les traditions et la culture ancestrale des Anakara.',
            'Fondée dans le but de renforcer les liens entre toutes les générations et de préserver notre identité, Fizanakara n\'a cessé de croître et compte aujourd\'hui plus de 10,000 membres.'
        ],
        en: [
            'FIZANAKARA is an association founded in 1970 in Antananarivo, bringing together the descendants of Ali Tawarath from Vatomasina Vohipeno, in the Fitovinany region.',
            'This association was created to protect and promote the heritage, traditions, and ancestral culture of the Anakara.',
            'Founded with the aim of strengthening bonds between all generations and preserving our identity, Fizanakara has continued to grow and now has over 10,000 members.'
        ]
    },
    mission: {
        mg: [
            'Miaro sy manandratra ny vakoka sy kolontsaina nentin-drazan\'ny Anakara.',
            'Manamafy ny fifandraisana eo amin\'ny taranaka rehetra.',
            'Manohana ny fandrosoana ara-tsosialy sy ara-kolontsain\'ny mpikambana.',
            'Mampita ny fahalalana momba ny tantara sy ny fomban-drazana amin\'ny taranaka mifandimby.'
        ],
        fr: [
            'Protéger et valoriser l\'héritage et la culture ancestrale des Anakara.',
            'Renforcer les liens entre toutes les générations.',
            'Soutenir le développement social et culturel des membres.',
            'Transmettre les connaissances historiques et traditionnelles aux générations futures.'
        ],
        en: [
            'Protect and enhance the ancestral heritage and culture of the Anakara.',
            'Strengthen bonds between all generations.',
            'Support the social and cultural development of members.',
            'Transmit historical and traditional knowledge to future generations.'
        ]
    },
    vision: {
        mg: [
            'Ho fikambanana iray mampandroso ny maha-izy Anakara eto Madagasikara sy eran\'izao tontolo izao.',
            'Ho mpikambana miara-miasa mba hitazonana sy hampandrosoana ny lovantsika.',
            'Ho sehatra iarahana hifampiresahana sy hiaraha-miasa ho an\'ny tanora sy ny antitra.'
        ],
        fr: [
            'Devenir une association qui promeut l\'identité Anakara à Madagascar et dans le monde.',
            'Former des membres unis pour préserver et développer notre héritage.',
            'Être une plateforme d\'échange et de collaboration pour les jeunes et les anciens.'
        ],
        en: [
            'To become an association that promotes Anakara identity in Madagascar and worldwide.',
            'To create united members to preserve and develop our heritage.',
            'To be a platform for exchange and collaboration for youth and elders.'
        ]
    },
    values: {
        mg: [
            'FIRAISANKINA - Ny firaisana eo amin\'ny mpikambana',
            'FAHAMARINANA - Ny fitondrana marina sy tsy mivadika',
            'FAHAJENANA - Ny fanajana ny razana sy ny fomban-drazana',
            'FIORENANA - Ny fiaraha-miasa sy fifampiresahana',
            'FANAPERANA - Ny fiarovana ny lova nentin-drazana'
        ],
        fr: [
            'UNITÉ - La solidarité entre les membres',
            'INTÉGRITÉ - La conduite juste et loyale',
            'RESPECT - Le respect des ancêtres et des traditions',
            'HARMONIE - La collaboration et le dialogue',
            'PRÉSERVATION - La protection de l\'héritage ancestral'
        ],
        en: [
            'UNITY - Solidarity among members',
            'INTEGRITY - Just and loyal conduct',
            'RESPECT - Respect for ancestors and traditions',
            'HARMONY - Collaboration and dialogue',
            'PRESERVATION - Protection of ancestral heritage'
        ]
    }
};

// Événements chronologiques
export const timelineEvents: TimelineEvent[] = [
    {
        year: 1495,
        title: {
            mg: 'Ny fahatongavan\'i Ali Tawarath',
            fr: 'Arrivée d\'Ali Tawarath',
            en: 'Arrival of Ali Tawarath'
        },
        description: {
            mg: 'Tonga teto Madagasikara i Ali Tawarath, razan\'ny Anakara, avy any Arabia.',
            fr: 'Ali Tawarath, ancêtre des Anakara, arrive à Madagascar depuis l\'Arabie.',
            en: 'Ali Tawarath, ancestor of the Anakara, arrives in Madagascar from Arabia.'
        }
    },
    {
        year: 1970,
        title: {
            mg: 'Niorina ny Fizanakara',
            fr: 'Fondation de Fizanakara',
            en: 'Foundation of Fizanakara'
        },
        description: {
            mg: 'Niorina tao Antananarivo ny Fikambanana Fizanakara.',
            fr: 'L\'Association Fizanakara est fondée à Antananarivo.',
            en: 'The Fizanakara Association is founded in Antananarivo.'
        }
    },
    {
        year: 1995,
        title: {
            mg: 'Fihaonambe voalohany',
            fr: 'Premier rassemblement',
            en: 'First gathering'
        },
        description: {
            mg: 'Natao ny fihaonambe voalohany nampivondrona ny taranaka rehetra.',
            fr: 'Premier rassemblement réunissant toutes les générations.',
            en: 'First gathering bringing together all generations.'
        }
    },
    {
        year: 2010,
        title: {
            mg: 'Fanombohana tetikasa',
            fr: 'Lancement de projets',
            en: 'Launch of projects'
        },
        description: {
            mg: 'Nanomboka tetikasa maro mba hanohanana ny fiarahamonina.',
            fr: 'Lancement de plusieurs projets pour soutenir la communauté.',
            en: 'Launch of several projects to support the community.'
        }
    },
    {
        year: 2020,
        title: {
            mg: 'Fanitarana eran-tany',
            fr: 'Expansion mondiale',
            en: 'Global expansion'
        },
        description: {
            mg: 'Nanitatra ny sehatra eran\'izao tontolo izao ny fikambanana.',
            fr: 'L\'association étend sa portée à l\'échelle mondiale.',
            en: 'The association expands its reach globally.'
        }
    },
    {
        year: 2025,
        title: {
            mg: 'Tranonkala ofisialy',
            fr: 'Site web officiel',
            en: 'Official website'
        },
        description: {
            mg: 'Nanokatra ny tranonkalana ofisialy mba hampitana ny hafatra.',
            fr: 'Ouverture du site web officiel pour diffuser le message.',
            en: 'Launch of official website to spread the message.'
        }
    }
];

// Membres du bureau
export const bureauMembers: BureauMember[] = [
    {
        id: 1,
        name: 'Patrick RAMONJAVELO',
        position: {
            mg: 'Filoha',
            fr: 'Président',
            en: 'President'
        },
        image: "",
        description: {
            mg: 'Filoha mpitantana ny Fikambanana Fizanakara nanomboka tamin\'ny 2015.',
            fr: 'Président directeur de l\'Association Fizanakara depuis 2015.',
            en: 'Managing President of Fizanakara Association since 2015.'
        },
        quote: {
            mg: '"Ravin\'aviavy Ragnandria, tsara gn\'avy, tsara gn\'eviana."',
            fr: '"La feuille d\'avocat Ragnandria, bonne hier, bonne aujourd\'hui, bonne demain."',
            en: '"Ragnandria avocado leaf, good yesterday, good today, good tomorrow."'
        },
        email: 'president@fizanakara.mg',
        phone: '+261 34 00 000 01'
    },
    {
        id: 2,
        name: 'MARSON Evariste',
        position: {
            mg: 'Mpanorina',
            fr: 'Fondateur',
            en: 'Founder'
        },
        image: "",
        description: {
            mg: 'Iray amin\'ireo mpanorina ny Fizanakara tamin\'ny 1970.',
            fr: 'Un des fondateurs de Fizanakara en 1970.',
            en: 'One of the founders of Fizanakara in 1970.'
        },
        quote: {
            mg: '"Ny firaisana no hery voalohany."',
            fr: '"L\'unité est la première force."',
            en: '"Unity is the first strength."'
        }
    },
    {
        id: 3,
        name: 'TSARAMONINA Jean Abraham',
        position: {
            mg: 'Mpanorina',
            fr: 'Fondateur',
            en: 'Founder'
        },
        image: "",
        description: {
            mg: 'Mpanorina ary mpanohana mavitrika ny fikambanana.',
            fr: 'Fondateur et soutien actif de l\'association.',
            en: 'Founder and active supporter of the association.'
        },
        quote: {
            mg: '"Ny lova tsara indrindra dia ny fahafantarana ny niaviana."',
            fr: '"Le meilleur héritage est la connaissance de ses origines."',
            en: '"The best heritage is knowledge of one\'s origins."'
        }
    },
    {
        id: 4,
        name: 'RANDRIAMAMPIONONA Franciscain',
        position: {
            mg: 'Mpanorina',
            fr: 'Fondateur',
            en: 'Founder'
        },
        image: "",
        description: {
            mg: 'Mpanorina ary mpandrindra ara-panabeazana.',
            fr: 'Fondateur et coordinateur éducatif.',
            en: 'Founder and educational coordinator.'
        },
        quote: {
            mg: '"Ny fampianarana no fanokafana varavarana."',
            fr: '"L\'éducation est la clé qui ouvre les portes."',
            en: '"Education is the key that opens doors."'
        }
    },
    {
        id: 5,
        name: 'RAKOTOMALALA Marie',
        position: {
            mg: 'Sekretera Jeneraly',
            fr: 'Secrétaire Générale',
            en: 'General Secretary'
        },
        image: "",
        description: {
            mg: 'Sekretera jeneraly nanomboka tamin\'ny 2018.',
            fr: 'Secrétaire générale depuis 2018.',
            en: 'General Secretary since 2018.'
        },
        quote: {
            mg: '"Ny antsipiriany no manao ny zavatra."',
            fr: '"Les détails font la différence."',
            en: '"Details make the difference."'
        },
        email: 'secretariat@fizanakara.mg',
        phone: '+261 34 00 000 02'
    },
    {
        id: 6,
        name: 'RAZAFINDRABE Jean',
        position: {
            mg: 'Mpitantana ny Tetibola',
            fr: 'Trésorier',
            en: 'Treasurer'
        },
        image: "",
        description: {
            mg: 'Mpitantana ny tetibola nanomboka tamin\'ny 2019.',
            fr: 'Trésorier depuis 2019.',
            en: 'Treasurer since 2019.'
        },
        quote: {
            mg: '"Ny fitantanam-bola marina no fototry ny fahombiazana."',
            fr: '"Une gestion financière intègre est la base du succès."',
            en: '"Integral financial management is the foundation of success."'
        }
    }
];

// Figures nobles Anakara
export const nobleFigures: NobleFigure[] = [
    {
        id: 1,
        name: 'Ali Tawarath',
        title: {
            mg: 'Razan\'ny Anakara',
            fr: 'Ancêtre des Anakara',
            en: 'Ancestor of Anakara'
        },
        period: '15ème siècle',
        image: "",
        description: {
            mg: 'Razan\'ny foko Anakara izay tonga teto Madagasikara tamin\'ny taona 1495 avy any Arabia.',
            fr: 'Ancêtre du peuple Anakara arrivé à Madagascar en 1495 depuis l\'Arabie.',
            en: 'Ancestor of the Anakara people who arrived in Madagascar in 1495 from Arabia.'
        },
        achievements: {
            mg: [
                'Nanorina ny foko Anakara teto Madagasikara',
                'Nampiditra fomba amam-panao arabo',
                'Nanangana rafi-piarahamonina nentim-paharazana'
            ],
            fr: [
                'A fondé le peuple Anakara à Madagascar',
                'A introduit des coutumes arabes',
                'A établi un système social traditionnel'
            ],
            en: [
                'Founded the Anakara people in Madagascar',
                'Introduced Arab customs',
                'Established a traditional social system'
            ]
        }
    },
    {
        id: 2,
        name: 'Rasoherina',
        title: {
            mg: 'Andriambaventy',
            fr: 'Noble',
            en: 'Noble'
        },
        period: '18ème siècle',
        image: "",
        description: {
            mg: 'Andriambaventy nentim-paharazana izay nanjaka tamin\'ny faritra Vatomasina.',
            fr: 'Noble traditionnelle qui régnait sur la région de Vatomasina.',
            en: 'Traditional noble who ruled the Vatomasina region.'
        },
        achievements: {
            mg: [
                'Nanangana lalàna momba ny fiarovana ny tany',
                'Nanentana ny fivarotana',
                'Nanohana ny asa tanana nentim-paharazana'
            ],
            fr: [
                'Établi des lois pour protéger les terres',
                'Développé le commerce',
                'Soutenu l\'artisanat traditionnel'
            ],
            en: [
                'Established laws to protect lands',
                'Developed trade',
                'Supported traditional crafts'
            ]
        }
    },
    {
        id: 3,
        name: 'Ramanantsoa',
        title: {
            mg: 'Mpiahy ny Kolontsaina',
            fr: 'Gardien de la Culture',
            en: 'Culture Guardian'
        },
        period: '19ème siècle',
        image: "",
        description: {
            mg: 'Mpiahy ny kolontsaina sy ny fomban-drazana nentim-paharazana.',
            fr: 'Gardien de la culture et des traditions ancestrales.',
            en: 'Guardian of culture and ancestral traditions.'
        },
        achievements: {
            mg: [
                'Nanangona tantara am-bava',
                'Nampianatra ny soratra tranainy',
                'Nanorina sekoly nentim-paharazana'
            ],
            fr: [
                'Collecté des histoires orales',
                'Enseigné l\'écriture ancienne',
                'Fondé une école traditionnelle'
            ],
            en: [
                'Collected oral histories',
                'Taught ancient writing',
                'Founded a traditional school'
            ]
        }
    },
    {
        id: 4,
        name: 'Ravoay',
        title: {
            mg: 'Mpitari-dalana',
            fr: 'Guide',
            en: 'Guide'
        },
        period: '20ème siècle',
        image: "",
        description: {
            mg: 'Mpitari-dalana ara-panahy sy ara-kolontsaina ho an\'ny taranaka.',
            fr: 'Guide spirituel et culturel pour les générations.',
            en: 'Spiritual and cultural guide for generations.'
        },
        achievements: {
            mg: [
                'Nampita ny fahafantarana ara-panahy',
                'Nanangona fomba fanao masina',
                'Nanohana ny fifandraisana eo amin\'ny taranaka'
            ],
            fr: [
                'Transmis des connaissances spirituelles',
                'Collecté des pratiques sacrées',
                'Maintenu les liens intergénérationnels'
            ],
            en: [
                'Transmitted spiritual knowledge',
                'Collected sacred practices',
                'Maintained intergenerational bonds'
            ]
        }
    }
];