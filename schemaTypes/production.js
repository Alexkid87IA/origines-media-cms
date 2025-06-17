export default {
  name: 'production',
  title: 'Productions (Articles)',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    // ⭐ CHAMP MANQUANT - AJOUTEZ CECI !
    {
      name: 'verticale',
      title: 'Verticale',
      type: 'reference',
      to: [{ type: 'verticale' }],
      validation: Rule => Rule.required().error('Une verticale doit être sélectionnée'),
      description: 'Choisissez la verticale à laquelle appartient cette production'
    },
    {
      name: 'univers',
      title: 'Univers',
      type: 'reference',
      to: [{ type: 'univers' }]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'titre',
        maxLength: 96
      }
    },
    {
      name: 'tempsLecture',
      title: 'Temps de lecture (min)',
      type: 'number'
    },
    {
      name: 'datePublication',
      title: 'Date de publication',
      type: 'datetime'
    },
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
      name: 'isPopular',
      title: 'Populaire ?',
      type: 'boolean'
    },
    {
      name: 'isRecent',
      title: 'Récent ?',
      type: 'boolean'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'contenu',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ]
    },
    
    // === NOUVEAUX CHAMPS AJOUTÉS ===
    {
      name: 'formats',
      title: 'Format associé',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'format' }]
      }],
      description: 'Liez cette production à un ou plusieurs formats'
    },
    {
      name: 'videoUrl',
      title: 'URL de la vidéo',
      type: 'url',
      description: 'Lien vers la vidéo complète (YouTube, Vimeo, etc.)'
    },
    {
      name: 'videoPreview',
      title: 'URL Preview Vidéo (courte)',
      type: 'url',
      description: 'URL d\'une vidéo courte pour la preview au survol (10-30 secondes)'
    },
    {
      name: 'duree',
      title: 'Durée de la vidéo (minutes)',
      type: 'number',
      description: 'Durée en minutes (ex: 42 pour 42 minutes)'
    },
    {
      name: 'saison',
      title: 'Numéro de saison',
      type: 'number',
      validation: Rule => Rule.min(1)
    },
    {
      name: 'episode',
      title: 'Numéro d\'épisode',
      type: 'number',
      validation: Rule => Rule.min(0),
      description: '0 pour les contenus spéciaux'
    },
    {
      name: 'rating',
      title: 'Note de l\'épisode',
      type: 'number',
      validation: Rule => Rule.min(0).max(5).precision(1),
      description: 'De 0 à 5 (ex: 4.8)'
    },
    {
      name: 'typeContenu',
      title: 'Type de contenu',
      type: 'string',
      options: {
        list: [
          { title: 'Épisode régulier', value: 'regular' },
          { title: 'Épisode spécial', value: 'special' },
          { title: 'Contenu bonus', value: 'bonus' },
          { title: 'Making-of', value: 'making-of' }
        ],
        layout: 'radio'
      },
      initialValue: 'regular'
    },
    {
      name: 'isLocked',
      title: 'Contenu Premium (verrouillé)',
      type: 'boolean',
      description: 'Cochez si ce contenu nécessite un abonnement premium',
      initialValue: false
    },
    // Ajout pour améliorer l'affichage
    {
      name: 'imageUrl',
      title: 'URL de l\'image (temporaire)',
      type: 'string',
      description: 'URL directe de l\'image si pas d\'upload'
    }
  ],
  
  preview: {
    select: {
      title: 'titre',
      subtitle: 'description',
      media: 'image',
      saison: 'saison',
      episode: 'episode',
      verticale: 'verticale.nom'
    },
    prepare(selection) {
      const { title, subtitle, media, saison, episode, verticale } = selection
      const episodeInfo = saison && episode ? ` - S${saison}E${episode}` : ''
      const verticaleInfo = verticale ? ` (${verticale})` : ' ⚠️ Pas de verticale'
      return {
        title: title + episodeInfo,
        subtitle: subtitle + verticaleInfo,
        media: media
      }
    }
  }
}