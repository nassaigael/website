export const allSuggestions = {
    mg: [
        "Inona ny FIZANAKARA?",
        "Iza i Ali Tawarath?",
        "Inona avy ny tetikasa?",
        "Ahoana no miditra ho mpikambana?",
        "Taiza no misy anareo?",
        "Inona ny tantaran'ny Anakara?",
        "Inona no dikan'ny hoe Vakoka?",
        "Inona ny Sorabe?",
        "Iza ny Antemoro?",
        "Inona ny soatoavin'ny FIZANAKARA?",
        "Iza no filoha?",
        "Iza no mpanorina?",
        "Inona ny tenin'ny filoha?",
        "Inona ny Sakandro?",
        "Inona ny hetsika tamin'ny 2025?",
        "Rahoviana ny Sakandro?",
        "Ahoana no ifandraisana?",
        "Aiza ny sampana?",
        "Firy ny mpikambana?",
        "Ahoana ny fandraisan'ny diaspora anjara?",
        "Inona ny dikan'ny Kolontsaina?",
        "Inona ny dikan'ny Fomba-drazana?",
        "Inona ny Katibo?"
    ],

    fr: [
        "Qu'est-ce que FIZANAKARA ?",
        "Qui est Ali Tawarath ?",
        "Quels sont les projets ?",
        "Comment devenir membre ?",
        "Où êtes-vous situés ?",
        "Quelle est l'histoire des Anakara ?",
        "Que signifie le mot Vakoka ?",
        "Qu'est-ce que le Sorabe ?",
        "Qui sont les Antemoro ?",
        "Quelles sont les valeurs de FIZANAKARA ?",
        "Qui est le président ?",
        "Qui sont les fondateurs ?",
        "Quelle est la citation du président ?",
        "Qu'est-ce que le Sakandro ?",
        "Quels événements en 2025 ?",
        "Quand a lieu le Sakandro ?",
        "Comment contacter FIZANAKARA ?",
        "Où sont les antennes ?",
        "Combien de membres ?",
        "Comment la diaspora peut-elle participer ?",
        "Que signifie Kolontsaina ?",
        "Que signifie Fomba-drazana ?",
        "Qu'est-ce que le Katibo ?"
    ],

    en: [
        "What is FIZANAKARA?",
        "Who is Ali Tawarath?",
        "What are the projects?",
        "How to become a member?",
        "Where are you located?",
        "What is the history of the Anakara?",
        "What does Vakoka mean?",
        "What is Sorabe?",
        "Who are the Antemoro?",
        "What are the values of FIZANAKARA?",
        "Who is the president?",
        "Who are the founders?",
        "What is the president's quote?",
        "What is Sakandro?",
        "What events in 2025?",
        "When is Sakandro held?",
        "How to contact FIZANAKARA?",
        "Where are the branches?",
        "How many members?",
        "How can diaspora participate?",
        "What does Kolontsaina mean?",
        "What does Fomba-drazana mean?",
        "What is Katibo?"
    ]
};

// Fonction pour obtenir 4 suggestions aléatoires
export const getRandomSuggestions = (language: string, count: number = 4): string[] => {
    const suggestions = allSuggestions[language as keyof typeof allSuggestions] || allSuggestions.fr;
    const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};