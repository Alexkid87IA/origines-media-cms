const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

// === MAPPING ancien univers slug → nouveau sous-topic ===
const OLD_UNIVERS_TO_SOUSTOPIC = {
  'developpement-personnel': 'developpement-personnel',
  'emotions-bien-etre': 'emotions',
  'relations-humaines': 'communaute',
  'meditation': 'meditation',
  'quete-de-sens': 'quete-de-sens',
  'gratitude': 'quete-de-sens',
  'sommeil': 'sommeil',
  'alimentation': 'nutrition',
  'mouvement': 'mouvement',
  'parentalite': 'parentalite',
  'couple': 'couples',
  'equilibre-de-vie': 'parentalite',
  'tendances-actuelles': 'enquetes-sociales',
  'consommation': 'enquetes-sociales',
  'travail-emploi': 'enquetes-sociales',
  'aventure-solo': 'recits-de-voyage',
  'voyage-responsable': 'recits-de-voyage',
  'immersion-culturelle': 'recits-de-voyage',
  'expression-creative': 'creativite',
  'ecriture': 'litterature',
  'art-therapie': 'creativite',
  'reconversion': 'carriere',
  'leadership': 'leadership',
  'negociation': 'carriere',
  'entrepreneuriat': 'entrepreneuriat',
  'personal-branding': 'carriere',
  'productivite': 'carriere',
  'deconnexion': 'numerique',
  'intelligence-artificielle': 'intelligence-artificielle',
  'cybersecurite': 'numerique',
}

