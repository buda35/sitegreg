📦 Dépendances à installer
Utilisez les versions suivantes pour garantir la stabilité et la compatibilité :​

bash
Copier
Modifier
npm install next@13.4.12 \
            react@18.2.0 \
            react-dom@18.2.0 \
            tailwindcss@^3.2.0 \
            autoprefixer@^10.0.0 \
            postcss@^8.4.0 \
            lucide-react@^0.244.0 \
            supabase@^2.0.0 \
            @supabase/auth-helpers-nextjs@^0.4.0 \
            @supabase/storage-js@^2.0.0
🧱 Architecture du projet
csharp
Copier
Modifier

/
├── app/                 # Pages et routes Next.js
├── components/          # Composants UI réutilisables
├── public/              # Actifs statiques (images, etc.)
│   └── uploads/         # Répertoire dédié aux photos
├── styles/              # Styles globaux et Tailwind
├── utils/               # Fonctions utilitaires
├── supabase/            # Configuration Supabase
├── admin/               # Backoffice graphique
└── .env.local           # Variables d'environnement
⚙️ Configuration
next.config.js
javascript
Copier
Modifier
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
  },
};
tailwind.config.js
javascript
Copier
Modifier
module.exports = {
  theme: {
    extend: {
      colors: {
        'accent-red': '#CD291E',
        'accent-yellow': '#FDB912',
        'light-white': '#FFF9EE',
        'custom-grey': '#231F20',
        'dark-green': '#316131',
      },
    },
  },
  plugins: [],
};
postcss.config.js
javascript
Copier
Modifier
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
.env.local
env
Copier
Modifier
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
🖼️ Répertoire photo dédié
Toutes les illustrations et composants photo du site doivent être placés dans le répertoire public/uploads/. Ce répertoire sert de stockage centralisé pour toutes les images utilisées sur le site.​

🛠️ Backoffice graphique
Intégrez un backoffice graphique en utilisant Supabase et ShadCN UI pour permettre l'upload et la mise à jour facile du contenu du site.​
GitHub

Fonctionnalités du backoffice :
Authentification sécurisée via Supabase

Interface utilisateur moderne avec ShadCN UI

Gestion des images dans public/uploads/

Édition en ligne du contenu des pages

Aperçu en temps réel des modifications

📐 Considérations techniques
Design responsive
Approche mobile-first

Points de rupture :

sm: 640px

md: 768px

lg: 1024px

xl: 1280px
LinkedIn

Gestion de l'état
Utilisation des hooks React pour l'état local

Implémentation du contexte pour les états globaux

Éviter les re-rendus inutiles
U.S. Army Corps of Engineers

Animations
Transitions CSS pour les animations simples

Comportement de défilement fluide

Effets au survol avec Tailwind

Exemple de timings de transition :
GitHub
+7
U.S. Army Corps of Engineers
+7
GitHub
+7

css
Copier
Modifier
transition-duration: 300ms;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
🔧 Bonnes pratiques de développement
Organisation claire du code avec des composants petits et ciblés

Nommage cohérent des fichiers

Commentaires appropriés

Respect du principe DRY (Don't Repeat Yourself)

Utilisation des classes utilitaires de Tailwind

Optimisation des images avec le composant Image de Next.js

Configuration des domaines distants dans next.config.js pour freepik.com

Chargement prioritaire de la première image du héros

🧩 Composants clés
HeroSlider
Slider en plein écran avec texte superposé et boutons CTA

Utilisation du composant Image de Next.js

Slides auto-rotatifs toutes les 5 secondes

Superposition de dégradé pour le contraste du texte

Points de navigation

Transitions douces entre les slides

StorySection
Affichage de l'histoire du service de ramonage avec une image engageante

Mise en page à deux colonnes (responsive)

Bouton personnalisé avec effet d'ombre

Animation au survol de l'image

Superposition de dégradé sur l'image

ReviewSection
Affichage des témoignages clients dans une grille responsive

Cartes de témoignages avec animation au survol

Affichage des étoiles de notation

Accentuation des bordures avec des couleurs d'accentuation

MenuPage
Affichage des éléments du menu de services de ramonage dans une grille attrayante

Effets au survol des images

Badges de tags

Boutons de commande animés personnalisés

Affichage des prix en euros avec couleur d'accentuation

Navigation
Positionnement fixe

Transition de fond transparent à solide au défilement

Menu responsive pour mobile

Défilement fluide pour les liens d'ancrage

Footer
Affichage des informations de contact et des liens sociaux

Mise en page responsive

Icônes sociales de Lucide React

Effets au survol des liens

Logo de la marque

Logo
Logo textuel distinctif à plusieurs couches

Conception du conteneur avec fond jaune (#F4D03F)

Coins subtilement arrondis

Effet d'échelle au survol (1.05)

Typographie avec la police Lilita One (Google Fonts)

Espacement des lettres de 0.2em

Taille du texte : 24px (text-2xl)

Texte en majuscules

Structure en trois mots avec des écarts cohérents

Texte en couches pour la profondeur

État interactif au survol

Mise à l'échelle responsive

Ratio de contraste approprié

🖼️ Configuration des actifs
Images du HeroSlider
Image 1 : public/uploads/hero1.jpg

Image 2 : public/uploads/hero2.jpg

Image 3 : public/uploads/hero3.jpg

Image de la section Story
Image : public/uploads/story.jpg
GitHub