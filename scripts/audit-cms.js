// audit-cms.js
// Script d'audit complet pour votre CMS Sanity
// À placer dans origines-media-cms/scripts/

import { createClient } from '@sanity/client'
import chalk from 'chalk'

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

console.log(chalk.blue.bold('\n🔍 AUDIT COMPLET DU CMS SANITY - ORIGINES MEDIA\n'))

// Fonction pour formater les nombres
const formatNumber = (num) => num.toString().padStart(4, ' ')

// Fonction pour vérifier les références manquantes
async function checkReferences() {
  console.log(chalk.yellow.bold('\n📌 VÉRIFICATION DES RÉFÉRENCES\n'))
  
  // Vérifier les productions sans verticale
  const productionsSansVerticale = await client.fetch(`
    *[_type == "production" && !defined(verticale)] {
      _id,
      titre
    }
  `)
  
  if (productionsSansVerticale.length > 0) {
    console.log(chalk.red(`❌ ${productionsSansVerticale.length} productions sans verticale :`))
    productionsSansVerticale.forEach(p => console.log(`   - ${p.titre}`))
  } else {
    console.log(chalk.green('✅ Toutes les productions ont une verticale'))
  }

  // Vérifier les séries sans format
  const seriesSansFormat = await client.fetch(`
    *[_type == "serie" && !defined(format)] {
      _id,
      title
    }
  `)
  
  if (seriesSansFormat.length > 0) {
    console.log(chalk.red(`\n❌ ${seriesSansFormat.length} séries sans format :`))
    seriesSansFormat.forEach(s => console.log(`   - ${s.title}`))
  } else {
    console.log(chalk.green('\n✅ Toutes les séries ont un format'))
  }

  // Vérifier les épisodes sans série
  const episodesSansSerie = await client.fetch(`
    *[_type == "episode" && !defined(serie)] {
      _id,
      title
    }
  `)
  
  if (episodesSansSerie.length > 0) {
    console.log(chalk.red(`\n❌ ${episodesSansSerie.length} épisodes sans série :`))
    episodesSansSerie.forEach(e => console.log(`   - ${e.title}`))
  } else {
    console.log(chalk.green('\n✅ Tous les épisodes ont une série'))
  }
}

// Fonction pour vérifier les champs manquants
async function checkMissingFields() {
  console.log(chalk.yellow.bold('\n📋 VÉRIFICATION DES CHAMPS MANQUANTS\n'))
  
  // Vérifier les productions sans slug
  const productionsSansSlug = await client.fetch(`
    *[_type == "production" && !defined(slug)] {
      _id,
      titre
    }
  `)
  
  if (productionsSansSlug.length > 0) {
    console.log(chalk.red(`❌ ${productionsSansSlug.length} productions sans slug :`))
    productionsSansSlug.forEach(p => console.log(`   - ${p.titre}`))
  } else {
    console.log(chalk.green('✅ Toutes les productions ont un slug'))
  }

  // Vérifier les verticales sans couleur
  const verticalesSansCouleur = await client.fetch(`
    *[_type == "verticale" && !defined(couleurDominante)] {
      _id,
      nom
    }
  `)
  
  if (verticalesSansCouleur.length > 0) {
    console.log(chalk.red(`\n❌ ${verticalesSansCouleur.length} verticales sans couleur :`))
    verticalesSansCouleur.forEach(v => console.log(`   - ${v.nom}`))
  } else {
    console.log(chalk.green('\n✅ Toutes les verticales ont une couleur'))
  }

  // Vérifier les formats sans couleur
  const formatsSansCouleur = await client.fetch(`
    *[_type == "format" && !defined(couleur)] {
      _id,
      nom
    }
  `)
  
  if (formatsSansCouleur.length > 0) {
    console.log(chalk.red(`\n❌ ${formatsSansCouleur.length} formats sans couleur :`))
    formatsSansCouleur.forEach(f => console.log(`   - ${f.nom}`))
  } else {
    console.log(chalk.green('\n✅ Tous les formats ont une couleur'))
  }
}

// Fonction pour analyser la distribution des contenus
async function analyzeContentDistribution() {
  console.log(chalk.yellow.bold('\n📊 DISTRIBUTION DES CONTENUS\n'))
  
  // Productions par verticale
  const productionsParVerticale = await client.fetch(`
    *[_type == "verticale"] {
      nom,
      "count": count(*[_type == "production" && references(^._id)])
    } | order(count desc)
  `)
  
  console.log(chalk.cyan('Productions par verticale :'))
  productionsParVerticale.forEach(v => {
    const bar = '█'.repeat(Math.min(v.count, 20))
    console.log(`  ${v.nom.padEnd(20)} : ${formatNumber(v.count)} ${bar}`)
  })

  // Épisodes par série
  const episodesParSerie = await client.fetch(`
    *[_type == "serie"] {
      title,
      "count": count(*[_type == "episode" && references(^._id)])
    } | order(count desc)
  `)
  
  console.log(chalk.cyan('\nÉpisodes par série :'))
  episodesParSerie.forEach(s => {
    const bar = '█'.repeat(Math.min(s.count, 20))
    console.log(`  ${s.title.padEnd(30)} : ${formatNumber(s.count)} ${bar}`)
  })
}

