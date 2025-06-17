export default {
    name: 'verticale',
    title: 'Verticale',
    type: 'document',
    fields: [
      {
        name: 'nom',
        title: 'Nom',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'nom',
          maxLength: 96
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'couleurDominante',
        title: 'Couleur dominante',
        type: 'string',
        description: 'Code couleur hexadécimal (ex: #10B981)',
        validation: Rule => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, {
          name: 'hex color',
          invert: false
        }).error('Doit être un code couleur hexadécimal valide (ex: #10B981)')
      },
      {
        name: 'description',
        title: 'Description',
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
        name: 'ordre',
        title: 'Ordre d\'affichage',
        type: 'number',
        validation: Rule => Rule.required().min(0)
      }
    ],
    preview: {
      select: {
        title: 'nom',
        subtitle: 'description',
        media: 'image',
        couleur: 'couleurDominante'
      },
      prepare(selection) {
        const { title, subtitle, media, couleur } = selection;
        return {
          title,
          subtitle: subtitle ? `${subtitle.substring(0, 50)}...` : '',
          media,
          // Affiche la couleur dans le titre pour la voir facilement
          title: `${title} • ${couleur || 'Sans couleur'}`
        }
      }
    }
  }