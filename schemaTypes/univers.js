export default {
  name: 'univers',
  title: 'Univers Thématiques',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'couleur',
      title: 'Couleur (HEX)',
      type: 'string',
      description: 'Ex: #4299E1'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'nom',
        maxLength: 96
      }
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number'
    }
  ]
}