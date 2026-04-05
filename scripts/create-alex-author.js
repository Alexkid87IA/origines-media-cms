// Script pour créer l'auteur Alex Quilghini et l'assigner à tous les contenus
// Usage: npx sanity exec scripts/create-alex-author.js --with-user-token

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const alexAuthor = {
  _type: 'author',
  _id: 'author-alex-quilghini',
  name: 'Alex Quilghini',
  slug: {
    _type: 'slug',
    current: 'alex-quilghini'
  },
  role: 'Co-fondateur et président',
  bio: '20 années de média derrière moi, je prends plaisir à essayer de créer des contenus d\'utilité publique. Mon terrain de jeu : Société, Tech, psychologie.',
  specialites: ['Société', 'Tech', 'Psychologie']
}

async function createAuthorAndAssignToContents() {
  console.log('🚀 Création de l\'auteur Alex Quilghini...')

  // Créer ou mettre à jour l'auteur
  try {
    const author = await client.createOrReplace(alexAuthor)
    console.log('✅ Auteur créé:', author.name)
    console.log('   ID:', author._id)
  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'auteur:', error.message)
    return
  }

  // Types de contenus à mettre à jour
  const contentTypes = ['production', 'video', 'episode', 'portrait', 'serie', 'recit']

  for (const type of contentTypes) {
    console.log(`\n📝 Mise à jour des ${type}s...`)

    // Récupérer tous les documents de ce type sans auteur
    const query = `*[_type == "${type}" && !defined(author)]{ _id, titre, title }`
    const documents = await client.fetch(query)

    if (documents.length === 0) {
      console.log(`   Aucun ${type} sans auteur trouvé`)
      continue
    }

    console.log(`   ${documents.length} ${type}(s) à mettre à jour`)

    // Mettre à jour chaque document
    for (const doc of documents) {
      const docTitle = doc.titre || doc.title || doc._id
      try {
        await client
          .patch(doc._id)
          .set({
            author: {
              _type: 'reference',
              _ref: 'author-alex-quilghini'
            }
          })
          .commit()
        console.log(`   ✅ ${docTitle}`)
      } catch (error) {
        console.log(`   ❌ ${docTitle}: ${error.message}`)
      }
    }
  }

  console.log('\n🎉 Terminé!')
  console.log('\n📸 N\'oubliez pas d\'ajouter votre photo de profil dans Sanity Studio:')
  console.log('   1. Allez dans "Auteurs"')
  console.log('   2. Cliquez sur "Alex Quilghini"')
  console.log('   3. Uploadez votre photo dans le champ "Photo"')
}

createAuthorAndAssignToContents().catch(console.error)
