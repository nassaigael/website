# 🇲🇬 FIZANAKARA - Site Web Officiel de l'Association

<div align="center">
  <img src="/src/assets/images/logo.png" alt="FIZANAKARA Logo" width="200"/>
  
  ### *Fikambanan'ny Zanak'Anakara — Association des Descendants d'Ali Tawarath*
  
  [![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
  [![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
</div>

---

## 🌟 Aperçu du Projet

**FIZANAKARA** est le site web officiel de l'Association des Descendants d'Ali Tawarath (Anakara). Ce projet moderne et élégant a pour mission de **préserver, promouvoir et célébrer** le riche héritage culturel du peuple Anakara à Madagascar et dans le monde.

> *"Ravin'aviavy Ragnandria, tsara gn'avy, tsara gn'eviana"* — Proverbe malgache signifiant "Bonnes origines, bon avenir"

---

## ✨ Fonctionnalités Premium

### 🎨 **Design & Expérience Utilisateur**
- **Interface moderne** avec design premium et animations fluides
- **Thème clair/sombre** automatique selon les préférences système
- **Responsive design** optimisé pour mobile, tablette et desktop
- **Animations élégantes** avec Framer Motion
- **Composants réutilisables** architecture modulaire

### 🌍 **Multilinguisme**
- Support complet du **Malgache (MG)**, **Français (FR)** et **Anglais (EN)**
- Sélecteur de langue avec **drapeaux SVG**
- Contenu dynamique adapté à la langue
- Interface utilisateur entièrement traduite

### 🤖 **Assistant IA Intelligent**
- **Chatbot propulsé par Google Gemini 2.5 Flash**
- Base de connaissances FAQ avec **35+ entrées multilingues**
- **Double système de recherche** : FAQ locale puis IA
- **Formatage avancé** des réponses (gras, italique, listes)
- **Sauvegarde automatique** de l'historique des conversations
- **Suggestions de questions** pour guider l'utilisateur

### 📄 **Pages et Contenu**
- **Accueil** : Carousel dynamique, statistiques, présentation
- **Actualités** : Articles, événements, annonces
- **Projets** : Catalogue des projets avec filtres et recherche
- **Partenaires** : Grille des partenaires institutionnels
- **Contact** : Formulaire de contact et antennes régionales
- **Bureau** : Présentation des membres du comité

### 🗂️ **Gestion de Contenu**
- **FAQ dynamique** basée sur fichier JSON
- **Historique des conversations** sauvegardé localement
- **Modale de confirmation** stylée pour les actions importantes
- **Navigation intuitive** avec indicateurs visuels

---

## 🛠️ Stack Technique

### **Frontend**
| Technologie | Version | Utilisation |
|------------|---------|-------------|
| React | 18.3.0 | Framework principal |
| TypeScript | 5.6.2 | Typage statique |
| Tailwind CSS | 3.4.17 | Styling et responsive |
| Framer Motion | 11.11.17 | Animations |
| React Router | 7.1.1 | Navigation |
| Vite | 6.0.11 | Build tool |

### **Bibliothèques Additionnelles**
| Package | Version | Utilisation |
|---------|---------|-------------|
| Lucide React | Dernière | Icônes vectorielles |
| Flag Icons | Dernière | Drapeaux des pays |
| React Icons | Dernière | Icônes supplémentaires |
| Axios | 1.7.9 | Requêtes HTTP |
| Google Generative AI | Dernière | Intégration Gemini |

---

## 📁 Structure du Projet

```
fizanakara-website/
├── public/
│   ├── docs/
│   │   └── faq-data.json          # Base de connaissances IA
│   └── assets/
│       └── images/                 # Images et logos
│
├── src/
│   ├── components/
│   │   ├── cards/                  # Cartes (projets, news, etc.)
│   │   ├── chat/                    # Composants du chatbot
│   │   │   ├── AIChat.tsx
│   │   │   ├── ChatButton.tsx
│   │   │   ├── ChatHeader.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessages.tsx
│   │   │   ├── ChatSuggestions.tsx
│   │   │   └── ClearChatModal.tsx
│   │   ├── grids/                   # Grilles (partenaires)
│   │   ├── layout/                   # Layout (header, footer)
│   │   ├── sections/                 # Sections de page
│   │   └── states/                    # États (no results, etc.)
│   │
│   ├── contexts/
│   │   └── LanguageContext.tsx      # Gestion multilingue
│   │
│   ├── data/
│   │   ├── navigation.ts             # Navigation et langues
│   │   ├── projects.ts                # Données des projets
│   │   ├── news.ts                     # Articles d'actualité
│   │   ├── partners.ts                 # Données des partenaires
│   │   ├── footer.ts                    # Contenu du footer
│   │   ├── office_manager.ts            # Membres du bureau
│   │   ├── homepage.ts                   # Contenu page d'accueil
│   │   └── chat_type.ts                  # Types pour le chat
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── NewsPage.tsx
│   │   ├── NewsDetail.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── PartnersPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── AboutPage.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env                              # Variables d'environnement
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🚀 Installation et Démarrage

### **Prérequis**
- Node.js (v18+)
- npm ou yarn
- Clé API Google Gemini (optionnel pour le chatbot)

### **Installation**

```bash
# Cloner le dépôt
git clone https://github.com/votre-organisation/fizanakara-website.git
cd fizanakara-website

# Installer les dépendances
npm install
# ou
yarn install

# Configurer les variables d'environnement
cp .env.example .env
# Ajoutez votre clé API Gemini dans .env
```

### **Développement**

```bash
# Lancer le serveur de développement
npm run dev
# ou
yarn dev

# Le site sera accessible sur http://localhost:5173
```

### **Production**

```bash
# Build pour la production
npm run build
# ou
yarn build

# Prévisualiser le build
npm run preview
```

---

## 🤖 Configuration du Chatbot IA

### **1. Obtenir une clé API Gemini**
1. Rendez-vous sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Créez une nouvelle clé API
4. Copiez la clé dans votre fichier `.env`

```env
REACT_APP_GEMINI_API_KEY=votre_clé_api_ici
```

### **2. Personnaliser la Base de Connaissances**

Éditez le fichier `public/docs/faq-data.json` pour ajouter/modifier des questions :

```json
{
  "faq": [
    {
      "id": "exemple",
      "question": "Votre question ici",
      "answer": "Votre réponse ici",
      "keywords": ["mot1", "mot2"],
      "language": "fr",
      "category": "general"
    }
  ]
}
```

---

## 🎨 Personnalisation

### **Couleurs**
Les couleurs principales sont définies dans `index.css` :
```css
:root {
  --color-primary: #ee5253;    /* Rouge principal */
  --color-secondary: #932020;   /* Rouge foncé */
  --color-background: #ffffff;  /* Fond clair */
  --color-text: #000000;        /* Texte */
}
```

### **Configuration du Chatbot**
Paramètres modifiables dans `src/components/chat/AIChat.tsx` :
- `GEMINI_API_KEY` : Clé API
- `STORAGE_KEY` : Clé localStorage
- `similarityThreshold` : Seuil de similarité
- `maxResults` : Nombre max de résultats

---

## 📱 Responsive Design

Le site est optimisé pour tous les appareils :

| Appareil | Breakpoint | Optimisations |
|----------|------------|---------------|
| 📱 Mobile | < 640px | Menu burger, textes réduits |
| 📱 Mobile+ | 640px - 768px | Navigation adaptée |
| 📟 Tablette | 768px - 1024px | 2-3 colonnes |
| 💻 Desktop | > 1024px | Mise en page complète |
| 🖥️ Large | > 1280px | Espacement optimisé |

---

## 🌐 Support Multilingue

Le site supporte trois langues :

| Code | Langue | Drapeau |
|------|--------|---------|
| `mg` | Malagasy | 🇲🇬 |
| `fr` | Français | 🇫🇷 |
| `en` | English | 🇺🇸 |

### **Ajouter une nouvelle langue**
1. Ajoutez la langue dans `src/data/navigation.ts`
2. Traduisez tous les contenus dans `translations`
3. Ajoutez les questions FAQ correspondantes

---

## 👨‍💻 Développement

Ce site a été développé par **[Gaël RAMAHANDRISOA](https://www.linkedin.com/in/nassaigael/)**.

### **Compétences mises en œuvre**
- **Architecture React/TypeScript** moderne et scalable
- **Design UI/UX** premium avec animations fluides
- **Intégration IA** avec Google Gemini
- **Optimisation des performances** et SEO
- **Développement responsive** mobile-first
- **Gestion d'état** avec Context API
- **Typage strict** TypeScript

### **Contact du développeur**
- **LinkedIn**: [Gaël RAMAHANDRISOA](https://www.linkedin.com/in/nassaigael/)
- **Email**: gael.ramahandrisoa@email.com
- **Portfolio**: [nassaigael.github.io](https://nassaigael.github.io)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créez** une branche (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### **Guide de Style**
- Suivez les conventions TypeScript
- Utilisez des noms de composants explicites
- Documentez les fonctions complexes
- Testez sur mobile et desktop

---

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- **Patrick RAMONJAVELO** - Président de FIZANAKARA
- **MARSON Evariste**, **TSARAMONINA Jean Abraham**, **RANDRIAMAMPIONONA Franciscain** - Fondateurs
- **Tous les membres** de l'association FIZANAKARA
- **La communauté Anakara** à Madagascar et dans le monde

---

## 📞 Contact

- **Email**: contact@fizanakara.mg
- **Téléphone**: (+261) 38 90 065 67
- **Site web**: [www.fizanakara.mg](https://www.fizanakara.mg)
- **Adresse**: Vatomasina Vohipeno, Fitovinany, Madagascar

---

<div align="center">
  <img src="/src/assets/images/logo.png" alt="FIZANAKARA Logo" width="100"/>
  
  **FIZANAKARA** — *Préserver le passé, construire l'avenir*
  
  [![Website](https://img.shields.io/badge/Website-fizanakara.mg-ee5253?style=flat-square)](https://www.fizanakara.mg)
  [![Email](https://img.shields.io/badge/Email-contact%40fizanakara.mg-blue?style=flat-square)](mailto:contact@fizanakara.mg)
  
  <sub>Développé avec ❤️ par **[Gaël RAMAHANDRISOA](https://www.linkedin.com/in/ga%C3%ABl-ramahandrisoa-8b027b351/)**</sub>
  
  <sub>© 2025 FIZANAKARA. Tous droits réservés.</sub>
</div>
