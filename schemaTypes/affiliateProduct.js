// schemaTypes/affiliateProduct.js
// Document type pour les produits affiliés (suppléments, livres, outils, etc.)

export default {
  name: 'affiliateProduct',
  title: 'Produits Affiliés',
  type: 'document',
  icon: () => '🛒',
  groups: [
    { name: 'infos', title: 'Informations produit', default: true },
    { name: 'links', title: 'Liens d\'affiliation' },
    { name: 'context', title: 'Contexte & Source' },
    { name: 'seo', title: 'SEO' },
    { name: 'taxonomie', title: 'Taxonomie' },
  ],
  fields: [
    // === INFORMATIONS PRODUIT ===
    {
      name: 'name',
      title: 'Nom du produit',
      type: 'string',
      description: 'Ex: "Magnésium Thréonate — Life Extension"',
      validation: Rule => Rule.required(),
      group: 'infos',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required(),
      group: 'infos',
    },
    {
      name: 'productType',
      title: 'Type de produit',
      type: 'string',
      options: {
        list: [
          { title: '💊 Supplément', value: 'supplement' },
          { title: '📚 Livre', value: 'book' },
          { title: '🔧 Outil / Accessoire', value: 'tool' },
          { title: '📱 Application', value: 'app' },
          { title: '🔬 Appareil / Device', value: 'device' },
          { title: '🎓 Formation / Cours', value: 'course' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
      group: 'infos',
    },
    {
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
      description: '150-300 caractères.',
      group: 'infos',
    },
    {
      name: 'brand',
      title: 'Marque / Éditeur',
      type: 'string',
      group: 'infos',
    },
    {
      name: 'image',
      title: 'Image produit',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif (SEO & accessibilité)',
          type: 'string',
          description: 'Décris ce que montre l\'image en 5-15 mots.',
          validation: Rule => Rule.required().warning('Texte alternatif recommandé.'),
        },
      ],
      group: 'infos',
    },
    {
      name: 'imageUrl',
      title: 'URL image externe (fallback)',
      type: 'url',
      description: 'Utilisé uniquement si aucune image n\'est uploadée.',
      group: 'infos',
    },

    // === LIENS D'AFFILIATION ===
    {
      name: 'affiliateLinks',
      title: 'Liens d\'affiliation',
      type: 'array',
      group: 'links',
      of: [
        {
          type: 'object',
          title: 'Lien affilié',
          fields: [
            {
              name: 'platform',
              title: 'Plateforme',
              type: 'string',
              options: {
                list: [
                  { title: '🛒 Amazon FR', value: 'amazon-fr' },
                  { title: '🌿 iHerb', value: 'iherb' },
                  { title: '📖 Fnac', value: 'fnac' },
                  { title: '💊 Momentous', value: 'momentous' },
                  { title: '🔗 Site officiel', value: 'direct' },
                  { title: '🏪 Autre', value: 'other' },
                ],
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL du lien affilié',
              type: 'url',
              validation: Rule => Rule.required(),
            },
            {
              name: 'price',
              title: 'Prix indicatif',
              type: 'string',
              description: 'Ex: "24,90 €"',
            },
            {
              name: 'label',
              title: 'Libellé du bouton',
              type: 'string',
              description: 'Ex: "Voir sur Amazon". Par défaut : "Acheter".',
            },
          ],
          preview: {
            select: { platform: 'platform', price: 'price' },
            prepare({ platform, price }) {
              const labels = {
                'amazon-fr': '🛒 Amazon FR',
                'iherb': '🌿 iHerb',
                'fnac': '📖 Fnac',
                'momentous': '💊 Momentous',
                'direct': '🔗 Site officiel',
                'other': '🏪 Autre',
              }
              return {
                title: labels[platform] || platform,
                subtitle: price || '',
              }
            },
          },
        },
      ],
    },

    // === CONTEXTE & SOURCE ===
    {
      name: 'mentionedBy',
      title: 'Mentionné par',
      type: 'string',
      description: 'Ex: "Andrew Huberman"',
      initialValue: 'Andrew Huberman',
      group: 'context',
    },
    {
      name: 'episodeContext',
      title: 'Contexte de la recommandation',
      type: 'text',
      rows: 4,
      description: 'Dans quel contexte le produit est mentionné (épisode, usage, dosage...).',
      group: 'context',
    },

    // === SEO ===
    {
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      description: 'Max 70 caractères.',
      validation: Rule => Rule.max(70).warning('Le titre SEO ne devrait pas dépasser 70 caractères.'),
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'Description SEO',
      type: 'text',
      rows: 2,
      description: 'Max 170 caractères.',
      validation: Rule => Rule.max(170).warning('La description ne devrait pas dépasser 170 caractères.'),
      group: 'seo',
    },

    // === TAXONOMIE ===
    {
      name: 'univpilar',
      title: 'Univers',
      type: 'string',
      options: {
        list: [
          { title: 'L\'Esprit', value: 'esprit' },
          { title: 'Le Corps', value: 'corps' },
          { title: 'Les Liens', value: 'liens' },
          { title: 'Le Monde', value: 'monde' },
          { title: 'L\'Avenir', value: 'avenir' },
        ],
        layout: 'radio',
      },
      group: 'taxonomie',
    },
    {
      name: 'soustopic',
      title: 'Sous-topic',
      type: 'string',
      options: {
        list: [
          { title: 'Nutrition', value: 'nutrition' },
          { title: 'Sommeil', value: 'sommeil' },
          { title: 'Mouvement', value: 'mouvement' },
          { title: 'Prévention', value: 'prevention' },
          { title: 'Médecine douce', value: 'medecine-douce' },
          { title: 'Bien-être', value: 'bien-etre' },
          { title: 'Sport', value: 'sport' },
          { title: 'Respiration', value: 'respiration' },
          { title: 'Neurosciences', value: 'neurosciences' },
          { title: 'Méditation', value: 'meditation' },
          { title: 'Développement personnel', value: 'developpement-personnel' },
          { title: 'Innovation', value: 'innovation' },
          { title: 'IA', value: 'ia' },
        ],
      },
      group: 'taxonomie',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'taxonomie',
    },
    {
      name: 'datePublication',
      title: 'Date de publication',
      type: 'datetime',
      group: 'infos',
    },
  ],
  preview: {
    select: {
      title: 'name',
      brand: 'brand',
      productType: 'productType',
      media: 'image',
    },
    prepare({ title, brand, productType, media }) {
      const typeEmojis = {
        supplement: '💊',
        book: '📚',
        tool: '🔧',
        app: '📱',
        device: '🔬',
        course: '🎓',
      }
      return {
        title: `${typeEmojis[productType] || '🛒'} ${title}`,
        subtitle: [brand, productType].filter(Boolean).join(' · '),
        media,
      }
    },
  },
  orderings: [
    { title: 'Nom (A→Z)', name: 'nameAsc', by: [{ field: 'name', direction: 'asc' }] },
    { title: 'Date de publication', name: 'dateDesc', by: [{ field: 'datePublication', direction: 'desc' }] },
    { title: 'Type', name: 'typeAsc', by: [{ field: 'productType', direction: 'asc' }] },
  ],
}
