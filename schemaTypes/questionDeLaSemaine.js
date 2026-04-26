export default {
  name: 'questionDeLaSemaine',
  title: 'Question de la semaine',
  type: 'document',
  icon: () => '❓',
  groups: [
    { name: 'editorial', title: 'Editorial', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'publication', title: 'Publication' },
  ],
  fields: [
    // === EDITORIAL ===
    {
      name: 'question',
      title: 'La question',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Ex: "Pourquoi dort-on si mal ?"',
      group: 'editorial',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'question', maxLength: 96 },
      validation: Rule => Rule.required(),
      group: 'editorial',
    },
    {
      name: 'chapeau',
      title: 'Chapeau',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(250),
      description: 'Accroche affichée sous la question sur la page dossiers (150-200 caractères)',
      group: 'editorial',
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
      group: 'editorial',
    },
    {
      name: 'articles',
      title: 'Les 7 articles du dossier',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'articleDossier' }, { type: 'production' }] }],
      validation: Rule => Rule.required().min(1).max(7),
      description: 'Articles du dossier, dans l\'ordre (J1 à J7). Préférer articleDossier pour les nouveaux dossiers.',
      group: 'editorial',
    },

    // === MEDIA ===
    {
      name: 'image',
      title: 'Image de couverture',
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
      group: 'editorial',
    },

    // === PUBLICATION ===
    {
      name: 'semaine',
      title: 'Numéro de semaine',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(53),
      description: 'S.17, S.18, etc.',
      group: 'publication',
    },
    {
      name: 'annee',
      title: 'Année',
      type: 'number',
      initialValue: new Date().getFullYear(),
      validation: Rule => Rule.required(),
      group: 'publication',
    },
    {
      name: 'dateDebut',
      title: 'Date de début',
      type: 'date',
      group: 'publication',
    },
    {
      name: 'heurePublication',
      title: 'Heure de publication quotidienne',
      type: 'string',
      description: 'Ex: "08:00" — heure à laquelle chaque article du dossier est publié',
      group: 'publication',
    },
    {
      name: 'isActive',
      title: 'Question active (affichée en homepage)',
      type: 'boolean',
      initialValue: false,
      description: 'Une seule question active à la fois',
      group: 'publication',
    },

    // === SEO ===
    {
      name: 'seoDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(170),
      description: '150-160 caractères pour la page dossier',
      group: 'seo',
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
