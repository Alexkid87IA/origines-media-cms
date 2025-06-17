const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  useCdn: false,
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01'
})

const colors = {
  'PSYCHOLOGIE': '#4299E1',
  'SOCIÉTÉ': '#ED8936',
  'CARRIÈRE': '#4A5568',
  'VOYAGE': '#48BB78',
  'ART & CRÉATIVITÉ': '#9F7AEA',
  'SPIRITUALITÉ': '#805AD5',
  'SANTÉ': '#38B2AC',
  'TECHNOLOGIE': '#3182CE',
  'RELATIONS': '#E53E3E',
  'ENVIRONNEMENT': '#38A169'
}

async function updateColors() {
  console.log('🎨 Mise à jour des couleurs...')
  
  // Récupérer tous les univers
  const univers = await client.fetch('*[_type == "univers"]')
  
  for (const univ of univers) {
    const color = colors[univ.nom]
    if (color && univ.couleur !== color) {
      await client
        .patch(univ._id)
        .set({ couleur: color })
        .commit()
      console.log(`✅ ${univ.nom} → ${color}`)
    }
  }
  
  console.log('✨ Terminé !')
}

updateColors()