// schemaTypes/blockContent.js
// Contenu riche avec tous les blocs éditoriaux Origines Media

import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Contenu enrichi',
  name: 'blockContent',
  type: 'array',
  of: [
    // ========== BLOC TEXTE DE BASE ==========
    defineArrayMember({
      title: 'Bloc texte',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Titre H2', value: 'h2'},
        {title: 'Titre H3', value: 'h3'},
        {title: 'Titre H4', value: 'h4'},
        {title: 'Citation', value: 'blockquote'},
        {title: 'Chapô / Lead', value: 'lead'},
      ],
      lists: [
        {title: 'Liste à puces', value: 'bullet'},
        {title: 'Liste numérotée', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
          {title: 'Souligné', value: 'underline'},
          {title: 'Barré', value: 'strike-through'},
          {title: 'Code', value: 'code'},
          {title: 'Surligné', value: 'highlight'}
        ],
        annotations: [
          {
            title: 'Lien',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              },
              {
                title: 'Ouvrir dans un nouvel onglet',
                name: 'blank',
                type: 'boolean',
                initialValue: true
              }
            ],
          },
          {
            title: 'Lien interne',
            name: 'internalLink',
            type: 'object',
            fields: [
              {
                title: 'Article',
                name: 'reference',
                type: 'reference',
                to: [{ type: 'production' }]
              }
            ]
          }
        ],
      },
    }),

    // ========== MÉDIAS ==========
    defineArrayMember({
      type: 'image',
      title: 'Image',
      options: {hotspot: true},
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Légende',
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif (SEO)',
          description: 'Important pour le référencement et l\'accessibilité'
        },
        {
          name: 'credit',
          type: 'string',
          title: 'Crédit photo'
        },
        {
          name: 'size',
          type: 'string',
          title: 'Taille',
          options: {
            list: [
              {title: 'Normale', value: 'normal'},
              {title: 'Pleine largeur', value: 'full'},
              {title: 'Petite (alignée)', value: 'small'}
            ]
          },
          initialValue: 'normal'
        }
      ]
    }),
    defineArrayMember({
      type: 'youtube',
      title: 'Vidéo YouTube'
    }),
    defineArrayMember({
      type: 'imageGallery',
      title: 'Galerie d\'images'
    }),
    defineArrayMember({
      type: 'audioPlayer',
      title: 'Audio / Podcast'
    }),

    // ========== EMBEDS SOCIAUX ==========
    defineArrayMember({
      type: 'socialEmbed',
      title: 'Embed Social (Instagram, Twitter, TikTok)'
    }),

    // ========== CITATIONS & TÉMOIGNAGES ==========
    defineArrayMember({
      type: 'styledQuote',
      title: 'Citation stylée'
    }),

    // ========== BLOCS ÉDITORIAUX ==========
    defineArrayMember({
      type: 'callout',
      title: 'Encadré / Callout'
    }),
    defineArrayMember({
      type: 'keyTakeaways',
      title: 'Points clés à retenir'
    }),
    defineArrayMember({
      type: 'accordion',
      title: 'Accordéon / FAQ'
    }),
    defineArrayMember({
      type: 'progressSteps',
      title: 'Étapes / Timeline'
    }),

    // ========== CALL TO ACTION ==========
    defineArrayMember({
      type: 'ctaButton',
      title: 'Bouton CTA'
    }),
    defineArrayMember({
      type: 'newsletterCta',
      title: 'Inscription Newsletter'
    }),
    defineArrayMember({
      type: 'relatedArticles',
      title: 'Articles liés'
    }),

    // ========== RECOMMANDATIONS ==========
    defineArrayMember({
      type: 'recommendationBlock',
      title: 'Recommandation (livre, film, podcast...)'
    }),
  ],
})
