// Embed vidéo YouTube
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
      }),
      description: 'Collez l\'URL complète de la vidéo YouTube'
    },
    {
      name: 'caption',
      title: 'Légende (optionnel)',
      type: 'string'
    },
    {
      name: 'startTime',
      title: 'Démarrer à (secondes)',
      type: 'number',
      description: 'Optionnel : démarrer la vidéo à un moment précis'
    },
    {
      name: 'aspectRatio',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (standard)', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1 (carré)', value: '1:1' },
          { title: '9:16 (vertical)', value: '9:16' }
        ]
      },
      initialValue: '16:9'
    }
  ],
  preview: {
    select: {
      url: 'url',
      caption: 'caption'
    },
    prepare({ url, caption }) {
      // Extraire l'ID de la vidéo
      let videoId = null
      if (url) {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
        videoId = match ? match[1] : null
      }
      return {
        title: caption || 'Vidéo YouTube',
        subtitle: videoId ? `ID: ${videoId}` : 'Ajoutez une URL'
      }
    }
  }
}
