const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

async function audit() {
  console.log('\n=== AUDIT DONNÉES CMS ORIGINES MEDIA ===\n')

  // 1. Comptage par type
  const types = ['production', 'verticale', 'univers', 'format', 'serie', 'episode', 'portrait', 'video', 'recommendation', 'recit', 'teamMember', 'author', 'tag', 'siteSettings']
  console.log('--- COMPTAGE PAR TYPE ---')
  for (const t of types) {
    const count = await client.fetch(`count(*[_type == "${t}" && !(_id in path("drafts.**"))])`)
    console.log(`  ${t.padEnd(18)} : ${count}`)
  }

  // 2. Verticales existantes
  console.log('\n--- VERTICALES ---')
  const verticales = await client.fetch(`*[_type == "verticale" && !(_id in path("drafts.**"))] | order(ordre asc) { _id, nom, "slug": slug.current, couleurDominante, ordre }`)
  verticales.forEach(v => console.log(`  [${v.ordre}] ${v.nom} (${v.couleurDominante}) slug=${v.slug}`))

  // 3. Univers existants
  console.log('\n--- UNIVERS ---')
  const univers = await client.fetch(`*[_type == "univers" && !(_id in path("drafts.**"))] | order(ordre asc) { _id, nom, "slug": slug.current, couleur, ordre, "verticale": verticale->nom }`)
  univers.forEach(u => console.log(`  [${u.ordre || '-'}] ${u.nom} (${u.couleur || 'pas de couleur'}) → verticale: ${u.verticale || 'AUCUNE'} slug=${u.slug}`))

  // 4. Productions - liste complète avec classification
  console.log('\n--- PRODUCTIONS (ARTICLES) ---')
  const productions = await client.fetch(`*[_type == "production" && !(_id in path("drafts.**"))] | order(datePublication desc) {
    _id, titre, "slug": slug.current, description,
    "verticale": verticale->nom, "verticaleSlug": verticale->slug.current,
    "univers": univers->nom, "universSlug": univers->slug.current,
    tags, tempsLecture, datePublication, typeContenu, isLocked,
    "hasImage": defined(image), "hasContent": defined(contenu)
  }`)
  console.log(`  Total: ${productions.length}`)
  productions.forEach(p => {
    console.log(`  - "${p.titre}"`)
    console.log(`    verticale=${p.verticale || 'AUCUNE'} | univers=${p.univers || 'AUCUN'} | slug=${p.slug || 'PAS DE SLUG'}`)
    console.log(`    tags=[${(p.tags || []).join(', ')}] | lecture=${p.tempsLecture || '?'}min | date=${p.datePublication || 'pas de date'}`)
    console.log(`    image=${p.hasImage ? 'oui' : 'NON'} | contenu=${p.hasContent ? 'oui' : 'NON'} | premium=${p.isLocked ? 'OUI' : 'non'}`)
  })

  // 5. Portraits
  console.log('\n--- PORTRAITS ---')
  const portraits = await client.fetch(`*[_type == "portrait" && !(_id in path("drafts.**"))] { _id, titre, accroche, "slug": slug.current, "univers": univers->nom, "verticale": verticale->nom, categorie, tags }`)
  console.log(`  Total: ${portraits.length}`)
  portraits.forEach(p => console.log(`  - "${p.titre}" | cat=${p.categorie || '?'} | univers=${p.univers || '?'} | tags=${(p.tags || []).join(', ')}`))

  // 6. Vidéos
  console.log('\n--- VIDÉOS ---')
  const videos = await client.fetch(`*[_type == "video" && !(_id in path("drafts.**"))] { _id, titre, "slug": slug.current, formatVideo, "univers": univers->nom, "verticale": verticale->nom, videoUrl, duree }`)
  console.log(`  Total: ${videos.length}`)
  videos.forEach(v => console.log(`  - "${v.titre}" | format=${v.formatVideo || '?'} | univers=${v.univers || '?'} | duree=${v.duree || '?'}s`))

  // 7. Séries
  console.log('\n--- SÉRIES ---')
  const series = await client.fetch(`*[_type == "serie" && !(_id in path("drafts.**"))] { _id, title, "slug": slug.current, "format": format->nom, "univers": univers->nom, status, "episodeCount": count(*[_type == "episode" && references(^._id)]) }`)
  console.log(`  Total: ${series.length}`)
  series.forEach(s => console.log(`  - "${s.title}" | format=${s.format || '?'} | univers=${s.univers || '?'} | status=${s.status || '?'} | episodes=${s.episodeCount}`))

  // 8. Récits
  console.log('\n--- RÉCITS ---')
  const recits = await client.fetch(`*[_type == "recit" && !(_id in path("drafts.**"))] { _id, title, "slug": slug.current, excerpt, "univers": univers->nom, "author": author->name, readingTime, publishedAt, featured }`)
  console.log(`  Total: ${recits.length}`)
  recits.forEach(r => console.log(`  - "${r.title}" | univers=${r.univers || '?'} | auteur=${r.author || '?'} | ${r.readingTime || '?'}min`))

  // 9. Formats
  console.log('\n--- FORMATS ---')
  const formats = await client.fetch(`*[_type == "format" && !(_id in path("drafts.**"))] { _id, nom, "slug": slug.current, couleur, tagline }`)
  console.log(`  Total: ${formats.length}`)
  formats.forEach(f => console.log(`  - "${f.nom}" (${f.couleur}) ${f.tagline || ''}`))

  // 10. Recommendations
  console.log('\n--- RECOMMANDATIONS ---')
  const recos = await client.fetch(`*[_type == "recommendation" && !(_id in path("drafts.**"))] { _id, titre, type, "slug": slug.current, note, coupDeCoeur }`)
  console.log(`  Total: ${recos.length}`)
  recos.forEach(r => console.log(`  - "${r.titre}" | type=${r.type} | note=${r.note || '?'}/5 ${r.coupDeCoeur ? '❤' : ''}`))

  // 11. Team + Authors
  console.log('\n--- AUTEURS ---')
  const authors = await client.fetch(`*[_type == "author" && !(_id in path("drafts.**"))] { _id, name, "slug": slug.current, role, "hasImage": defined(image), bio }`)
  authors.forEach(a => console.log(`  - ${a.name} | role=${a.role || '?'} | slug=${a.slug} | image=${a.hasImage ? 'oui' : 'NON'}`))

  console.log('\n--- TEAM MEMBERS ---')
  const team = await client.fetch(`*[_type == "teamMember" && !(_id in path("drafts.**"))] { _id, nom, role, isActive, ordre }`)
  team.forEach(t => console.log(`  - ${t.nom} | role=${t.role} | actif=${t.isActive !== false ? 'oui' : 'non'} | ordre=${t.ordre}`))

  // 12. Tags
  console.log('\n--- TAGS ---')
  const tags = await client.fetch(`*[_type == "tag" && !(_id in path("drafts.**"))] { _id, title, "slug": slug.current, couleur }`)
  console.log(`  Total: ${tags.length}`)
  tags.forEach(t => console.log(`  - ${t.title} (${t.couleur || 'pas de couleur'}) slug=${t.slug}`))

  // 13. Distribution productions par verticale
  console.log('\n--- DISTRIBUTION PAR VERTICALE ---')
  const distrib = await client.fetch(`*[_type == "verticale" && !(_id in path("drafts.**"))] {
    nom,
    "count": count(*[_type == "production" && !(_id in path("drafts.**")) && references(^._id)])
  } | order(count desc)`)
  distrib.forEach(d => console.log(`  ${d.nom.padEnd(25)} : ${d.count} articles`))

  console.log('\n=== FIN AUDIT ===\n')
}

audit().catch(console.error)
