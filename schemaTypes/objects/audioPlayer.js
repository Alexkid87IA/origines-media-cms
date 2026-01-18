// Lecteur audio / Podcast
export default {
  name: 'audioPlayer',
  title: 'Audio / Podcast',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'audioUrl',
      title: 'URL du fichier audio',
      type: 'url',
      description: 'URL directe du fichier MP3 ou lien Spotify/Apple Podcasts'
    },
    {
      name: 'audioFile',
      title: 'Ou uploader un fichier',
      type: 'file',
      options: {
        accept: 'audio/*'
      }
    },
    {
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Ex: 45:30, 1h 20min'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'timestamps',
      title: 'Chapitres / Timestamps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'time',
            title: 'Temps',
            type: 'string',
            description: 'Ex: 05:30'
          },
          {
            name: 'label',
            title: 'Titre du chapitre',
            type: 'string'
          }
        ]
      }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      duration: 'duration',
      media: 'coverImage'
    },
    prepare({ title, duration, media }) {
      return {
        title: `🎧 ${title}`,
        subtitle: duration || 'Audio',
        media
      }
    }
  }
}
