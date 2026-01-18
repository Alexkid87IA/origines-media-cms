export default {
  name: 'univers',
  title: 'Univers (Sous-catégories)',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'verticale',
      title: 'Verticale parente',
      type: 'reference',
      to: [{ type: 'verticale' }],
      validation: Rule => Rule.required(),
      description: 'La verticale (catégorie principale) à laquelle appartient cet univers'
    },
    {
      name: 'couleur',
      title: 'Couleur (HEX)',
      type: 'string',
      description: 'Ex: #4299E1',
      validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: 'hex color',
        invert: false
      }).error('Doit être un code couleur hexadécimal valide (ex: #4299E1)')
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
    },
    // === STATISTIQUES ===
    {
      name: 'stats',
      title: 'Statistiques',
      type: 'object',
      fields: [
        {
          name: 'articles',
          title: 'Nombre d\'articles',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'auteurs',
          title: 'Nombre d\'auteurs',
          type: 'number',
          initialValue: 0
        },
        {
          name: 'tempsTotal',
          title: 'Temps total de lecture',
          type: 'string',
          description: 'Ex: 152h'
        }
      ]
    },
    // === MÉDIA ===
    {
      name: 'imageUrl',
      title: 'URL image (fallback)',
      type: 'url',
      description: 'URL directe de l\'image si pas d\'upload'
    }
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'description',
      media: 'image',
      couleur: 'couleur',
      verticale: 'verticale.nom'
    },
    prepare(selection) {
      const { title, subtitle, media, couleur, verticale } = selection
      return {
        title: `${title} ${couleur ? `• ${couleur}` : ''}`,
        subtitle: verticale ? `${verticale} → ${subtitle ? subtitle.substring(0, 40) + '...' : ''}` : (subtitle ? subtitle.substring(0, 50) + '...' : ''),
        media
      }
    }
  }
}