// check-image-urls.js
// Script pour vérifier les imageUrl ajoutées
// À placer dans origines-media-cms/scripts/

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: 'skkvUZJewxiArMa9pP5ljtNQUVZzVlrEw8AaEQMzSH5xzxBvrursfu7HA3repqU7AxH6zRtFXDwizNUsuai0js1cNykYZOCgcDg6rS4DwG1lCKyxeTH9IJGjrJLS3dhKLpOdf5O6IjpYdMOacJG3AOmygTivuczQopmFaLEHi83QfK1AoReY'
})

async function checkImageUrls() {
  console.log('\n🔍 VÉRIFICATION DES IMAGES AJOUTÉES\n')

  // Vérifier les productions
  const productions = await client.fetch(`
    *[_type == "production"] {
      titre,
      "hasImage": defined(image),
      "hasImageUrl": defined(imageUrl),
      imageUrl
    }
  `)

  console.log('📸 PRODUCTIONS :')
  let countWithUrl = 0
  productions.forEach(p => {
    if (p.hasImageUrl) {
      console.log(`  ✅ ${p.titre}`)
      countWithUrl++
    } else if (p.hasImage) {
      console.log(`  📷 ${p.titre} (a une vraie image)`)
    } else {
      console.log(`  ❌ ${p.titre}`)
    }
  })
  console.log(`  Total avec imageUrl : ${countWithUrl}/${productions.length}`)

  // Vérifier d'autres types
  const types = ['verticale', 'format', 'univers', 'portrait']
  
  for (const type of types) {
    console.log(`\n📸 ${type.toUpperCase()}S :`)
    const count = await client.fetch(`count(*[_type == "${type}" && defined(imageUrl)])`)
    const total = await client.fetch(`count(*[_type == "${type}"])`)
    console.log(`  ${count}/${total} ont une imageUrl`)
  }
}

checkImageUrls().catch(console.error)