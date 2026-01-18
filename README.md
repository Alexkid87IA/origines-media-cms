# Origines Media CMS

Sanity CMS pour Origines Media.

## Configuration

### Project Sanity
```
Project ID: r941i081
Dataset: production
```

### Token Sanity (Editor)

```bash
export SANITY_TOKEN="skve5QFXlr5j02HFyuhhPNPZZJs7LoWHSDshwTk4UVAyX8iStvFsGp5prNqIDcYuA4hYKGPu8nTqQvgBEXFKoH831PUgrnSIym5ULKMmrSME7wglcG5TjkF1PMX29qjCxxn2j4Z3i2NqLNyzva5Vi4SWOc3s5FmEJFzsTzHqiWuD64bmmvvH"
```

Gérer les tokens : https://www.sanity.io/manage/project/r941i081/api#tokens

---

## Commandes

### Lancer le Studio
```bash
npm run dev
```

### Diagnostiquer les erreurs de validation
```bash
node scripts/diagnose-validation.js "mot clé de l'article"
```

---

## Structure des Schémas

| Type | Description |
|------|-------------|
| `production` | Articles / Productions |
| `portrait` | Portraits (Home Page) |
| `verticale` | Catégories principales |
| `univers` | Sous-catégories thématiques |
| `format` | Formats éditoriaux |
| `tag` | Tags pour filtrage |
| `recommendation` | Recommandations (livres, films...) |
| `teamMember` | Membres de l'équipe |
| `siteSettings` | Paramètres du site |

---

## Liens Utiles

- **Studio local** : http://localhost:3333
- **Sanity Dashboard** : https://www.sanity.io/manage/project/r941i081
- **Importeur** : `/Users/alexquilghini1/Desktop/origines-importer`
