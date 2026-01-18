export default {
  name: 'episode',
  title: 'Épisodes',
  type: 'document',
  icon: () => '🎬',
  fields: [
    // === INFORMATIONS DE BASE ===
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    // === SÉRIE & NUMÉROTATION ===
    {
      name: 'serie',
      title: 'Série',
      type: 'reference',
      to: [{type: 'serie'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'saison',
      title: 'Numéro de saison',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.min(1)
    },
    {
      name: 'episodeNumber',
      title: 'Numéro d\'épisode',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    },
    // === CONTENU ===
    {
      name: 'content',
      title: 'Contenu Principal',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Type de contenu',
          type: 'string',
          options: {
            list: [
              {title: 'Article', value: 'article'},
              {title: 'Vidéo', value: 'video'},
              {title: 'Audio', value: 'audio'}
            ]
          },
          validation: Rule => Rule.required()
        },
        {
          name: 'article',
          title: 'Lier une Production (Article)',
          type: 'reference',
          to: [{type: 'production'}],
          hidden: ({parent}) => parent?.type !== 'article'
        },
        {
          name: 'video',
          title: 'Lier une Vidéo (Fragment)',
          type: 'reference',
          to: [{type: 'video'}],
          hidden: ({parent}) => parent?.type !== 'video'
        }
      ]
    },
    // === MÉDIAS ===
    {
      name: 'image',
      title: 'Image miniature',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'imageUrl',
      title: 'URL image (fallback)',
      type: 'url',
      description: 'URL directe de l\'image si pas d\'upload'
    },
    {
      name: 'thumbnailUrl',
      title: 'URL thumbnail vidéo',
      type: 'url'
    },
    {
      name: 'videoUrl',
      title: 'URL de la vidéo',
      type: 'url',
      description: 'Lien vers la vidéo complète (YouTube, Vimeo, etc.)'
    },
    {
      name: 'videoPreview',
      title: 'URL preview vidéo (hover)',
      type: 'url',
      description: 'Courte vidéo de preview pour le survol'
    },
    // === MÉTADONNÉES ===
    {
      name: 'duree',
      title: 'Durée (minutes)',
      type: 'number',
      description: 'Durée en minutes'
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    // === STATISTIQUES ===
    {
      name: 'vues',
      title: 'Nombre de vues',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'likes',
      title: 'Nombre de likes',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'rating',
      title: 'Note (0-5)',
      type: 'number',
      validation: Rule => Rule.min(0).max(5).precision(1),
      description: 'Note moyenne des utilisateurs'
    },
    // === TAGS & FLAGS ===
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'isPopular',
      title: 'Populaire',
      type: 'boolean',
      description: 'Mettre en avant comme épisode populaire',
      initialValue: false
    },
    {
      name: 'isRecent',
      title: 'Récent',
      type: 'boolean',
      description: 'Marquer comme récent',
      initialValue: true
    },
    {
      name: 'isFeatured',
      title: 'À la une',
      type: 'boolean',
      description: 'Afficher dans la section "À la une"',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      serie: 'serie.title',
      saison: 'saison',
      number: 'episodeNumber',
      media: 'image'
    },
    prepare(selection) {
      const {title, serie, saison, number, media} = selection
      const episodeInfo = saison && number ? `S${saison}E${number}` : number ? `E${number}` : ''
      return {
        title: `${episodeInfo} - ${title}`,
        subtitle: serie || 'Pas de série',
        media
      }
    }
  },
  orderings: [
    {
      title: 'Date de publication (récent)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}]
    },
    {
      title: 'Numéro d\'épisode',
      name: 'episodeNumberAsc',
      by: [{field: 'saison', direction: 'asc'}, {field: 'episodeNumber', direction: 'asc'}]
    }
  ]
}
