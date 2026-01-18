export default {
  name: 'production',
  title: 'Productions (Articles)',
  type: 'document',
  groups: [
    { name: 'infos', title: 'Informations principales', default: true },
    { name: 'taxonomie', title: 'Taxonomie & Relations' },
    { name: 'contenu', title: 'Contenu' },
    { name: 'video', title: 'Vidéo' },
    { name: 'stats', title: 'Statistiques' }
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
      name: 'typeArticle',
      title: 'Type d\'article',
      type: 'string',
      options: {
        list: [
          { title: 'Article standard', value: 'article' },
          { title: 'Histoire / Portrait', value: 'histoire' },
          { title: 'Actualité', value: 'actu' },
          { title: 'Guide / Tutoriel', value: 'guide' },
          { title: 'Interview', value: 'interview' },
          { title: 'Vidéo', value: 'video' }
        ],
        layout: 'radio'
      },
      initialValue: 'article',
      description: 'Détermine le template d\'affichage sur le frontend',
      group: 'infos'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Description longue pour le SEO et les pages détaillées',
      group: 'infos'
    },
    {
      name: 'extrait',
      title: 'Extrait',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(200).warning('L\'extrait devrait faire moins de 200 caractères'),
      description: 'Court résumé accrocheur (2-3 phrases) pour les cartes et aperçus. Max 200 caractères.',
      group: 'infos'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
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
      validation: Rule => Rule.required(),
      group: 'infos'
    },
    {
      name: 'tempsLecture',
      title: 'Temps de lecture (min)',
      type: 'number',
      group: 'infos'
    },
    {
      name: 'datePublication',
      title: 'Date de publication',
      type: 'datetime',
      group: 'infos'
    },

    // === TAXONOMIE & RELATIONS ===
    {
      name: 'verticale',
      title: 'Verticale',
      type: 'reference',
      to: [{ type: 'verticale' }],
      validation: Rule => Rule.required().error('Une verticale doit être sélectionnée'),
      description: 'Catégorie principale de cette production',
      group: 'taxonomie'
    },
    {
      name: 'univers',
      title: 'Univers',
      type: 'reference',
      to: [{ type: 'univers' }],
      description: 'Sous-catégorie thématique',
      group: 'taxonomie'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      description: 'Tags thématiques pour le filtrage et la découverte',
      group: 'taxonomie'
    },
    {
      name: 'portrait',
      title: 'Portrait associé',
      type: 'reference',
      to: [{ type: 'portrait' }],
      description: 'Si cet article est lié à une histoire/portrait',
      hidden: ({ document }) => document?.typeArticle !== 'histoire',
      group: 'taxonomie'
    },
    {
      name: 'formats',
      title: 'Format associé',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'format' }]
      }],
      description: 'Liez cette production à un ou plusieurs formats',
      group: 'taxonomie'
    },

    // === CONTENU ===
    {
      name: 'contenu',
      title: 'Contenu',
      type: 'blockContent',
      description: 'Utilisez les différents blocs pour enrichir votre article : citations, encadrés, galeries, vidéos, etc.',
      group: 'contenu'
    },

    // === STATISTIQUES ===
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
    {
      name: 'isPopular',
      title: 'Populaire ?',
      type: 'boolean',
      group: 'stats'
    },
    {
      name: 'isRecent',
      title: 'Récent ?',
      type: 'boolean',
      group: 'stats'
    },
    
    // === VIDÉO ===
    {
      name: 'videoUrl',
      title: 'URL de la vidéo',
      type: 'url',
      description: 'Lien vers la vidéo complète (YouTube, Vimeo, etc.)',
      group: 'video'
    },
    {
      name: 'videoPreview',
      title: 'URL Preview Vidéo (courte)',
      type: 'url',
      description: 'URL d\'une vidéo courte pour la preview au survol (10-30 secondes)',
      group: 'video'
    },
    {
      name: 'duree',
      title: 'Durée de la vidéo (minutes)',
      type: 'number',
      description: 'Durée en minutes (ex: 42 pour 42 minutes)',
      group: 'video'
    },
    {
      name: 'saison',
      title: 'Numéro de saison',
      type: 'number',
      validation: Rule => Rule.min(1),
      group: 'video'
    },
    {
      name: 'episode',
      title: 'Numéro d\'épisode',
      type: 'number',
      validation: Rule => Rule.min(0),
      description: '0 pour les contenus spéciaux',
      group: 'video'
    },
    {
      name: 'rating',
      title: 'Note de l\'épisode',
      type: 'number',
      validation: Rule => Rule.min(0).max(5).precision(1),
      description: 'De 0 à 5 (ex: 4.8)',
      group: 'stats'
    },
    {
      name: 'typeContenu',
      title: 'Type de contenu vidéo',
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
      initialValue: 'regular',
      group: 'video'
    },
    {
      name: 'isLocked',
      title: 'Contenu Premium (verrouillé)',
      type: 'boolean',
      description: 'Cochez si ce contenu nécessite un abonnement premium',
      initialValue: false,
      group: 'stats'
    },
    {
      name: 'imageUrl',
      title: 'URL de l\'image (fallback)',
      type: 'string',
      description: 'URL directe de l\'image si pas d\'upload',
      group: 'infos'
    }
  ],
  
  preview: {
    select: {
      title: 'titre',
      subtitle: 'description',
      media: 'image',
      saison: 'saison',
      episode: 'episode',
      verticale: 'verticale.nom',
      typeArticle: 'typeArticle'
    },
    prepare(selection) {
      const { title, subtitle, media, saison, episode, verticale, typeArticle } = selection
      const episodeInfo = saison && episode ? ` - S${saison}E${episode}` : ''
      const typeLabels = {
        'article': '📄',
        'histoire': '📖',
        'actu': '📰',
        'guide': '📚',
        'interview': '🎤',
        'video': '🎬'
      }
      const typeIcon = typeLabels[typeArticle] || '📄'
      const verticaleInfo = verticale ? `${verticale}` : '⚠️ Pas de verticale'
      return {
        title: `${typeIcon} ${title}${episodeInfo}`,
        subtitle: `${verticaleInfo} • ${subtitle ? subtitle.substring(0, 50) + '...' : ''}`,
        media: media
      }
    }
  }
}