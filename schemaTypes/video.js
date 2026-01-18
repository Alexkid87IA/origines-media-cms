export default {
  name: 'video',
  title: 'Vidéos (Fragments)',
  type: 'document',
  groups: [
    { name: 'infos', title: 'Informations principales', default: true },
    { name: 'taxonomie', title: 'Taxonomie & Relations' },
    { name: 'media', title: 'Médias' }
  ],
  fields: [
    // === INFORMATIONS PRINCIPALES ===
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
      options: {
        source: 'titre',
        maxLength: 96
      },
      group: 'infos'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      group: 'infos'
    },
    {
      name: 'duree',
      title: 'Durée (secondes)',
      type: 'number',
      description: 'Durée de la vidéo en secondes',
      group: 'infos'
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      group: 'infos'
    },

    // === TAXONOMIE & RELATIONS ===
    {
      name: 'univers',
      title: 'Univers',
      type: 'reference',
      to: [{ type: 'univers' }],
      description: 'L\'univers thématique de cette vidéo',
      group: 'taxonomie'
    },
    {
      name: 'verticale',
      title: 'Verticale',
      type: 'reference',
      to: [{ type: 'verticale' }],
      description: 'La catégorie principale',
      group: 'taxonomie'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      description: 'Tags thématiques pour le filtrage',
      group: 'taxonomie'
    },
    {
      name: 'productionLiee',
      title: 'Production liée',
      type: 'reference',
      to: [{ type: 'production' }],
      description: 'Article/production associé à cette vidéo',
      group: 'taxonomie'
    },

    // === MÉDIAS ===
    {
      name: 'thumbnail',
      title: 'Vignette',
      type: 'image',
      options: {
        hotspot: true
      },
      group: 'media'
    },
    {
      name: 'thumbnailUrl',
      title: 'URL de la vignette (fallback)',
      type: 'url',
      description: 'URL directe si pas d\'upload',
      group: 'media'
    },
    {
      name: 'videoUrl',
      title: 'URL de la vidéo',
      type: 'url',
      validation: Rule => Rule.required(),
      group: 'media'
    }
  ],
  preview: {
    select: {
      title: 'titre',
      univers: 'univers.nom',
      media: 'thumbnail'
    },
    prepare(selection) {
      const { title, univers, media } = selection
      return {
        title: `🎬 ${title}`,
        subtitle: univers || 'Non catégorisé',
        media: media
      }
    }
  }
}