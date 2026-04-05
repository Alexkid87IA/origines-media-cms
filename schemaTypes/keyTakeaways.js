// schemaTypes/keyTakeaways.js
// Bloc "Points clés" / "Les Essentiels" pour le contenu rich text

export default {
  name: 'keyTakeaways',
  title: 'Points clés à retenir',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Points clés à retenir'
    },
    {
      name: 'style',
      title: 'Style d\'affichage',
      type: 'string',
      options: {
        list: [
          { title: 'Box colorée', value: 'boxed' },
          { title: 'Liste simple', value: 'list' }
        ]
      },
      initialValue: 'boxed'
    },
    {
      name: 'items',
      title: 'Points',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'takeawayItem',
          title: 'Point',
          fields: [
            {
              name: 'icon',
              title: 'Icône',
              type: 'string',
              options: {
                list: [
                  { title: 'Check', value: 'check' },
                  { title: 'Étoile', value: 'star' },
                  { title: 'Éclair', value: 'zap' },
                  { title: 'Cible', value: 'target' },
                  { title: 'Clé', value: 'key' },
                  { title: 'Ampoule', value: 'lightbulb' },
                  { title: 'Info', value: 'info' }
                ]
              },
              initialValue: 'check'
            },
            {
              name: 'title',
              title: 'Titre (optionnel)',
              type: 'string',
              description: 'Titre court pour ce point (optionnel)'
            },
            {
              name: 'content',
              title: 'Contenu',
              type: 'text',
              rows: 2,
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              content: 'content'
            },
            prepare({ title, content }) {
              return {
                title: title || content?.substring(0, 50) + '...',
                subtitle: title ? content?.substring(0, 50) : ''
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items'
    },
    prepare({ title, items }) {
      return {
        title: title || 'Points clés',
        subtitle: `${items?.length || 0} points`
      }
    }
  }
}
