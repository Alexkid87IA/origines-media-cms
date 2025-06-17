const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  useCdn: false,
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01'
})

// D'abord, on va récupérer les IDs des univers créés
async function getUniversByName(name) {
  const query = `*[_type == "univers" && nom == $name][0]._id`
  return await client.fetch(query, { name })
}

const productions = [
  {
    titre: "Comment j'ai trouvé le sens en devenant agricultrice urbaine",
    description: "De cadre supérieure à cultivatrice de légumes sur les toits parisiens, Marie nous raconte sa transformation radicale.",
    imageUrl: "https://images.pexels.com/photos/2519392/pexels-photo-2519392.jpeg",
    univers: "CARRIÈRE",
    tempsLecture: 8,
    vues: 12450,
    likes: 892,
    isPopular: true,
    tags: ['Reconversion', 'Écologie', 'Sens du travail']
  },
  {
    titre: "L'art de la résilience entrepreneuriale",
    description: "Comment transformer les obstacles en opportunités et rebondir face aux défis du monde des affaires.",
    imageUrl: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg",
    univers: "CARRIÈRE",
    tempsLecture: 12,
    vues: 8930,
    likes: 654,
    isPopular: true,
    isRecent: true,
    tags: ['Entrepreneuriat', 'Résilience', 'Leadership']
  },
  {
    titre: "Méditation et neurosciences : ce que dit la science",
    description: "Une exploration approfondie des bienfaits scientifiquement prouvés de la méditation sur le cerveau.",
    imageUrl: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg",
    univers: "SPIRITUALITÉ",
    tempsLecture: 15,
    vues: 15670,
    likes: 1203,
    isPopular: true,
    isRecent: true,
    tags: ['Méditation', 'Science', 'Bien-être']
  },
  {
    titre: "L'intelligence artificielle va-t-elle remplacer la créativité humaine ?",
    description: "Réflexions sur l'avenir de la création artistique à l'ère de l'IA et des nouvelles technologies.",
    imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    univers: "TECHNOLOGIE",
    tempsLecture: 10,
    vues: 7234,
    likes: 445,
    isRecent: true,
    tags: ['Intelligence artificielle', 'Créativité', 'Innovation']
  },
  {
    titre: "Communication non-violente : transformer les conflits",
    description: "Apprendre à communiquer avec bienveillance pour résoudre les tensions relationnelles.",
    imageUrl: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    univers: "RELATIONS",
    tempsLecture: 9,
    vues: 11200,
    likes: 789,
    isPopular: true,
    tags: ['Communication', 'Relations', 'Développement personnel']
  },
  {
    titre: "Minimalisme : moins pour vivre mieux",
    description: "Comment adopter un mode de vie minimaliste pour retrouver l'essentiel et réduire son impact.",
    imageUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    univers: "ENVIRONNEMENT",
    tempsLecture: 7,
    vues: 9876,
    likes: 567,
    tags: ['Minimalisme', 'Écologie', 'Bien-être']
  },
  {
    titre: "L'art comme thérapie : guérir par la création",
    description: "Découvrir comment l'expression artistique peut devenir un puissant outil de guérison émotionnelle.",
    imageUrl: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg",
    univers: "ART & CRÉATIVITÉ",
    tempsLecture: 11,
    vues: 13450,
    likes: 934,
    isPopular: true,
    tags: ['Art thérapie', 'Créativité', 'Guérison']
  },
  {
    titre: "Voyager seul : guide de l'aventure intérieure",
    description: "Les leçons de vie apprises en parcourant le monde en solitaire et en se découvrant soi-même.",
    imageUrl: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg",
    univers: "VOYAGE",
    tempsLecture: 13,
    vues: 8765,
    likes: 623,
    tags: ['Voyage solo', 'Développement personnel', 'Aventure']
  },
  {
    titre: "L'équilibre vie professionnelle et personnelle",
    description: "Stratégies concrètes pour harmoniser ambitions professionnelles et épanouissement personnel.",
    imageUrl: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg",
    univers: "CARRIÈRE",
    tempsLecture: 14,
    vues: 16789,
    likes: 1156,
    isPopular: true,
    tags: ['Équilibre', 'Productivité', 'Bien-être']
  },
  {
    titre: "Les nouveaux codes de la société moderne",
    description: "Comment naviguer dans un monde en mutation et comprendre les évolutions sociétales actuelles.",
    imageUrl: "https://images.pexels.com/photos/7848733/pexels-photo-7848733.jpeg",
    univers: "SOCIÉTÉ",
    tempsLecture: 16,
    vues: 12340,
    likes: 876,
    tags: ['Société', 'Évolution', 'Culture']
  },
  {
    titre: "Sport et santé mentale : le duo gagnant",
    description: "L'impact positif de l'activité physique sur le bien-être psychologique et émotionnel.",
    imageUrl: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
    univers: "SANTÉ",
    tempsLecture: 9,
    vues: 10234,
    likes: 712,
    tags: ['Sport', 'Santé mentale', 'Bien-être']
  },
  {
    titre: "Comprendre et apprivoiser son anxiété",
    description: "Outils pratiques et approches thérapeutiques pour mieux gérer l'anxiété au quotidien.",
    imageUrl: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
    univers: "PSYCHOLOGIE",
    tempsLecture: 12,
    vues: 18567,
    likes: 1345,
    isPopular: true,
    tags: ['Anxiété', 'Psychologie', 'Thérapie']
  }
]

async function importProductions() {
  console.log('📚 Import des productions...')
  
  for (const production of productions) {
    try {
      // Récupérer l'ID de l'univers
      const universId = await getUniversByName(production.univers)
      
      if (!universId) {
        console.error(`⚠️  Univers "${production.univers}" non trouvé`)
        continue
      }
      
      const doc = {
        _type: 'production',
        titre: production.titre,
        description: production.description,
        slug: {
          _type: 'slug',
          current: production.titre.toLowerCase()
            .replace(/[àáäâ]/g, 'a')
            .replace(/[èéëê]/g, 'e')
            .replace(/[ìíïî]/g, 'i')
            .replace(/[òóöô]/g, 'o')
            .replace(/[ùúüû]/g, 'u')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        },
        univers: {
          _type: 'reference',
          _ref: universId
        },
        tempsLecture: production.tempsLecture,
        datePublication: new Date().toISOString(),
        vues: production.vues,
        likes: production.likes,
        isPopular: production.isPopular || false,
        isRecent: production.isRecent || false,
        tags: production.tags
      }
      
      await client.create(doc)
      console.log(`✅ Production "${production.titre}" créée`)
    } catch (error) {
      console.error(`❌ Erreur pour "${production.titre}":`, error)
    }
  }
  
  console.log('✨ Import des productions terminé !')
}

importProductions()