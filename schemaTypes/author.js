import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Auteurs',
  type: 'document',
  icon: () => '✍️',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      description: 'URL: /equipe/{slug}',
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      description: 'Ex: "Grand reporter · L\'Esprit", "Journaliste · Les Liens"',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif (SEO & accessibilité)',
          type: 'string',
          description: 'Décris ce que montre l\'image en 5-15 mots.',
          validation: Rule => Rule.required().warning('Un texte alternatif est fortement recommandé pour le SEO.'),
        }),
      ],
      description: 'Photo carrée, minimum 400x400px',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      rows: 4,
      description: 'E-E-A-T : bio professionnelle détaillée pour Google Discover',
    }),
    defineField({
      name: 'specialites',
      title: 'Spécialités',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'social',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter/X', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
