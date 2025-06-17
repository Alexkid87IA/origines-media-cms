export default {
    name: 'recit',
    title: 'Récit',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Titre',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'excerpt',
        title: 'Extrait',
        type: 'text',
        rows: 3,
        description: 'Court résumé du récit',
        validation: Rule => Rule.required()
      },
      {
        name: 'body',
        title: 'Contenu',
        type: 'blockContent',
        validation: Rule => Rule.required()
      },
      {
        name: 'coverImage',
        title: 'Image de couverture',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'author',
        title: 'Auteur',
        type: 'reference',
        to: [{type: 'author'}],
      },
      {
        name: 'univers',
        title: 'Univers',
        type: 'reference',
        to: [{type: 'univers'}],
        validation: Rule => Rule.required()
      },
      {
        name: 'readingTime',
        title: 'Temps de lecture',
        type: 'number',
        description: 'En minutes',
      },
      {
        name: 'publishedAt',
        title: 'Date de publication',
        type: 'datetime',
        validation: Rule => Rule.required()
      },
      {
        name: 'featured',
        title: 'Mise en avant',
        type: 'boolean',
        initialValue: false
      }
    ],
    preview: {
      select: {
        title: 'title',
        author: 'author.name',
        media: 'coverImage'
      },
      prepare(selection) {
        const {author} = selection
        return {...selection, subtitle: author && `par ${author}`}
      }
    }
  }