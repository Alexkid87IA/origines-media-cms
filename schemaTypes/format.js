// origines-media-cms/schemaTypes/format.js

export default {
  name: 'format',
  title: 'Formats',
  type: 'document',
  fields: [
    // === INFORMATIONS DE BASE ===
    {
      name: 'nom',
      title: 'Nom du format',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'nom',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'couleur',
      title: 'Couleur principale (hex)',
      type: 'string',
      description: 'Exemple: #8B5CF6',
      validation: Rule => Rule.required()
    },
    
    // === CONTENU HERO ===
    {
      name: 'tagline',
      title: 'Tagline (phrase d\'accroche)',
      type: 'string',
      description: 'Ex: "Des conversations intimes qui transforment"'
    },
    {
      name: 'description',
      title: 'Description longue',
      type: 'text',
      rows: 4
    },
    {
      name: 'imageHero',
      title: 'Image Hero',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'videoTeaser',
      title: 'URL Vidéo de fond (optionnel)',
      type: 'url',
      description: 'Lien vers une vidéo MP4 pour le hero'
    },
    
    // === STATISTIQUES ===
    {
      name: 'stats',
      title: 'Statistiques',
      type: 'object',
      fields: [
        {
          name: 'frequence',
          title: 'Fréquence de publication',
          type: 'string',
          options: {
            list: [
              { title: 'Quotidien', value: 'Quotidien' },
              { title: 'Hebdomadaire', value: 'Hebdomadaire' },
              { title: 'Bi-mensuel', value: 'Bi-mensuel' },
              { title: 'Mensuel', value: 'Mensuel' }
            ]
          }
        },
        {
          name: 'dureeTotal',
          title: 'Durée totale approximative',
          type: 'string',
          description: 'Ex: "12h30"'
        },
        {
          name: 'vuesMoyennes',
          title: 'Vues moyennes par épisode',
          type: 'number'
        }
      ]
    },
    
    // === NOTATION ET RÉCOMPENSES ===
    {
      name: 'rating',
      title: 'Note moyenne',
      type: 'number',
      validation: Rule => Rule.min(0).max(5).precision(1),
      description: 'De 0 à 5'
    },
    {
      name: 'awards',
      title: 'Prix et récompenses',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Ex: "Emmy Digital 2024"'
    },
    
    // === ANIMATEUR PRINCIPAL ===
    {
      name: 'animateur',
      title: 'Animateur principal',
      type: 'object',
      fields: [
        {
          name: 'nom',
          title: 'Nom complet',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'bio',
          title: 'Biographie',
          type: 'text',
          rows: 4
        },
        {
          name: 'avatar',
          title: 'Photo de profil',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'role',
          title: 'Rôle',
          type: 'string',
          description: 'Ex: "Animatrice", "Présentateur"'
        },
        {
          name: 'reseaux',
          title: 'Réseaux sociaux',
          type: 'object',
          fields: [
            {
              name: 'twitter',
              title: 'Twitter (sans @)',
              type: 'string'
            },
            {
              name: 'instagram',
              title: 'Instagram (sans @)',
              type: 'string'
            },
            {
              name: 'linkedin',
              title: 'LinkedIn (nom d\'utilisateur)',
              type: 'string'
            },
            {
              name: 'website',
              title: 'Site web personnel',
              type: 'url'
            }
          ]
        }
      ]
    },
    
    // === ÉQUIPE ===
    {
      name: 'equipe',
      title: 'Membres de l\'équipe',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Membre',
        fields: [
          {
            name: 'nom',
            title: 'Nom',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'role',
            title: 'Rôle',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'avatar',
            title: 'Photo',
            type: 'image',
            options: {
              hotspot: true
            }
          },
          {
            name: 'specialite',
            title: 'Spécialité',
            type: 'string'
          }
        ]
      }]
    },
    
    // === CRÉDITS PRODUCTION ===
    {
      name: 'credits',
      title: 'Crédits de production',
      type: 'object',
      fields: [
        {
          name: 'producteur',
          title: 'Producteur',
          type: 'string'
        },
        {
          name: 'realisateur',
          title: 'Réalisateur',
          type: 'string'
        },
        {
          name: 'montage',
          title: 'Montage',
          type: 'string'
        },
        {
          name: 'musique',
          title: 'Musique',
          type: 'string'
        },
        {
          name: 'directionArtistique',
          title: 'Direction artistique',
          type: 'string'
        }
      ]
    }
  ],
  
  preview: {
    select: {
      title: 'nom',
      subtitle: 'tagline',
      media: 'imageHero'
    }
  }
}