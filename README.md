# TradeWise Community

TradeWise Community est une plateforme éducative dédiée aux traders en Afrique, offrant des formations, des ressources et une communauté pour échanger et progresser. Ce projet est construit avec React, TypeScript, Tailwind CSS et utilise Supabase pour l'authentification et la gestion des données.

## Table des matières

- [Structure du projet](#structure-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Structure du projet

### Architecture Frontend

- **Framework**: React avec TypeScript
- **Styling**: Tailwind CSS avec composants shadcn/ui
- **Routage**: React Router Dom
- **Gestion d'état**: Context API et React Query
- **Thème**: Support du mode clair/sombre

### Pages principales

- **Accueil (Index)**: Présentation générale de la plateforme
- **À propos (About)**: Information sur l'académie et les formateurs
- **Formations (Training)**: Contenu éducatif accessible après inscription
- **Tarification (Pricing)**: Plans d'abonnement avec différentes options
- **Authentification**: Pages de connexion, inscription, réinitialisation de mot de passe
- **Dashboard**: Espace utilisateur personnel
- **Communauté**: Espace d'échange entre utilisateurs
- **Assistant Trading**: Chatbot d'aide aux traders
- **Page admin**: Interface de gestion pour les administrateurs

### Composants clés

- **Layout**: Navbar, Footer, UserMenu
- **Authentication**: ProtectedRoute, AdminRoute
- **UI**: Nombreux composants réutilisables (cards, buttons, forms, etc.)
- **Éléments spécifiques**: TrainerCard, PaymentHistoryTable, LiveQuotes

### Services intégrés

- **Authentification**: Via Supabase
- **Base de données**: Tables Supabase pour profils utilisateurs, paiements, etc.
- **Edge Functions**: Fonctions serverless pour le traitement des paiements et le chatbot

## Fonctionnalités

### Fonctionnalités utilisateur

- Inscription et connexion
- Consultation des formations et ressources
- Abonnement à différents plans tarifaires
- Paiement via diverses méthodes (Orange Money, crypto, etc.)
- Interactions avec la communauté
- Assistant Trading pour l'aide et les conseils

### Fonctionnalités administrateur

- Gestion des utilisateurs
- Suivi des paiements
- Journal d'activités
- Statistiques de la plateforme

### Intégrations externes

- **WhatsApp**: Button flottant pour contacter le support
- **Assistant Trading**: Intégration d'AI pour aider les utilisateurs
- **API de données financières**: Pour les cotations en temps réel

### UX/UI

- Design responsive pour mobile et desktop
- Thème avec couleurs personnalisées (vert, jaune et rouge guinéens)
- Animations et transitions fluides
- Toasts pour les notifications
- Boutons flottants (WhatsApp, Assistant, ScrollToTop)

### Sécurité

- Routes protégées pour contenu premium
- Authentification sécurisée
- Gestion des erreurs avec ErrorBoundary
- Validation des formulaires

### Infrastructure

- Déploiement via Lovable
- Backend serverless avec Supabase
- Support multi-langue (français principalement)

## Installation

Pour installer et exécuter ce projet localement, suivez les étapes suivantes :

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/tradewise-community.git
   cd tradewise-community
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet et ajoutez les variables nécessaires (ex: `SUPABASE_URL`, `SUPABASE_KEY`).

4. Démarrez l'application :
   ```bash
   npm start
   ```

## Utilisation

- **Accueil**: Présentation de la plateforme.
- **À propos**: Informations sur l'académie et les formateurs.
- **Formations**: Accédez aux formations après inscription.
- **Tarification**: Choisissez un plan d'abonnement.
- **Dashboard**: Espace personnel pour gérer vos formations et paiements.
- **Communauté**: Échangez avec d'autres traders.
- **Assistant Trading**: Obtenez de l'aide via le chatbot.

## Contribuer

Nous apprécions les contributions ! Pour contribuer à ce projet, suivez ces étapes :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**TradeWise Community** est une plateforme éducative complète pour les traders africains, avec un focus particulier sur la Guinée, offrant des formations adaptées au marché local et des méthodes de paiement accessibles dans la région.

