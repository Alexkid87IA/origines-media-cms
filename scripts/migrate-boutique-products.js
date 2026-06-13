// scripts/migrate-boutique-products.js
// Migration des 16 produits boutique mockés (BoutiquePage.tsx) vers Sanity.
// Idempotent : skip les produits dont le slug existe déjà.
//
// Usage:
//   SANITY_TOKEN=... node scripts/migrate-boutique-products.js
//   (ou laisse .env être chargé via dotenv si tu l'as installé)

const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-03-01',
  useCdn: false,
})

const IMAGES_DIR = '/Users/alexquilghini1/Documents/origines media front/public/boutique'

// Les 16 produits extraits de src/pages/BoutiquePage.tsx (tableau `products`)
// Notes :
//  - `color` retiré (dérivé de category côté front)
//  - `subcategory` retiré (toujours = category)
//  - `image` = nom de fichier dans /public/boutique/
const PRODUCTS = [
  // Esprit
  {
    slug: 'kit-meditation',
    title: 'Kit Méditation',
    subtitle: 'Trouver le calme intérieur',
    description: 'Carnet de pratique, cartes de respiration et workbook pour installer une routine méditative durable.',
    price: '39 €',
    badge: 'Populaire',
    badgeColor: '#111827',
    features: ['Carnet 90 jours', '30 cartes guidées', 'Workbook introspection'],
    format: 'Kit complet',
    category: 'esprit',
    popular: true,
    featured: true,
    image: 'boutique-gpt2-meditation.png',
  },
  {
    slug: 'kit-therapie',
    title: 'Kit Thérapie',
    subtitle: 'Cheminer vers soi',
    description: 'Un coffret pour accompagner un travail thérapeutique : journal émotionnel, exercices et outils de suivi.',
    price: '39 €',
    features: ['Journal émotionnel', 'Cartes introspection', 'Workbook exercices'],
    format: 'Kit complet',
    category: 'esprit',
    image: 'boutique-gpt2-therapie.png',
  },
  {
    slug: 'kit-art-therapie',
    title: 'Kit Art-Thérapie',
    subtitle: 'Créer pour se libérer',
    description: "Explorez vos émotions par le dessin, le collage et l'écriture créative.",
    price: '39 €',
    features: ['Carnet créatif', 'Prompts artistiques', 'Guide techniques'],
    format: 'Kit complet',
    category: 'esprit',
    image: 'boutique-gpt2-art-therapie.png',
  },
  // Corps
  {
    slug: 'kit-sport',
    title: 'Kit Sport',
    subtitle: 'Reprendre en douceur',
    description: "Programme progressif de 8 semaines avec carnet de suivi et cartes d'exercices illustrées.",
    price: '39 €',
    badge: 'Best-seller',
    badgeColor: '#111827',
    features: ['Programme 8 semaines', 'Cartes exercices', 'Carnet de suivi'],
    format: 'Kit complet',
    category: 'corps',
    popular: true,
    featured: true,
    image: 'boutique-gpt2-sport.png',
  },
  {
    slug: 'kit-alimentation',
    title: 'Kit Alimentation',
    subtitle: 'Nourrir corps et esprit',
    description: 'Un guide nutrition, des recettes et un planificateur de repas pour une alimentation consciente.',
    price: '39 €',
    features: ['Guide nutrition', '40 recettes', 'Planificateur repas'],
    format: 'Kit complet',
    category: 'corps',
    image: 'boutique-gpt2-alimentation.png',
  },
  {
    slug: 'kit-sommeil',
    title: 'Kit Sommeil',
    subtitle: 'Retrouver des nuits profondes',
    description: 'Rituels du soir, journal de sommeil et exercices de relaxation pour des nuits réparatrices.',
    price: '39 €',
    features: ['Journal de sommeil', 'Rituels du soir', 'Exercices relaxation'],
    format: 'Kit complet',
    category: 'corps',
    image: 'boutique-gpt2-sommeil.png',
  },
  {
    slug: 'kit-respiration',
    title: 'Kit Respiration',
    subtitle: 'Le souffle comme ancre',
    description: 'Techniques respiratoires, cartes de pratique et programme anti-anxiété en 21 jours.',
    price: '39 €',
    features: ['21 jours programme', 'Cartes techniques', 'Audio guidé'],
    format: 'Kit complet',
    category: 'corps',
    image: 'boutique-gpt2-respiration.png',
  },
  // Liens
  {
    slug: 'kit-couple',
    title: 'Kit Couple',
    subtitle: 'Se retrouver à deux',
    description: 'Cartes conversation, journal partagé et exercices pour raviver la connexion dans votre relation.',
    price: '39 €',
    badge: 'Idée cadeau',
    badgeColor: '#E67839',
    features: ['Cartes conversation', 'Journal duo', 'Exercices à deux'],
    format: 'Kit complet',
    category: 'liens',
    popular: true,
    featured: true,
    image: 'boutique-gpt2-couple.png',
  },
  {
    slug: 'kit-education',
    title: 'Kit Éducation',
    subtitle: 'Grandir ensemble',
    description: 'Outils de communication bienveillante, cartes émotions et activités parent-enfant.',
    price: '39 €',
    features: ['Cartes émotions', 'Guide bienveillance', 'Activités famille'],
    format: 'Kit complet',
    category: 'liens',
    image: 'boutique-gpt2-education.png',
  },
  // Monde
  {
    slug: 'kit-photo-bien-etre',
    title: 'Kit Photo & Bien-être',
    subtitle: 'Voir le beau au quotidien',
    description: 'Apprenez à utiliser la photographie comme outil de pleine conscience et de gratitude.',
    price: '39 €',
    features: ['Guide photo mindful', '30 défis créatifs', 'Carnet visuel'],
    format: 'Kit complet',
    category: 'monde',
    image: 'boutique-gpt2-photo-bien-etre.png',
  },
  {
    slug: 'kit-photo-therapeutique',
    title: 'Kit Photo Thérapeutique',
    subtitle: 'Se raconter en images',
    description: "Utilisez l'autoportrait et le reportage personnel comme vecteurs de transformation.",
    price: '39 €',
    features: ['Exercices autoportrait', 'Journal photographique', 'Guide narratif'],
    format: 'Kit complet',
    category: 'monde',
    featured: true,
    image: 'boutique-gpt2-photo-therapeutique.png',
  },
  {
    slug: 'kit-instrument',
    title: 'Kit Instrument',
    subtitle: 'La musique comme thérapie',
    description: "Initiez-vous à un instrument avec un programme pensé pour le bien-être, pas la performance.",
    price: '39 €',
    features: ['Programme débutant', 'Exercices quotidiens', 'Playlist guidée'],
    format: 'Kit complet',
    category: 'monde',
    image: 'boutique-gpt2-instrument.png',
  },
  {
    slug: 'kit-mobilite',
    title: 'Kit Mobilité',
    subtitle: "Bouger pour s'ouvrir",
    description: 'Un programme mêlant mouvement, découverte et connexion au monde extérieur.',
    price: '39 €',
    features: ['Programme mobilité', 'Cartes exploration', 'Journal de route'],
    format: 'Kit complet',
    category: 'monde',
    image: 'boutique-gpt2-mobilite.png',
  },
  // Avenir
  {
    slug: 'kit-entrepreneuriat',
    title: 'Kit Entrepreneuriat',
    subtitle: 'Lancer son projet',
    description: "Workbook stratégique, cartes décision et planner pour passer de l'idée à l'action.",
    price: '39 €',
    badge: 'Pro',
    badgeColor: '#2E94B5',
    features: ['Workbook stratégie', 'Cartes décision', 'Planner 12 semaines'],
    format: 'Kit complet',
    category: 'avenir',
    popular: true,
    image: 'boutique-gpt2-entrepreneuriat.png',
  },
  {
    slug: 'kit-finances',
    title: 'Kit Finances',
    subtitle: 'Reprendre le contrôle',
    description: "Budget conscient, journal financier et méthodes pour une relation saine à l'argent.",
    price: '39 €',
    features: ['Planner budget', 'Journal financier', 'Guide investissement'],
    format: 'Kit complet',
    category: 'avenir',
    image: 'boutique-gpt2-finances.png',
  },
  {
    slug: 'kit-innovation',
    title: 'Kit Innovation',
    subtitle: 'Penser autrement',
    description: 'Outils de créativité, cartes de brainstorming et méthodes pour résoudre des problèmes complexes.',
    price: '39 €',
    features: ['Cartes brainstorming', 'Méthodes créatives', 'Workbook idéation'],
    format: 'Kit complet',
    category: 'avenir',
    image: 'boutique-gpt2-innovation.png',
  },
]

