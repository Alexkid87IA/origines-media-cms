const { createClient } = require('@sanity/client')
const fs = require('fs')

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

// === SOUS-TOPICS VALIDES PAR UNIVERS ===
const VALID_SOUSTOPICS = {
  esprit: ['emotions', 'conscience', 'meditation', 'developpement-personnel', 'neurosciences', 'philosophie', 'quete-de-sens', 'therapies'],
  corps: ['nutrition', 'sommeil', 'mouvement', 'prevention', 'medecine-douce', 'bien-etre-physique', 'sport', 'respiration'],
  liens: ['parentalite', 'couples', 'amitie', 'education', 'generations', 'communaute', 'ruptures', 'enquetes-sociales'],
  monde: ['recits-de-voyage', 'destinations', 'art', 'musique', 'litterature', 'cinema', 'creativite', 'photographie'],
  avenir: ['carriere', 'entrepreneuriat', 'innovation', 'intelligence-artificielle', 'economie', 'leadership', 'numerique', 'nomadisme'],
}

// === MOTS-CLÉS FORTS par sous-topic (utilisés sur le body text) ===
const SOUSTOPIC_KEYWORDS = {
  // L'Esprit
  'emotions': ['émotion', 'colère', 'tristesse', 'joie', 'peur', 'anxiété', 'stress', 'sentiment', 'lâcher-prise', 'résilience', 'intelligence émotionnelle', 'gérer ses émotions', 'dépendance affective', 'jalousie', 'vulnérabilité', 'empathie', 'hypersensib'],
  'conscience': ['conscience', 'éveil', 'lucidité', 'attention', 'mindfulness', 'présence', 'être conscient', 'pleine conscience', 'observ'],
  'meditation': ['méditation', 'méditer', 'pleine conscience', 'mindfulness', 'zen', 'contemplat', 'respiration consciente', 'silence intérieur'],
  'developpement-personnel': ['confiance en soi', 'estime de soi', 'habitude', 'motivation', 'procrastination', 'objectif', 'potentiel', 'zone de confort', 'imposteur', 'croyance limitante', 'autodiscipline', 'transformation personnelle', 'croissance personnelle'],
  'neurosciences': ['neuroscience', 'cerveau', 'neuroplasticité', 'dopamine', 'neurone', 'cognitif', 'biais cognitif', 'synapse', 'cortex', 'amygdale', 'hippocampe'],
  'philosophie': ['philosophe', 'philosopher', 'stoïc', 'existential', 'sagesse', 'épictète', 'socrate', 'nietzsche', 'vertu', 'éthique', 'morale', 'pensée critique'],
  'quete-de-sens': ['sens de la vie', 'ikigai', 'raison d\'être', 'spiritualité', 'spirituel', 'transcendance', 'gratitude', 'bouddhisme', 'sacré', 'quête', 'mission de vie', 'vocation'],
  'therapies': ['thérapie', 'psychothérapie', 'psychologue', 'psychanalyse', 'trauma', 'dépression', 'burn-out', 'burnout', 'tcc', 'emdr', 'psy ', 'psychiatre', 'trouble', 'diagnostic', 'patient', 'guérir', 'soigner'],
  // Le Corps
  'nutrition': ['nutrition', 'alimentation', 'régime', 'aliment', 'manger', 'microbiote', 'intestin', 'jeûne', 'vitamine', 'protéine', 'calorie', 'nutriment', 'sucre', 'gras', 'digestion', 'repas'],
  'sommeil': ['sommeil', 'dormir', 'insomnie', 'sieste', 'rêve', 'circadien', 'mélatonine', 'nuit', 'lit', 'se coucher', 'réveil'],
  'mouvement': ['marche', 'marcher', 'bouger', 'mobilité', 'posture', 'étirement', 'yoga', 'activité physique', 'mouvement', 'souplesse', 'articulation'],
  'prevention': ['prévention', 'dépistage', 'vaccination', 'immunité', 'défense', 'inflammation', 'chronique', 'maladie', 'symptôme', 'risque', 'facteur'],
  'medecine-douce': ['naturopathie', 'acupuncture', 'homéopathie', 'phytothérapie', 'plante', 'remède naturel', 'médecine douce', 'médecine alternative', 'ostéopath'],
  'bien-etre-physique': ['bien-être', 'wellness', 'détente', 'relaxation', 'spa', 'massage', 'fatigue', 'énergie', 'vitalité', 'corps', 'santé mentale', 'santé physique', 'prendre soin'],
  'sport': ['sport', 'entraînement', 'fitness', 'musculation', 'course', 'vélo', 'natation', 'endurance', 'cardio', 'performance', 'athlète', 'compétition'],
  'respiration': ['respiration', 'souffle', 'cohérence cardiaque', 'breathwork', 'pranayama', 'wim hof', 'respirer', 'inspir', 'expir'],
  // Les Liens
  'parentalite': ['parentalité', 'parent', 'enfant', 'mère', 'père', 'éducation positive', 'bienveillance', 'nid vide', 'adolescen', 'bébé', 'grossesse', 'maternité', 'paternité', 'famille', 'ado '],
  'couples': ['couple', 'relation amoureuse', 'mariage', 'divorce', 'séparation', 'infidélité', 'jalousie', 'communication couple', 'vie à deux', 'sexualité', 'amoureux', 'conjoint', 'partenaire', 'rupture amoureuse'],
  'amitie': ['amitié', 'ami ', 'amis ', 'solitude', 'lien social', 'isolement', 'seul ', 'solitude moderne', 'solitude sociale', 'se sentir seul'],
  'education': ['éducation', 'école', 'apprentissage', 'pédagogie', 'professeur', 'enseignement', 'élève', 'étudiant', 'formation', 'écran enfant', 'harcèlement scolaire'],
  'generations': ['génération', 'grands-parents', 'senior', 'vieillissement', 'intergénérationnel', 'retraite', 'aidant', 'aîné', 'grand âge', 'vieux', 'ehpad', 'personnes âgées'],
  'communaute': ['communauté', 'voisin', 'quartier', 'engagement', 'bénévolat', 'solidarité', 'entraide', 'collectif', 'citoyen'],
  'ruptures': ['rupture', 'deuil', 'perte', 'recomposé', 'abandon', 'fratrie', 'conflit famil', 'famille recomposée', 'séparation familiale', 'frère', 'sœur'],
  'enquetes-sociales': ['société', 'inégalité', 'précarité', 'féminisme', 'égalité', 'discrimination', 'justice social', 'cancel culture', 'démocratie', 'médias', 'classe sociale', 'pauvreté', 'travail', 'emploi', 'chômage', 'ubérisation', 'gentrification', 'consommation', 'vote', 'politique'],
  // Le Monde
  'recits-de-voyage': ['voyage', 'voyageur', 'road trip', 'backpack', 'destination', 'expat', 'carnet de voyage', 'pays', 'découvrir', 'explorer', 'partir'],
  'destinations': ['destination', 'city break', 'séjour', 'escapade', 'île', 'plage', 'montagne'],
  'art': ['art ', 'artiste', 'musée', 'exposition', 'galerie', 'peinture', 'sculpture', 'street art', 'contemporain', 'oeuvre', 'œuvre'],
  'musique': ['musique', 'album', 'concert', 'musicien', 'compositeur', 'playlist', 'jazz', 'classique', 'hip-hop', 'chanson', 'guitare', 'piano'],
  'litterature': ['livre', 'littérature', 'roman', 'lire ', 'lecture', 'écrivain', 'écriture', 'poésie', 'bibliothèque', 'page', 'manuscrit'],
  'cinema': ['cinéma', 'film', 'réalisateur', 'série tv', 'acteur', 'actrice', 'scénario', 'scène', 'caméra', 'tournage'],
  'creativite': ['créatif', 'créativité', 'imagination', 'design', 'diy', 'bricolage', 'maker', 'art-thérapie', 'théâtre', 'page blanche', 'inspiration créative', 'innover'],
  'photographie': ['photo', 'photographe', 'cliché', 'cadrage', 'argentique', 'appareil photo', 'objectif photo', 'portrait photo', 'image'],
  // L'Avenir
  'carriere': ['carrière', 'emploi', 'CV', 'entretien', 'salaire', 'reconversion', 'job', 'manager', 'négocier', 'salariat', 'télétravail', 'quiet quitting', 'présentéisme', 'bore-out', 'brown-out', 'promotion', 'poste', 'collègue', 'bureau', 'open space', 'licenciement', 'démission'],
  'entrepreneuriat': ['entrepreneur', 'startup', 'lancer', 'créer son', 'freelance', 'business', 'entreprise', 'solopreneur', 'indépendant', 'client', 'chiffre d\'affaires'],
  'innovation': ['innovation', 'futur', 'tendance techno', 'disruption', 'révolution techno', 'transformation', 'quantique', '5g', '6g', 'iot'],
  'intelligence-artificielle': ['intelligence artificielle', ' ia ', ' IA ', 'algorithme', 'machine learning', 'chatgpt', 'deep learning', 'ia générative', 'robot', 'automatisation'],
  'economie': ['économie', 'finance', 'investir', 'argent', 'marché', 'inflation', 'crypto', 'blockchain', 'circulaire', 'bourse', 'dette', 'budget'],
  'leadership': ['leadership', 'leader', 'diriger', 'inspirer', 'dirigeant', 'influence', 'charisme', 'management', 'PDG', 'chef d\'entreprise', 'CEO'],
  'numerique': ['numérique', 'digital', 'données', 'cybersécurité', 'vie privée', 'RGPD', 'dark pattern', 'sobriété numérique', 'réseaux sociaux', 'application', 'algorithme', 'internet', 'web', 'en ligne', 'hacker', 'piratage'],
  'nomadisme': ['nomadisme', 'nomade numérique', 'digital detox', 'remote', 'coworking', 'travailler ailleurs', 'semaine 4 jours', 'travailler voyage'],
}

