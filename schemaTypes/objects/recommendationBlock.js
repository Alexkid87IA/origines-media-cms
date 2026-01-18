// schemaTypes/objects/recommendationBlock.js
// Bloc pour intégrer une ou plusieurs recommandations dans un article

export default {
  name: 'recommendationBlock',
  title: 'Recommandation',
  type: 'object',
  fields: [
    {
      name: 'style',
      title: 'Style d\'affichage',
      type: 'string',
      options: {
        list: [
          { title: 'Carte simple', value: 'card' },
          { title: 'Carte détaillée', value: 'detailed' },
          { title: 'Liste compacte', value: 'compact' },
          { title: 'Mise en avant (hero)', value: 'hero' }
        ],
        layout: 'radio'
      },
      initialValue: 'card'
    },
    {
      name: 'titre',
      title: 'Titre de la section',
      type: 'string',
      description: 'Ex: "Notre recommandation", "À lire absolument", etc. (optionnel)',
    },
    {
      name: 'recommendations',
      title: 'Recommandations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'recommendation' }]
        }
      ],
      validation: Rule => Rule.min(1).max(4),
      description: 'Sélectionnez 1 à 4 recommandations existantes'
    },
    {
      name: 'recommandationManuelle',
      title: 'Ou créer une recommandation rapide',
      type: 'object',
      description: 'Pour une recommandation ponctuelle sans créer de document séparé',
      fields: [
        {
          name: 'titre',
          title: 'Titre',
          type: 'string'
        },
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: '📚 Livre', value: 'livre' },
              { title: '🎬 Film', value: 'film' },
              { title: '🎧 Podcast', value: 'podcast' },
              { title: '📺 Chaîne YouTube', value: 'youtube' },
              { title: '📸 Compte Instagram', value: 'instagram' },
              { title: '🎵 Livre audio', value: 'livre-audio' },
              { title: '🏛️ Musée', value: 'musee' },
              { title: '🎭 Théâtre', value: 'theatre' }
            ]
          }
        },
        {
          name: 'auteur',
          title: 'Auteur / Créateur',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Pourquoi on recommande',
          type: 'text',
          rows: 3
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true }
        },
        {
          name: 'lien',
          title: 'Lien',
          type: 'url'
        },
        {
          name: 'note',
          title: 'Note (sur 5)',
          type: 'number',
          options: {
            list: [1, 2, 3, 4, 5]
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      titre: 'titre',
      style: 'style',
      reco0: 'recommendations.0.titre',
      recoManuelle: 'recommandationManuelle.titre',
      count: 'recommendations.length'
    },
    prepare({ titre, style, reco0, recoManuelle, count }) {
      const styleLabels = {
        'card': 'Carte',
        'detailed': 'Détaillée',
        'compact': 'Compacte',
        'hero': 'Hero'
      }
      const recoCount = count || 0
      const mainTitle = titre || reco0 || recoManuelle || 'Recommandation'
      return {
        title: `📌 ${mainTitle}`,
        subtitle: `${styleLabels[style] || 'Carte'} • ${recoCount > 0 ? `${recoCount} reco(s)` : 'Manuelle'}`
      }
    }
  }
}
