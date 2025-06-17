export default {
  name: 'video',
  title: 'Vidéos (Fragments)',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'thumbnail',
      title: 'Vignette',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'videoUrl',
      title: 'URL de la vidéo',
      type: 'url'
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number'
    }
  ]
}