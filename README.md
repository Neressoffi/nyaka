# NYAKA — Landing page (contenu sur layout CreativeHub)

Site vitrine de **NYAKA** — L'empreinte de votre marque.
Le contenu éditorial NYAKA (branding, design, vidéo, IA et données) est intégré
sur la structure visuelle existante du prototype CreativeHub.

## Démarrer le projet

```bash
npm install     # installe les dépendances
npm run dev     # lance le site sur http://localhost:3000
npm run build   # build de production
```

## Assistant IA (bulle de chat)

Le site intègre un assistant IA (Claude, par Anthropic) sous forme de bulle de chat,
visible sur toutes les pages. Il présente les services et réalisations de NYAKA, répond
en français et en anglais, et peut transmettre une demande de contact à l'équipe via un
Google Sheet.

### Fichiers

```
content/assistant/connaissances.md   ← LA SOURCE DES RÉPONSES (à mettre à jour, aucune compétence technique requise)
lib/assistant/prompt.ts              ← comportement du bot (ton, règles, quand transférer), relit connaissances.md à chaque requête
lib/assistant/config.ts              ← variables de configuration (modèle, limites, CORS)
lib/assistant/rate-limit.ts          ← limitation de débit best-effort par IP
lib/assistant/sheets.ts              ← écriture d'une demande dans Google Sheets
lib/assistant/i18n.ts                ← textes de l'interface FR/EN
app/api/chat/route.ts                ← route API (devient une fonction Netlify automatiquement)
components/ChatWidget.tsx            ← bulle de chat (front)
app/politique-de-confidentialite/    ← page liée depuis le message d'accueil du widget
```

### 1. Variables d'environnement

```bash
cp .env.local.example .env.local   # puis remplir les valeurs (jamais commité)
```

- `ANTHROPIC_API_KEY` : clé API Anthropic (console.anthropic.com), **uniquement côté
  serveur**, jamais dans le code front ni dans Git.
- `CLAUDE_MODEL` (optionnel) : modèle utilisé, par défaut `claude-haiku-4-5-20251001`.
- `SITE_ORIGIN` : domaine autorisé à appeler `/api/chat` (CORS). `localhost` est toujours
  autorisé en développement.
