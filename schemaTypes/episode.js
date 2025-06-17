export default {
    name: 'episode',
    title: 'Épisode',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Titre',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'serie',
        title: 'Série',
        type: 'reference',
        to: [{type: 'serie'}],
        validation: Rule => Rule.required()
      },
      {
        name: 'episodeNumber',
        title: 'Numéro d\'épisode',
        type: 'number',
        validation: Rule => Rule.required().min(1)
      },
      {
        name: 'content',
        title: 'Contenu',
        type: 'object',
        fields: [
          {
            name: 'type',
            title: 'Type de contenu',
            type: 'string',
            options: {
              list: [
                {title: 'Article', value: 'article'},
                {title: 'Vidéo', value: 'video'},
                {title: 'Audio', value: 'audio'}
              ]
            },
            validation: Rule => Rule.required()
          },
          {
            name: 'article',
            title: 'Article',
            type: 'reference',
            to: [{type: 'post'}],
            hidden: ({parent}) => parent?.type !== 'article'
          },
          {
            name: 'video',
            title: 'Vidéo',
            type: 'reference',
            to: [{type: 'video'}],
            hidden: ({parent}) => parent?.type !== 'video'
          }
        ]
      },
      {
        name: 'publishedAt',
        title: 'Date de publication',
        type: 'datetime',
        validation: Rule => Rule.required()
      }
    ],
    preview: {
      select: {
        title: 'title',
        serie: 'serie.title',
        number: 'episodeNumber'
      },
      prepare(selection) {
        const {serie, number} = selection
        return {...selection, subtitle: `${serie} - Épisode ${number}`}
      }
    }
  }