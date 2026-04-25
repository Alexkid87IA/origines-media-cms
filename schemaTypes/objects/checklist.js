export default {
  name: 'checklist',
  title: 'Checklist interactive',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Ex: Plan d\'action - Semaine 1, Votre checklist quotidienne',
    },
    {
      name: 'items',
      title: 'Éléments à cocher',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'text',
            title: 'Texte',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'week',
            title: 'Semaine (optionnel)',
            type: 'number',
            description: 'Pour regrouper par semaine dans un plan d\'action',
          },
        ],
        preview: {
          select: { title: 'text', week: 'week' },
          prepare({ title, week }) {
            return {
              title: title,
              subtitle: week ? `Semaine ${week}` : '',
            }
          },
        },
      }],
      validation: Rule => Rule.min(1),
    },
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }) {
      const count = items?.length || 0
      return {
        title: `☑️ ${title || 'Checklist'}`,
        subtitle: `${count} élément${count > 1 ? 's' : ''}`,
      }
    },
  },
}
