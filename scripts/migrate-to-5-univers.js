const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

// === MAPPING 10 VERTICALES → 5 UNIVERS ===
// Basé sur STRATEGIE.md §2 : "La solution : 5 univers"
const VERTICALE_TO_UNIVERS = {
  'Psychologie': 'esprit',
  'Spiritualité': 'esprit',
  'Santé': 'corps',
  'Famille': 'liens',
  'Société': 'liens',    // Société → Les Liens (ce qui nous lie, nous divise, nous transforme)
  'Voyage': 'monde',
  'Art & Créativité': 'monde',
  'Carrière': 'avenir',
  'Tech': 'avenir',
  'Business': 'avenir',
}

// Sous-catégories par défaut basées sur le contenu
// Pour les articles, on assigne "essais" par défaut (le plus générique)
// Les portraits seront identifiés séparément
const DEFAULT_CATEGORY = 'essais'
const DEFAULT_RUBRIQUE = 'articles'

// === HELPER: déterminer la catégorie d'article à partir des tags/titre ===
function guessCategory(titre, tags) {
  const t = (titre || '').toLowerCase()
  const allTags = (tags || []).map(tag => typeof tag === 'string' ? tag.toLowerCase() : '').join(' ')
  const combined = t + ' ' + allTags

  if (combined.includes('portrait') || combined.includes('parcours') || combined.includes('comment j\'ai') || combined.includes('témoignage'))
    return 'portraits'
  if (combined.includes('enquête') || combined.includes('investigation') || combined.includes('révèle'))
    return 'enquetes'
  if (combined.includes('immersion') || combined.includes('j\'ai vécu') || combined.includes('30 jours'))
    return 'immersions'
  if (combined.includes('récit') || combined.includes('histoire') || combined.includes('quand'))
    return 'recits'
  return 'essais'
}

// === HELPER: générer readTime à partir de tempsLecture ===
function formatReadTime(minutes) {
  if (!minutes) return null
  return `${minutes} min`
}

