// scripts/createTags.js
// Script pour créer les tags thématiques dans Sanity
// Usage: npx sanity exec scripts/createTags.js --with-user-token

import { getCliClient } from 'sanity/cli'

const client = getCliClient()

// Tags à créer avec leurs couleurs
const TAGS = [
  {
    title: 'Résilience',
    nom: 'Résilience',
    slug: 'resilience',
    couleur: '#4F46E5', // Indigo (Psychologie)
    description: 'Histoires de dépassement et de force face à l\'adversité'
  },
  {
    title: 'Amour',
    nom: 'Amour',
    slug: 'amour',
    couleur: '#EF4444', // Rouge (Relations)
    description: 'Récits de rencontres, de couples et de sentiments'
  },
  {
    title: 'Succès',
    nom: 'Succès',
    slug: 'succes',
    couleur: '#06B6D4', // Cyan (Carrière)
    description: 'Parcours de réussite professionnelle et personnelle'
  },
  {
    title: 'Famille',
    nom: 'Famille',
    slug: 'famille',
    couleur: '#F59E0B', // Amber (Société)
    description: 'Histoires de liens familiaux et de transmission'
  },
  {
    title: 'Reconversion',
    nom: 'Reconversion',
    slug: 'reconversion',
    couleur: '#10B981', // Emerald (Carrière)
    description: 'Changements de vie et nouvelles directions'
  },
  {
    title: 'Dépassement',
    nom: 'Dépassement',
    slug: 'depassement',
    couleur: '#DC2626', // Rouge (Sport)
    description: 'Exploits sportifs et défis relevés'
  },
  {
    title: 'Inspiration',
    nom: 'Inspiration',
    slug: 'inspiration',
    couleur: '#8B5CF6', // Violet (Art & Créativité)
    description: 'Parcours créatifs et sources d\'inspiration'
  },
  {
    title: 'Parcours atypique',
    nom: 'Parcours atypique',
    slug: 'parcours-atypique',
    couleur: '#F97316', // Orange (Culture)
    description: 'Chemins de vie hors des sentiers battus'
  },
  // Tags supplémentaires utiles
  {
    title: 'Leadership',
    nom: 'Leadership',
    slug: 'leadership',
    couleur: '#1E40AF', // Navy (Politique)
    description: 'Histoires de leaders et de vision'
  },
  {
    title: 'Innovation',
    nom: 'Innovation',
    slug: 'innovation',
    couleur: '#3B82F6', // Blue (Technologie)
    description: 'Créateurs et pionniers du changement'
  },
  {
    title: 'Bien-être',
    nom: 'Bien-être',
    slug: 'bien-etre',
    couleur: '#A855F7', // Purple (Bien-être)
    description: 'Quête de l\'équilibre et du bonheur'
  },
  {
    title: 'Engagement',
    nom: 'Engagement',
    slug: 'engagement',
    couleur: '#22C55E', // Green (Environnement)
    description: 'Actions et causes défendues'
  },
]

async function createTags() {
  console.log('🏷️  Création des tags dans Sanity...\n')

  for (const tag of TAGS) {
    try {
      // Vérifier si le tag existe déjà
      const existingTag = await client.fetch(
        `*[_type == "tag" && slug.current == $slug][0]`,
        { slug: tag.slug }
      )

      if (existingTag) {
        console.log(`⏭️  Tag "${tag.title}" existe déjà (ID: ${existingTag._id})`)
        continue
      }

      // Créer le tag
      const result = await client.create({
        _type: 'tag',
        title: tag.title,
        nom: tag.nom,
        slug: {
          _type: 'slug',
          current: tag.slug
        },
        couleur: tag.couleur,
        description: tag.description
      })

      console.log(`✅ Tag "${tag.title}" créé (ID: ${result._id})`)
    } catch (error) {
      console.error(`❌ Erreur pour "${tag.title}":`, error.message)
    }
  }

  console.log('\n🎉 Script terminé!')
}

createTags()
