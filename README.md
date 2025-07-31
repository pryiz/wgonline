# 🎮 Twitch Quiz - Application de Quiz Interactif

Une application web moderne pour organiser des quiz thématiques avec le chat Twitch. Permet aux streamers de créer des quiz interactifs où les viewers peuvent participer en temps réel.

## ✨ Fonctionnalités

### 🎯 Configuration du Streameur
- **Connexion Twitch** : Entrée de l'URL de la chaîne Twitch
- **Vérification automatique** : Validation de la chaîne (simulée en mode dev)
- **Interface intuitive** : Design moderne et responsive

### ⚙️ Configuration du Quiz
- **Thématiques variées** : Gaming, Anime & Manga, Technologie
- **Modes de jeu** : 10, 25 ou 50 questions
- **Rôles flexibles** : Streamer en tant que présentateur ou joueur
- **Questions aléatoires** : Mélange automatique des questions

### 🎮 Déroulement du Quiz
- **Questions à choix multiples** : 4 options par question
- **Réponses du chat** : Les viewers répondent avec 1, 2, 3 ou 4
- **Timer automatique** : 30 secondes par question
- **Explications** : Affichage des explications après chaque question

### 🏆 Système de Scoring
- **Bonne réponse** : +5 points
- **Mauvaise réponse** : -3 points
- **Leaderboard temps réel** : Classement mis à jour instantanément
- **Statistiques détaillées** : Scores, moyennes, écarts

### 📊 Interface Avancée
- **Leaderboard en temps réel** : Top 10 des joueurs
- **Réponses du chat** : Affichage des réponses en direct
- **Statistiques** : Nombre de joueurs, réponses reçues
- **Mode développement** : Simulation des réponses du chat

## 🛠️ Stack Technique

### Frontend
- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage statique pour la robustesse
- **Tailwind CSS** : Framework CSS utilitaire
- **React Hooks** : Gestion d'état moderne

### Architecture
- **Pages** : `/` (accueil), `/config` (configuration), `/quiz` (jeu), `/results` (résultats)
- **Composants** : Interface modulaire et réutilisable
- **Types** : Définitions TypeScript complètes
- **Données** : Questions et thématiques en JSON

### Fonctionnalités Avancées
- **Responsive Design** : Compatible mobile, tablette, desktop
- **Animations** : Transitions fluides et feedback visuel
- **LocalStorage** : Persistance des données de session
- **Simulation** : Mode développement avec réponses simulées

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ (recommandé)
- npm ou yarn
- Compte développeur Twitch

### Configuration Twitch Chat

L'application utilise **TMI.js** pour lire le chat Twitch sans authentification. Aucune clé API n'est nécessaire !

**Fonctionnalités** :
- ✅ Lecture du chat en temps réel
- ✅ Détection automatique des réponses (1, 2, 3, 4)
- ✅ Pas besoin de clés API Twitch
- ✅ Connexion anonyme au chat

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd wgonline

# Installer les dépendances
npm install

# Aucune configuration supplémentaire nécessaire !

# Démarrer le serveur de développement
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Build de production
npm run start    # Démarre le serveur de production
npm run lint     # Vérification du code
```

## 📁 Structure du Projet

```
wgonline/
├── src/
│   ├── app/                 # Pages Next.js (App Router)
│   │   ├── page.tsx        # Page d'accueil
│   │   ├── config/         # Configuration du quiz
│   │   ├── quiz/           # Interface du quiz
│   │   ├── results/        # Résultats finaux
│   │   ├── layout.tsx      # Layout principal
│   │   └── globals.css     # Styles globaux
│   ├── components/         # Composants réutilisables
│   ├── data/              # Données (questions, thématiques)
│   ├── lib/               # Utilitaires et services
│   └── types/             # Définitions TypeScript
├── public/                # Assets statiques
├── package.json           # Dépendances et scripts
├── tailwind.config.js     # Configuration Tailwind
├── tsconfig.json          # Configuration TypeScript
└── README.md             # Documentation
```

## 🎯 Utilisation

### 1. Configuration Initiale
1. Accédez à l'application
2. Entrez l'URL de votre chaîne Twitch (formats supportés) :
   - `@https://www.twitch.tv/username` (format recommandé)
   - `https://www.twitch.tv/username`
   - `https://twitch.tv/username`
   - `twitch.tv/username`
   - `@username` (juste le nom avec @)
   - `username` (juste le nom de la chaîne)
   - Avec paramètres : `https://www.twitch.tv/username?param=value`
   - Avec fragments : `https://www.twitch.tv/username#fragment`
   - Avec chemins : `https://www.twitch.tv/username/videos`
