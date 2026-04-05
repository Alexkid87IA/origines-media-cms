// Script pour uploader la photo d'Alex Quilghini
// Usage: npx sanity exec scripts/upload-alex-photo.js --with-user-token

import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'fs'
import path from 'path'

const client = getCliClient()

const photoPath = '/Users/alexquilghini1/Downloads/reference image alex IA/21e2a913-eaae-490d-bc48-b5be9ad675e2.png'

async function uploadPhotoAndUpdate() {
  console.log('📸 Upload de la photo de profil...')

  try {
    // Upload de l'image
    const imageAsset = await client.assets.upload('image', createReadStream(photoPath), {
      filename: 'alex-quilghini-profile.png'
    })

    console.log('✅ Image uploadée:', imageAsset._id)

    // Mise à jour du profil auteur avec l'image
    await client
      .patch('author-alex-quilghini')
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      })
      .commit()

    console.log('✅ Profil Alex Quilghini mis à jour avec la photo!')

  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

uploadPhotoAndUpdate()
