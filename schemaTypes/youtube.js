// schemaTypes/youtube.js
// Bloc YouTube pour intégrer des vidéos dans le contenu

export default {
  name: 'youtube',
  title: 'Vidéo YouTube',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'URL YouTube',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      })
    },
    {
      name: 'title',
      title: 'Titre (optionnel)',
      type: 'string',
      description: 'Titre descriptif pour l\'accessibilité'
    }
  ],
  preview: {
    select: {
      url: 'url',
      title: 'title'
    },
    prepare({ url, title }) {
      return {
        title: title || 'Vidéo YouTube',
        subtitle: url
      }
    }
  }
}
