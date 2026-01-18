// Encadré de progression / Étapes
export default {
  name: 'progressSteps',
  title: 'Étapes / Progression',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Ex: Les étapes de la reconversion, Le parcours de Marie'
    },
    {
      name: 'steps',
      title: 'Étapes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Titre de l\'étape',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2
          },
          {
            name: 'duration',
            title: 'Durée (optionnel)',
            type: 'string',
            description: 'Ex: 3 mois, 1 semaine, 2 ans'
          }
        ],
        preview: {
          select: {
            title: 'title',
            duration: 'duration'
          },
          prepare({ title, duration }) {
            return {
              title: title,
              subtitle: duration || ''
            }
          }
        }
      }],
      validation: Rule => Rule.min(2)
    },
    {
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: 'Timeline verticale', value: 'vertical' },
          { title: 'Timeline horizontale', value: 'horizontal' },
          { title: 'Numérotée', value: 'numbered' },
          { title: 'Cards', value: 'cards' }
        ]
      },
      initialValue: 'vertical'
    }
  ],
  preview: {
    select: {
      title: 'title',
      steps: 'steps'
    },
    prepare({ title, steps }) {
      const count = steps?.length || 0
      return {
        title: `📍 ${title || 'Étapes'}`,
        subtitle: `${count} étape${count > 1 ? 's' : ''}`
      }
    }
  }
}