3. Cliquez sur "Vérifier et continuer"

### 2. Configuration du Quiz
1. **Choisissez une thématique** : Gaming, Anime & Manga, ou Technologie
2. **Sélectionnez le nombre de questions** : 10, 25, ou 50
3. **Définissez votre rôle** : Présentateur ou Joueur
4. Cliquez sur "Lancer le Quiz"

### 3. Déroulement du Quiz
1. **Démarrez chaque question** en cliquant sur "Commencer la question"
2. **Les viewers répondent** en tapant 1, 2, 3 ou 4 dans le chat
3. **Le leaderboard se met à jour** en temps réel
4. **Passez à la question suivante** quand vous voulez

### 4. Résultats
- **Classement final** avec podium
- **Statistiques détaillées**
- **Options pour recommencer** ou retourner à l'accueil

## 🎨 Design et UX

### Palette de Couleurs
- **Primary** : Bleu moderne (#0ea5e9)
- **Twitch** : Rose/violet pour l'identité Twitch
- **Success** : Vert pour les bonnes réponses
- **Error** : Rouge pour les mauvaises réponses

### Composants UI
- **Cards** : Conteneurs avec ombres et bordures
- **Buttons** : Styles primaire et secondaire
- **Inputs** : Champs de saisie avec focus states
- **Leaderboard** : Design de classement avec badges

### Responsive Design
- **Mobile First** : Optimisé pour les petits écrans
- **Tablette** : Layout adaptatif
- **Desktop** : Interface complète avec sidebar

## 🔧 Développement

### Mode Développement
L'application inclut un mode développement avec :
- **Simulation des réponses** : Réponses automatiques du chat
- **Validation simulée** : Vérification Twitch simulée
- **Données de test** : Questions et thématiques incluses

### Intégration Twitch (Futur)
Pour une version production, il faudrait :
- **API Twitch Helix** : Authentification et données utilisateur
- **EventSub** : Écoute des messages du chat en temps réel
- **WebSocket** : Communication bidirectionnelle
- **Base de données** : Stockage des scores et statistiques

## 📈 Roadmap

### Fonctionnalités Futures
- [ ] **Intégration Twitch réelle** : API et WebSocket
- [ ] **Base de données** : Supabase ou PostgreSQL
- [ ] **Thématiques personnalisées** : Création de quiz custom
- [ ] **Mode multijoueur** : Quiz entre streamers
- [ ] **Analytics** : Statistiques détaillées
- [ ] **Notifications** : Alertes en temps réel
- [ ] **Export des résultats** : PDF, CSV, etc.

### Améliorations Techniques
- [ ] **Tests unitaires** : Jest et React Testing Library
- [ ] **E2E tests** : Playwright ou Cypress
- [ ] **CI/CD** : GitHub Actions
- [ ] **Déploiement** : Vercel ou Netlify
- [ ] **Monitoring** : Sentry pour les erreurs

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **Next.js** : Framework React moderne
- **Tailwind CSS** : Framework CSS utilitaire
- **TypeScript** : Typage statique pour JavaScript
- **Communauté Twitch** : Inspiration pour l'interactivité

---

**Développé avec ❤️ pour la communauté Twitch**
