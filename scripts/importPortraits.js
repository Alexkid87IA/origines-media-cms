const { createClient } = require('@sanity/client')
const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  useCdn: false,
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01'
})

const portraits = [
  {
    titre: "COMMENT J'AI TROUVÉ LE SENS EN DEVENANT AGRICULTRICE URBAINE",
    categorie: "CARRIÈRE",
    accroche: "De cadre supérieure à cultivatrice de légumes sur les toits parisiens, Marie nous raconte sa transformation radicale et les leçons qu'elle en tire sur le sens du travail.",
    imageUrl: "https://images.pexels.com/photos/2519392/pexels-photo-2519392.jpeg",
    ordre: 1
  },
  {
    titre: "LA RESILIENCE D'UN NAVIGATEUR SOLITAIRE FACE À LA TEMPÊTE",
    categorie: "VOYAGE",
    accroche: "Seul face aux éléments déchaînés au milieu de l'Atlantique, Thomas découvre les ressources insoupçonnées de l'esprit humain et redéfinit sa relation au danger.",
    imageUrl: "https://images.pexels.com/photos/1690352/pexels-photo-1690352.jpeg",
    ordre: 2
  },
  {
    titre: "DE LA FINANCE À L'ARTISANAT : CHANGER DE VIE À 40 ANS",
    categorie: "PSYCHOLOGIE",
    accroche: "Après quinze ans dans la finance, Paul abandonne tout pour devenir ébéniste. Un récit sur le courage de recommencer et la quête d'authenticité.",
    imageUrl: "https://images.pexels.com/photos/3769999/pexels-photo-3769999.jpeg",
    ordre: 3
  },
  {
    titre: "L'ART COMME THÉRAPIE : GUÉRIR PAR LA CRÉATION",
    categorie: "ART & CRÉATIVITÉ",
    accroche: "Après un burn-out sévère, Emma découvre la peinture et transforme sa souffrance en œuvre d'art. Une exploration profonde du pouvoir guérisseur de la créativité.",
    imageUrl: "https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg",
    ordre: 4
  },
  {
    titre: "MÉDITATION EN ENTREPRISE : RÉVOLUTIONNER LE MONDE DU TRAVAIL",
    categorie: "SPIRITUALITÉ",
    accroche: "Comment Julien a introduit la méditation dans sa startup tech et transformé radicalement la culture d'entreprise. Un témoignage sur l'équilibre entre performance et bien-être.",
    imageUrl: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg",
    ordre: 5
  }
]

async function importPortraits() {
  console.log('🎬 Import des portraits...')
  
  for (const portrait of portraits) {
    try {
      // Version simplifiée : on crée le document SANS l'image d'abord
      const doc = {
        _type: 'portrait',
        titre: portrait.titre,
        categorie: portrait.categorie,
        accroche: portrait.accroche,
        ordre: portrait.ordre,
        slug: {
          _type: 'slug',
          current: portrait.titre.toLowerCase()
            .replace(/[àáäâ]/g, 'a')
            .replace(/[èéëê]/g, 'e')
            .replace(/[ìíïî]/g, 'i')
            .replace(/[òóöô]/g, 'o')
            .replace(/[ùúüû]/g, 'u')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
        }
      }
      
      await client.create(doc)
      console.log(`✅ Portrait "${portrait.titre}" créé (sans image pour l'instant)`)
    } catch (error) {
      console.error(`❌ Erreur pour "${portrait.titre}":`, error.message)
    }
  }
  
  console.log('✨ Import des portraits terminé !')
  console.log('💡 Note: Les images doivent être ajoutées manuellement dans Sanity Studio')
}

importPortraits()