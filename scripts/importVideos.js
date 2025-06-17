const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  useCdn: false,
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01'
})

const videos = [
  { 
    titre: "Développer un mindset d'exception", 
    description: "Découvrez les secrets des entrepreneurs qui réussissent et transforment leur vision du monde.", 
    thumbnailUrl: "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg", 
    videoUrl: "/video/mindset-exception",
    ordre: 1
  },
  { 
    titre: "L'art de la résilience entrepreneuriale", 
    description: "Comment transformer les obstacles en opportunités et rebondir face aux défis.", 
    thumbnailUrl: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg", 
    videoUrl: "/video/resilience-entrepreneuriale",
    ordre: 2
  },
  { 
    titre: "Les clés d'une communication authentique", 
    description: "Maîtrisez l'art de la communication pour amplifier votre message et votre influence.", 
    thumbnailUrl: "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg", 
    videoUrl: "/video/cles-communication",
    ordre: 3
  },
  { 
    titre: "Développer sa créativité au quotidien", 
    description: "Techniques et habitudes pour stimuler votre créativité et innover constamment.", 
    thumbnailUrl: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg", 
    videoUrl: "/video/developper-creativite",
    ordre: 4
  },
  { 
    titre: "Gérer son énergie, pas son temps", 
    description: "La méthode contre-intuitive pour être plus productif et éviter le burn-out.", 
    thumbnailUrl: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg", 
    videoUrl: "/video/gerer-energie",
    ordre: 5
  },
  { 
    titre: "Le pouvoir de l'écoute active", 
    description: "Pourquoi bien écouter est la compétence la plus sous-estimée en leadership.", 
    thumbnailUrl: "https://images.pexels.com/photos/7648348/pexels-photo-7648348.jpeg", 
    videoUrl: "/video/ecoute-active",
    ordre: 6
  },
  { 
    titre: "Prendre de meilleures décisions", 
    description: "Un modèle mental simple pour clarifier vos choix les plus complexes.", 
    thumbnailUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg", 
    videoUrl: "/video/meilleures-decisions",
    ordre: 7
  },
  { 
    titre: "La science de la première impression", 
    description: "Ce que les 7 premières secondes disent de vous et comment les maîtriser.", 
    thumbnailUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg", 
    videoUrl: "/video/premiere-impression",
    ordre: 8
  },
  { 
    titre: "Négocier comme un pro", 
    description: "Les principes fondamentaux pour aborder n'importe quelle négociation avec confiance.", 
    thumbnailUrl: "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg", 
    videoUrl: "/video/negocier-pro",
    ordre: 9
  },
  { 
    titre: "Le storytelling pour les marques", 
    description: "Comment raconter l'histoire de votre entreprise pour captiver votre audience.", 
    thumbnailUrl: "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg", 
    videoUrl: "/video/storytelling-marques",
    ordre: 10
  }
]

async function importVideos() {
  console.log('🎥 Import des vidéos...')
  
  for (const video of videos) {
    try {
      const doc = {
        _type: 'video',
        titre: video.titre,
        description: video.description,
        videoUrl: video.videoUrl,
        ordre: video.ordre
      }
      
      await client.create(doc)
      console.log(`✅ Vidéo "${video.titre}" créée`)
    } catch (error) {
      console.error(`❌ Erreur pour "${video.titre}":`, error)
    }
  }
  
  console.log('✨ Import des vidéos terminé !')
}

importVideos()