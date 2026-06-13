export default {
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: () => '⚙️',
  // Singleton - un seul document de ce type
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'curation', title: 'Curation Homepage', default: true },
    { name: 'identite', title: 'Identité' },
    { name: 'visuels', title: 'Visuels' },
    { name: 'social', title: 'Réseaux sociaux' },
    { name: 'contact', title: 'Contact' },
    { name: 'newsletter', title: 'Newsletter' },
    { name: 'analytics', title: 'Analytics' },
  ],
  fields: [
    // === CURATION HOMEPAGE ===
    {
      name: 'unesDuJour',
      title: 'Les unes du jour',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'production' }],
          options: {
            filter: 'rubrique == "articles" && defined(image.asset)',
          },
        },
      ],
      validation: (Rule) => Rule.max(5).unique(),
      description: 'Sélectionnez jusqu\'à 5 articles pour le carrousel "Les unes du jour" sur la page Média. Si vide, les 5 articles les plus récents sont utilisés.',
      group: 'curation',
    },
    {
      name: 'articleALaUne',
      title: 'Article à la une (Héros Homepage)',
      type: 'reference',
      to: [{ type: 'production' }],
      description: 'Article affiché en grand sur le héros de la homepage. Si vide, le plus récent est utilisé.',
      group: 'curation',
    },
    {
      name: 'videoALaUne',
      title: 'Vidéo à la une (Héros)',
      type: 'reference',
      to: [{ type: 'production' }],
      options: {
        filter: 'rubrique == "videos" && defined(videoUrl)',
      },
      description: 'Vidéo affichée dans le héros de la homepage. Si vide, une vidéo Origines récente est utilisée.',
      group: 'curation',
    },
    {
      name: 'choixDeLaRedaction',
      title: 'Choix de la rédaction (Section 2)',
      type: 'reference',
      to: [{ type: 'production' }],
      description: 'Article mis en avant dans "Ce qu\'on a choisi pour vous". Si vide, l\'article le plus vu est utilisé.',
      group: 'curation',
    },
    {
      name: 'guideGratuitALaUne',
      title: 'Guide gratuit à la une (Héros, colonne 3 haut)',
      type: 'reference',
      to: [{ type: 'production' }],
      options: {
        filter: 'rubrique == "guides" && category == "kits-gratuits"',
      },
      description: 'Guide gratuit affiché en colonne 3 haut du hero. Si vide, le guide gratuit le plus récent est utilisé.',
      group: 'curation',
    },
    {
      name: 'produitBoutiqueALaUne',
      title: 'Produit boutique à la une (Héros, colonne 3 bas)',
      type: 'reference',
      to: [{ type: 'boutiqueProduct' }],
      description: 'Produit boutique affiché en colonne 3 bas du hero. Si vide, le bloc Boutique n\'est pas affiché.',
      group: 'curation',
    },
    // === IDENTITÉ ===
    {
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      initialValue: 'Origines Media',
      group: 'identite',
    },
    {
      name: 'tagline',
      title: 'Slogan',
      type: 'string',
      description: 'Phrase d\'accroche du site',
      group: 'identite',
    },
    {
      name: 'description',
      title: 'Description SEO',
      type: 'text',
      rows: 3,
      description: 'Description pour les moteurs de recherche',
      group: 'identite',
    },
    // === VISUELS ===
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif (SEO & accessibilité)',
          type: 'string',
          description: 'Décris ce que montre l\'image en 5-15 mots.',
          validation: Rule => Rule.required().warning('Un texte alternatif est fortement recommandé pour le SEO.'),
        },
      ],
      group: 'visuels',
    },
    {
      name: 'logoUrl',
      title: 'URL logo (fallback)',
      type: 'url',
      group: 'visuels',
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'visuels',
    },
    {
      name: 'ogImage',
      title: 'Image Open Graph',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif (SEO & accessibilité)',
          type: 'string',
          description: 'Décris ce que montre l\'image en 5-15 mots.',
          validation: Rule => Rule.required().warning('Un texte alternatif est fortement recommandé pour le SEO.'),
        },
      ],
      description: 'Image par défaut pour le partage sur les réseaux sociaux',
      group: 'visuels',
    },
    // === RÉSEAUX SOCIAUX ===
    {
      name: 'reseauxSociaux',
      title: 'Réseaux sociaux',
      type: 'object',
      group: 'social',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter / X',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url'
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url'
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url'
        }
      ]
    },
    // === CONTACT ===
    {
      name: 'contact',
      title: 'Informations de contact',
      type: 'object',
      group: 'contact',
      fields: [
        {
          name: 'email',
          title: 'Email principal',
          type: 'string'
        },
        {
          name: 'emailPresse',
          title: 'Email presse',
          type: 'string'
        },
        {
          name: 'telephone',
          title: 'Téléphone',
          type: 'string'
        },
        {
          name: 'adresse',
          title: 'Adresse',
          type: 'text',
          rows: 2
        }
      ]
    },
    // === NEWSLETTER ===
    {
      name: 'newsletter',
      title: 'Newsletter',
      type: 'object',
      group: 'newsletter',
      fields: [
        {
          name: 'titre',
          title: 'Titre',
          type: 'string',
          initialValue: 'Rejoignez notre communauté'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2
        },
        {
          name: 'isActive',
          title: 'Activée',
          type: 'boolean',
          initialValue: true
        }
      ]
    },
    // === ANALYTICS ===
    {
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      group: 'analytics',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Ex: G-XXXXXXXXXX'
        },
        {
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Paramètres du site',
        subtitle: 'Configuration globale'
      }
    }
  }
}
