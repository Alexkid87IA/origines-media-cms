// Galerie d'images
export default {
  name: 'imageGallery',
  title: 'Galerie d\'images',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titre de la galerie (optionnel)',
      type: 'string'
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required()
          },
          {
            name: 'caption',
            title: 'Légende',
            type: 'string'
          },
          {
            name: 'alt',
            title: 'Texte alternatif (SEO)',
            type: 'string'
          },
          {
            name: 'credit',
            title: 'Crédit photo',
            type: 'string'
          }
        ],
        preview: {
          select: {
            media: 'image',
            caption: 'caption'
          },
          prepare({ media, caption }) {
            return {
              title: caption || 'Image',
              media
            }
          }
        }
      }],
      validation: Rule => Rule.min(2).error('Une galerie doit contenir au moins 2 images')
    },
    {
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: 'Grille 2 colonnes', value: 'grid-2' },
          { title: 'Grille 3 colonnes', value: 'grid-3' },
          { title: 'Carrousel', value: 'carousel' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Avant/Après', value: 'before-after' }
        ]
      },
      initialValue: 'grid-2'
    },
    {
      name: 'showCaptions',
      title: 'Afficher les légendes',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
      media: 'images.0.image'
    },
    prepare({ title, images, media }) {
      const count = images?.length || 0
      return {
        title: `🖼️ ${title || 'Galerie'}`,
        subtitle: `${count} image${count > 1 ? 's' : ''}`,
        media
      }
    }
  }
}
