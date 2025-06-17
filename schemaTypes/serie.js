export default {
    name: 'serie',
    title: 'Série',
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
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'coverImage',
        title: 'Image de couverture',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'format',
        title: 'Format',
        type: 'reference',
        to: [{type: 'format'}],
        validation: Rule => Rule.required()
      },
      {
        name: 'univers',
        title: 'Univers principal',
        type: 'reference',
        to: [{type: 'univers'}],
      },
      {
        name: 'episodeCount',
        title: 'Nombre d\'épisodes',
        type: 'number',
      },
      {
        name: 'status',
        title: 'Statut',
        type: 'string',
        options: {
          list: [
            {title: 'En cours', value: 'ongoing'},
            {title: 'Terminée', value: 'completed'},
            {title: 'À venir', value: 'upcoming'}
          ]
        },
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
        format: 'format.title',
        media: 'coverImage'
      },
      prepare(selection) {
        const {format} = selection
        return {...selection, subtitle: format && `Format: ${format}`}
      }
    }
  }