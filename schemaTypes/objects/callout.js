// Bloc d'alerte / Encadré informatif
export default {
  name: 'callout',
  title: 'Encadré / Callout',
  type: 'object',
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: '💡 Info / À savoir', value: 'info' },
          { title: '⚠️ Attention', value: 'warning' },
          { title: '✅ Conseil', value: 'tip' },
          { title: '📖 À retenir', value: 'remember' },
          { title: '💬 Le saviez-vous ?', value: 'didyouknow' },
          { title: '🔑 Point clé', value: 'key' },
          { title: '❤️ Témoignage', value: 'testimonial' },
          { title: '📊 Statistique', value: 'stat' }
        ],
        layout: 'radio'
      },
      initialValue: 'info'
    },
    {
      name: 'title',
      title: 'Titre (optionnel)',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] }],
      validation: Rule => Rule.required()
    },
    {
      name: 'source',
      title: 'Source (optionnel)',
      type: 'string',
      description: 'Nom de la source (pour les statistiques ou citations)'
    },
    {
      name: 'sourceUrl',
      title: 'URL de la source',
      type: 'url',
      description: 'Lien cliquable vers la source'
    }
  ],
  preview: {
    select: {
      type: 'type',
      title: 'title',
      content: 'content'
    },
    prepare({ type, title, content }) {
      const icons = {
        info: '💡',
        warning: '⚠️',
        tip: '✅',
        remember: '📖',
        didyouknow: '💬',
        key: '🔑',
        testimonial: '❤️',
        stat: '📊'
      }
      return {
        title: `${icons[type] || '📌'} ${title || content?.substring(0, 40) + '...'}`,
        subtitle: `Encadré ${type}`
      }
    }
  }
}
