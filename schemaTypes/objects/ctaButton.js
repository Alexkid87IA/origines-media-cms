// Bouton d'appel à l'action
export default {
  name: 'ctaButton',
  title: 'Bouton CTA',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Texte du bouton',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Ex: Lire la suite, S\'inscrire à la newsletter, Découvrir'
    },
    {
      name: 'linkType',
      title: 'Type de lien',
      type: 'string',
      options: {
        list: [
          { title: 'URL externe', value: 'external' },
          { title: 'Article interne', value: 'article' },
          { title: 'Newsletter', value: 'newsletter' },
          { title: 'Contact', value: 'contact' }
        ],
        layout: 'radio'
      },
      initialValue: 'external'
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external'
    },
    {
      name: 'linkedArticle',
      title: 'Article lié',
      type: 'reference',
      to: [{ type: 'production' }],
      hidden: ({ parent }) => parent?.linkType !== 'article'
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Principal (plein)', value: 'primary' },
          { title: 'Secondaire (outline)', value: 'secondary' },
          { title: 'Ghost (transparent)', value: 'ghost' },
          { title: 'Gradient Origines', value: 'gradient' }
        ]
      },
      initialValue: 'primary'
    },
    {
      name: 'size',
      title: 'Taille',
      type: 'string',
      options: {
        list: [
          { title: 'Petit', value: 'sm' },
          { title: 'Normal', value: 'md' },
          { title: 'Grand', value: 'lg' },
          { title: 'Pleine largeur', value: 'full' }
        ]
      },
      initialValue: 'md'
    },
    {
      name: 'icon',
      title: 'Icône',
      type: 'string',
      options: {
        list: [
          { title: 'Aucune', value: 'none' },
          { title: '→ Flèche', value: 'arrow' },
          { title: '📧 Email', value: 'email' },
          { title: '📖 Lire', value: 'read' },
          { title: '🎧 Écouter', value: 'listen' },
          { title: '▶️ Regarder', value: 'watch' }
        ]
      },
      initialValue: 'arrow'
    },
    {
      name: 'openInNewTab',
      title: 'Ouvrir dans un nouvel onglet',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      text: 'text',
      style: 'style'
    },
    prepare({ text, style }) {
      return {
        title: `🔘 ${text}`,
        subtitle: `Bouton ${style}`
      }
    }
  }
}
