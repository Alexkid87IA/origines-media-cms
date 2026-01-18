import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

async function fixDraft() {
  // Récupérer le draft
  const draft = await client.fetch(`
    *[_id == "drafts.9DkLqTNMEagTLw82PyLKhk"][0] {
      _id,
      contenu
    }
  `)

  if (!draft) {
    console.log('❌ Pas de draft trouvé')
    return
  }

  console.log('📝 Draft trouvé:', draft._id)

  // Trouver la citation vide
  const quoteIndex = draft.contenu.findIndex(block => block._type === 'styledQuote' && !block.text)

  if (quoteIndex === -1) {
    console.log('✅ Pas de citation vide dans le draft')
    return
  }

  console.log('Index de la citation vide:', quoteIndex)

  // Patcher le draft
  await client
    .patch(draft._id)
    .set({
      [`contenu[${quoteIndex}].text`]: "La première année, tu viens voir le spectacle. La cinquième, tu viens pour les gens. Après dix ans, tu comprends que tu viens pour te perdre — et que c'est la seule façon de te retrouver."
    })
    .commit()

  console.log('✅ Draft mis à jour!')
}

fixDraft().catch(console.error)
