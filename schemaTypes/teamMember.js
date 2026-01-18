export default {
  name: 'teamMember',
  title: 'Équipe',
  type: 'document',
  icon: () => '👤',
  fields: [
    {
      name: 'nom',
      title: 'Nom complet',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Rôle / Poste',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      rows: 4,
      description: 'Courte présentation du membre'
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'imageUrl',
      title: 'URL photo (fallback)',
      type: 'url',
      description: 'URL directe de la photo si pas d\'upload'
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'reseaux',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter (username)',
          type: 'string',
          description: 'Sans le @'
        },
        {
          name: 'instagram',
          title: 'Instagram (username)',
          type: 'string',
          description: 'Sans le @'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn (URL complète)',
          type: 'url'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        }
      ]
    },
    {
      name: 'isActive',
      title: 'Actif',
      type: 'boolean',
      description: 'Afficher ce membre sur le site',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'nom',
      subtitle: 'role',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }]
    }
  ]
}
