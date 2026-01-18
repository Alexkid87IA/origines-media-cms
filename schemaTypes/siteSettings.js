export default {
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: () => '⚙️',
  // Singleton - un seul document de ce type
  __experimental_actions: ['update', 'publish'],
  fields: [
    // === IDENTITÉ ===
    {
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      initialValue: 'Origines Media'
    },
    {
      name: 'tagline',
      title: 'Slogan',
      type: 'string',
      description: 'Phrase d\'accroche du site'
    },
    {
      name: 'description',
      title: 'Description SEO',
      type: 'text',
      rows: 3,
      description: 'Description pour les moteurs de recherche'
    },
    // === VISUELS ===
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'logoUrl',
      title: 'URL logo (fallback)',
      type: 'url'
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    },
    {
      name: 'ogImage',
      title: 'Image Open Graph',
      type: 'image',
      description: 'Image par défaut pour le partage sur les réseaux sociaux'
    },
    // === RÉSEAUX SOCIAUX ===
    {
      name: 'reseauxSociaux',
      title: 'Réseaux sociaux',
      type: 'object',
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
