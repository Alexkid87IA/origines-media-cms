// Articles liés / À lire aussi
export default {
  name: 'relatedArticles',
  title: 'Articles liés',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'À lire aussi'
    },
    {
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'production' }]
      }],
      validation: Rule => Rule.min(1).max(4)
    },
    {
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: 'Liste simple', value: 'list' },
          { title: 'Cards horizontales', value: 'horizontal' },
          { title: 'Grille', value: 'grid' }
        ]
      },
      initialValue: 'horizontal'
    }
  ],
  preview: {
    select: {
      title: 'title',
      articles: 'articles'
    },
    prepare({ title, articles }) {
      const count = articles?.length || 0
      return {
        title: `📚 ${title || 'Articles liés'}`,
        subtitle: `${count} article${count > 1 ? 's' : ''}`
      }
    }
  }
}
