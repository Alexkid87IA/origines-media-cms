export default {
    name: 'portrait',
    title: 'Portraits / Histoires',
    type: 'document',
    groups: [
      { name: 'infos', title: 'Informations principales', default: true },
      { name: 'taxonomie', title: 'Taxonomie & Relations' },
      { name: 'biographie', title: 'Biographie' },
      { name: 'media', title: 'Médias' }
    ],
    fields: [
      // === INFORMATIONS PRINCIPALES ===
      {
        name: 'titre',
        title: 'Titre / Nom',
        type: 'string',
        validation: Rule => Rule.required(),
        group: 'infos'
      },
      {
        name: 'accroche',
        title: 'Accroche',
        type: 'text',
        rows: 3,
        description: 'Courte description accrocheuse pour les listes',
        group: 'infos'
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'titre',
          maxLength: 96
        },
        validation: Rule => Rule.required(),
        group: 'infos'
      },
      {
        name: 'ordre',
        title: 'Ordre d\'affichage',
        type: 'number',
        group: 'infos'
      },

      // === TAXONOMIE & RELATIONS ===
      {
        name: 'univers',
        title: 'Univers',
        type: 'reference',
        to: [{ type: 'univers' }],
        description: 'L\'univers thématique principal de cette histoire',
        group: 'taxonomie'
      },
      {
        name: 'verticale',
        title: 'Verticale',
        type: 'reference',
        to: [{ type: 'verticale' }],
        description: 'La catégorie principale (optionnel si univers sélectionné)',
        group: 'taxonomie'
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'tag' }] }],
        description: 'Tags thématiques (Résilience, Amour, Succès, etc.)',
        group: 'taxonomie'
      },
      {
        name: 'categorie',
        title: 'Catégorie (legacy)',
        type: 'string',
        options: {
          list: [
            { title: 'Carrière', value: 'CARRIÈRE' },
            { title: 'Voyage', value: 'VOYAGE' },
            { title: 'Psychologie', value: 'PSYCHOLOGIE' },
            { title: 'Art & Créativité', value: 'ART & CRÉATIVITÉ' },
            { title: 'Spiritualité', value: 'SPIRITUALITÉ' },
            { title: 'Société', value: 'SOCIÉTÉ' }
          ]
        },
        description: '⚠️ Ancien système - préférez utiliser Univers + Tags',
        group: 'taxonomie'
      },
      {
        name: 'productions',
        title: 'Productions associées',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'production' }] }],
        description: 'Articles/productions liés à cette histoire',
        group: 'taxonomie'
      },

      // === CHAMPS BIOGRAPHIQUES ===
      {
        name: 'biographie',
        title: 'Biographie',
        type: 'text',
        rows: 8,
        description: 'Biographie complète de la personnalité',
        group: 'biographie'
      },
      {
        name: 'citation',
        title: 'Citation',
        type: 'text',
        rows: 2,
        description: 'Citation marquante de la personnalité',
        group: 'biographie'
      },
      {
        name: 'dateNaissance',
        title: 'Date de naissance',
        type: 'date',
        options: {
          dateFormat: 'DD/MM/YYYY'
        },
        group: 'biographie'
      },
      {
        name: 'lieuNaissance',
        title: 'Lieu de naissance',
        type: 'string',
        group: 'biographie'
      },

      // === MÉDIAS ===
      {
        name: 'image',
        title: 'Image principale',
        type: 'image',
        options: {
          hotspot: true
        },
        group: 'media'
      },
      {
        name: 'imageUrl',
        title: 'URL image (fallback)',
        type: 'url',
        description: 'URL directe de l\'image si pas d\'upload',
        group: 'media'
      }
    ],
    preview: {
      select: {
        title: 'titre',
        univers: 'univers.nom',
        categorie: 'categorie',
        media: 'image'
      },
      prepare(selection) {
        const { title, univers, categorie, media } = selection
        return {
          title: title,
          subtitle: univers || categorie || 'Non catégorisé',
          media: media
        }
      }
    }
  }