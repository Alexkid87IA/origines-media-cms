// fix-format-colors.js
// Script pour ajouter des couleurs aux formats qui n'en ont pas
// À placer dans origines-media-cms/scripts/

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: 'skkvUZJewxiArMa9pP5ljtNQUVZzVlrEw8AaEQMzSH5xzxBvrursfu7HA3repqU7AxH6zRtFXDwizNUsuai0js1cNykYZOCgcDg6rS4DwG1lCKyxeTH9IJGjrJLS3dhKLpOdf5O6IjpYdMOacJG3AOmygTivuczQopmFaLEHi83QfK1AoReY'
})

// Palette de couleurs pour les formats
const colors = [
  '#8B5CF6', // Violet
  '#F59E0B', // Orange
  '#3B82F6', // Bleu
  '#10B981', // Vert
  '#EF4444', // Rouge
  '#6366F1', // Indigo
  '#EC4899', // Rose
  '#14B8A6', // Turquoise
]

async function fixFormatColors() {
  console.log('\n🎨 CORRECTION DES COULEURS DES FORMATS\n')

  // Récupérer les formats sans couleur
  const formatsSansCouleur = await client.fetch(`
    *[_type == "format" && !defined(couleur)] {
      _id,
      nom
    }
  `)

  console.log(`${formatsSansCouleur.length} formats sans couleur trouvés\n`)

  for (let i = 0; i < formatsSansCouleur.length; i++) {
    const format = formatsSansCouleur[i]
    const color = colors[i % colors.length]
    
    await client
      .patch(format._id)
      .set({ couleur: color })
      .commit()
    
    console.log(`✅ ${format.nom || `Format ${i + 1}`} : ${color}`)
  }

  console.log('\n✨ Couleurs ajoutées avec succès !\n')
}

fixFormatColors().catch(console.error)