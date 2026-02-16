import {
    Shield, Heart, Target as TargetIcon, Book,
    Users, Globe, Calendar, Trophy
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import testImage from '../assets/images/test.jpg';

export interface Slide {
    image: string;
    overlay: string;
    title: {
        mg: string;
        fr: string;
        en: string;
    };
    subtitle: {
        mg: string;
        fr: string;
        en: string;
    };
    description: {
        mg: string;
        fr: string;
        en: string;
    };
}

export interface Stat {
    icon: LucideIcon;
    value: string;
    label: {
        mg: string;
        fr: string;
        en: string;
    };
}

export interface Value {
    icon: LucideIcon;
    title: string;
    desc: string;
}

export interface ProjectItem {
    icon: string;
    title: string;
    description: string;
}

export interface Content {
    about: {
        title: string;
        description: string;
        members: string;
        mission: string;
        vision: string;
        values: Value[];
        goals: string[];
    };
    projects: {
        title: string;
        items: ProjectItem[];
    };
    anakara: {
        title: string;
        description: string;
        history: string;
        characteristics: string[];
    };
}

// Données du carrousel
export const carouselSlides: Slide[] = [
    {
        image: testImage,
        overlay: "rgba(20, 20, 20, 0.7)",
        title: {
            mg: "FIZANAKARA",
            fr: "FIZANAKARA",
            en: "FIZANAKARA"
        },
        subtitle: {
            mg: "Fikambanan'ny Zanak'Anakara",
            fr: "Association des Descendants Anakara",
            en: "Anakara Descendants Association"
        },
        description: {
            mg: "Andao isika hiara-hiasa hampandrosoana ny ANAKARA mba hananan-tsika fireharehàna sy fahatsapana fa masina sy manan-danja io Tanindrazantsika io.",
            fr: "Travaillons ensemble pour faire progresser les ANAKARA afin que nous ayons la fierté et le sentiment que notre Patrie est sacrée et importante.",
            en: "Let's work together to advance the ANAKARA so that we have pride and the feeling that our Homeland is sacred and important."
        }
    },
    {
        image: testImage,
        overlay: "rgba(30, 30, 40, 0.75)",
        title: {
            mg: "VAKOKA NENTIN-DRAZANA",
            fr: "PATRIMOINE ANCESTRAL",
            en: "ANCESTRAL HERITAGE"
        },
        subtitle: {
            mg: "Hitahiry ny lova tsara navelan'ny razantsika",
            fr: "Préserver le bon héritage laissé par nos ancêtres",
            en: "Preserve the good heritage left by our ancestors"
        },
        description: {
            mg: "Miarova sy mitahiry ny kolontsaina, fomba amam-panao, ary ny soratra nentin-drazana Anakara.",
            fr: "Défendre et préserver la culture, les traditions et l'écriture ancestrale Anakara.",
            en: "Defend and preserve the culture, traditions and ancestral Anakara writing."
        }
    },
    {
        image: testImage,
        overlay: "rgba(20, 25, 35, 0.8)",
        title: {
            mg: "FIARAHAMONINA MIRAY",
            fr: "COMMUNAUTÉ UNIE",
            en: "UNITED COMMUNITY"
        },
        subtitle: {
            mg: "Mahery ny 10.000 mpikambana eran-tany",
            fr: "Plus de 10.000 membres à travers le monde",
            en: "Over 10,000 members worldwide"
        },
        description: {
            mg: "Mampifandray ny taranaka Anakara manerana izao tontolo izao mba hanamafisana ny fifandraisana sy ny firaisana.",
            fr: "Relier les générations Anakara à travers le monde pour renforcer les liens et l'unité.",
            en: "Connecting Anakara generations worldwide to strengthen bonds and unity."
        }
    },
    {
        image: testImage,
        overlay: "rgba(25, 20, 30, 0.8)",
        title: {
            mg: "FANABEAZANA SY FAMPIROBOROBOANA",
            fr: "ÉDUCATION ET PROMOTION",
            en: "EDUCATION AND PROMOTION"
        },
        subtitle: {
            mg: "Manohana ny tanora sy ny fahaizana",
            fr: "Soutenir la jeunesse et les compétences",
            en: "Support youth and skills"
        },
        description: {
            mg: "Mandray anjara amin'ny fanomezana fahaizana sy fanampiana ho an'ny tanora Anakara mba hahatratrarany ny fivoarana.",
            fr: "Contribuer à donner des compétences et de l'aide aux jeunes Anakara pour atteindre le développement.",
            en: "Contribute to providing skills and assistance to Anakara youth to achieve development."
        }
    }
];

export const stats: Stat[] = [
    {
        icon: Users,
        value: "10,000+",
        label: {
            mg: "Mpikambana",
            fr: "Membres",
            en: "Members"
        }
    },
    {
        icon: Globe,
        value: "25+",
        label: {
            mg: "Firenenana",
            fr: "Pays",
            en: "Countries"
        }
    },
    {
        icon: Calendar,
        value: "50+",
        label: {
            mg: "Taona",
            fr: "Ans",
            en: "Years"
        }
    },
    {
        icon: Trophy,
        value: "100+",
        label: {
            mg: "Tetikasa",
            fr: "Projets",
            en: "Projects"
        }
    }
];

// Données de contenu par langue
export const content: Record<'mg' | 'fr' | 'en', Content> = {
    mg: {
        about: {
            title: "Iza moa Fizanakara?",
            description: "Ny FIZANAKARA dia fikambanan'ireo taranak'i Ali Tawarath, izay avy ao Vatomasina Vohipeno, faritra Fitovinany. Niorina tamin'ny taona 1970 tao Antananarivo.",
            members: "Mahery ny 10.000 ny mpikambana ankehitriny izay misandrahaka manerana ny nosy sy any andilam-bato.",
            mission: "Hampitoetra maharitra mandrakizay ireo vakoka sy kolotsaina sarobidy nomen'Andriamanitra azy ireo.",
            vision: "Hijery ny ANAKARA ho vondrom-piarahamonina iray miray, manankarena amin'ny kolontsaina ary mandroso amin'ny fianarana.",
            values: [
                {
                    icon: Shield,
                    title: "Fahamarinana",
                    desc: "Mitandrina ny fahamarinana amin'ny fitondran-tena sy asa"
                },
                {
                    icon: Heart,
                    title: "Fitiavana",
                    desc: "Mifampiantrana sy miaro ny hafa"
                },
                {
                    icon: TargetIcon,
                    title: "Firaisankina",
                    desc: "Miara-miasa amin'ny tanjona iraisana"
                },
                {
                    icon: Book,
                    title: "Fahalalana",
                    desc: "Manome lanja ny fianarana sy fahaizana"
                }
            ],
            goals: [
                "Fiarovana ireo vakoka sy ny kolotsaina napetrakin'ny razam-be",
                "Fampahafantarana sy fanaparitahana ny hasarobidin'ireo vakoka",
                "Fanohanana ny isam-batan'olona mba hanànan'ny fivoarana"
            ]
        },
        projects: {
            title: "Tetik'asan'ny fikambanana",
            items: [
                {
                    icon: "award",
                    title: "Voninahitra ho an'ny Fahaizana",
                    description: "Fizarana diplaoma ho an'ireo tanora nahavita fiofanana, fandalinana, na fianarana ambony."
                },
                {
                    icon: "bookOpen",
                    title: "Cartable iray, Fahazavana iray",
                    description: "Hanome kitapo sy fitaovam-pianarana ho an'ireo mpianatra sahirana ao amin'ny faritra onenan'ny foko ANAKARA."
                },
                {
                    icon: "heart",
                    title: "Vakoka velona",
                    description: "Hitahiry, hanangona ary hampita amin'ny taranaka mifandimby ireo fomban-drazana sy zavakanto nentin-drazana anakara."
                },
                {
                    icon: "target",
                    title: "Mahafantatra ny niaviana",
                    description: "Atrikasa ho an'ny tanora ANAKARA mikasika ny tantaran'ny foko sy ny razam-be."
                }
            ]
        },
        anakara: {
            title: "Iza moa i Anakara?",
            description: "Ny ANAKARA dia Foko iray ao anatin'ny Antemoro (iray vondrona amin'ny Antalaotra). Taranak'i Ali Tawarath, izay mielipatrana manerana izao tontolo izao.",
            history: "Araka ny boky nosaratan'ny Katibo MAHEFAMANANA MOSA dia Ali Tawarath no razan'ny ANAKARA izay tonga teto Madagasikara tamin'ny taona 1495.",
            characteristics: [
                "Manana soratra sy fomba fanao manokana",
                "Mifandray amin'ny razam-be amin'ny alalan'ny fombafomba",
                "Manana rafitra sosialy sy politika efa niorina"
            ]
        }
    },
    fr: {
        about: {
            title: "Qui est Fizanakara?",
            description: "FIZANAKARA est l'association des descendants d'Ali Tawarath, originaires de Vatomasina Vohipeno, région Fitovinany. Fondée en 1970 à Antananarivo.",
            members: "Plus de 10.000 membres actuellement disséminés dans toute l'île et à l'étranger.",
            mission: "Perpétuer pour toujours les valeurs et la culture précieuses données par Dieu.",
            vision: "Voir les ANAKARA comme une communauté unie, riche en culture et avancée dans l'éducation.",
            values: [
                {
                    icon: Shield,
                    title: "Intégrité",
                    desc: "Maintenir la vérité dans le comportement et les actions"
                },
                {
                    icon: Heart,
                    title: "Amour",
                    desc: "Prendre soin et protéger les autres"
                },
                {
                    icon: TargetIcon,
                    title: "Unité",
                    desc: "Travailler ensemble vers des objectifs communs"
                },
                {
                    icon: Book,
                    title: "Connaissance",
                    desc: "Valoriser l'apprentissage et les compétences"
                }
            ],
            goals: [
                "Protéger les valeurs et la culture héritées des ancêtres",
                "Faire connaître et diffuser la richesse des valeurs qui caractérisent les Anakara",
                "Soutenir le développement individuel de chaque personne"
            ]
        },
        projects: {
            title: "Projets de l'association",
            items: [
                {
                    icon: "award",
                    title: "Honneur pour la Compétence",
                    description: "Distribution de diplômes pour les jeunes ayant terminé des formations, études ou enseignement supérieur."
                },
                {
                    icon: "bookOpen",
                    title: "Un cartable, Une lumière",
                    description: "Fournir des cartables et du matériel scolaire aux élèves Anakara en difficulté."
                },
                {
                    icon: "heart",
                    title: "Patrimoine vivant",
                    description: "Sauvegarder, collecter et transmettre le patrimoine culturel et artistique hérité des Anakara."
                },
                {
                    icon: "target",
                    title: "Connaître ses origines",
                    description: "Atelier pour la jeunesse Anakara concernant l'histoire du clan et des ancêtres."
                }
            ]
        },
        anakara: {
            title: "Qui sont les Anakara?",
            description: "Les ANAKARA sont un clan au sein des Antemoro (un sous-groupe des Antalaotra). Descendants d'Ali Tawarath, dispersés à travers le monde.",
            history: "Selon le livre écrit par le Katibo MAHEFAMANANA MOSA, Ali Tawarath, ancêtre des ANAKARA, est arrivé à Madagascar en 1495.",
            characteristics: [
                "Possèdent une écriture et des coutumes uniques",
                "Se connectent aux ancêtres à travers des rituels",
                "Ont un système social et politique bien établi"
            ]
        }
    },
    en: {
        about: {
            title: "Who is Fizanakara?",
            description: "FIZANAKARA is the association of descendants of Ali Tawarath, from Vatomasina Vohipeno, Fitovinany region. Founded in 1970 in Antananarivo.",
            members: "Over 10,000 members currently spread across the island and abroad.",
            mission: "To perpetuate forever the valuable values and culture given by God.",
            vision: "To see the ANAKARA as a united community, rich in culture and advanced in education.",
            values: [
                {
                    icon: Shield,
                    title: "Integrity",
                    desc: "Maintain truth in behavior and actions"
                },
                {
                    icon: Heart,
                    title: "Love",
                    desc: "Care for and protect others"
                },
                {
                    icon: TargetIcon,
                    title: "Unity",
                    desc: "Work together towards common goals"
                },
                {
                    icon: Book,
                    title: "Knowledge",
                    desc: "Value learning and skills"
                }
            ],
            goals: [
                "Protect the values and culture inherited from ancestors",
                "Make known and disseminate the richness of values that characterize the Anakara",
                "Support the individual development of each person"
            ]
        },
        projects: {
            title: "Association Projects",
            items: [
                {
                    icon: "award",
                    title: "Honor for Competence",
                    description: "Diploma distribution for youth who have completed training, studies, or higher education."
                },
                {
                    icon: "bookOpen",
                    title: "One backpack, One light",
                    description: "Provide backpacks and school supplies to struggling Anakara students."
                },
                {
                    icon: "heart",
                    title: "Living Heritage",
                    description: "Preserve, collect, and transmit cultural and artistic heritage inherited from the Anakara."
                },
                {
                    icon: "target",
                    title: "Know your origins",
                    description: "Workshop for Anakara youth about clan and ancestor history."
                }
            ]
        },
        anakara: {
            title: "Who are the Anakara?",
            description: "The ANAKARA are a clan within the Antemoro (a subgroup of the Antalaotra). Descendants of Ali Tawarath, scattered worldwide.",
            history: "According to the book written by Katibo MAHEFAMANANA MOSA, Ali Tawarath, ancestor of the ANAKARA, arrived in Madagascar in 1495.",
            characteristics: [
                "Have unique writing and customs",
                "Connect to ancestors through rituals",
                "Have a well-established social and political system"
            ]
        }
    }
};