async function findExistingBySlug(slug) {
  return client.fetch(
    '*[_type == "boutiqueProduct" && slug.current == $slug][0]{_id}',
    { slug }
  )
}

async function uploadImage(filename, alt) {
  const filepath = path.join(IMAGES_DIR, filename)
  if (!fs.existsSync(filepath)) {
    throw new Error(`Image not found: ${filepath}`)
  }
  const asset = await client.assets.upload('image', fs.createReadStream(filepath), {
    filename,
  })
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  }
}

async function migrateOne(p) {
  const existing = await findExistingBySlug(p.slug)
  if (existing) {
    console.log(`  ⏭  ${p.slug} — déjà présent (${existing._id}), skip`)
    return { skipped: true }
  }

  console.log(`  ⤴  ${p.slug} — upload image…`)
  const image = await uploadImage(p.image, p.title)

  const doc = {
    _type: 'boutiqueProduct',
    title: p.title,
    subtitle: p.subtitle,
    slug: { _type: 'slug', current: p.slug },
    description: p.description,
    features: p.features || [],
    format: p.format,
    price: p.price,
    badge: p.badge,
    badgeColor: p.badgeColor,
    category: p.category,
    image,
    popular: !!p.popular,
    featured: !!p.featured,
  }

  const created = await client.create(doc)
  console.log(`  ✅ ${p.slug} → ${created._id}`)
  return { created: true }
}

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('❌ SANITY_TOKEN absent (.env ou variable d\'environnement)')
    process.exit(1)
  }
  console.log(`🎁 Migration ${PRODUCTS.length} produits boutique vers Sanity (projet r941i081)\n`)

  let created = 0, skipped = 0, failed = 0
  for (const p of PRODUCTS) {
    try {
      const r = await migrateOne(p)
      if (r.created) created++
      if (r.skipped) skipped++
    } catch (err) {
      failed++
      console.error(`  ❌ ${p.slug} — ${err.message}`)
    }
  }

  console.log(`\n📊 Résultat : ${created} créés · ${skipped} skip · ${failed} échecs`)
  process.exit(failed > 0 ? 1 : 0)
}

main()
