export default {
  name: 'questionDeLaSemaine',
  title: 'Question de la semaine',
  type: 'document',
  icon: () => '❓',
  fields: [
    {
      name: 'question',
      title: 'La question',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Ex: "Pourquoi dort-on si mal ?"',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'question', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'semaine',
      title: 'Numéro de semaine',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(53),
      description: 'S.17, S.18, etc.',
    },
    {
      name: 'annee',
      title: 'Année',
      type: 'number',
      initialValue: new Date().getFullYear(),
      validation: Rule => Rule.required(),
    },
    {
      name: 'univpilar',
      title: 'Univers principal',
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
    },
    {
      name: 'articles',
      title: 'Les 7 articles du dossier',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'production' }] }],
      validation: Rule => Rule.required().min(1).max(7),
      description: 'Les articles qui répondent à la question, dans l\'ordre d\'affichage (1/7, 2/7...)',
    },
    {
      name: 'image',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'isActive',
      title: 'Question active (affichée en homepage)',
      type: 'boolean',
      initialValue: false,
      description: 'Une seule question active à la fois',
    },
    {
      name: 'dateDebut',
      title: 'Date de début',
      type: 'date',
    },
  ],

  orderings: [
    {
      title: 'Semaine (récent)',
      name: 'semaineDesc',
      by: [{ field: 'annee', direction: 'desc' }, { field: 'semaine', direction: 'desc' }]
    },
  ],

  preview: {
    select: {
      question: 'question',
      semaine: 'semaine',
      annee: 'annee',
      univers: 'univpilar',
      isActive: 'isActive',
      media: 'image',
    },
    prepare({ question, semaine, annee, univers, isActive, media }) {
      const LABELS = { esprit: '🧠', corps: '💪', liens: '🤝', monde: '🌍', avenir: '🚀' }
      return {
        title: `${isActive ? '🟢 ' : ''}S.${semaine} — ${question}`,
        subtitle: `${annee} · ${LABELS[univers] || ''}`,
        media,
      }
    }
  }
}
