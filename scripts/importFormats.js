// scripts/importFormats.js
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  token: 'skD59Pfe62srOa0ciD9ZLCgo5LRsslt23P0CfVMhskeTsDxgHdhkHqrG5xK96eceT52MTsLBhBE9Vp9MqapTCdoQw1tcBLYuy6rb0xzIWROnKY9KVYEKvHogAouRrMNsut5FjbCaWXl5sIG4jPoKzEJXzDL5JlS3r3sVxCkP0XPrIr8TdleJ',
  apiVersion: '2024-03-01',
  useCdn: false
})

const formats = [
  {
    title: "Article",
    slug: { current: "article" },
    description: "Format écrit approfondi pour explorer un sujet en détail",
    color: "#3B82F6",
    icon: "FileText",
    order: 1
  },
  {
    title: "Vidéo",
    slug: { current: "video" },
    description: "Contenu audiovisuel immersif",
    color: "#EF4444",
    icon: "Video",
    order: 2
  },
  {
    title: "Podcast",
    slug: { current: "podcast" },
    description: "Format audio pour écoute mobile",
    color: "#8B5CF6",
    icon: "Mic",
    order: 3
  },
  {
    title: "Interview",
    slug: { current: "interview" },
    description: "Conversation approfondie avec des experts",
    color: "#10B981",
    icon: "Users",
    order: 4
  },
  {
    title: "Reportage",
    slug: { current: "reportage" },
    description: "Enquête de terrain immersive",
    color: "#F59E0B",
    icon: "Camera",
    order: 5
  }
]

async function importFormats() {
  console.log('🎨 Import des formats...')
  
  // D'abord, supprimer les formats "Untitled" existants
  try {
    const untitledFormats = await client.fetch('*[_type == "format" && title == "Untitled"]')
    console.log(`🗑️  ${untitledFormats.length} formats "Untitled" à supprimer`)
    
    for (const format of untitledFormats) {
      await client.delete(format._id)
      console.log(`   ❌ Format supprimé: ${format._id}`)
    }
  } catch (error) {
    console.error('Erreur lors de la suppression:', error)
  }
  
  // Ensuite, créer les nouveaux formats
  for (const format of formats) {
    try {
      const doc = {
        _type: 'format',
        ...format
      }
      
      const result = await client.create(doc)
      console.log(`✅ Format créé: ${format.title}`)
    } catch (error) {
      console.error(`❌ Erreur pour "${format.title}":`, error)
    }
  }
  
  console.log('✨ Import des formats terminé !')
}

importFormats()