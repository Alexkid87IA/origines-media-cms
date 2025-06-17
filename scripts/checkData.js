// scripts/checkData.js
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01',
  useCdn: false
})

async function checkData() {
  console.log('🔍 Vérification des données dans Sanity...\n')
  
  // Vérifier les verticales
  const verticales = await client.fetch('*[_type == "verticale"]{ _id, nom, couleurDominante }')
  console.log(`📊 VERTICALES (${verticales.length})`)
  verticales.forEach(v => {
    console.log(`   - ${v.nom} (${v.couleurDominante})`)
  })
  
  // Vérifier les productions
  const productions = await client.fetch('*[_type == "production"]{ _id, titre, verticale }')
  console.log(`\n📚 PRODUCTIONS (${productions.length})`)
  productions.forEach(p => {
    console.log(`   - ${p.titre} ${p.verticale ? '✅ (liée)' : '❌ (non liée)'}`)
  })
  
  // Vérifier les productions par verticale
  console.log('\n🔗 PRODUCTIONS PAR VERTICALE:')
  for (const verticale of verticales) {
    const prods = await client.fetch(
      '*[_type == "production" && references($verticaleId)]{ titre }',
      { verticaleId: verticale._id }
    )
    console.log(`\n   ${verticale.nom}: ${prods.length} productions`)
    prods.forEach(p => console.log(`      - ${p.titre}`))
  }
  
  // Vérifier les autres types
  const portraits = await client.fetch('count(*[_type == "portrait"])')
  const videos = await client.fetch('count(*[_type == "video"])')
  const univers = await client.fetch('count(*[_type == "univers"])')
  
  console.log('\n📈 AUTRES CONTENUS:')
  console.log(`   - Portraits: ${portraits}`)
  console.log(`   - Vidéos: ${videos}`)
  console.log(`   - Univers: ${univers}`)
}

checkData()