const {createClient} = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const COVERS_DIR = '/Users/alexquilghini1/Desktop/origines_covers_sante_travail'

// Mapping: fichier image -> ID de la production
const mapping = [
  { file: '01_sante_mentale_startup.jpg', id: 'AbnihjVzeLDd9gIBDXBh5v' },
  { file: '02_licenciement_deuil_professionnel.jpg', id: 'AbnihjVzeLDd9gIBDXBgIP' },
  { file: '03_presenteisme.jpg', id: 'AbnihjVzeLDd9gIBDXBXGs' },
  { file: '04_retour_travail_depression.jpg', id: 'J2xzamYKtHKlgJsYq8jCNB' },
  { file: '05_solitude_dirigeant.jpg', id: 'J2xzamYKtHKlgJsYq8jBEj' },
  { file: '06_managers_en_souffrance.jpg', id: 'AbnihjVzeLDd9gIBDXBMjG' },
  { file: '07_anxiete_performance.jpg', id: 'IMb4zsF7pCt4FXapnBKBSo' },
  { file: '08_reunionite_surcharge_cognitive.jpg', id: 'IMb4zsF7pCt4FXapnBK9uI' },
  { file: '09_brownout.jpg', id: 'IMb4zsF7pCt4FXapnBK9lm' },
  { file: '10_boreout.jpg', id: 'J2xzamYKtHKlgJsYq8j7t9' },
]

async function uploadCovers() {
  for (const {file, id} of mapping) {
    const filePath = path.join(COVERS_DIR, file)
    console.log(`Uploading ${file}...`)

    const imageAsset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: file,
    })

    await client.patch(id).set({
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
    }).commit()

    console.log(`  -> ${file} assigné à ${id}`)
  }

  console.log('\nTerminé ! 10 images uploadées et assignées.')
}

uploadCovers().catch(console.error)
