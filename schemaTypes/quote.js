// schemaTypes/quote.js
// Bloc citation avec différents styles

export default {
  name: 'quote',
  title: 'Citation',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: 'Citation',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'string'
    },
    {
      name: 'role',
      title: 'Rôle / Titre',
      type: 'string',
      description: 'Ex: CEO de Tesla, Philosophe grec, etc.'
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Livre, article, discours, etc.'
    },
    {
      name: 'sourceUrl',
      title: 'URL de la source',
      type: 'url'
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Classique', value: 'classic' },
          { title: 'Box encadrée', value: 'boxed' },
          { title: 'Highlight', value: 'highlight' },
          { title: 'Minimaliste', value: 'minimal' }
        ]
      },
      initialValue: 'classic'
    }
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author'
    },
    prepare({ quote, author }) {
      return {
        title: quote?.substring(0, 50) + '...',
        subtitle: author ? `— ${author}` : 'Citation'
      }
    }
  }
}
