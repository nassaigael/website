export interface Translation {
  title: string;
  subtitle: string;
  highlighted: string;
  continuation: string;
  description: string;
  emailLabel: string;
  phoneLabel: string;
  form: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    industry: string;
    industryPlaceholder: string;
    industryOptions: string[];
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
  };
}

export type LanguageKey = 'mg' | 'fr' | 'en';

export  const translations: Record<LanguageKey, Translation> = {
    mg: {
      title: "ETO IZAHAY HANAMPY ANAREO",
      subtitle: "Resaho ny",
      highlighted: "Tetikasa",
      continuation: "Anakara Ilainao",
      description: "Mikasa ny hanohana ny tetikasa anakara ho an ny fiarovana ny vakoka sy ny fanabeazana? Mifandraisa aminay.",
      emailLabel: "Email",
      phoneLabel: "Laharana finday",
      form: {
        name: "Anarana",
        namePlaceholder: "Jane Smith",
        email: "Email",
        emailPlaceholder: "jane.smith@example.com",
        industry: "Saha",
        industryPlaceholder: "Safidio",
        industryOptions: [
          "Fiarovana vakoka",
          "Fanabeazana",
          "Fampandrosoana anjara asa",
          "Tetikasam-piarahamonina",
          "Haino aman-jery",
          "Hetsika kolontsaina"
        ],
        message: "Hafatra",
        messagePlaceholder: "Misaotra anao no nifandray taminao. Mankasitraka ny fiahianao ny tetikasantsika. Raha manana fanontaniana ianao na mila fanazavana fanampiny, azafady aza misalasala mifandray aminay.",
        submit: "Alefa hafatra",
        submitting: "Eo am-pandalovana...",
        success: "Nalefa soa aman-tsara ny hafatrao!"
      }
    },
    fr: {
      title: "NOUS SOMMES LÀ POUR VOUS AIDER",
      subtitle: "Discutez de vos",
      highlighted: "Projets",
      continuation: "Anakara",
      description: "Vous cherchez à soutenir des projets anakara pour la protection du patrimoine et l'éducation ? Contactez-nous.",
      emailLabel: "E-mail",
      phoneLabel: "Numéro de téléphone",
      form: {
        name: "Nom",
        namePlaceholder: "Jane Smith",
        email: "E-mail",
        emailPlaceholder: "jane.smith@example.com",
        industry: "Secteur",
        industryPlaceholder: "Sélectionner",
        industryOptions: [
          "Protection du patrimoine",
          "Éducation",
          "Développement communautaire",
          "Projets sociaux",
          "Médias",
          "Événements culturels"
        ],
        message: "Message",
        messagePlaceholder: "Merci de nous avoir contactés. Nous apprécions votre intérêt pour nos projets. Si vous avez des questions ou besoin de plus d'informations, n'hésitez pas à nous contacter.",
        submit: "Envoyer le message",
        submitting: "Envoi en cours...",
        success: "Votre message a été envoyé avec succès!"
      }
    },
    en: {
      title: "WE'RE HERE TO HELP YOU",
      subtitle: "Discuss Your",
      highlighted: "Anakara",
      continuation: "Project Needs",
      description: "Looking to support anakara projects for heritage protection and education? Reach out to us.",
      emailLabel: "E-mail",
      phoneLabel: "Phone number",
      form: {
        name: "Name",
        namePlaceholder: "Jane Smith",
        email: "Email",
        emailPlaceholder: "jane.smith@example.com",
        industry: "Industry",
        industryPlaceholder: "Select",
        industryOptions: [
          "Heritage Protection",
          "Education",
          "Community Development",
          "Social Projects",
          "Media",
          "Cultural Events"
        ],
        message: "Message",
        messagePlaceholder: "Thank you for reaching out. We appreciate your interest in our projects. If you have any questions or need further information, please don't hesitate to contact us.",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Your message has been sent successfully!"
      }
    }
  };