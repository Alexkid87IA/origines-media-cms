// Embed réseaux sociaux (Instagram, Twitter/X, TikTok)
export default {
  name: 'socialEmbed',
  title: 'Embed Social',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Plateforme',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'LinkedIn', value: 'linkedin' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      title: 'URL du post',
      type: 'url',
      validation: Rule => Rule.required(),
      description: 'Collez l\'URL complète du post'
    },
    {
      name: 'caption',
      title: 'Légende (optionnel)',
      type: 'string',
      description: 'Contexte ou commentaire sur ce post'
    }
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
      caption: 'caption'
    },
    prepare({ platform, url, caption }) {
      const icons = {
        instagram: '📸',
        twitter: '🐦',
        tiktok: '🎵',
        linkedin: '💼'
      }
      return {
        title: `${icons[platform] || '🔗'} ${caption || platform || 'Embed social'}`,
        subtitle: url ? url.substring(0, 50) + '...' : 'Ajoutez une URL'
      }
    }
  }
}