async function migrate() {
  console.log('\n=== MIGRATION VERS 5 UNIVERS ===\n')

  // 1. Charger les verticales pour le mapping
  const verticales = await client.fetch(`*[_type == "verticale" && !(_id in path("drafts.**"))] { _id, nom }`)
  const verticaleMap = {}
  verticales.forEach(v => { verticaleMap[v._id] = v.nom })
  console.log(`Verticales chargées: ${verticales.length}`)

  // 2. Charger les productions
  const productions = await client.fetch(`*[_type == "production" && !(_id in path("drafts.**"))] {
    _id, titre, description, tags, tempsLecture, isLocked,
    "verticaleName": verticale->nom,
    "verticaleId": verticale._ref
  }`)
  console.log(`Productions à migrer: ${productions.length}`)

  // 3. Migrer les productions
  let migrated = 0
  let skipped = 0
  let errors = 0
  const univDistrib = { esprit: 0, corps: 0, liens: 0, monde: 0, avenir: 0, unknown: 0 }

  const transaction = client.transaction()

  for (const prod of productions) {
    const vertName = prod.verticaleName
    const newUnivers = vertName ? VERTICALE_TO_UNIVERS[vertName] : null

    if (!newUnivers) {
      console.log(`  ⚠️  SKIP "${prod.titre}" — verticale inconnue: ${vertName || 'AUCUNE'}`)
      univDistrib.unknown++
      skipped++
      continue
    }

    const category = guessCategory(prod.titre, prod.tags)
    const readTime = formatReadTime(prod.tempsLecture)

    const patch = {
      univpilar: newUnivers,
      rubrique: DEFAULT_RUBRIQUE,
      category: category,
    }

    // Copier description → deck si pas de deck
    if (prod.description && prod.description.length > 0) {
      patch.deck = prod.description.substring(0, 200)
    }

    if (readTime) {
      patch.readTime = readTime
    }

    // isPremium depuis isLocked
    if (prod.isLocked) {
      patch.isPremium = true
    }

    transaction.patch(prod._id, { set: patch })
    univDistrib[newUnivers]++
    migrated++
  }

  console.log(`\nDistribution des ${migrated} articles migrés:`)
  Object.entries(univDistrib).forEach(([k, v]) => {
    if (v > 0) console.log(`  ${k.padEnd(10)} : ${v}`)
  })

  // 4. Migrer les portraits
  console.log('\n--- MIGRATION DES PORTRAITS ---')
  const portraits = await client.fetch(`*[_type == "portrait" && !(_id in path("drafts.**"))] {
    _id, titre, categorie,
    "verticaleName": verticale->nom
  }`)
  console.log(`Portraits à migrer: ${portraits.length}`)

  const PORTRAIT_CAT_TO_UNIVERS = {
    'PSYCHOLOGIE': 'esprit',
    'SPIRITUALITÉ': 'esprit',
    'CARRIÈRE': 'avenir',
    'VOYAGE': 'monde',
    'ART & CRÉATIVITÉ': 'monde',
    'SOCIÉTÉ': 'liens',
  }

  let portraitMigrated = 0
  let portraitSkipped = 0

  for (const p of portraits) {
    // Essayer d'abord la verticale, puis la catégorie legacy
    let newUnivers = null
    if (p.verticaleName) {
      newUnivers = VERTICALE_TO_UNIVERS[p.verticaleName]
    }
    if (!newUnivers && p.categorie) {
      newUnivers = PORTRAIT_CAT_TO_UNIVERS[p.categorie]
    }

    if (!newUnivers) {
      // Deviner à partir du titre
      const t = (p.titre || '').toLowerCase()
      if (t.includes('psycho') || t.includes('trauma') || t.includes('résilience') || t.includes('deuil') || t.includes('culpabilité') || t.includes('reconstrui') || t.includes('survivre') || t.includes('thérapie') || t.includes('mental') || t.includes('cerveau') || t.includes('haine de soi') || t.includes('blessure') || t.includes('souffrance') || t.includes('anxiété') || t.includes('dépression'))
        newUnivers = 'esprit'
      else if (t.includes('reconversion') || t.includes('carrière') || t.includes('entrepren') || t.includes('métier') || t.includes('travail') || t.includes('professionn') || t.includes('leader') || t.includes('manager') || t.includes('hacker') || t.includes('espion'))
        newUnivers = 'avenir'
      else if (t.includes('voyage') || t.includes('art') || t.includes('créati') || t.includes('théâtre') || t.includes('danse') || t.includes('écriture') || t.includes('photo') || t.includes('pâtisserie') || t.includes('cuisine'))
        newUnivers = 'monde'
      else if (t.includes('famille') || t.includes('mère') || t.includes('père') || t.includes('frère') || t.includes('sœur') || t.includes('enfan') || t.includes('couple') || t.includes('amour') || t.includes('amitié') || t.includes('adoption') || t.includes('fratrie') || t.includes('parent') || t.includes('violence') || t.includes('harcèlement') || t.includes('prison') || t.includes('justice') || t.includes('société') || t.includes('inégalité') || t.includes('pauvreté') || t.includes('silence') || t.includes('secret'))
        newUnivers = 'liens'
      else if (t.includes('santé') || t.includes('maladie') || t.includes('douleur') || t.includes('corps'))
        newUnivers = 'corps'
      else
        newUnivers = 'liens' // Default pour les portraits (histoires humaines)
    }

    transaction.patch(p._id, { set: { univpilar: newUnivers } })
    portraitMigrated++
  }
  console.log(`Portraits migrés: ${portraitMigrated}, skippés: ${portraitSkipped}`)

  // 5. Exécuter la transaction
  console.log('\n--- EXÉCUTION DE LA TRANSACTION ---')
  console.log(`Total patches: ${migrated + portraitMigrated}`)

  if (process.argv.includes('--dry-run')) {
    console.log('\n🔶 DRY RUN — aucune modification effectuée.')
    console.log('Relancez sans --dry-run pour appliquer les changements.')
    return
  }

  try {
    const result = await transaction.commit()
    console.log(`\n✅ Transaction réussie!`)
    console.log(`   Articles migrés: ${migrated}`)
    console.log(`   Portraits migrés: ${portraitMigrated}`)
    console.log(`   Total documents modifiés: ${migrated + portraitMigrated}`)
  } catch (err) {
    console.error('\n❌ Erreur lors de la transaction:', err.message)
    errors++
  }

  // 6. Résumé
  console.log('\n=== RÉSUMÉ ===')
  console.log(`Articles migrés:   ${migrated}`)
  console.log(`Articles skippés:  ${skipped}`)
  console.log(`Portraits migrés:  ${portraitMigrated}`)
  console.log(`Erreurs:           ${errors}`)
  console.log('\n=== FIN MIGRATION ===\n')
}

migrate().catch(console.error)
