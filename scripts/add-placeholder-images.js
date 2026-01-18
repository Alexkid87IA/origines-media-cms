// add-placeholder-images.js
// Script pour ajouter des images placeholder aux documents qui n'en ont pas
// À placer dans origines-media-cms/scripts/

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: 'skkvUZJewxiArMa9pP5ljtNQUVZzVlrEw8AaEQMzSH5xzxBvrursfu7HA3repqU7AxH6zRtFXDwizNUsuai0js1cNykYZOCgcDg6rS4DwG1lCKyxeTH9IJGjrJLS3dhKLpOdf5O6IjpYdMOacJG3AOmygTivuczQopmFaLEHi83QfK1AoReY'
})

// URLs d'images placeholder par type
const placeholderImages = {
  production: [
    'https://images.pexels.com/photos/6001381/pexels-photo-6001381.jpeg',
    'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg',
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
    'https://images.pexels.com/photos/5408919/pexels-photo-5408919.jpeg'
  ],
  portrait: [
    'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg',
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  ],
  verticale: {
    'PSYCHOLOGIE': 'https://images.pexels.com/photos/3958954/pexels-photo-3958954.jpeg',
    'CARRIÈRE': 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    'SPIRITUALITÉ': 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg',
    'SANTÉ': 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
    'ENVIRONNEMENT': 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg',
    'SOCIÉTÉ': 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
    'VOYAGE': 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg',
    'RELATIONS': 'https://images.pexels.com/photos/3985138/pexels-photo-3985138.jpeg',
    'ART & CRÉATIVITÉ': 'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg',
    'TECHNOLOGIE': 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
  },
  format: [
    'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg',
    'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    'https://images.pexels.com/photos/7176302/pexels-photo-7176302.jpeg',
    'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
    'https://images.pexels.com/photos/5676744/pexels-photo-5676744.jpeg'
  ],
  univers: [
    'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg',
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    'https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg',
    'https://images.pexels.com/photos/3856033/pexels-photo-3856033.jpeg',
    'https://images.pexels.com/photos/6224574/pexels-photo-6224574.jpeg'
  ]
}

async function addPlaceholderImages() {
  console.log('\n🖼️  AJOUT D\'IMAGES PLACEHOLDER\n')

  // 1. Productions sans image
  const productionsSansImage = await client.fetch(`
    *[_type == "production" && !defined(image)] {
      _id,
      titre
    }
  `)

  console.log(`\n📸 Ajout d'images à ${productionsSansImage.length} productions...`)
  for (let i = 0; i < productionsSansImage.length; i++) {
    const prod = productionsSansImage[i]
    const imageUrl = placeholderImages.production[i % placeholderImages.production.length]
    
    await client
      .patch(prod._id)
      .set({ imageUrl: imageUrl })
      .commit()
    
    console.log(`  ✅ ${prod.titre}`)
  }

  // 2. Verticales sans image
  const verticalesSansImage = await client.fetch(`
    *[_type == "verticale" && !defined(image)] {
      _id,
      nom
    }
  `)

  console.log(`\n📸 Ajout d'images à ${verticalesSansImage.length} verticales...`)
  for (const vert of verticalesSansImage) {
    const imageUrl = placeholderImages.verticale[vert.nom] || placeholderImages.verticale['SOCIÉTÉ']
    
    await client
      .patch(vert._id)
      .set({ imageUrl: imageUrl })
      .commit()
    
    console.log(`  ✅ ${vert.nom}`)
  }

  // 3. Formats sans image
  const formatsSansImage = await client.fetch(`
    *[_type == "format" && !defined(image) && !defined(imageHero)] {
      _id,
      nom
    }
  `)

  console.log(`\n📸 Ajout d'images à ${formatsSansImage.length} formats...`)
  for (let i = 0; i < formatsSansImage.length; i++) {
    const format = formatsSansImage[i]
    const imageUrl = placeholderImages.format[i % placeholderImages.format.length]
    
    await client
      .patch(format._id)
      .set({ imageUrl: imageUrl })
      .commit()
    
    console.log(`  ✅ ${format.nom || 'Format sans nom'}`)
  }

  // 4. Univers sans image
  const universSansImage = await client.fetch(`
    *[_type == "univers" && !defined(image)] {
      _id,
      nom
    }
  `)

  console.log(`\n📸 Ajout d'images à ${universSansImage.length} univers...`)
  for (let i = 0; i < universSansImage.length; i++) {
    const univ = universSansImage[i]
    const imageUrl = placeholderImages.univers[i % placeholderImages.univers.length]
    
    await client
      .patch(univ._id)
      .set({ imageUrl: imageUrl })
      .commit()
    
    console.log(`  ✅ ${univ.nom}`)
  }

  // 5. Portraits sans image
  const portraitsSansImage = await client.fetch(`
    *[_type == "portrait" && !defined(image)] {
      _id,
      titre
    }
  `)

  console.log(`\n📸 Ajout d'images à ${portraitsSansImage.length} portraits...`)
  for (let i = 0; i < portraitsSansImage.length; i++) {
    const portrait = portraitsSansImage[i]
    const imageUrl = placeholderImages.portrait[i % placeholderImages.portrait.length]
    
    await client
      .patch(portrait._id)
      .set({ imageUrl: imageUrl })
      .commit()
    
    console.log(`  ✅ ${portrait.titre}`)
  }

  console.log('\n✨ Images placeholder ajoutées avec succès !\n')
}

addPlaceholderImages().catch(console.error)