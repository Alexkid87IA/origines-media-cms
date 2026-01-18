#!/usr/bin/env node

/**
 * Script pour initialiser les paramètres du site
 * Usage: SANITY_TOKEN="xxx" node scripts/initSiteSettings.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
});

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings', // ID fixe pour singleton
  siteName: 'Origines Media',
  tagline: 'Des histoires qui inspirent, des récits qui transforment',
  description: 'Origines Media est une plateforme de contenus qui célèbre les parcours inspirants et les histoires authentiques de notre communauté.',
  reseauxSociaux: {
    instagram: 'https://instagram.com/originesmedia',
    twitter: 'https://twitter.com/originesmedia',
    youtube: 'https://youtube.com/@originesmedia',
    linkedin: 'https://linkedin.com/company/originesmedia',
    tiktok: 'https://tiktok.com/@originesmedia'
  },
  contact: {
    email: 'contact@originesmedia.com',
    emailPresse: 'presse@originesmedia.com'
  },
  newsletter: {
    titre: 'Rejoignez notre communauté',
    description: 'Recevez chaque semaine nos meilleures histoires et contenus exclusifs.',
    isActive: true
  }
};

async function initSiteSettings() {
  console.log('⚙️  Initialisation des paramètres du site...\n');

  if (!process.env.SANITY_TOKEN) {
    console.log('❌ Token Sanity requis.');
    console.log('   export SANITY_TOKEN="votre-token"');
    return;
  }

  // Vérifie si les settings existent déjà
  const existing = await client.fetch(`*[_type == "siteSettings"][0]`);

  if (existing) {
    console.log('⚠️  Les paramètres existent déjà.');
    console.log(`   ID: ${existing._id}`);
    console.log('   Pour mettre à jour, utilisez le studio Sanity.\n');
    return;
  }

  try {
    const result = await client.createOrReplace(siteSettings);
    console.log(`✓ Paramètres créés: ${result._id}`);
    console.log('\n📋 Contenu:');
    console.log(`   Nom: ${result.siteName}`);
    console.log(`   Tagline: ${result.tagline}`);
    console.log(`   Email: ${result.contact?.email}`);
  } catch (error) {
    console.log(`✗ Erreur: ${error.message}`);
  }

  console.log('\n✅ Initialisation terminée!');
}

initSiteSettings().catch(console.error);
