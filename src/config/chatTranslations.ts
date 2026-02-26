import type { Translation, SupportedLanguage } from '../types/chat_type';

export const translations: Record<SupportedLanguage, Translation> = {
    mg: {
        title: "Mpanampy AI FIZANAKARA",
        placeholder: "Soraty eto ny fanontanianao...",
        welcome: "Salama 👋! Mpanampy AI an'ny FIZANAKARA aho. Ahoana no ahafahako manampy anao anio?",
        thinking: "Misaina kely...",
        error: "Miala tsiny fa nisy olana. Azafady andramo indray.",
        suggestions: "Fanontaniana mahazatra",
        typeHere: "Soraty eto...",
        clearChat: "Fafao ny resaka",
        clearConfirm: "Hafafao ny resaka rehetra?",
        clearTitle: "Fafana ny resaka",
        clearMessage: "Tena te-hamafa ny resaka rehetra ve ianao? Tsy azo averina intsony ity hetsika ity.",
        cancel: "Aza"
    },
    fr: {
        title: "Assistant IA FIZANAKARA",
        placeholder: "Tapez votre question ici...",
        welcome: "Bonjour 👋! Je suis l'assistant IA de FIZANAKARA. Comment puis-je vous aider aujourd'hui ?",
        thinking: "Réflexion en cours...",
        error: "Désolé, une erreur est survenue. Veuillez réessayer.",
        suggestions: "Questions fréquentes",
        typeHere: "Tapez ici...",
        clearChat: "Effacer la conversation",
        clearConfirm: "Effacer toutes les conversations ?",
        clearTitle: "Effacer la conversation",
        clearMessage: "Êtes-vous sûr de vouloir effacer toute la conversation ? Cette action est irréversible.",
        cancel: "Annuler"
    },
    en: {
        title: "FIZANAKARA AI Assistant",
        placeholder: "Type your question here...",
        welcome: "Hello 👋! I'm the FIZANAKARA AI assistant. How can I help you today?",
        thinking: "Thinking...",
        error: "Sorry, an error occurred. Please try again.",
        suggestions: "Common questions",
        typeHere: "Type here...",
        clearChat: "Clear chat",
        clearConfirm: "Clear all conversations?",
        clearTitle: "Clear conversation",
        clearMessage: "Are you sure you want to clear the entire conversation? This action cannot be undone.",
        cancel: "Cancel"
    }
};