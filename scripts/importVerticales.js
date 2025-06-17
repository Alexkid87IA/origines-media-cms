const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  useCdn: false,
  token: 'skA7HLjAG0pmD24roisS3BoHprcmsHp7uwmZqVSatsVEMAs3tbrRJPv3Pa2AJ90i6u2hssipZs3sbm3yVMjamkPO4l9xjquwSWrA3QLzm9rg8VH95NcekT5wvaqgL4QFnZnZIpUBbovy8RfVD1krvosBdORhxgL4LFJC8qLLFC2WYEOgu1AP',
  apiVersion: '2024-03-01'
})

const verticales = [
  {
    nom: 'PSYCHOLOGIE',
    slug: 'psychologie',
    couleurDominante: '#10B981',
    description: 'Explorez les méandres de l\'esprit humain, les comportements et les émotions qui nous définissent.',
    ordre: 1
  },
  {
    nom: 'SOCIÉTÉ',
    slug: 'societe',
    couleurDominante: '#F59E0B',
    description: 'Décryptez les enjeux sociétaux, les mouvements culturels et les transformations de notre époque.',
    ordre: 2
  },
  {
    nom: 'CARRIÈRE',
    slug: 'carriere',
    couleurDominante: '#3B82F6',
    description: 'Développez votre potentiel professionnel avec des conseils d\'experts et des parcours inspirants.',
    ordre: 3
  },
  {
    nom: 'VOYAGE',
    slug: 'voyage',
    couleurDominante: '#EF4444',
    description: 'Partez à la découverte du monde, des cultures lointaines et des destinations extraordinaires.',
    ordre: 4
  },
  {
    nom: 'ART & CRÉATIVITÉ',
    slug: 'art-creativite',
    couleurDominante: '#8B5CF6',
    description: 'Plongez dans l\'univers des créateurs, des artistes et des processus créatifs qui façonnent notre culture.',
    ordre: 5
  },
  {
    nom: 'SPIRITUALITÉ',
    slug: 'spiritualite',
    couleurDominante: '#EC4899',
    description: 'Explorez les dimensions spirituelles de l\'existence, la méditation et la quête de sens.',
    ordre: 6
  },
  {
    nom: 'SANTÉ',
    slug: 'sante',
    couleurDominante: '#14B8A6',
    description: 'Découvrez les clés du bien-être physique et mental pour une vie équilibrée et épanouie.',
    ordre: 7
  },
  {
    nom: 'TECHNOLOGIE',
    slug: 'technologie',
    couleurDominante: '#6366F1',
    description: 'Comprenez les innovations qui transforment notre monde et façonnent notre avenir numérique.',
    ordre: 8
  },
  {
    nom: 'RELATIONS',
    slug: 'relations',
    couleurDominante: '#F43F5E',
    description: 'Explorez la complexité des relations humaines, de l\'amour à l\'amitié en passant par la famille.',
    ordre: 9
  },
  {
    nom: 'ENVIRONNEMENT',
    slug: 'environnement',
    couleurDominante: '#22C55E',
    description: 'Engagez-vous pour la planète avec des initiatives écologiques et des solutions durables.',
    ordre: 10
  }
]

async function importVerticales() {
  console.log('🎬 Import des verticales...')
  
  for (const verticale of verticales) {
    try {
      const doc = {
        _type: 'verticale',
        nom: verticale.nom,
        slug: {
          _type: 'slug',
          current: verticale.slug
        },
        couleurDominante: verticale.couleurDominante,
        description: verticale.description,
        ordre: verticale.ordre
      }
      
      await client.create(doc)
      console.log(`✅ Verticale "${verticale.nom}" créée (${verticale.couleurDominante})`)
    } catch (error) {
      console.error(`❌ Erreur pour "${verticale.nom}":`, error.message)
    }
  }
  
  console.log('✨ Import des verticales terminé !')
}

importVerticales()