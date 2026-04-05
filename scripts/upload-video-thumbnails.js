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

// Mapping des vidéos avec leurs IDs YouTube
const videosToUpdate = [
  {
    id: 'RCHt3VW1dMAczWlFEuzR65',
    titre: 'En after, elle a vécu le pire chez un homme',
    youtubeId: '10BLC3dkXJU'
  },
  {
    id: 'RCHt3VW1dMAczWlFEuzQl3',
    titre: 'Soso Maness en thérapie',
    youtubeId: 'o3zoq5-pOKI'
  },
  {
    id: 'RCHt3VW1dMAczWlFEuzQvZ',
    titre: 'Travailleur du sexe',
    youtubeId: 'hMVa3y5BfOA'
  }
]

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location).then(resolve).catch(reject)
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`HTTP ${response.statusCode}`))
      }
      const chunks = []
      response.on('data', chunk => chunks.push(chunk))
      response.on('end', () => resolve(Buffer.concat(chunks)))
      response.on('error', reject)
    }).on('error', reject)
  })
}

async function uploadThumbnails() {
  for (const video of videosToUpdate) {
    console.log(`\n📷 Traitement: ${video.titre}`)

    // Essayer maxresdefault d'abord, puis hqdefault si ça échoue
    const thumbnailUrls = [
      `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    ]

    let imageBuffer = null
    let usedUrl = null

    for (const url of thumbnailUrls) {
      try {
        console.log(`   📥 Téléchargement: ${url}`)
        imageBuffer = await downloadImage(url)
        usedUrl = url
        console.log(`   ✓ Taille: ${(imageBuffer.length / 1024).toFixed(0)} KB`)
        break
      } catch (err) {
        console.log(`   ✗ Échec: ${err.message}`)
      }
    }

    if (!imageBuffer) {
      console.log(`   ⚠️ Impossible de télécharger la miniature pour ${video.titre}`)
      continue
    }

    // Upload vers Sanity
    console.log('   📤 Upload vers Sanity...')
    const asset = await client.assets.upload('image', Readable.from(imageBuffer), {
      filename: `thumbnail-${video.youtubeId}.jpg`,
      contentType: 'image/jpeg'
    })
    console.log('   Asset ID:', asset._id)

    // Mettre à jour le document
    console.log('   🔄 Mise à jour du document...')
    await client
      .patch(video.id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      })
      .commit()

    console.log(`   ✅ ${video.titre} mis à jour!`)
  }

  console.log('\n🎉 Toutes les thumbnails ont été uploadées!')
}

uploadThumbnails().catch(console.error)