// === REGLES de déduction sous-topic par mots-clés ===
// Format: [motifs, soustopic, univers_requis (optionnel)]
const KEYWORD_RULES = [
  // L'Esprit
  [['émotion', 'colère', 'tristesse', 'joie', 'peur', 'anxiété', 'stress', 'anxiete', 'sentiment', 'émotionnel', 'lâcher-prise', 'lacher-prise', 'résilience', 'resilience', 'intelligence émotionnelle'], 'emotions', 'esprit'],
  [['conscience', 'éveil', 'lucidité', 'attention', 'pleine conscience', 'mindfulness'], 'conscience', 'esprit'],
  [['méditation', 'meditation', 'pleine conscience', 'mindfulness', 'zen', 'contemplat'], 'meditation', 'esprit'],
  [['développement personnel', 'confiance en soi', 'estime de soi', 'habitude', 'motivation', 'procrastination', 'objectif', 'potentiel', 'imposteur', 'zone de confort'], 'developpement-personnel', 'esprit'],
  [['neuroscience', 'cerveau', 'neuroplasticité', 'dopamine', 'neurone', 'cognitif', 'biais cognitif'], 'neurosciences', 'esprit'],
  [['philosophie', 'philosopher', 'stoïc', 'existential', 'sens de la vie', 'sagesse', 'epictète', 'socrate'], 'philosophie', 'esprit'],
  [['sens', 'quête de sens', 'ikigai', 'raison d\'être', 'spiritualité', 'spirituel', 'transcendance', 'gratitude', 'bouddhisme', 'sacré'], 'quete-de-sens', 'esprit'],
  [['thérapie', 'psychothérapie', 'psy', 'psychologue', 'psychanalyse', 'trauma', 'dépression', 'deuil', 'burn-out', 'burnout', 'psycho', 'tcc', 'emdr'], 'therapies', 'esprit'],

  // Le Corps
  [['nutrition', 'alimentation', 'régime', 'aliment', 'manger', 'microbiote', 'intestin', 'jeûne', 'vitamine', 'protéine', 'cuisine saine', 'nourriture'], 'nutrition', 'corps'],
  [['sommeil', 'dormir', 'insomnie', 'sieste', 'rêve', 'circadien', 'mélatonine', 'nuit'], 'sommeil', 'corps'],
  [['mouvement', 'marche', 'bouger', 'mobilité', 'posture', 'étirement', 'yoga', 'activité physique'], 'mouvement', 'corps'],
  [['prévention', 'dépistage', 'vaccination', 'immunité', 'défense', 'inflammation', 'chronique'], 'prevention', 'corps'],
  [['médecine douce', 'naturopathie', 'acupuncture', 'homéopathie', 'phytothérapie', 'remède naturel', 'herbe'], 'medecine-douce', 'corps'],
  [['bien-être', 'bien être', 'wellness', 'détente', 'relaxation', 'spa', 'massage', 'fatigue'], 'bien-etre-physique', 'corps'],
  [['sport', 'entraînement', 'fitness', 'musculation', 'course', 'vélo', 'natation', 'endurance', 'cardio', 'performance'], 'sport', 'corps'],
  [['respiration', 'souffle', 'cohérence cardiaque', 'breathwork', 'pranayama', 'wim hof'], 'respiration', 'corps'],

  // Les Liens
  [['parentalité', 'parent', 'enfant', 'mère', 'père', 'éducation positive', 'bienveillance', 'nid vide', 'adolescen', 'bébé', 'grossesse'], 'parentalite', 'liens'],
  [['couple', 'amour', 'relation amoureuse', 'mariage', 'divorce', 'séparation', 'infidélité', 'jalousie', 'communication couple', 'vie à deux', 'sexualité'], 'couples', 'liens'],
  [['amitié', 'ami', 'solitude', 'lien social', 'isolement'], 'amitie', 'liens'],
  [['éducation', 'école', 'apprentissage', 'pédagogie', 'professeur', 'enseignement', 'élève', 'étudiant', 'formation', 'écran'], 'education', 'liens'],
  [['génération', 'grands-parents', 'senior', 'vieillissement', 'intergénérationnel', 'retraite', 'aidant', 'aîné', 'grand âge'], 'generations', 'liens'],
  [['communauté', 'voisin', 'quartier', 'engagement', 'bénévolat', 'solidarité', 'entraide', 'collectif'], 'communaute', 'liens'],
  [['rupture', 'deuil', 'séparation', 'perte', 'recomposé', 'abandon', 'fratrie', 'conflit famil'], 'ruptures', 'liens'],
  [['société', 'inégalité', 'précarité', 'féminisme', 'égalité', 'discrimination', 'justice social', 'cancel culture', 'démocratie', 'médias', 'fake news', 'consommation', 'ubérisation'], 'enquetes-sociales', 'liens'],

  // Le Monde
  [['voyage', 'voyageur', 'road trip', 'backpack', 'destination', 'nomade', 'expat', 'carnet'], 'recits-de-voyage', 'monde'],
  [['art ', 'artiste', 'musée', 'exposition', 'galerie', 'peinture', 'sculpture', 'street art', 'contemporain'], 'art', 'monde'],
  [['musique', 'album', 'concert', 'musicien', 'compositeur', 'playlist', 'jazz', 'classique', 'hip-hop', 'tiktok musique'], 'musique', 'monde'],
  [['livre', 'littérature', 'roman', 'lire', 'lecture', 'auteur', 'écrivain', 'écriture', 'poésie', 'bibliothèque'], 'litterature', 'monde'],
  [['cinéma', 'film', 'réalisateur', 'documentaire', 'série', 'acteur', 'hollywood', 'netflix'], 'cinema', 'monde'],
  [['créati', 'imagination', 'innovation créative', 'design', 'diy', 'bricolage', 'maker', 'art-thérapie', 'théâtre', 'photo', 'page blanche'], 'creativite', 'monde'],
  [['photo', 'photographe', 'image', 'cadrage', 'argentique', 'visual'], 'photographie', 'monde'],

  // L'Avenir
  [['carrière', 'emploi', 'travail', 'CV', 'entretien', 'salaire', 'reconversion', 'job', 'professionnel', 'manager', 'négocier', 'salariat', 'télétravail', 'quiet quitting', 'présentéisme', 'bore-out', 'brown-out'], 'carriere', 'avenir'],
  [['entrepreneur', 'startup', 'lancer', 'créer son', 'freelance', 'business', 'entreprise', 'solopreneur'], 'entrepreneuriat', 'avenir'],
  [['innovation', 'futur', 'tendance', 'disruption', 'révolution', 'transformation', 'quantique', '5g'], 'innovation', 'avenir'],
  [['intelligence artificielle', ' ia ', ' IA ', 'algorithme', 'machine learning', 'chatgpt', 'deep learning', 'ia générative'], 'intelligence-artificielle', 'avenir'],
  [['économie', 'finance', 'investir', 'argent', 'marché', 'inflation', 'crypto', 'blockchain', 'circulaire'], 'economie', 'avenir'],
  [['leadership', 'leader', 'diriger', 'inspirer', 'dirigeant', 'influence', 'charisme', 'management'], 'leadership', 'avenir'],
  [['numérique', 'digital', 'tech', 'données', 'cybersécurité', 'vie privée', 'RGPD', 'dark pattern', 'sobriété numérique', 'écran', 'réseaux sociaux démocratie', 'informatique'], 'numerique', 'avenir'],
  [['nomadisme', 'nomade numérique', 'digital detox', 'remote', 'coworking', 'travailler ailleurs', 'semaine 4 jours'], 'nomadisme', 'avenir'],
]

// === REGLES de classification category (format éditorial) ===
const CATEGORY_RULES = [
  // Immersions — très long, très personnel, enquêtes terrain
  [['j\'ai vécu', 'j\'ai passé', '30 jours', '100 jours', 'pendant un an', 'on a testé', 'immersion', 'plongée dans'], 'immersions'],
  // Enquêtes — investigation, révélation, données
  [['enquête', 'investigation', 'révèle', 'scandale', 'face cachée', 'vérité sur', 'chiffres', 'étude montre', 'les données'], 'enquetes'],
  // Portraits — parcours personnel, témoignage nommé
  [['portrait', 'parcours de', 'histoire de', 'rencontre avec', 'itinéraire', 'confession'], 'portraits'],
  // Récits — narratif, première personne, questions existentielles "quand", "pourquoi on"
  [['quand ', 'comment j\'ai', 'pourquoi on', 'la fois où', 'le jour où', 'récit', 'témoignage', 'mon expérience'], 'recits'],
]

