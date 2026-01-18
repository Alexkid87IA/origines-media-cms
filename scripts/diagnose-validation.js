// Script pour diagnostiquer les erreurs de validation d'un document Sanity
// Usage: node scripts/diagnose-validation.js "titre de l'article"

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN // Optionnel pour lecture
})

const searchTerm = process.argv[2] || 'festivals'

async function diagnose() {
  console.log(`\n🔍 Recherche des articles contenant "${searchTerm}"...\n`)

  // Trouver le document
  const docs = await client.fetch(`
    *[_type == "production" && titre match $search][0...5] {
      _id,
      titre,
      slug,
      verticale,
      contenu
    }
  `, { search: `*${searchTerm}*` })

  if (docs.length === 0) {
    console.log('❌ Aucun article trouvé avec ce terme.')
    return
  }

  for (const doc of docs) {
    console.log(`\n📄 Article: "${doc.titre}"`)
    console.log('━'.repeat(60))

    const errors = []

    // Vérifier les champs obligatoires
    if (!doc.titre) errors.push('❌ TITRE manquant')
    if (!doc.slug?.current) errors.push('❌ SLUG manquant - Génère-le dans "Informations principales"')
    if (!doc.verticale) errors.push('❌ VERTICALE manquante - Sélectionne-la dans "Taxonomie & Relations"')

    // Analyser le contenu (blockContent) pour les blocs avec validations
    if (doc.contenu && Array.isArray(doc.contenu)) {
      doc.contenu.forEach((block, index) => {
        // Callout sans contenu
        if (block._type === 'callout' && !block.content) {
          errors.push(`❌ ENCADRÉ #${index + 1} (callout): le champ "Contenu" est vide`)
        }

        // RecommendationBlock sans recommandations
        if (block._type === 'recommendationBlock') {
          const hasRecos = block.recommendations && block.recommendations.length > 0
          const hasManual = block.recommandationManuelle?.titre
          if (!hasRecos && !hasManual) {
            errors.push(`❌ RECOMMANDATION #${index + 1}: ajoute au moins 1 recommandation ou remplis la reco manuelle`)
          }
        }

        // Image sans asset
        if (block._type === 'image' && !block.asset) {
          errors.push(`❌ IMAGE #${index + 1}: l'image n'a pas été uploadée correctement`)
        }

        // StyledQuote sans texte
        if (block._type === 'styledQuote' && !block.text) {
          errors.push(`❌ CITATION #${index + 1}: le texte est vide`)
        }

        // YouTube sans URL
        if (block._type === 'youtube' && !block.url) {
          errors.push(`❌ YOUTUBE #${index + 1}: l'URL est manquante`)
        }
      })
    }

    if (errors.length === 0) {
      console.log('✅ Aucune erreur de validation détectée!')
      console.log('💡 Le problème vient peut-être d\'un draft non synchronisé.')
      console.log('   Essaie: Ctrl+S pour sauvegarder, puis rafraîchis la page.')
    } else {
      console.log(`\n🚨 ${errors.length} ERREUR(S) TROUVÉE(S):\n`)
      errors.forEach(e => console.log(`   ${e}`))
    }
  }
}

diagnose().catch(console.error)
