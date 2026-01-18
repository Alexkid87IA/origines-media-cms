// Bloc inscription newsletter
export default {
  name: 'newsletterCta',
  title: 'Inscription Newsletter',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Restez inspirés'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      initialValue: 'Recevez chaque semaine nos meilleurs articles et témoignages directement dans votre boîte mail.'
    },
    {
      name: 'buttonText',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Je m\'inscris'
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Minimaliste', value: 'minimal' },
          { title: 'Avec fond', value: 'filled' },
          { title: 'Encadré', value: 'bordered' },
          { title: 'Full width', value: 'full' }
        ]
      },
      initialValue: 'filled'
    },
    {
      name: 'showSocialProof',
      title: 'Afficher preuve sociale',
      type: 'boolean',
      description: 'Ex: "Rejoignez 5000+ lecteurs"',
      initialValue: true
    },
    {
      name: 'subscriberCount',
      title: 'Nombre d\'abonnés (approximatif)',
      type: 'string',
      description: 'Ex: 5000+, 10 000+',
      hidden: ({ parent }) => !parent?.showSocialProof
    }
  ],
  preview: {
    select: {
      title: 'title',
      style: 'style'
    },
    prepare({ title, style }) {
      return {
        title: `📧 ${title || 'Newsletter'}`,
        subtitle: `Style: ${style}`
      }
    }
  }
}
