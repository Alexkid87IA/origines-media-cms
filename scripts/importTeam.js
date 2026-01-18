#!/usr/bin/env node

/**
 * Script pour importer les membres de l'équipe
 * Usage: SANITY_TOKEN="xxx" node scripts/importTeam.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
});

// Données de l'équipe depuis AboutPage.tsx
const teamMembers = [
  {
    nom: 'Marie Dubois',
    role: 'Fondatrice & Directrice Éditoriale',
    bio: 'Passionnée par les histoires qui inspirent et transforment, Marie a fondé Origines pour donner une voix aux récits authentiques de notre communauté.',
    imageUrl: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    ordre: 1,
    isActive: true,
    reseaux: {
      twitter: 'mariedubois',
      instagram: 'mariedubois',
      linkedin: 'https://linkedin.com/in/mariedubois'
    }
  },
  {
    nom: 'Thomas Martin',
    role: 'Directeur Créatif',
    bio: 'Avec plus de 10 ans d\'expérience dans la création de contenu, Thomas apporte une vision unique qui mêle esthétique contemporaine et traditions culturelles.',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    ordre: 2,
    isActive: true,
    reseaux: {
      twitter: 'thomasmartin',
      instagram: 'thomasmartin'
    }
  },
  {
    nom: 'Sophie Chen',
    role: 'Responsable Communauté',
    bio: 'Sophie cultive les liens avec notre communauté grandissante, s\'assurant que chaque voix trouve sa place dans l\'écosystème Origines.',
    imageUrl: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
    ordre: 3,
    isActive: true,
    reseaux: {
      instagram: 'sophiechen',
      linkedin: 'https://linkedin.com/in/sophiechen'
    }
  }
];

async function importTeam() {
  console.log('👥 Import des membres de l\'équipe...\n');

  if (!process.env.SANITY_TOKEN) {
    console.log('❌ Token Sanity requis.');
    console.log('   export SANITY_TOKEN="votre-token"');
    return;
  }

  // Vérifie si des membres existent déjà
  const existing = await client.fetch(`*[_type == "teamMember"]{ nom }`);
  if (existing.length > 0) {
    console.log(`⚠️  ${existing.length} membre(s) déjà existant(s): ${existing.map(e => e.nom).join(', ')}`);
    console.log('   Supprimez-les d\'abord ou ignorez cette étape.\n');
  }

  for (const member of teamMembers) {
    try {
      const doc = {
        _type: 'teamMember',
        ...member
      };

      const result = await client.create(doc);
      console.log(`✓ Créé: ${member.nom} (${result._id})`);
    } catch (error) {
      console.log(`✗ Erreur pour ${member.nom}: ${error.message}`);
    }
  }

  console.log('\n✅ Import terminé!');
}

importTeam().catch(console.error);
