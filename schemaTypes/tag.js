export default {
  name: 'tag',
  title: 'Tags',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'nom',
      title: 'Nom (alias)',
      type: 'string',
      description: 'Alias du titre pour le frontend'
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
      name: 'couleur',
      title: 'Couleur (hex)',
      type: 'string',
      description: 'Ex: #8B5CF6',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: 'hex color',
        invert: false
      }).error('Doit être un code couleur hexadécimal valide (ex: #8B5CF6)')
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2
    }
  ],
  preview: {
    select: {
      title: 'title',
      couleur: 'couleur'
    },
    prepare(selection) {
      const { title, couleur } = selection
      return {
        title: title,
        subtitle: couleur || 'Pas de couleur'
      }
    }
  }
}