function guessSoustopic(titre, tags, univers) {
  const t = (titre || '').toLowerCase()
  const allTags = (tags || []).map(tag => typeof tag === 'string' ? tag.toLowerCase() : '').join(' ')
  const combined = t + ' ' + allTags

  for (const [keywords, soustopic, requiredUnivers] of KEYWORD_RULES) {
    if (requiredUnivers && requiredUnivers !== univers) continue
    for (const kw of keywords) {
      if (combined.includes(kw.toLowerCase())) return soustopic
    }
  }

  // Fallback par univers
  const FALLBACKS = {
    esprit: 'developpement-personnel',
    corps: 'bien-etre-physique',
    liens: 'communaute',
    monde: 'creativite',
    avenir: 'carriere',
  }
  return FALLBACKS[univers] || null
}

function guessCategory(titre, tags) {
  const t = (titre || '').toLowerCase()
  const allTags = (tags || []).map(tag => typeof tag === 'string' ? tag.toLowerCase() : '').join(' ')
  const combined = t + ' ' + allTags

  for (const [keywords, category] of CATEGORY_RULES) {
    for (const kw of keywords) {
      if (combined.includes(kw.toLowerCase())) return category
    }
  }
  return 'essais'
}

async function migrate() {
  console.log('\n=== MIGRATION SOUS-TOPICS + AMÉLIORATION CATÉGORIES ===\n')

  // 1. Charger les anciens univers pour le mapping
  const oldUnivers = await client.fetch(`*[_type == "univers" && !(_id in path("drafts.**"))] { _id, nom, "slug": slug.current }`)
  const oldUniversMap = {}
  oldUnivers.forEach(u => { oldUniversMap[u._id] = u.slug })

  // 2. Charger les productions avec tous les détails
  const productions = await client.fetch(`*[_type == "production" && !(_id in path("drafts.**"))] {
    _id, titre, tags, univpilar, category,
    "oldUniversSlug": univers->slug.current
  }`)
  console.log(`Productions à traiter: ${productions.length}`)

  const transaction = client.transaction()
  let fromOldRef = 0
  let fromKeywords = 0
  let fromFallback = 0
  let categoryChanged = 0
  const soustopicDistrib = {}

  for (const prod of productions) {
    const patch = {}

    // --- Sous-topic ---
    let soustopic = null

    // Essayer d'abord l'ancien univers ref
    if (prod.oldUniversSlug && OLD_UNIVERS_TO_SOUSTOPIC[prod.oldUniversSlug]) {
      soustopic = OLD_UNIVERS_TO_SOUSTOPIC[prod.oldUniversSlug]
      fromOldRef++
    }

    // Sinon deviner par mots-clés
    if (!soustopic) {
      soustopic = guessSoustopic(prod.titre, prod.tags, prod.univpilar)
      if (soustopic) {
        const fallbacks = { esprit: 'developpement-personnel', corps: 'bien-etre-physique', liens: 'communaute', monde: 'creativite', avenir: 'carriere' }
        if (soustopic === fallbacks[prod.univpilar]) {
          fromFallback++
        } else {
          fromKeywords++
        }
      }
    }

    if (soustopic) {
      patch.soustopic = soustopic
      soustopicDistrib[soustopic] = (soustopicDistrib[soustopic] || 0) + 1
    }

    // --- Category (format éditorial) ---
    const newCategory = guessCategory(prod.titre, prod.tags)
    if (newCategory !== prod.category) {
      patch.category = newCategory
      categoryChanged++
    }

    if (Object.keys(patch).length > 0) {
      transaction.patch(prod._id, { set: patch })
    }
  }

  // Stats
  console.log(`\nSous-topics assignés:`)
  console.log(`  Depuis ancien univers ref : ${fromOldRef}`)
  console.log(`  Depuis mots-clés          : ${fromKeywords}`)
  console.log(`  Fallback par univers      : ${fromFallback}`)
  console.log(`  Catégories modifiées      : ${categoryChanged}`)

  console.log(`\nDistribution sous-topics:`)
  Object.entries(soustopicDistrib)
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`  ${k.padEnd(30)} : ${v}`))

  if (process.argv.includes('--dry-run')) {
    console.log('\n🔶 DRY RUN — aucune modification.')
    return
  }

  try {
    await transaction.commit()
    console.log('\n✅ Migration sous-topics terminée!')
  } catch (err) {
    console.error('❌ Erreur:', err.message)
  }
}

migrate().catch(console.error)
