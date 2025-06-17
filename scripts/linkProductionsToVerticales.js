// scripts/linkProductionsToVerticales.js
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01',
  useCdn: false
})

// Mapping des productions aux verticales basé sur le contenu
const productionToVerticaleMapping = {
  "Comprendre et apprivoiser son anxiété": "PSYCHOLOGIE",
  "Sport et santé mentale : le duo gagnant": "SANTÉ",
  "Les nouveaux codes de la société moderne": "SOCIÉTÉ",
  "L'équilibre vie professionnelle et personnelle": "CARRIÈRE",
  "Voyager seul : guide de l'aventure intérieure": "VOYAGE",
  "L'art comme thérapie : guérir par la créativité": "ART & CRÉATIVITÉ",
  "Minimalisme : moins pour vivre mieux": "SPIRITUALITÉ",
  "Communication non-violente : transformer les conflits": "RELATIONS",
  "L'intelligence artificielle va-t-elle remplacer l'art ?": "TECHNOLOGIE",
  "Méditation et neurosciences : ce que dit la science": "SPIRITUALITÉ",
  "L'art de la résilience entrepreneuriale": "CARRIÈRE",
  "Comment j'ai trouvé le sens en devenant agricultrice urbaine": "ENVIRONNEMENT"
}

async function linkProductionsToVerticales() {
  console.log('🔗 Liaison des productions aux verticales...\n')
  
  try {
    // Récupérer toutes les verticales
    const verticales = await client.fetch('*[_type == "verticale"]{ _id, nom }')
    const verticaleMap = {}
    verticales.forEach(v => {
      verticaleMap[v.nom] = v._id
    })
    console.log(`📊 ${verticales.length} verticales trouvées`)
    
    // Récupérer toutes les productions
    const productions = await client.fetch('*[_type == "production"]{ _id, titre, verticale }')
    console.log(`📚 ${productions.length} productions trouvées\n`)
    
    let updated = 0
    let alreadyLinked = 0
    
    for (const production of productions) {
      // Vérifier si la production a déjà une verticale
      if (production.verticale) {
        alreadyLinked++
        console.log(`✓ "${production.titre}" - déjà liée`)
        continue
      }
      
      // Trouver la verticale correspondante
      const verticaleName = productionToVerticaleMapping[production.titre]
      
      if (verticaleName && verticaleMap[verticaleName]) {
        // Mettre à jour la production
        await client
          .patch(production._id)
          .set({
            verticale: {
              _type: 'reference',
              _ref: verticaleMap[verticaleName]
            }
          })
          .commit()
        
        updated++
        console.log(`✅ "${production.titre}" → ${verticaleName}`)
      } else {
        console.log(`⚠️  "${production.titre}" - pas de verticale trouvée`)
      }
    }
    
    console.log(`\n📈 Résumé:`)
    console.log(`   - ${updated} productions mises à jour`)
    console.log(`   - ${alreadyLinked} productions déjà liées`)
    console.log(`   - ${productions.length - updated - alreadyLinked} productions non liées`)
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  }
}

linkProductionsToVerticales()