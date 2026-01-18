#!/usr/bin/env node

/**
 * Script pour nettoyer les formats en double dans Sanity
 * Usage: node scripts/clean-duplicate-formats.js
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'sf5v7lj3',
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN // Nécessaire pour supprimer
});

async function cleanDuplicateFormats() {
  console.log('🔍 Recherche des formats en double...\n');

  // Récupère tous les formats
  const formats = await client.fetch(`*[_type == "format"] | order(nom asc) {
    _id, nom, "slug": slug.current, couleur, _createdAt
  }`);

  console.log(`📊 ${formats.length} formats trouvés au total\n`);

  // Groupe par slug pour identifier les doublons
  const bySlug = {};
  for (const format of formats) {
    const slug = format.slug || 'no-slug';
    if (!bySlug[slug]) {
      bySlug[slug] = [];
    }
    bySlug[slug].push(format);
  }

  // Identifie les doublons
  const duplicates = [];
  for (const [slug, items] of Object.entries(bySlug)) {
    if (items.length > 1) {
      console.log(`⚠️  Doublon détecté: "${slug}" (${items.length} occurrences)`);
      items.forEach((item, i) => {
        console.log(`   ${i + 1}. ${item._id} - créé le ${item._createdAt?.split('T')[0] || 'inconnu'}`);
      });

      // Garde le premier (le plus ancien), marque les autres pour suppression
      const toDelete = items.slice(1);
      duplicates.push(...toDelete);
    }
  }

  // Identifie aussi les formats avec nom=null
  const nullFormats = formats.filter(f => !f.nom);
  if (nullFormats.length > 0) {
    console.log(`\n⚠️  ${nullFormats.length} formats sans nom détectés:`);
    nullFormats.forEach(f => {
      console.log(`   - ${f._id} (slug: ${f.slug})`);
    });
    duplicates.push(...nullFormats);
  }

  console.log(`\n📋 ${duplicates.length} formats à supprimer\n`);

  if (duplicates.length === 0) {
    console.log('✅ Aucun doublon à nettoyer!');
    return;
  }

  // Vérifie si le token est présent
  if (!process.env.SANITY_TOKEN) {
    console.log('❌ Token Sanity requis pour supprimer.');
    console.log('   Exportez votre token: export SANITY_TOKEN="votre-token"');
    console.log('\n📝 IDs à supprimer manuellement:');
    duplicates.forEach(d => console.log(`   - ${d._id}`));
    return;
  }

  // Demande confirmation
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Voulez-vous supprimer ces doublons? (o/n): ', async (answer) => {
    if (answer.toLowerCase() === 'o' || answer.toLowerCase() === 'oui') {
      console.log('\n🗑️  Suppression en cours...');

      for (const format of duplicates) {
        try {
          await client.delete(format._id);
          console.log(`   ✓ Supprimé: ${format._id}`);
        } catch (error) {
          console.log(`   ✗ Erreur pour ${format._id}: ${error.message}`);
        }
      }

      console.log('\n✅ Nettoyage terminé!');
    } else {
      console.log('\n❌ Suppression annulée.');
    }

    rl.close();
  });
}

cleanDuplicateFormats().catch(console.error);
