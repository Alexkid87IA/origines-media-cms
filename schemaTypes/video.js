export default {
  name: 'video',
  title: 'Vidéos',
  type: 'document',
  icon: () => '🎬',
  groups: [
    { name: 'infos', title: 'Informations', default: true },
    { name: 'taxonomie', title: 'Classification' },
    { name: 'media', title: 'Médias' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // === INFORMATIONS ===
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'infos'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre', maxLength: 96 },
      validation: Rule => Rule.required(),
      group: 'infos'
    },
    {
      name: 'deck',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: '150-160 caractères',
      group: 'infos'
    },
    {
      name: 'description',
      title: 'Description (legacy)',
      type: 'text',
      hidden: true
    },
    {
      name: 'author',
      title: 'Auteur / Créateur',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'infos'
    },
    {
      name: 'duration',
      title: 'Durée (ISO 8601)',
      type: 'string',
      description: 'Ex: PT12M30S pour 12 minutes 30 secondes',
      group: 'infos'
    },
    {
      name: 'programme',
      title: 'Nom du programme',
      type: 'string',
      description: 'Ex: "Studio Origines", "Décryptages"',
      group: 'infos'
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      group: 'infos'
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
      group: 'taxonomie'
    },
    {
      name: 'category',
      title: 'Sous-catégorie vidéo',
      type: 'string',
      options: {
        list: [
          { title: 'Reportages', value: 'reportages' },
          { title: 'Documentaires', value: 'documentaires' },
          { title: 'Interviews', value: 'interviews' },
          { title: 'Shorts', value: 'shorts' },
          { title: 'Live', value: 'live' },
          { title: 'Nos formats', value: 'formats' },
        ]
      },
      group: 'taxonomie'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'taxonomie'
    },
    {
      name: 'productionLiee',
      title: 'Article lié',
      type: 'reference',
      to: [{ type: 'production' }],
      group: 'taxonomie'
    },
    // Legacy
    {
      name: 'univers',
      type: 'reference',
      to: [{ type: 'univers' }],
      hidden: true
    },
    {
      name: 'verticale',
      type: 'reference',
      to: [{ type: 'verticale' }],
      hidden: true
    },
    {
      name: 'formatVideo',
      type: 'string',
      hidden: true
    },
    {
      name: 'duree',
      type: 'number',
      hidden: true
    },
    {
      name: 'ordre',
      type: 'number',
      hidden: true
    },

    // === MÉDIAS ===
    {
      name: 'thumbnail',
      title: 'Vignette',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif (SEO & accessibilité)',
          type: 'string',
          description: 'Décris ce que montre l\'image en 5-15 mots.',
          validation: Rule => Rule.required().warning('Un texte alternatif est fortement recommandé pour le SEO.'),
        },
      ],
      description: 'Minimum 1200px de large',
      group: 'media'
    },
    {
      name: 'thumbnailUrl',
      title: 'URL vignette (fallback)',
      type: 'url',
      group: 'media'
    },
    {
      name: 'videoUrl',
      title: 'URL de la vidéo',
      type: 'url',
      validation: Rule => Rule.required(),
      group: 'media'
    },
    {
      name: 'embedUrl',
      title: 'URL YouTube embed',
      type: 'url',
      description: 'Ex: https://www.youtube.com/embed/VIDEO_ID',
      group: 'media'
    },

    // === SEO ===
    {
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      validation: Rule => Rule.max(70),
      group: 'seo'
    },
    {
      name: 'seoDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(170),
      group: 'seo'
    },
  ],

  preview: {
    select: {
      title: 'titre',
      univers: 'univpilar',
      category: 'category',
      media: 'thumbnail'
    },
    prepare(selection) {
      const { title, univers, category, media } = selection
      return {
        title: `🎬 ${title}`,
        subtitle: [univers, category].filter(Boolean).join(' · ') || 'Non classé',
        media
      }
    }
  }
}
