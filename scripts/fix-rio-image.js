import { createClient } from '@sanity/client'
import https from 'https'
import { Readable } from 'stream'

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

// Image Pexels du Carnaval de Rio (danseuse de samba en costume)
const imageUrl = 'https://images.pexels.com/photos/2240771/pexels-photo-2240771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location).then(resolve).catch(reject)
      }
      const chunks = []
      response.on('data', chunk => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    }).on('error', reject)
  })
}

async function fixRioImage() {
  console.log('📥 Téléchargement de l\'image du Carnaval de Rio...')
  const imageBuffer = await downloadImage(imageUrl)
  console.log(`   Taille: ${(imageBuffer.length / 1024).toFixed(0)} KB`)

  console.log('📤 Upload vers Sanity...')
  const asset = await client.assets.upload('image', Readable.from(imageBuffer), {
    filename: 'carnaval-rio.jpg',
    contentType: 'image/jpeg'
  })
  console.log('   Asset ID:', asset._id)

  console.log('🔄 Mise à jour du document...')

  // Mettre à jour le draft
  await client
    .patch('drafts.9DkLqTNMEagTLw82PyLKhk')
    .set({
      'contenu[42].asset': {
        _type: 'reference',
        _ref: asset._id
      },
      'contenu[42].alt': 'Danseuse de samba en costume coloré lors du Carnaval de Rio',
      'contenu[42].caption': 'Carnaval de Rio - Le plus grand spectacle de rue au monde'
    })
    .commit()

  console.log('✅ Image du Carnaval de Rio mise à jour!')
}

fixRioImage().catch(console.error)
