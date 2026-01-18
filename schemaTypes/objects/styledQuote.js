// Citation stylée avec auteur et source
export default {
  name: 'styledQuote',
  title: 'Citation stylée',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: 'Citation',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'string'
    },
    {
      name: 'role',
      title: 'Fonction / Titre',
      type: 'string',
      description: 'Ex: Entrepreneur, Autrice, Coach de vie'
    },
    {
      name: 'image',
      title: 'Photo de l\'auteur',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Ex: Interview Origines Media, Podcast, Livre'
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Classique', value: 'classic' },
          { title: 'Grande citation', value: 'large' },
          { title: 'Avec fond coloré', value: 'filled' },
          { title: 'Encadré élégant', value: 'bordered' },
          { title: 'Témoignage', value: 'testimonial' }
        ]
      },
      initialValue: 'classic'
    }
  ],
  preview: {
    select: {
      quote: 'quote',
      author: 'author',
      media: 'image'
    },
    prepare({ quote, author, media }) {
      return {
        title: `"${quote?.substring(0, 50)}..."`,
        subtitle: author ? `— ${author}` : 'Citation',
        media
      }
    }
  }
}
