// schemaTypes/boutiqueProduct.js
// Document type pour les produits de la boutique Origines (kits, coffrets, carnets).

export default {
  name: 'boutiqueProduct',
  title: 'Boutique — Produits',
  type: 'document',
  icon: () => '🎁',
  groups: [
    { name: 'infos', title: 'Informations produit', default: true },
    { name: 'prix', title: 'Prix & Badge' },
    { name: 'classification', title: 'Classification' },
    { name: 'media', title: 'Visuel' },
    { name: 'options', title: 'Affichage' },
  ],
  fields: [
    // === INFORMATIONS ===
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Ex: "Kit Méditation"',
      validation: Rule => Rule.required(),
      group: 'infos',
    },
    {
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Ex: "Trouver le calme intérieur"',
      group: 'infos',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
      group: 'infos',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
      group: 'infos',
    },
    {
      name: 'features',
      title: 'Caractéristiques',
      type: 'array',
      of: [{ type: 'string' }],
      description: '3 puces affichées sur la carte (ex: "Carnet 90 jours", "30 cartes guidées").',
      group: 'infos',
    },
    {
      name: 'format',
      title: 'Format',
      type: 'string',
      description: 'Ex: "Kit complet", "PDF · 24 pages".',
      group: 'infos',
    },

    // === PRIX & BADGE ===
    {
      name: 'price',
      title: 'Prix',
      type: 'string',
      description: 'Ex: "39 €" ou "Gratuit". String pour conserver le formatage exact.',
      validation: Rule => Rule.required(),
      group: 'prix',
    },
    {
      name: 'originalPrice',
      title: 'Prix barré',
      type: 'string',
      description: 'Optionnel — prix avant promo (affiché barré).',
      group: 'prix',
    },
    {
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Ex: "Populaire", "Best-seller", "Idée cadeau", "Pro". Vide = pas de badge.',
      group: 'prix',
    },
    {
      name: 'badgeColor',
      title: 'Couleur du badge',
      type: 'string',
      description: 'Hex (ex: #111827). Si vide, utilise la couleur de l\'univers.',
      group: 'prix',
    },
    {
      name: 'mention',
      title: 'Mention (hero)',
      type: 'string',
      description: 'Affichée sous le prix dans le bloc Boutique du hero. Ex: "Édition limitée".',
      group: 'prix',
    },

    // === CLASSIFICATION ===
    {
      name: 'category',
      title: 'Univers',
      type: 'string',
      options: {
        list: [
          { title: '🧠 Esprit', value: 'esprit' },
          { title: '💪 Corps', value: 'corps' },
          { title: '🤝 Liens', value: 'liens' },
          { title: '🌍 Monde', value: 'monde' },
          { title: '🚀 Avenir', value: 'avenir' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
      group: 'classification',
    },
    {
      name: 'lien',
      title: 'Lien produit',
      type: 'string',
      description: 'URL custom. Si vide, lien par défaut vers /boutique/:slug.',
      group: 'classification',
    },

    // === MEDIA ===
    {
      name: 'image',
      title: 'Image du produit',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: 'Description de l\'image pour l\'accessibilité et le SEO.',
          validation: Rule => Rule.required(),
        },
      ],
      validation: Rule => Rule.required(),
      group: 'media',
    },

    // === OPTIONS ===
    {
      name: 'popular',
      title: 'Populaire',
      type: 'boolean',
      description: 'Marqué comme populaire dans le catalogue.',
      initialValue: false,
      group: 'options',
    },
    {
      name: 'featured',
      title: 'Mis en avant',
      type: 'boolean',
      description: 'Affiché dans la section "Coups de cœur" de la boutique.',
      initialValue: false,
      group: 'options',
    },
  ],

  orderings: [
    {
      title: 'Mis en avant en premier',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'popular', direction: 'desc' },
        { field: 'title', direction: 'asc' },
      ],
    },
    {
      title: 'Univers, puis titre',
      name: 'byUnivers',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
      price: 'price',
      category: 'category',
    },
    prepare({ title, subtitle, media, price, category }) {
      const universLabel = {
        esprit: '🧠 Esprit',
        corps: '💪 Corps',
        liens: '🤝 Liens',
        monde: '🌍 Monde',
        avenir: '🚀 Avenir',
      }[category] || category;
      return {
        title: `${title}${price ? ` — ${price}` : ''}`,
        subtitle: subtitle ? `${universLabel} · ${subtitle}` : universLabel,
        media,
      };
    },
  },
};
