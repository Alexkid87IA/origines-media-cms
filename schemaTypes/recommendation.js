// schemaTypes/recommendation.js
// Document type pour les recommandations culturelles (livres, films, podcasts, etc.)

export default {
  name: 'recommendation',
  title: 'Recommandations',
  type: 'document',
  groups: [
    { name: 'infos', title: 'Informations principales', default: true },
    { name: 'contenu', title: 'Contenu & Avis' },
    { name: 'meta', title: 'Métadonnées' }
  ],
  fields: [
    // === INFORMATIONS PRINCIPALES ===
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      description: 'Titre du livre, film, podcast, etc.',
      validation: Rule => Rule.required(),
      group: 'infos'
    },
    {
      name: 'type',
      title: 'Type de recommandation',
      type: 'string',
      options: {
        list: [
          { title: '📚 Livre', value: 'livres' },
          { title: '🎬 Film & Série', value: 'films-series' },
          { title: '🎵 Musique', value: 'musique' },
          { title: '🎧 Podcast', value: 'podcasts' },
          { title: '📱 Réseaux sociaux', value: 'reseaux-sociaux' },
          { title: '📺 YouTube', value: 'youtube' },
          { title: '🏃 Activité', value: 'activite' },
          { title: '✈️ Destination', value: 'destination' },
          { title: '🎨 Culture', value: 'culture' },
          { title: '🛍️ Produit', value: 'produit' }
        ],
        layout: 'radio'
      },
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
      validation: Rule => Rule.required(),
      group: 'infos'
    },
    {
      name: 'image',
      title: 'Image / Couverture',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Couverture du livre, affiche du film, visuel du podcast, etc.',
      group: 'infos'
    },
    {
      name: 'lienExterne',
      title: 'Lien externe',
      type: 'url',
      description: 'Lien vers Amazon, Netflix, Spotify, YouTube, le site officiel, etc.',
      group: 'infos'
    },

    // === CONTENU & AVIS ===
    {
      name: 'accroche',
      title: 'Accroche',
      type: 'text',
      rows: 2,
      description: 'Phrase d\'accroche courte (affichée dans les cards)',
      validation: Rule => Rule.max(200),
      group: 'contenu'
    },
    {
      name: 'avis',
      title: 'Notre avis',
      type: 'blockContent',
      description: 'Pourquoi on recommande ? Notre critique complète.',
      group: 'contenu'
    },
    {
      name: 'note',
      title: 'Note (sur 5)',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5]
      },
      description: 'Note de 1 à 5 étoiles',
      group: 'contenu'
    },
    {
      name: 'pourquiCest',
      title: 'Pour qui c\'est ?',
      type: 'text',
      rows: 2,
      description: 'À qui s\'adresse cette recommandation ?',
      group: 'contenu'
    },
    {
      name: 'coupDeCoeur',
      title: 'Coup de cœur',
      type: 'boolean',
      description: 'Mettre en avant comme coup de cœur de l\'équipe',
      initialValue: false,
      group: 'contenu'
    },

    // === MÉTADONNÉES SPÉCIFIQUES ===
    {
      name: 'auteur',
      title: 'Auteur / Créateur',
      type: 'string',
      description: 'Auteur du livre, réalisateur du film, créateur du podcast, etc.',
      group: 'meta'
    },
    {
      name: 'annee',
      title: 'Année de sortie',
      type: 'number',
      group: 'meta'
    },
    {
      name: 'duree',
      title: 'Durée / Format',
      type: 'string',
      description: 'Ex: "2h30", "350 pages", "45 min/épisode"',
      group: 'meta'
    },
    {
      name: 'genre',
      title: 'Genre',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Ex: Thriller, Développement personnel, Comédie...',
      group: 'meta'
    },
    {
      name: 'langue',
      title: 'Langue',
      type: 'string',
      options: {
        list: [
          { title: 'Français', value: 'fr' },
          { title: 'Anglais', value: 'en' },
          { title: 'Espagnol', value: 'es' },
          { title: 'Autre', value: 'autre' }
        ]
      },
      group: 'meta'
    },
    {
      name: 'datePublication',
      title: 'Date de publication de la reco',
      type: 'datetime',
      group: 'meta'
    },
    {
      name: 'recommandePar',
      title: 'Recommandé par',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      description: 'Membre de l\'équipe qui recommande',
      group: 'meta'
    }
  ],
  preview: {
    select: {
      title: 'titre',
      type: 'type',
      auteur: 'auteur',
      media: 'image',
      coupDeCoeur: 'coupDeCoeur'
    },
    prepare({ title, type, auteur, media, coupDeCoeur }) {
      const typeIcons = {
        'livres': '📚',
        'films-series': '🎬',
        'musique': '🎵',
        'podcasts': '🎧',
        'reseaux-sociaux': '📱',
        'youtube': '📺',
        'activite': '🏃',
        'destination': '✈️',
        'culture': '🎨',
        'produit': '🛍️'
      }
      const icon = typeIcons[type] || '📌'
      const heart = coupDeCoeur ? ' ❤️' : ''
      return {
        title: `${icon} ${title}${heart}`,
        subtitle: auteur || type,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Date de publication',
      name: 'dateDesc',
      by: [{ field: 'datePublication', direction: 'desc' }]
    },
    {
      title: 'Coups de cœur en premier',
      name: 'coupDeCoeur',
      by: [{ field: 'coupDeCoeur', direction: 'desc' }]
    }
  ]
}
