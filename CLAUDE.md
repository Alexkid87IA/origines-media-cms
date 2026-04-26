# Prompt pour Claude Code — Sanity CMS — Origines Media

## Architecture du site

Le front-end Origines Media est organisé en **deux niveaux de navigation** :

### Niveau 1 : Galaxie (4 piliers)

| Pilier       | Couleur   | Route front    | Description                                          |
|--------------|-----------|----------------|------------------------------------------------------|
| **Média**    | #6D28D9   | `/media`       | Articles, récits, immersions, témoignages            |
| **Prod**     | #C2410C   | `/programmes`  | Reportages, documentaires, interviews, shorts, live  |
| **Ateliers** | #059669   | `/guides`      | Masterclass, ateliers, programmes, kits gratuits     |
| **Boutique** | #E11D48   | `/boutique`    | E-books, workbooks, audio, carnets, coffrets         |

### Niveau 2 : Univers (5 thèmes éditoriaux — rattachés au pilier Média)

| Univers        | Couleur   | Sous-topics (slugs)                                                                              |
|----------------|-----------|--------------------------------------------------------------------------------------------------|
| **L'Esprit**   | #7B5CD6   | emotions, conscience, meditation, developpement-personnel, neurosciences, philosophie, quete-de-sens, therapies |
| **Le Corps**   | #5AA352   | nutrition, sommeil, mouvement, prevention, medecine-douce, bien-etre, sport, respiration         |
| **Les Liens**  | #E67839   | parentalite, couples, amitie, education, generations, communaute, ruptures, enquetes-sociales    |
| **Le Monde**   | #2E9B74   | recits-voyage, destinations, art, musique, litterature, cinema, creativite, photographie         |
| **L'Avenir**   | #2E94B5   | carriere, entrepreneuriat, innovation, ia, economie, leadership, numerique, nomadisme            |

---

## Schéma Sanity — document `production`

Champs clés à renseigner correctement :

| Champ Sanity       | Valeurs possibles                                                                                                                                                                | Usage front                        |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| `_type`            | `"production"`                                                                                                                                                                   | Tous les contenus                  |
| `rubrique`         | `"articles"` \| `"guides"` \| `"videos"` \| `"recommandations"`                                                                                                                 | Détermine le **pilier**            |
| `typeArticle`      | `"article"` \| `"video"` \| `"reflexion"` \| `"temoignage"` \| `"portrait"` \| `"reportage"` \| `"interview"` \| `"short"` \| `"live"` \| `"dossier"` \| `"newsletter"` \| `"immersion"` \| `"histoire"` \| `"recommandation"` | Détermine le **format** |
| `verticale`        | Référence vers le document verticale (Psychologie, Société, etc.)                                                                                                                | Mappé vers un **univers** front    |
| `slug.current`     | String                                                                                                                                                                           | URL de l'article                   |
| `datePublication`  | Datetime                                                                                                                                                                         | Tri et affichage                   |

---

## Mapping verticale Sanity → univers front

Le front utilise `verticaleToUnivers()` pour convertir le slug/nom de verticale Sanity en univers :

```
psychologie      → esprit
spiritualité     → esprit
santé            → corps
famille          → liens
société          → liens
voyage           → monde
art-creativite   → monde
art & créativité → monde
carrière         → avenir
technologie      → avenir
business         → avenir
```

---

## Routes front par type de contenu

| Type de contenu      | Route listing                     | Route détail                | Requête Sanity                                                |
|----------------------|-----------------------------------|-----------------------------|---------------------------------------------------------------|
| Articles (tous)      | `/articles`                       | `/article/:slug`            | `*[_type == "production" && rubrique == "articles"]`          |
| Vidéos               | `/videos`                         | `/video/:slug`              | `*[_type == "production" && typeArticle == "video"]`          |
| Guides               | `/guides`                         | `/article/:slug`            | `*[_type == "production" && rubrique == "guides"]`            |
| Recommandations      | `/recommandations`                | `/recommandation/:slug`     | `*[_type == "production" && rubrique == "recommandations"]`   |
| Histoires (UGC)      | `/histoires`                      | `/histoire/:slug`           | via `histoires` page                                          |
| Comprendre           | `/comprendre`                     | `/comprendre/:slug`         | format "comprendre"                                           |
| Réflexions           | `/reflexions`                     | `/reflexions/:slug`         | format "réflexion"                                            |
| Témoignages          | `/temoignages`                    | `/temoignages/:slug`        | format "témoignage"                                           |
| Portraits            | `/portraits`                      | `/portraits/:slug`          | format "portrait"                                             |
| Dossiers             | `/dossiers`                       | `/dossiers/:slug`           | format "dossier"                                              |
| Boutique             | `/boutique`                       | `/boutique/:guideSlug`      | page dédiée                                                   |

---

## Règles de liaison

### 1. Pilier Média (`rubrique == "articles"`)
- Chaque article DOIT avoir une `verticale` (→ univers) et idéalement un sous-topic
- Le `typeArticle` détermine le format : article, réflexion, témoignage, portrait, dossier, immersion, newsletter, histoire
- URL : `/article/{slug}`

### 2. Pilier Prod (`typeArticle == "video"`)
- Chaque vidéo DOIT avoir un format : reportage, documentaire, interview, short, live
- URL : `/video/{slug}`
- Listing filtrable par format : `/videos?format=reportages`

### 3. Pilier Ateliers (`rubrique == "guides"`)
- Catégories : masterclass, ateliers, programmes, kits-gratuits
- URL : `/article/{slug}` (utilise ArticlePage)
- Listing : `/guides`

### 4. Pilier Boutique
- Catégories : ebooks, workbooks, audio, carnets, coffrets
- URL : `/boutique/{guideSlug}`
- Listing : `/boutique`

### 5. Recommandations (`rubrique == "recommandations"`)
- Rattachées au pilier Média, section "Ensemble"
- URL : `/recommandation/{slug}`

---

## Sanity project info

- **Project ID** : `r941i081`
- **Dataset** : `production`
- **API version** : `2024-03-01`

---

## Ce que tu dois faire

Quand tu crées ou édites un document `production` dans Sanity :

1. **Toujours renseigner `rubrique`** — c'est ce qui détermine dans quel pilier l'article apparaît
2. **Toujours renseigner `typeArticle`** — c'est ce qui détermine le format et la route
3. **Toujours renseigner `verticale`** pour les articles du pilier Média — c'est ce qui détermine l'univers
4. **Le `slug.current`** doit correspondre au pattern de route attendu
5. **Les vidéos** doivent avoir `typeArticle: "video"` ET un format spécifique dans les tags/catégories
6. **Les guides** doivent avoir `rubrique: "guides"` pour apparaître sur `/guides`

Quand tu lies un article depuis le front, utilise les routes exactes ci-dessus. Par exemple :
- Un article "Esprit" → `/article/mon-slug`
- Une vidéo → `/video/mon-slug`
- Un guide → `/article/mon-slug` (même page que les articles)
- Une reco → `/recommandation/mon-slug`
