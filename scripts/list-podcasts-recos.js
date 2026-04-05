// Script pour lister toutes les recommandations podcasts et leurs liens
// Usage: npx sanity exec scripts/list-podcasts-recos.js --with-user-token

import {getCliClient} from 'sanity/cli'

async function listPodcastsRecos() {
  const client = getCliClient()

  const query = `*[_type == "recommendation" && type == "podcasts"] | order(titre asc) {
    _id,
    titre,
    auteur,
    lienExterne,
    accroche
  }`

  const podcasts = await client.fetch(query)

  console.log(`\n📻 ${podcasts.length} recommandations de podcasts trouvées:\n`)
  console.log('='.repeat(80))

  podcasts.forEach((podcast, index) => {
    console.log(`\n${index + 1}. ${podcast.titre}`)
    console.log(`   Auteur: ${podcast.auteur || 'Non défini'}`)
    console.log(`   Lien: ${podcast.lienExterne || '❌ AUCUN LIEN'}`)
    console.log(`   ID: ${podcast._id}`)
  })

  // Identifier les problèmes potentiels
  const sansLien = podcasts.filter(p => !p.lienExterne)
  const liensGeneriques = podcasts.filter(p => p.lienExterne && (
    p.lienExterne.includes('example.com') ||
    p.lienExterne.includes('placeholder') ||
    p.lienExterne === '#' ||
    !p.lienExterne.includes('http')
  ))

  console.log('\n' + '='.repeat(80))
  console.log('\n📊 RÉSUMÉ:')
  console.log(`   Total: ${podcasts.length}`)
  console.log(`   Sans lien: ${sansLien.length}`)
  console.log(`   Liens potentiellement incorrects: ${liensGeneriques.length}`)

  if (sansLien.length > 0) {
    console.log('\n❌ Podcasts SANS LIEN:')
    sansLien.forEach(p => console.log(`   - ${p.titre}`))
  }
}

listPodcastsRecos()
