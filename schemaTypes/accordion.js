// schemaTypes/accordion.js
// Bloc accordéon / FAQ pour le contenu

export default {
  name: 'accordion',
  title: 'Accordéon / FAQ',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Ex: Questions fréquentes, En savoir plus, etc.'
    },
    {
      name: 'items',
      title: 'Éléments',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'accordionItem',
          title: 'Élément',
          fields: [
            {
              name: 'question',
              title: 'Question / Titre',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'answer',
              title: 'Réponse / Contenu',
              type: 'text',
              rows: 4,
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer'
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
        title: title || 'Accordéon',
        subtitle: `${items?.length || 0} éléments`
      }
    }
  }
}
