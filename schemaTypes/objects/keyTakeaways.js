// Points clés à retenir
export default {
  name: 'keyTakeaways',
  title: 'Points clés à retenir',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Ce qu\'il faut retenir'
    },
    {
      name: 'items',
      title: 'Points clés',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'text',
            title: 'Point',
            type: 'text',
            rows: 2,
            validation: Rule => Rule.required()
          },
          {
            name: 'icon',
            title: 'Icône',
            type: 'string',
            options: {
              list: [
                { title: '✅ Check', value: 'check' },
                { title: '💡 Ampoule', value: 'bulb' },
                { title: '🎯 Cible', value: 'target' },
                { title: '⭐ Étoile', value: 'star' },
                { title: '🔑 Clé', value: 'key' },
                { title: '📌 Épingle', value: 'pin' }
              ]
            },
            initialValue: 'check'
          }
        ],
        preview: {
          select: {
            text: 'text',
            icon: 'icon'
          },
          prepare({ text, icon }) {
            const icons = {
              check: '✅',
              bulb: '💡',
              target: '🎯',
              star: '⭐',
              key: '🔑',
              pin: '📌'
            }
            return {
              title: `${icons[icon] || '•'} ${text?.substring(0, 50)}...`
            }
          }
        }
      }],
      validation: Rule => Rule.min(2).max(7)
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Liste simple', value: 'list' },
          { title: 'Cards', value: 'cards' },
          { title: 'Encadré', value: 'boxed' },
          { title: 'Timeline', value: 'timeline' }
        ]
      },
      initialValue: 'boxed'
    }
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items'
    },
    prepare({ title, items }) {
      const count = items?.length || 0
      return {
        title: `🎯 ${title || 'Points clés'}`,
        subtitle: `${count} point${count > 1 ? 's' : ''}`
      }
    }
  }
}
