export default {
    name: 'portrait',
    title: 'Portraits à la Une',
    type: 'document',
    fields: [
      {
        name: 'titre',
        title: 'Titre',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'categorie',
        title: 'Catégorie',
        type: 'string',
        options: {
          list: [
            { title: 'Carrière', value: 'CARRIÈRE' },
            { title: 'Voyage', value: 'VOYAGE' },
            { title: 'Psychologie', value: 'PSYCHOLOGIE' },
            { title: 'Art & Créativité', value: 'ART & CRÉATIVITÉ' },
            { title: 'Spiritualité', value: 'SPIRITUALITÉ' },
            { title: 'Société', value: 'SOCIÉTÉ' }
          ]
        }
      },
      {
        name: 'accroche',
        title: 'Accroche',
        type: 'text',
        rows: 3
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
          source: 'titre',
          maxLength: 96
        }
      },
      {
        name: 'ordre',
        title: 'Ordre d\'affichage',
        type: 'number'
      }
    ],
    preview: {
      select: {
        title: 'titre',
        subtitle: 'categorie',
        media: 'image'
      }
    }
  }