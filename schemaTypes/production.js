export default {
  name: 'production',
  title: 'Articles',
  type: 'document',
  icon: () => '📝',
  groups: [
    { name: 'editorial', title: 'Éditorial', default: true },
    { name: 'taxonomie', title: 'Classification' },
    { name: 'seo', title: 'SEO & Metadata' },
    { name: 'media', title: 'Médias' },
    { name: 'typeEditorial', title: 'Type editorial' },
    { name: 'relations', title: 'Relations' },
    { name: 'stats', title: 'Stats & Flags' },
  ],
  fields: [
    // === ÉDITORIAL ===
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'editorial'
    },
    {
      name: 'titleHtml',
      title: 'Titre HTML',
      type: 'string',
      description: 'Titre avec <em> pour les mots en serif italic. Ex: Marie Curie <em>intime</em>',
      group: 'editorial'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titre',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
      group: 'editorial'
    },
    {
      name: 'deck',
      title: 'Chapeau / Sous-titre',
      type: 'text',
      rows: 3,
      description: '150-160 caractères. Résumé affiché sous le titre.',
      validation: Rule => Rule.max(200),
      group: 'editorial'
    },
    {
      name: 'description',
      title: 'Description (legacy)',
      type: 'text',
      rows: 3,
      hidden: true
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'editorial'
    },
    {
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'string',
      description: 'Ex: "14 min"',
      group: 'editorial'
    },
    {
      name: 'datePublication',
      title: 'Date de publication',
      type: 'datetime',
      group: 'editorial'
    },
    {
      name: 'updatedAt',
      title: 'Dernière modification',
      type: 'datetime',
      group: 'editorial'
    },
    {
      name: 'contenu',
      title: 'Contenu',
      type: 'blockContent',
      group: 'editorial'
    },

    // === CLASSIFICATION ===
    {
      name: 'univpilar',
      title: 'Univers',
      type: 'string',
      options: {
        list: [
          { title: "L'Esprit", value: 'esprit' },
          { title: 'Le Corps', value: 'corps' },
          { title: 'Les Liens', value: 'liens' },
          { title: 'Le Monde', value: 'monde' },
          { title: "L'Avenir", value: 'avenir' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required(),
      description: 'Univers principal (pilier éditorial)',
      group: 'taxonomie'
    },
    {
      name: 'universSecondaire',
      title: 'Univers secondaire',
      type: 'string',
      options: {
        list: [
          { title: "L'Esprit", value: 'esprit' },
          { title: 'Le Corps', value: 'corps' },
          { title: 'Les Liens', value: 'liens' },
          { title: 'Le Monde', value: 'monde' },
          { title: "L'Avenir", value: 'avenir' },
        ]
      },
      description: 'Optionnel — si l\'article touche 2 univers',
      group: 'taxonomie'
    },
    {
      name: 'soustopic',
      title: 'Sous-topic SEO',
      type: 'string',
      options: {
        list: [
          // L'Esprit
          { title: '🧠 Émotions', value: 'emotions' },
          { title: '🧠 Conscience', value: 'conscience' },
          { title: '🧠 Méditation', value: 'meditation' },
          { title: '🧠 Développement personnel', value: 'developpement-personnel' },
          { title: '🧠 Neurosciences', value: 'neurosciences' },
          { title: '🧠 Philosophie', value: 'philosophie' },
          { title: '🧠 Quête de sens', value: 'quete-de-sens' },
          { title: '🧠 Thérapies', value: 'therapies' },
          // Le Corps
          { title: '💪 Nutrition', value: 'nutrition' },
          { title: '💪 Sommeil', value: 'sommeil' },
          { title: '💪 Mouvement', value: 'mouvement' },
          { title: '💪 Prévention', value: 'prevention' },
          { title: '💪 Médecine douce', value: 'medecine-douce' },
          { title: '💪 Bien-être physique', value: 'bien-etre-physique' },
          { title: '💪 Sport', value: 'sport' },
          { title: '💪 Respiration', value: 'respiration' },
          // Les Liens
          { title: '🤝 Parentalité', value: 'parentalite' },
          { title: '🤝 Couples', value: 'couples' },
          { title: '🤝 Amitié', value: 'amitie' },
          { title: '🤝 Éducation', value: 'education' },
          { title: '🤝 Générations', value: 'generations' },
          { title: '🤝 Communauté', value: 'communaute' },
          { title: '🤝 Ruptures', value: 'ruptures' },
          { title: '🤝 Enquêtes sociales', value: 'enquetes-sociales' },
          // Le Monde
          { title: '🌍 Récits de voyage', value: 'recits-de-voyage' },
          { title: '🌍 Destinations', value: 'destinations' },
          { title: '🌍 Art', value: 'art' },
          { title: '🌍 Musique', value: 'musique' },
          { title: '🌍 Littérature', value: 'litterature' },
          { title: '🌍 Cinéma', value: 'cinema' },
          { title: '🌍 Créativité', value: 'creativite' },
          { title: '🌍 Photographie', value: 'photographie' },
          // L'Avenir
          { title: '🚀 Carrière', value: 'carriere' },
          { title: '🚀 Entrepreneuriat', value: 'entrepreneuriat' },
          { title: '🚀 Innovation', value: 'innovation' },
          { title: '🚀 Intelligence artificielle', value: 'intelligence-artificielle' },
          { title: '🚀 Économie', value: 'economie' },
          { title: '🚀 Leadership', value: 'leadership' },
          { title: '🚀 Numérique', value: 'numerique' },
          { title: '🚀 Nomadisme', value: 'nomadisme' },
        ]
      },
      description: 'Cluster SEO — page pilier: /univers/{univers}/{soustopic}/',
      group: 'taxonomie'
    },
    {
      name: 'rubrique',
      title: 'Rubrique',
      type: 'string',
      options: {
        list: [
          { title: '01 Articles', value: 'articles' },
          { title: '02 Collections', value: 'collections' },
          { title: '03 Vidéos', value: 'videos' },
          { title: '04 Guides', value: 'guides' },
          { title: '05 Journal', value: 'journal' },
          { title: '06 Boutique', value: 'boutique' },
        ],
        layout: 'radio'
      },
      initialValue: 'articles',
      validation: Rule => Rule.required(),
      description: 'Rubrique de navigation (détermine l\'URL)',
      group: 'taxonomie'
    },
    {
      name: 'category',
      title: 'Sous-catégorie',
      type: 'string',
      options: {
        list: [
          // Articles
          { title: 'Comprendre', value: 'comprendre' },
          { title: 'Réflexions', value: 'reflexions' },
          { title: 'Témoignages', value: 'temoignages' },
          { title: 'Guides', value: 'guides' },
          { title: 'Portraits', value: 'portraits' },
          // Collections
          { title: 'Le Divan', value: 'le-divan' },
          { title: 'Le Signal', value: 'le-signal' },
          { title: 'La Lettre', value: 'la-lettre' },
          { title: 'Le Carnet', value: 'le-carnet' },
          { title: 'Le Virage', value: 'le-virage' },
          // Vidéos
          { title: 'Reportages', value: 'reportages' },
          { title: 'Documentaires', value: 'documentaires' },
          { title: 'Interviews', value: 'interviews' },
          { title: 'Shorts', value: 'shorts' },
          { title: 'Live', value: 'live' },
          { title: 'Nos formats', value: 'formats' },
          // Guides
          { title: 'Masterclass', value: 'masterclass' },
          { title: 'Ateliers', value: 'ateliers' },
          { title: 'Programmes', value: 'programmes' },
          { title: 'Kits gratuits', value: 'kits-gratuits' },
          // Journal
          { title: 'Lettre du dimanche', value: 'lettre-du-dimanche' },
          { title: 'Question de la semaine', value: 'question-de-la-semaine' },
          { title: 'Sondages', value: 'sondages' },
          { title: 'Calendrier', value: 'calendrier' },
        ]
      },
      description: 'Sous-catégorie au sein de la rubrique → URL: /rubrique/category/slug',
      group: 'taxonomie'
    },
    {
      name: 'tags',
      title: 'Tags SEO',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'taxonomie'
    },
    // Anciens champs de référence — conservés pour la migration, cachés dans le studio
    {
      name: 'verticale',
      title: 'Verticale (legacy)',
      type: 'reference',
      to: [{ type: 'verticale' }],
      hidden: true
    },
    {
      name: 'univers',
      title: 'Univers (legacy)',
      type: 'reference',
      to: [{ type: 'univers' }],
      hidden: true
    },

    // === SEO & METADATA ===
    {
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      description: 'Override du <title>. 50-60 caractères. Laissez vide pour utiliser le titre.',
      validation: Rule => Rule.max(70),
      group: 'seo'
    },
    {
      name: 'seoDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      description: '150-160 caractères. Laissez vide pour utiliser le chapeau.',
      validation: Rule => Rule.max(170),
      group: 'seo'
    },

    // === TYPE ÉDITORIAL — champs conditionnels selon category ===

    // ── Comprendre ──
    {
      name: 'articleKeyTakeaways',
      title: 'Points clés',
      type: 'array',
      of: [{ type: 'string' }],
      description: '3-5 points clés affichés en encadré',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'comprendre',
    },
    {
      name: 'articleSources',
      title: 'Sources',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Nom / Titre', type: 'string', validation: Rule => Rule.required() },
          { name: 'url', title: 'URL', type: 'url' },
          { name: 'year', title: 'Année', type: 'string' },
          {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
              list: [
                { title: 'Étude scientifique', value: 'study' },
                { title: 'Livre', value: 'book' },
                { title: 'Article presse', value: 'press' },
                { title: 'Rapport / Statistique', value: 'report' },
                { title: 'Expert / Interview', value: 'expert' },
              ],
            },
          },
        ],
        preview: {
          select: { name: 'name', year: 'year', type: 'type' },
          prepare({ name, year, type }) {
            return { title: name, subtitle: [type, year].filter(Boolean).join(' · ') }
          },
        },
      }],
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'comprendre',
    },
    {
      name: 'articleFaq',
      title: 'FAQ (schema markup)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() },
          { name: 'answer', title: 'Réponse', type: 'text', rows: 3, validation: Rule => Rule.required() },
        ],
        preview: { select: { title: 'question' } },
      }],
      description: 'Questions/réponses pour le schema FAQPage (SEO)',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'comprendre',
    },

    // ── Réflexions ──
    {
      name: 'pullQuote',
      title: 'Citation mise en avant',
      type: 'text',
      rows: 3,
      description: 'Citation forte extraite de l\'article, affichée en exergue',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'reflexions',
    },
    {
      name: 'authorNote',
      title: 'Note de l\'auteur',
      type: 'text',
      rows: 4,
      description: 'Mot personnel de l\'auteur sur cet essai',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'reflexions',
    },

    // ── Témoignages ──
    {
      name: 'temoignPrenom',
      title: 'Prénom du témoin',
      type: 'string',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'temoignages',
    },
    {
      name: 'temoignAge',
      title: 'Âge du témoin',
      type: 'number',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'temoignages',
    },
    {
      name: 'temoignVille',
      title: 'Ville du témoin',
      type: 'string',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'temoignages',
    },
    {
      name: 'isAnonymous',
      title: 'Témoignage anonyme',
      type: 'boolean',
      initialValue: false,
      description: 'Si coché, le prénom est remplacé par un pseudonyme',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'temoignages',
    },

    // ── Portraits ──
    {
      name: 'sourceVideo',
      title: 'Vidéo source',
      type: 'reference',
      to: [{ type: 'production' }],
      options: {
        filter: 'rubrique == "videos"',
      },
      description: 'La vidéo dont cet article est issu',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'portraits',
    },
    {
      name: 'portraitPhoto',
      title: 'Photo portrait',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo portrait de la personne (obligatoire pour les portraits)',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'portraits',
    },
    {
      name: 'portraitRole',
      title: 'Fonction / Rôle',
      type: 'string',
      description: 'Ex: "Photographe humanitaire", "Fondateur de…"',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'portraits',
    },
    {
      name: 'interviewQuestions',
      title: 'Questions / Réponses',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string', validation: Rule => Rule.required() },
          {
            name: 'answer',
            title: 'Réponse',
            type: 'array',
            of: [{ type: 'block' }],
            validation: Rule => Rule.required(),
          },
        ],
        preview: { select: { title: 'question' } },
      }],
      description: 'Format interview : questions de la rédaction + réponses',
      group: 'typeEditorial',
      hidden: ({ document }) => document?.category !== 'portraits',
    },

    // === MÉDIAS ===
    {
      name: 'image',
      title: 'Image hero',
      type: 'image',
      options: { hotspot: true },
      description: 'Minimum 1200px de large, paysage, WebP/AVIF',
      group: 'media'
    },
    {
      name: 'heroAlt',
      title: 'Alt de l\'image hero',
      type: 'string',
      description: 'Description alternative pour l\'accessibilité et le SEO',
      group: 'media'
    },
    {
      name: 'heroCredit',
      title: 'Crédit photo',
      type: 'string',
      group: 'media'
    },
    {
      name: 'imageUrl',
      title: 'URL de l\'image (fallback)',
      type: 'string',
      description: 'URL directe si pas d\'upload',
      group: 'media'
    },
    {
      name: 'videoUrl',
      title: 'URL de la vidéo',
      type: 'url',
      description: 'URL YouTube embed (pour les contenus vidéo)',
      group: 'media'
    },
    {
      name: 'videoPreview',
      title: 'URL Preview Vidéo',
      type: 'url',
      group: 'media'
    },
    {
      name: 'duree',
      title: 'Durée vidéo (ISO 8601)',
      type: 'string',
      description: 'Ex: PT12M30S pour 12 minutes 30 secondes',
      group: 'media'
    },

    // === RELATIONS ===
    {
      name: 'relatedArticles',
      title: 'Articles liés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'production' }] }],
      validation: Rule => Rule.max(3),
      description: '2-3 articles liés pour le maillage interne',
      group: 'relations'
    },
    {
      name: 'formats',
      title: 'Format / Colonne associé',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'format' }] }],
      group: 'relations'
    },

    // === STATS & FLAGS ===
    {
      name: 'isFeatured',
      title: 'Mis en avant (homepage)',
      type: 'boolean',
      initialValue: false,
      group: 'stats'
    },
    {
      name: 'isPremium',
      title: 'Contenu premium (paywall)',
      type: 'boolean',
      initialValue: false,
      group: 'stats'
    },
    {
      name: 'isLocked',
      title: 'Verrouillé (legacy)',
      type: 'boolean',
      hidden: true
    },
    {
      name: 'vues',
      title: 'Nombre de vues',
      type: 'number',
      initialValue: 0,
      group: 'stats'
    },
    {
      name: 'likes',
      title: 'Nombre de likes',
      type: 'number',
      initialValue: 0,
      group: 'stats'
    },

    // Legacy fields — hidden
    {
      name: 'tempsLecture',
      title: 'Temps de lecture (legacy)',
      type: 'number',
      hidden: true
    },
    {
      name: 'isPopular',
      type: 'boolean',
      hidden: true
    },
    {
      name: 'isRecent',
      type: 'boolean',
      hidden: true
    },
    {
      name: 'saison',
      type: 'number',
      hidden: true
    },
    {
      name: 'episode',
      type: 'number',
      hidden: true
    },
    {
      name: 'rating',
      type: 'number',
      hidden: true
    },
    {
      name: 'typeContenu',
      type: 'string',
      hidden: true
    },
    {
      name: 'typeArticle',
      type: 'string',
      hidden: true
    },
  ],

  orderings: [
    {
      title: 'Date de publication (récent)',
      name: 'dateDesc',
      by: [{ field: 'datePublication', direction: 'desc' }]
    },
    {
      title: 'Titre A→Z',
      name: 'titreAsc',
      by: [{ field: 'titre', direction: 'asc' }]
    },
  ],

  preview: {
    select: {
      title: 'titre',
      subtitle: 'deck',
      media: 'image',
      univers: 'univpilar',
      rubrique: 'rubrique',
      category: 'category',
    },
    prepare(selection) {
      const { title, subtitle, media, univers, rubrique, category } = selection
      const UNIVERS_LABELS = { esprit: "L'Esprit", corps: 'Le Corps', liens: 'Les Liens', monde: 'Le Monde', avenir: "L'Avenir" }
      const uLabel = univers ? UNIVERS_LABELS[univers] : '⚠️ Pas d\'univers'
      const catLabel = category ? `/${rubrique || 'articles'}/${category}/` : ''
      return {
        title,
        subtitle: `${uLabel} ${catLabel}`,
        media
      }
    }
  }
}
