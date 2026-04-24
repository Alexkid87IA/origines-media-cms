export default {
  name: 'portrait',
  title: 'Portraits / Histoires',
  type: 'document',
  icon: () => '👤',
  groups: [
    { name: 'infos', title: 'Informations principales', default: true },
    { name: 'taxonomie', title: 'Classification' },
    { name: 'biographie', title: 'Biographie' },
    { name: 'media', title: 'Médias' }
  ],
  fields: [
    // === INFORMATIONS PRINCIPALES ===
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'infos'
    },
    {
      name: 'accroche',
      title: 'Chapeau / Accroche',
      type: 'text',
      rows: 3,
      description: '150-160 caractères',
      group: 'infos'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre', maxLength: 96 },
      validation: Rule => Rule.required(),
      group: 'infos'
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'infos'
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      group: 'infos'
    },

    // === CLASSIFICATION ===
    {
      name: 'univpilar',
      title: 'Univers',
      type: 'string',
      options: {
        list: [
          { title: "L'Esprit", value: 'esprit' },
          { title: 'Le Corps', value: 'corps' },
          { title: 'Les Liens', value: 'liens' },
          { title: 'Le Monde', value: 'monde' },
          { title: "L'Avenir", value: 'avenir' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required(),
      group: 'taxonomie'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      group: 'taxonomie'
    },
    // Legacy fields — hidden
    {
      name: 'univers',
      title: 'Univers (legacy)',
      type: 'reference',
      to: [{ type: 'univers' }],
      hidden: true
    },
    {
      name: 'verticale',
      title: 'Verticale (legacy)',
      type: 'reference',
      to: [{ type: 'verticale' }],
      hidden: true
    },
    {
      name: 'categorie',
      title: 'Catégorie (legacy)',
      type: 'string',
      hidden: true
    },
    {
      name: 'productions',
      title: 'Articles liés',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'production' }] }],
      group: 'taxonomie'
    },

    // === BIOGRAPHIE ===
    {
      name: 'biographie',
      title: 'Biographie',
      type: 'text',
      rows: 8,
      group: 'biographie'
    },
    {
      name: 'citation',
      title: 'Citation',
      type: 'text',
      rows: 2,
      group: 'biographie'
    },
    {
      name: 'dateNaissance',
      title: 'Date de naissance',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      group: 'biographie'
    },
    {
      name: 'lieuNaissance',
      title: 'Lieu de naissance',
      type: 'string',
      group: 'biographie'
    },

    // === MÉDIAS ===
    {
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: { hotspot: true },
      group: 'media'
    },
    {
      name: 'imageUrl',
      title: 'URL image (fallback)',
      type: 'url',
      group: 'media'
    }
  ],
  preview: {
    select: {
      title: 'titre',
      univers: 'univpilar',
      media: 'image'
    },
    prepare(selection) {
      const { title, univers, media } = selection
      const LABELS = { esprit: "L'Esprit", corps: 'Le Corps', liens: 'Les Liens', monde: 'Le Monde', avenir: "L'Avenir" }
      return {
        title,
        subtitle: univers ? LABELS[univers] : '⚠️ Pas d\'univers',
        media
      }
    }
  }
}
