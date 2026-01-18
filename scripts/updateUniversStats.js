#!/usr/bin/env node

/**
 * Script pour mettre à jour les stats des univers
 * Usage: SANITY_TOKEN="xxx" node scripts/updateUniversStats.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
});

// Stats des univers depuis UniversPage.tsx
const universStats = {
  'psychologie': { articles: 127, auteurs: 24, tempsTotal: '152h' },
  'societe': { articles: 98, auteurs: 18, tempsTotal: '124h' },
  'carriere': { articles: 85, auteurs: 21, tempsTotal: '108h' },
  'voyage': { articles: 76, auteurs: 15, tempsTotal: '96h' },
  'art--et--creativite': { articles: 64, auteurs: 12, tempsTotal: '82h' },
  'spiritualite': { articles: 58, auteurs: 9, tempsTotal: '74h' },
  'sante': { articles: 92, auteurs: 19, tempsTotal: '118h' },
  'technologie': { articles: 45, auteurs: 11, tempsTotal: '58h' },
  'relations': { articles: 71, auteurs: 14, tempsTotal: '89h' },
  'environnement': { articles: 53, auteurs: 10, tempsTotal: '67h' }
};

async function updateUniversStats() {
  console.log('📊 Mise à jour des stats des univers...\n');

  if (!process.env.SANITY_TOKEN) {
    console.log('❌ Token Sanity requis.');
    console.log('   export SANITY_TOKEN="votre-token"');
    return;
  }

  // Récupère tous les univers
  const univers = await client.fetch(`*[_type == "univers"]{ _id, nom, "slug": slug.current }`);
  console.log(`📂 ${univers.length} univers trouvés\n`);

  for (const u of univers) {
    const stats = universStats[u.slug];

    if (stats) {
      try {
        await client.patch(u._id)
          .set({ stats })
          .commit();

        console.log(`✓ ${u.nom}: ${stats.articles} articles, ${stats.auteurs} auteurs, ${stats.tempsTotal}`);
      } catch (error) {
        console.log(`✗ Erreur pour ${u.nom}: ${error.message}`);
      }
    } else {
      console.log(`⚠️  Pas de stats pour: ${u.slug}`);
    }
  }

  console.log('\n✅ Mise à jour terminée!');
}

updateUniversStats().catch(console.error);