// === CLASSIFICATION CATEGORY ===
function classifyCategory(titre, body) {
  const t = (titre || '').toLowerCase()
  const b = (body || '').toLowerCase()
  const text = t + ' ' + b.substring(0, 2000)

  // Compter indicateurs
  const firstPerson = (text.match(/\bje\b|\bj'ai\b|\bmon\b|\bma\b|\bmes\b|\bme\b|\bm'a\b|\bnous\b/g) || []).length
  const thirdPerson = (text.match(/\bil a\b|\belle a\b|\bil est\b|\belle est\b|\bson parcours\b|\bsa vie\b/g) || []).length
  const dataIndicators = (text.match(/\b\d+\s*%|\bétude\b|\brecherche\b|\bselon\b|\bstatistique|\bscientifique|\bexperts?\b/g) || []).length
  const questionIndicators = (text.match(/\bpourquoi\b|\bcomment\b|\bqu'est-ce|\bfaut-il\b|\bdoit-on\b/g) || []).length
  const narrativeIndicators = (text.match(/\bun jour\b|\bce matin\b|\bquand\b|\bil y a \d+|\bse souvient\b|\braconte\b|\btémoign/g) || []).length

  // Immersion: très personnel, long, terrain
  if (t.match(/j'ai vécu|j'ai passé|j'ai testé|\d+ jours|\d+ semaines|\d+ mois sans|immersion|plongée dans/))
    return 'immersions'

  // Enquête: données, investigation, révélations
  if (t.match(/enquête|investigation|face cachée|vérité sur|scandale|révèle/) || dataIndicators > 8)
    return 'enquetes'

  // Portrait: centré sur une personne, parcours
  if (t.match(/portrait de|parcours de|rencontre avec|itinéraire de/) || (thirdPerson > 10 && firstPerson < 3))
    return 'portraits'

  // Récit: narratif, première personne forte, storytelling
  if (firstPerson > 12 && questionIndicators < 3)
    return 'recits'
  if (narrativeIndicators > 5 && questionIndicators < 4)
    return 'recits'
  if (t.match(/^quand |le jour où|comment j'ai|mon expérience|la fois où/))
    return 'recits'

  // Détecter les récits plus subtils via le body
  if (firstPerson > 6 && narrativeIndicators > 3)
    return 'recits'

  // Par défaut: essai (analytique, explicatif)
  return 'essais'
}

// === CLASSIFICATION SOUS-TOPIC ===
function classifySoustopic(titre, body, tags, univers) {
  const t = (titre || '').toLowerCase()
  const b = (body || '').toLowerCase().substring(0, 3000)
  const tagStr = (tags || []).map(tag => typeof tag === 'string' ? tag.toLowerCase() : '').join(' ')
  const text = t + ' ' + tagStr + ' ' + b

  const validSoustopics = VALID_SOUSTOPICS[univers] || []
  const scores = {}

  for (const st of validSoustopics) {
    const keywords = SOUSTOPIC_KEYWORDS[st] || []
    let score = 0
    for (const kw of keywords) {
      const regex = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      const matches = text.match(regex)
      if (matches) {
        // Titre match = 5 points, tag match = 3, body match = 1
        const titreMatches = (t.match(regex) || []).length
        const tagMatches = (tagStr.match(regex) || []).length
        const bodyMatches = matches.length - titreMatches - tagMatches
        score += titreMatches * 5 + tagMatches * 3 + bodyMatches * 1
      }
    }
    if (score > 0) scores[st] = score
  }

  // Retourner le sous-topic avec le meilleur score
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  if (sorted.length > 0 && sorted[0][1] >= 2) {
    return { soustopic: sorted[0][0], score: sorted[0][1], method: 'scored' }
  }

  // Fallback intelligent par univers
  const FALLBACKS = {
    esprit: 'developpement-personnel',
    corps: 'bien-etre-physique',
    liens: 'communaute',
    monde: 'creativite',
    avenir: 'carriere',
  }
  return { soustopic: FALLBACKS[univers], score: 0, method: 'fallback' }
}

async function migrate() {
  console.log('\n=== CORRECTION CLASSIFICATION (body text analysis) ===\n')

  const productions = await client.fetch(`*[_type == "production" && !(_id in path("drafts.**"))] {
    _id, titre, tags, univpilar, soustopic, category,
    deck,
    "bodyText": pt::text(contenu)
  }`)
  console.log(`Articles à analyser: ${productions.length}`)

  const transaction = client.transaction()
  let categoryChanges = 0
  let soustopicChanges = 0
  let soustopicFixed = 0 // cross-univers fixes

  const catDistrib = {}
  const stDistrib = {}
  const stMethodDistrib = { scored: 0, fallback: 0, kept: 0 }

  for (const prod of productions) {
    const patch = {}

    // --- 1. Fix sous-topic ---
    const validForUnivers = VALID_SOUSTOPICS[prod.univpilar] || []
    const currentStIsValid = validForUnivers.includes(prod.soustopic)

    if (!currentStIsValid) {
      // Sous-topic d'un autre univers → recalculer
      const result = classifySoustopic(prod.titre, prod.bodyText, prod.tags, prod.univpilar)
      patch.soustopic = result.soustopic
      soustopicFixed++
      stMethodDistrib[result.method]++
    } else {
      // Re-évaluer même les valides avec le body text
      const result = classifySoustopic(prod.titre, prod.bodyText, prod.tags, prod.univpilar)
      if (result.method === 'scored' && result.soustopic !== prod.soustopic && result.score >= 5) {
        patch.soustopic = result.soustopic
        soustopicChanges++
        stMethodDistrib.scored++
      } else {
        stMethodDistrib.kept++
      }
    }

    // --- 2. Reclassifier category ---
    const newCategory = classifyCategory(prod.titre, prod.bodyText)
    if (newCategory !== prod.category) {
      patch.category = newCategory
      categoryChanges++
    }

    // Stats
    catDistrib[patch.category || prod.category] = (catDistrib[patch.category || prod.category] || 0) + 1
    stDistrib[patch.soustopic || prod.soustopic] = (stDistrib[patch.soustopic || prod.soustopic] || 0) + 1

    if (Object.keys(patch).length > 0) {
      transaction.patch(prod._id, { set: patch })
    }
  }

  console.log(`\nRésultats:`)
  console.log(`  Sous-topics cross-univers corrigés : ${soustopicFixed}`)
  console.log(`  Sous-topics améliorés (meilleur score) : ${soustopicChanges}`)
  console.log(`  Sous-topics conservés : ${stMethodDistrib.kept}`)
  console.log(`  Catégories modifiées : ${categoryChanges}`)

  console.log(`\n--- DISTRIBUTION CATÉGORIES ---`)
  Object.entries(catDistrib).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(15)} : ${v}`))

  console.log(`\n--- DISTRIBUTION SOUS-TOPICS ---`)
  Object.entries(stDistrib).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(30)} : ${v}`))

  if (process.argv.includes('--dry-run')) {
    console.log('\n🔶 DRY RUN — aucune modification.')
    return
  }

  try {
    await transaction.commit()
    console.log('\n✅ Classification corrigée!')
  } catch (err) {
    console.error('❌ Erreur:', err.message)
  }
}

migrate().catch(console.error)
