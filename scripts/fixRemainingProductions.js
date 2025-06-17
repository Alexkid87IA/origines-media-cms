// scripts/fixRemainingProductions.js
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01',
  useCdn: false
})

async function fixRemainingProductions() {
  console.log('🔧 Correction des productions non liées...\n')
  
  try {
    // Récupérer les verticales ART & CRÉATIVITÉ et TECHNOLOGIE
    const artVerticale = await client.fetch('*[_type == "verticale" && nom == "ART & CRÉATIVITÉ"][0]{ _id, nom }')
    const techVerticale = await client.fetch('*[_type == "verticale" && nom == "TECHNOLOGIE"][0]{ _id, nom }')
    
    if (!artVerticale || !techVerticale) {
      console.error('❌ Verticales non trouvées')
      return
    }
    
    // Production 1: L'art comme thérapie
    const artProduction = await client.fetch('*[_type == "production" && titre match "art comme thérapie"][0]{ _id, titre }')
    if (artProduction) {
      await client
        .patch(artProduction._id)
        .set({
          verticale: {
            _type: 'reference',
            _ref: artVerticale._id
          }
        })
        .commit()
      console.log(`✅ "${artProduction.titre}" → ART & CRÉATIVITÉ`)
    }
    
    // Production 2: L'intelligence artificielle
    const iaProduction = await client.fetch('*[_type == "production" && titre match "intelligence artificielle"][0]{ _id, titre }')
    if (iaProduction) {
      await client
        .patch(iaProduction._id)
        .set({
          verticale: {
            _type: 'reference',
            _ref: techVerticale._id
          }
        })
        .commit()
      console.log(`✅ "${iaProduction.titre}" → TECHNOLOGIE`)
    }
    
    console.log('\n✨ Terminé !')
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

fixRemainingProductions()