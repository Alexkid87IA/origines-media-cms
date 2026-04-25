export default {
  name: 'articleDossier',
  title: 'Articles Dossier',
  type: 'document',
  icon: () => '📂',
  groups: [
    { name: 'editorial', title: 'Editorial', default: true },
    { name: 'seo', title: 'SEO & FAQ' },
    { name: 'sources', title: 'Sources' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    // === EDITORIAL ===
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'editorial',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titre', maxLength: 96 },
      validation: Rule => Rule.required(),
      group: 'editorial',
    },
    {
      name: 'dossier',
      title: 'Dossier parent',
      type: 'reference',
      to: [{ type: 'questionDeLaSemaine' }],
      validation: Rule => Rule.required(),
      description: 'La question de la semaine a laquelle cet article appartient',
      group: 'editorial',
    },
    {
      name: 'jourNumero',
      title: 'Jour (1-7)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(7),
      description: 'Jour de publication dans le dossier (1 = lundi, 7 = dimanche)',
      group: 'editorial',
    },
    {
      name: 'angle',
      title: 'Angle editorial',
      type: 'string',
      options: {
        list: [
          { title: 'Psychologie', value: 'psychologie' },
          { title: 'Science', value: 'science' },
          { title: 'Temoignage', value: 'temoignage' },
          { title: 'Societe', value: 'societe' },
          { title: 'Histoire', value: 'histoire' },
          { title: 'Pratique', value: 'pratique' },
          { title: 'Synthese', value: 'synthese' },
        ],
        layout: 'radio',
      },
      description: 'Chaque jour couvre un angle different',
      group: 'editorial',
    },
    {
      name: 'chapeau',
      title: 'Chapeau',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200),
      description: '150-200 caracteres. Resume affiche sous le titre et utilise comme extrait.',
      group: 'editorial',
    },
    {
      name: 'contenu',
      title: 'Contenu',
      type: 'blockContent',
      group: 'editorial',
    },
    {
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'editorial',
    },
    {
      name: 'datePublication',
      title: 'Date de publication',
      type: 'datetime',
      group: 'editorial',
    },
    {
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'string',
      description: 'Ex: "14 min"',
      group: 'editorial',
    },
    {
      name: 'univpilar',
      title: 'Univers',
      type: 'string',
      options: {
        list: [
          { title: "L'Esprit", value: 'esprit' },
          { title: 'Le Corps', value: 'corps' },
          { title: 'Les Liens', value: 'liens' },
          { title: 'Le Monde', value: 'monde' },
          { title: "L'Avenir", value: 'avenir' },
        ],
        layout: 'radio',
      },
      description: 'Herite normalement du dossier parent, mais peut etre different',
      group: 'editorial',
    },

    // === MEDIA ===
    {
      name: 'image',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      description: 'Minimum 1200px, paysage, WebP/AVIF',
      group: 'media',
    },
    {
      name: 'imageAlt',
      title: 'Alt de l\'image',
      type: 'string',
      group: 'media',
    },

    // === SEO & FAQ ===
    {
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      validation: Rule => Rule.max(70),
      description: '50-60 caracteres. Override du <title>.',
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'Meta description',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.max(170),
      description: '150-160 caracteres.',
      group: 'seo',
    },
    {
      name: 'keyTakeaways',
      title: 'Points cles',
      type: 'array',
      of: [{ type: 'string' }],
      description: '3-5 points cles affiches en encadre',
      group: 'seo',
    },
    {
      name: 'faq',
      title: 'FAQ (schema markup)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'answer',
            title: 'Reponse',
            type: 'text',
            rows: 3,
            validation: Rule => Rule.required(),
          },
        ],
        preview: {
          select: { title: 'question' },
        },
      }],
      description: 'Questions/reponses pour le schema FAQPage (SEO)',
      group: 'seo',
    },

    // === SOURCES ===
    {
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'name',
            title: 'Nom / Titre',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'url',
            title: 'URL',
            type: 'url',
          },
          {
            name: 'year',
            title: 'Annee',
            type: 'string',
          },
          {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
              list: [
                { title: 'Etude scientifique', value: 'study' },
                { title: 'Livre', value: 'book' },
                { title: 'Article presse', value: 'press' },
                { title: 'Rapport / Statistique', value: 'report' },
                { title: 'Expert / Interview', value: 'expert' },
              ],
            },
          },
        ],
        preview: {
          select: { name: 'name', year: 'year', type: 'type' },
          prepare({ name, year, type }) {
            return {
              title: name,
              subtitle: [type, year].filter(Boolean).join(' · '),
            }
          },
        },
      }],
      description: 'Toutes les sources citees dans l\'article',
      group: 'sources',
    },
  ],

  orderings: [
    {
      title: 'Jour (croissant)',
      name: 'jourAsc',
      by: [{ field: 'jourNumero', direction: 'asc' }],
    },
    {
      title: 'Date de publication',
      name: 'dateDesc',
      by: [{ field: 'datePublication', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      titre: 'titre',
      jour: 'jourNumero',
      angle: 'angle',
      dossierQuestion: 'dossier.question',
      dossierSemaine: 'dossier.semaine',
      media: 'image',
    },
    prepare({ titre, jour, angle, dossierQuestion, dossierSemaine, media }) {
      const ANGLES = {
        psychologie: 'Psy',
        science: 'Sci',
        temoignage: 'Tem',
        societe: 'Soc',
        histoire: 'His',
        pratique: 'Pra',
        synthese: 'Syn',
      }
      return {
        title: `J${jour || '?'} — ${titre}`,
        subtitle: `S.${dossierSemaine || '?'} · ${dossierQuestion || ''} · ${ANGLES[angle] || angle || ''}`,
        media,
      }
    },
  },
}
