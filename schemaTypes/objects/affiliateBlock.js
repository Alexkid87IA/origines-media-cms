// schemaTypes/objects/affiliateBlock.js
// Bloc pour intégrer des produits affiliés dans un article

export default {
  name: 'affiliateBlock',
  title: 'Produits affiliés',
  type: 'object',
  fields: [
    {
      name: 'titre',
      title: 'Titre de la section',
      type: 'string',
      description: 'Ex: "Les outils mentionnés dans cet épisode"',
      initialValue: 'Produits recommandés',
    },
    {
      name: 'products',
      title: 'Produits',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'affiliateProduct' }],
        },
      ],
      validation: Rule => Rule.min(1).max(4),
      description: 'Sélectionnez 1 à 4 produits affiliés.',
    },
    {
      name: 'style',
      title: 'Style d\'affichage',
      type: 'string',
      options: {
        list: [
          { title: 'Cartes', value: 'card' },
          { title: 'Compact', value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'card',
    },
  ],
  preview: {
    select: {
      titre: 'titre',
      p0: 'products.0.name',
      p1: 'products.1.name',
      p2: 'products.2.name',
    },
    prepare({ titre, p0, p1, p2 }) {
      const names = [p0, p1, p2].filter(Boolean)
      return {
        title: `🛒 ${titre || 'Produits affiliés'}`,
        subtitle: names.length > 0 ? names.join(', ') : 'Aucun produit sélectionné',
      }
    },
  },
}
