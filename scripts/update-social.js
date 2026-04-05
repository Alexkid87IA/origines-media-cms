import {getCliClient} from 'sanity/cli'

async function updateSocial() {
  const client = getCliClient()
  await client.patch('author-alex-quilghini').set({
    social: {
      linkedin: 'https://www.linkedin.com/in/alexandre-quilghini-a2810476/',
      instagram: 'https://www.instagram.com/alex______kid'
    }
  }).commit()
  console.log('Réseaux sociaux ajoutés!')
}

updateSocial()
