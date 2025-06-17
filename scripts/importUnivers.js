// scripts/importUnivers.js
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  useCdn: false,
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01'
})

const univers = [
  { nom: 'PSYCHOLOGIE', couleur: '#4299E1', description: 'Pour mieux se comprendre et grandir.', ordre: 1 },
  { nom: 'SOCIÉTÉ', couleur: '#ED8936', description: 'Explorer les changements et les tabous.', ordre: 2 },
  { nom: 'CARRIÈRE', couleur: '#4A5568', description: 'Parcours, reconversions et équilibre de vie.', ordre: 3 },
  { nom: 'VOYAGE', couleur: '#48BB78', description: 'Des quêtes identitaires et expériences transformatrices.', ordre: 4 },
  { nom: 'ART & CRÉATIVITÉ', couleur: '#9F7AEA', description: "L'art comme levier de résilience et de changement.", ordre: 5 },
  { nom: 'SPIRITUALITÉ', couleur: '#805AD5', description: 'Nourrir la recherche de sens et la connexion.', ordre: 6 },
  { nom: 'SANTÉ', couleur: '#38B2AC', description: 'Prendre soin de son corps et de son esprit.', ordre: 7 },
  { nom: 'TECHNOLOGIE', couleur: '#3182CE', description: 'Comprendre et maîtriser le monde numérique.', ordre: 8 },
  { nom: 'RELATIONS', couleur: '#E53E3E', description: 'Cultiver des liens authentiques et épanouissants.', ordre: 9 },
  { nom: 'ENVIRONNEMENT', couleur: '#38A169', description: 'Vivre en harmonie avec la nature et la planète.', ordre: 10 }
]

async function importUnivers() {
  console.log('🚀 Import des univers...')
  
  for (const univ of univers) {
    try {
      const doc = {
        _type: 'univers',
        nom: univ.nom,
        couleur: univ.couleur,
        description: univ.description,
        ordre: univ.ordre,
        slug: {
          _type: 'slug',
          current: univ.nom.toLowerCase()
            .replace(/&/g, '-et-')
            .replace(/\s+/g, '-')
            .replace(/[àáäâ]/g, 'a')
            .replace(/[èéëê]/g, 'e')
            .replace(/[ìíïî]/g, 'i')
            .replace(/[òóöô]/g, 'o')
            .replace(/[ùúüû]/g, 'u')
        }
      }
      
      const result = await client.create(doc)
      console.log(`✅ ${univ.nom} créé avec succès`)
    } catch (error) {
      console.error(`❌ Erreur pour ${univ.nom}:`, error)
    }
  }
  
  console.log('✨ Import terminé !')
}

importUnivers()