- `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` : voir ci-dessous.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` : numéro affiché dans le bouton "Continuer sur WhatsApp"
  du widget (fictif par défaut — à remplacer par le vrai numéro NYAKA). Cette variable est
  publique (visible côté navigateur), ce n'est qu'un numéro de téléphone, pas un secret.

En production (Netlify), renseigner les mêmes variables dans *Site settings → Environment
variables*.

### 2. Google Sheets (enregistrement des demandes)

1. Créer un projet sur [Google Cloud Console](https://console.cloud.google.com), activer
   l'**API Google Sheets**.
2. Créer un **compte de service**, générer une clé JSON.
3. Créer un Google Sheet avec un onglet nommé `Demandes` et une ligne d'en-têtes, par
   exemple : `Date | Source | Langue | Motif | Nom | Entreprise/projet | Besoin | Contact | Accord`.
4. **Partager ce Sheet** (bouton Partager) avec l'adresse e-mail du compte de service
   (`...@...iam.gserviceaccount.com`), en accès **Éditeur**.
5. Remplir `GOOGLE_SHEET_ID` (dans l'URL du Sheet), `GOOGLE_SERVICE_ACCOUNT_EMAIL` et
   `GOOGLE_PRIVATE_KEY` (champ `private_key` du JSON, avec ses `\n`) dans `.env.local` /
   Netlify.

Si ces variables sont absentes, l'assistant continue de fonctionner mais n'enregistre
aucune demande (un avertissement est tracé dans les logs serveur).

### 3. Tester en local

```bash
npm run dev
```

Ouvrir http://localhost:3000, cliquer sur la bulle en bas à droite. Idées de test :
« Quels sont vos services ? », « Combien ça coûte un logo ? » (ne doit jamais donner de
prix), « I'd like to start a project », changer de langue en cours de conversation.

### 4. Sécurité et maîtrise des coûts

- Clé Anthropic et identifiants Google Sheets uniquement en variables d'environnement
  serveur.
- CORS restreint à `SITE_ORIGIN` (+ localhost en dev).
- Longueur de message, nombre de messages par session et `max_tokens` plafonnés
  (`lib/assistant/config.ts`).
- Limitation de débit par IP en mémoire (best-effort — une instance de fonction serverless
  peut redémarrer et remettre le compteur à zéro ; pour une protection plus robuste contre
  les abus, ajouter **Cloudflare Turnstile** devant le widget).
- Réponses affichées en texte échappé par React (pas de `dangerouslySetInnerHTML`) : pas
  d'injection HTML/XSS possible depuis une réponse du modèle.
- Historique de conversation conservé uniquement dans le navigateur du visiteur
  (`sessionStorage`), jamais sur le serveur.

### 5. Limites connues de cette première version

- Limitation de débit non partagée entre instances serverless (voir ci-dessus).
- Pas de protection anti-robot (Turnstile) pour l'instant.
- `content/assistant/connaissances.md` n'est pas encore relié à Decap CMS : modification
  manuelle du fichier Markdown pour l'instant.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens en variables CSS (voir `app/globals.css`)
- **Radix UI** — Popover (mega-menus), Tabs (section onglets), Accordion (FAQ)
- **keen-slider** — utilisé pour certains carrousels (selon les sections)
- **next-themes** — dark mode forcé sur la home
- **lucide-react** — icônes
- Polices : **Geist** (corps) et **Space Grotesk** (titres, `--font-alternate` / `font-display`)

## Où modifier quoi ?

| Vous voulez changer… | Fichier |
| --- | --- |
| Les couleurs du site | `app/globals.css` (variables CSS) |
| Les liens des mega-menus | `lib/menu-data.ts` |
| Le contenu des onglets | `lib/tabs-data.ts` |
| Une section de la page | `components/<NomDeLaSection>.tsx` |
| L'ordre des sections | `app/page.tsx` |
| Classes Tailwind / animations | `tailwind.config.ts` |

## Structure de la page (`app/page.tsx`)

Ordre des sections :

0. `TopBanner` — bandeau d'annonce
1. `Header` — navigation + mega-menus (absolu, flotte au-dessus du hero)
2. `Hero` — plein écran + roulette de texte + logos partenaires
3. `TabsSection` — onglets pill + panneau accordéon auto-rotatif
4. `ModelsCarousel` — carrousel infini des modèles (vidéo au survol)
5. `BentoGrid` — grille bento (outils + cartes nodal / équipe / workflow)
6. `ToolsCarousel` — outils filtrables, rangée draggable
7. `UseCases` — cas d'usage (3 cartes + panoramique)
8. `VideosCarousel` — Originals (une slide à la fois)
9. `TeamPlans` — offres Business / Entreprise + témoignages
10. `Pricing` — tarifs (Particulier / Équipes, Mensuel / Annuel)
11. `Faq` — accordéon Radix
12. `FinalCta` — appel à l'action final en dégradé
13. `Footer` — pied de page noir

Zones de fond :

- **Partie sombre** : Hero
- **Partie claire (fond crème)** : Tabs → Videos
- **Retour au sombre** : TeamPlans
- **Clair** : Pricing + FAQ
- **CTA dégradé + footer noir** : FinalCta + Footer

---

## Documentation du code (anciens commentaires)

Toute la documentation qui était dans le code a été déplacée ici pour garder les
fichiers sources propres.

### `app/globals.css`

- Directives Tailwind : injectent les styles de base, composants et utilitaires.
- **Design tokens** : toutes les couleurs sont définies une seule fois ici, puis
  mappées dans `tailwind.config.ts`.
- **Fonds sombres** (`--surface-*`) : fond principal du site (header + hero).
- **Texte sur fond sombre** (`--foreground-*`) : blanc pur / 90 % / 70 % / 50 %.
- **Couleur d'accent** (`--accent`) : magenta.
- **Fonds spéciaux** : beige, maroon, neutres.
- **Tokens marketing** : partie claire (crème, blanc, textes).
- Le fond global du site est sombre.
- `overflow-x: hidden` évite les micro-décalages horizontaux causés par les
  carrousels débordants.
- Utilitaire `.scrollbar-hidden` : masque la scrollbar (Firefox / Edge / Chrome-Safari).

### `app/layout.tsx`

- **Geist** : police du corps de texte.
- **Space Grotesk** : titres display (`--font-alternate` → classe `font-display`).
- `ThemeProvider` force le thème sombre sur la home (`forcedTheme="dark"`).
- `suppressHydrationWarning` sur `<html>` : requis par next-themes.
- Métadonnées SEO dans `export const metadata`.

### `tailwind.config.ts`

- Mappe les variables CSS vers des classes Tailwind.
- `content` : fichiers scannés pour le purge CSS.
- `darkMode: "class"` : classe sur `<html>` (next-themes).
- Couleurs : surface, foreground, accent, beige, maroon, marketing, neutral.
- Polices : Geist sans + Space Grotesk display.
- Arrondis : `rounded-2lg` pour les cartes (en plus de `rounded-lg`).
- Animations :
  - `scroll-horizontal` : marquee (liste dupliquée, translation −50 %).
  - `progress` : barre de progression de l'accordéon des onglets.
  - `fadeIn` : fondu des slides Originals.

### `lib/menu-data.ts`

Données des mega-menus du header. Modifier les tableaux pour mettre à jour la nav.

- Types : lien simple / colonne de liens.
- Menu **Suite créative** : 6 colonnes.
- Menu **Stock** : 4 colonnes.
- Menu **Ressources** : liens avec icône + sous-titre.

### `lib/tabs-data.ts`

Données de la section onglets : titre / description / CTA du panneau + items
d'accordéon (image, vidéo, audio, 3D, espaces).

### `components/theme-provider.tsx`

- `"use client"` : next-themes a besoin du JS navigateur.
- Wrapper client autour de next-themes (le layout est un Server Component).

---

### Section 0 — `TopBanner.tsx`

Bandeau noir, lien magenta centré. Au survol, la flèche se décale de 4 px
(`group` / `group-hover`).

### Section 1 — `Header.tsx`

- `"use client"` : popovers + menu mobile.
- Header absolu / transparent au-dessus du hero.
- Map `ICONS` : nom d'icône → composant lucide.
- Badge « Nouveau » (fond magenta ~15 %).
- Mega-menus Radix Popover (Suite créative, Stock, Ressources).
- Ressources : 2 colonnes + carte Events.
- Layout : gauche = burger / logo / nav ; droite = recherche / connexion / inscription.
- Sur mobile : menu déroulant.

### Section 2 — `Hero.tsx`

- Image plein écran qui couvre aussi la zone logos partenaires.
- Voile sombre commun.
- Contenu en bas à gauche : badge, titre, CTAs.
- Roulette de texte à droite (`TextRoulette`).
- Logos partenaires : rangée desktop ; marquee mobile (liste dupliquée, −50 %).

### `TextRoulette.tsx`

- ~10 phrases qui défilent.
- Liste dupliquée ; pas toutes les 2 s ; reset silencieux après un cycle.
- Ligne active au centre ; opacité selon la distance à la ligne active.
- Chaque ligne ~60 px de haut.

### Section 3 — `TabsSection.tsx`

- Section crème ; barre d'onglets avec pastille noire qui glisse.
- Panneau ~650 px : colonne gauche (titre, description, CTA, accordéon) ;
  colonne droite (image encadrée + barre de prompt flottante).
- Accordion auto-rotatif toutes les 5 s (`AUTO_MS`) ; reset au clic.
- Astuce hauteur : `grid-rows-[0fr]` / `grid-rows-[1fr]` + `overflow-hidden`.
- Barre `animate-progress` ; `key` pour relancer l'animation.
- Image stack : fondu / léger zoom au changement d'item.

### Section 4 — `ModelsCarousel.tsx`

- `"use client"` : auto-scroll + drag.
- Scroll via `requestAnimationFrame` ; pause au survol ; drag souris/tactile.
- Piste dupliquée pour boucle infinie.
- Carte modèle ~220×280 : au survol, vidéo en fondu + lecture (`preload="none"`).

### Section 5 — `BentoGrid.tsx`

- Colonne gauche : titre, filtres (Tous / Image / Vidéo / Audio), grille 2×2 d'outils.
- Colonne droite : grande carte noire « canvas nodal », carte bordeaux équipe,
  carte bleue workflow.
- Filtre actif en noir.

### Section 6 — `ToolsCarousel.tsx`

- Filtres pill + flèches précédent/suivant.
- Rangée horizontale : scrollbar masquée, drag → `scrollLeft`, scroll ±400 px.
- Cartes ~200×177 avec léger lift au survol.

### Section 7 — `UseCases.tsx`

- En-tête + CTA noir « Démarrer un projet ».
- 3 cartes verticales (aspect 3/4) + 1 carte panoramique
  (aspect 3/2 mobile → 3/1 desktop) — situations NYAKA.
- Image pleine + dégradé bas + texte.

### Section 8 — `VideosCarousel.tsx`

- Section claire ; **une seule grande slide** visible à la fois.
- Texte en bas à gauche + bouton « Découvrir le projet ».
- Zones latérales discrètes (ombres) cliquables pour précédent / suivant
  (pas de flèches visibles).
- Navigation compacte sous le slider : petit rond gauche (précédent) + barre
  centrale (indicateur) + petit rond droit (suivant).
- Transition `fadeIn` via changement de `key`.

### Section 9 — `TeamPlans.tsx`

- Titre + colonnes Équipes / Organisations.
- 2 cartes démo (pôles, équipes projet).
- Grille de 6 fonctionnalités.
- 3 encarts projets (KAWA, THE VISION, NEMESIS).

### Section 10 — `Pricing.tsx`

- Toggle Projet / Organisation.
- Switch Ciblé / Complet.
- 3 cartes : Essentiel branding, Communication, Solution complète — Sur devis.
- CTA « Demander un devis » / « Démarrer un projet ».

### Section 11 — `Faq.tsx`

- `"use client"` : Accordion Radix interactif.
- Layout 2 colonnes : titre + « Parler de votre projet » à gauche ;
  9 questions NYAKA à droite.
- Icône `+` qui tourne à 45° (croix) à l'ouverture.
- Réponse animée via `grid-rows`.

### Section 12 — `FinalCta.tsx`

- Bandeau dégradé violet → orange.
- Titre display centré « Construisons la suite avec méthode. »
- Bouton noir « Démarrer un projet » + flèche animée.
- Ligne rose diagonale décorative ; bas assombri vers le footer.

### `Footer.tsx`

- Fond noir.
- Logo NYAKA + description + signature à gauche ; 4 colonnes de liens (titres rose/accent).
- Badges « Nouveau » optionnels sur certains liens.
- Copyright en bas.
