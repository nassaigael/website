export const faqConfig = {
  docsFolder: "../../public/docs/faq-data.json",
  similarityThreshold: 0.7,
  maxResults: 3,
  onError: (error: never) => {
    console.error("FAQ Chat error:", error);
    return "Désolé, une erreur est survenue lors de la recherche.";
  }
};