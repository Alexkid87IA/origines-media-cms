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

function extractYoutubeId(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  return match ? match[1] : null
}

async function cleanDuplicates() {
  console.log('📊 Récupération des vidéos...')
  const videos = await client.fetch('*[_type == "production" && typeArticle == "video"]{_id, titre, image, videoUrl}')
  console.log(`   Total: ${videos.length} vidéos\n`)

  // Grouper par URL YouTube
  const byYoutubeUrl = {}
  for (const video of videos) {
    const key = video.videoUrl || video._id
    if (!byYoutubeUrl[key]) {
      byYoutubeUrl[key] = []
    }
    byYoutubeUrl[key].push(video)
  }

  // Identifier les doublons
  const duplicateGroups = Object.entries(byYoutubeUrl).filter(([_, vids]) => vids.length > 1)
  console.log(`🔍 ${duplicateGroups.length} groupes de doublons trouvés\n`)

  const toDelete = []
  const toKeep = []
  const needsThumbnail = []

  for (const [url, vids] of duplicateGroups) {
    // Trier: ceux avec image en premier
    vids.sort((a, b) => {
      if (a.image && !b.image) return -1
      if (!a.image && b.image) return 1
      return 0
    })

    const keeper = vids[0]
    toKeep.push(keeper)

    if (!keeper.image) {
      needsThumbnail.push(keeper)
    }

    for (let i = 1; i < vids.length; i++) {
      toDelete.push(vids[i])
    }
  }

  // Vidéos uniques sans image
  const uniqueVideos = Object.entries(byYoutubeUrl)
    .filter(([_, vids]) => vids.length === 1)
    .map(([_, vids]) => vids[0])

  for (const video of uniqueVideos) {
    if (!video.image) {
      needsThumbnail.push(video)
    }
  }

  console.log('📋 RÉSUMÉ:')
  console.log(`   - Vidéos à supprimer: ${toDelete.length}`)
  console.log(`   - Vidéos à garder (des groupes doublons): ${toKeep.length}`)
  console.log(`   - Vidéos sans thumbnail à corriger: ${needsThumbnail.length}`)
  console.log('')

  // Afficher les doublons
  console.log('🗑️  DOUBLONS À SUPPRIMER:')
  for (const video of toDelete) {
    console.log(`   - ${video.titre} (${video._id})`)
  }
  console.log('')

  // Afficher les vidéos sans thumbnail
  if (needsThumbnail.length > 0) {
    console.log('🖼️  VIDÉOS SANS THUMBNAIL:')
    for (const video of needsThumbnail) {
      console.log(`   - ${video.titre} (${video._id})`)
    }
    console.log('')
  }

  // Mode dry-run ou exécution
  const dryRun = process.argv.includes('--dry-run')

  if (dryRun) {
    console.log('⚠️  Mode DRY-RUN - Aucune modification effectuée')
    return
  }

  // Supprimer les doublons
  if (toDelete.length > 0) {
    console.log('\n🗑️  Suppression des doublons...')
    for (const video of toDelete) {
      try {
        await client.delete(video._id)
        console.log(`   ✅ Supprimé: ${video.titre}`)
      } catch (err) {
        console.log(`   ❌ Erreur: ${video.titre} - ${err.message}`)
      }
    }
  }

  // Ajouter les thumbnails manquantes
  if (needsThumbnail.length > 0) {
    console.log('\n🖼️  Ajout des thumbnails manquantes...')
    for (const video of needsThumbnail) {
      const youtubeId = extractYoutubeId(video.videoUrl)
      if (!youtubeId) {
        console.log(`   ⚠️ Pas d'ID YouTube pour: ${video.titre}`)
        continue
      }

      const thumbnailUrls = [
        `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
      ]

      let imageBuffer = null
      for (const url of thumbnailUrls) {
        try {
          imageBuffer = await downloadImage(url)
          break
        } catch (err) {
          // Essayer la suivante
        }
      }

      if (!imageBuffer) {
        console.log(`   ⚠️ Impossible de télécharger la thumbnail pour: ${video.titre}`)
        continue
      }

      try {
        const asset = await client.assets.upload('image', Readable.from(imageBuffer), {
          filename: `thumbnail-${youtubeId}.jpg`,
          contentType: 'image/jpeg'
        })

        await client
          .patch(video._id)
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

        console.log(`   ✅ Thumbnail ajoutée: ${video.titre}`)
      } catch (err) {
        console.log(`   ❌ Erreur: ${video.titre} - ${err.message}`)
      }
    }
  }

  console.log('\n🎉 Nettoyage terminé!')
}

cleanDuplicates().catch(console.error)