// Fonction pour vérifier les images
async function checkImages() {
  console.log(chalk.yellow.bold('\n🖼️  VÉRIFICATION DES IMAGES\n'))
  
  const typesAvecImages = ['production', 'portrait', 'verticale', 'format', 'univers']
  
  for (const type of typesAvecImages) {
    const sansImage = await client.fetch(`
      count(*[_type == "${type}" && !defined(image)])
    `)
    const total = await client.fetch(`count(*[_type == "${type}"])`)
    
    if (sansImage > 0) {
      console.log(chalk.yellow(`⚠️  ${type} : ${sansImage}/${total} sans image`))
    } else {
      console.log(chalk.green(`✅ ${type} : toutes les entrées ont une image`))
    }
  }
}

// Fonction pour vérifier les doublons
async function checkDuplicates() {
  console.log(chalk.yellow.bold('\n🔄 VÉRIFICATION DES DOUBLONS\n'))
  
  // Vérifier les titres dupliqués dans les productions
  const productionsDupliquees = await client.fetch(`
    *[_type == "production"] {
      titre,
      "count": count(*[_type == "production" && titre == ^.titre])
    }[count > 1] | order(titre)
  `)
  
  if (productionsDupliquees.length > 0) {
    console.log(chalk.red('❌ Titres de productions dupliqués :'))
    const titresUniques = [...new Set(productionsDupliquees.map(p => p.titre))]
    titresUniques.forEach(titre => {
      console.log(`   - "${titre}"`)
    })
  } else {
    console.log(chalk.green('✅ Aucun titre de production dupliqué'))
  }
}

// Fonction pour analyser les tags
async function analyzeTags() {
  console.log(chalk.yellow.bold('\n🏷️  ANALYSE DES TAGS\n'))
  
  // Compter les productions par tag
  const allTags = await client.fetch(`
    *[_type == "production" && defined(tags)] {
      tags
    }
  `)
  
  const tagCount = {}
  allTags.forEach(prod => {
    prod.tags?.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  
  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1])
  
  if (sortedTags.length > 0) {
    console.log(chalk.cyan('Tags les plus utilisés :'))
    sortedTags.slice(0, 10).forEach(([tag, count]) => {
      const bar = '█'.repeat(Math.min(count, 20))
      console.log(`  ${tag.padEnd(20)} : ${formatNumber(count)} ${bar}`)
    })
  } else {
    console.log(chalk.yellow('⚠️  Aucun tag utilisé'))
  }
}

// Fonction pour vérifier la cohérence des dates
async function checkDates() {
  console.log(chalk.yellow.bold('\n📅 VÉRIFICATION DES DATES\n'))
  
  // Productions avec dates futures
  const productionsFutures = await client.fetch(`
    *[_type == "production" && datePublication > now()] {
      titre,
      datePublication
    } | order(datePublication desc)
  `)
  
  if (productionsFutures.length > 0) {
    console.log(chalk.yellow(`⚠️  ${productionsFutures.length} productions avec date future :`))
    productionsFutures.forEach(p => {
      console.log(`   - ${p.titre} (${new Date(p.datePublication).toLocaleDateString()})`)
    })
  } else {
    console.log(chalk.green('✅ Toutes les dates de publication sont cohérentes'))
  }
}

// Fonction principale avec résumé
async function runAudit() {
  try {
    // Comptage général
    console.log(chalk.yellow.bold('📈 STATISTIQUES GÉNÉRALES\n'))
    
    const types = [
      'production', 'verticale', 'format', 'univers', 
      'portrait', 'video', 'serie', 'episode', 'tag', 'author'
    ]
    
    let totalDocuments = 0
    for (const type of types) {
      const count = await client.fetch(`count(*[_type == "${type}"])`)
      totalDocuments += count
      console.log(`  ${type.padEnd(15)} : ${formatNumber(count)} documents`)
    }
    console.log(chalk.bold(`\n  TOTAL          : ${formatNumber(totalDocuments)} documents`))

    // Exécuter tous les tests
    await checkReferences()
    await checkMissingFields()
    await analyzeContentDistribution()
    await checkImages()
    await checkDuplicates()
    await analyzeTags()
    await checkDates()

    // Résumé final
    console.log(chalk.blue.bold('\n✨ AUDIT TERMINÉ\n'))
    
    // Suggestions d'amélioration
    console.log(chalk.yellow.bold('💡 SUGGESTIONS D\'AMÉLIORATION :\n'))
    
    const suggestions = [
      '1. Ajouter des épisodes aux séries vides',
      '2. Compléter les images manquantes',
      '3. Vérifier et corriger les références manquantes',
      '4. Enrichir les tags pour améliorer la recherche',
      '5. Équilibrer la distribution des contenus entre verticales'
    ]
    
    suggestions.forEach(s => console.log(chalk.cyan(`  ${s}`)))
    
  } catch (error) {
    console.error(chalk.red('\n❌ Erreur lors de l\'audit :'), error)
  }
}

// Lancer l'audit
runAudit()