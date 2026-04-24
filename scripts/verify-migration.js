const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

async function verify() {
  console.log('\n=== VÉRIFICATION POST-MIGRATION ===\n')

  // 1. Articles par nouveau univers
  console.log('--- ARTICLES PAR UNIVERS (nouveau champ univpilar) ---')
  const univers = ['esprit', 'corps', 'liens', 'monde', 'avenir']
  const labels = { esprit: "L'Esprit", corps: 'Le Corps', liens: 'Les Liens', monde: 'Le Monde', avenir: "L'Avenir" }

  for (const u of univers) {
    const count = await client.fetch(`count(*[_type == "production" && univpilar == $u && !(_id in path("drafts.**"))])`, { u })
    console.log(`  ${labels[u].padEnd(15)} : ${count}`)
  }
  const noUnivers = await client.fetch(`count(*[_type == "production" && !defined(univpilar) && !(_id in path("drafts.**"))])`)
  console.log(`  ⚠️ Sans univers  : ${noUnivers}`)

  // 2. Articles par rubrique
  console.log('\n--- ARTICLES PAR RUBRIQUE ---')
  const rubriques = await client.fetch(`*[_type == "production" && !(_id in path("drafts.**"))].rubrique`)
  const rubCount = {}
  rubriques.forEach(r => { rubCount[r || 'NON DÉFINI'] = (rubCount[r || 'NON DÉFINI'] || 0) + 1 })
  Object.entries(rubCount).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(15)} : ${v}`))

  // 3. Articles par category
  console.log('\n--- ARTICLES PAR SOUS-CATÉGORIE ---')
  const categories = await client.fetch(`*[_type == "production" && !(_id in path("drafts.**"))].category`)
  const catCount = {}
  categories.forEach(c => { catCount[c || 'NON DÉFINI'] = (catCount[c || 'NON DÉFINI'] || 0) + 1 })
  Object.entries(catCount).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(15)} : ${v}`))

  // 4. Portraits par univers
  console.log('\n--- PORTRAITS PAR UNIVERS ---')
  for (const u of univers) {
    const count = await client.fetch(`count(*[_type == "portrait" && univpilar == $u && !(_id in path("drafts.**"))])`, { u })
    console.log(`  ${labels[u].padEnd(15)} : ${count}`)
  }
  const noUniversP = await client.fetch(`count(*[_type == "portrait" && !defined(univpilar) && !(_id in path("drafts.**"))])`)
  console.log(`  ⚠️ Sans univers  : ${noUniversP}`)

  // 5. Exemples d'articles par univers
  console.log('\n--- EXEMPLES (3 par univers) ---')
  for (const u of univers) {
    const examples = await client.fetch(`*[_type == "production" && univpilar == $u && !(_id in path("drafts.**"))][0..2] { titre, rubrique, category, deck }`, { u })
    console.log(`\n  ${labels[u]}:`)
    examples.forEach(e => console.log(`    → "${e.titre}" [${e.rubrique}/${e.category}]`))
  }

  // 6. Champs manquants
  console.log('\n--- CHAMPS MANQUANTS ---')
  const noDeck = await client.fetch(`count(*[_type == "production" && !defined(deck) && !(_id in path("drafts.**"))])`)
  const noSlug = await client.fetch(`count(*[_type == "production" && !defined(slug) && !(_id in path("drafts.**"))])`)
  const noImage = await client.fetch(`count(*[_type == "production" && !defined(image) && !(_id in path("drafts.**"))])`)
  const noAuthor = await client.fetch(`count(*[_type == "production" && !defined(author) && !(_id in path("drafts.**"))])`)
  const noDate = await client.fetch(`count(*[_type == "production" && !defined(datePublication) && !(_id in path("drafts.**"))])`)

  console.log(`  Sans deck (chapeau)  : ${noDeck}/448`)
  console.log(`  Sans slug            : ${noSlug}/448`)
  console.log(`  Sans image           : ${noImage}/448`)
  console.log(`  Sans auteur          : ${noAuthor}/448`)
  console.log(`  Sans date            : ${noDate}/448`)

  console.log('\n=== FIN VÉRIFICATION ===\n')
}

verify().catch(console.error)
