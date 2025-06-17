// scripts/fixProductionsVerticale.js
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01'
})

async function fixProductionsWithoutVerticale() {
  try {
    // 1. Récupérer toutes les productions sans verticale
    const productionsSansVerticale = await client.fetch(`
      *[_type == "production" && !defined(verticale)] {
        _id,
        titre,
        univers
      }
    `)

    console.log(`\n🔍 Productions sans verticale: ${productionsSansVerticale.length}`)

    if (productionsSansVerticale.length === 0) {
      console.log('✅ Toutes les productions ont déjà une verticale!')
      return
    }

    // 2. Récupérer la première verticale disponible comme défaut
    const defaultVerticale = await client.fetch(`
      *[_type == "verticale"] | order(ordre asc) [0] {
        _id,
        nom
      }
    `)

    if (!defaultVerticale) {
      console.error('❌ Aucune verticale trouvée dans Sanity!')
      return
    }

    console.log(`\n📌 Verticale par défaut: ${defaultVerticale.nom}`)

    // 3. Mettre à jour chaque production
    for (const production of productionsSansVerticale) {
      console.log(`\n🔄 Mise à jour: "${production.titre}"`)
      
      await client
        .patch(production._id)
        .set({
          verticale: {
            _type: 'reference',
            _ref: defaultVerticale._id
          }
        })
        .commit()
      
      console.log(`✅ Mise à jour réussie`)
    }

    console.log('\n🎉 Toutes les productions ont été mises à jour!')

  } catch (error) {
    console.error('Erreur:', error)
  }
}

fixProductionsWithoutVerticale()