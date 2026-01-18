// schemaTypes/index.js
// Exports de tous les schémas Sanity pour Origines Media

import blockContent from './blockContent'
import author from './author'
import tag from './tag'

// Types de contenu principaux
import production from './production'
import serie from './serie'
import episode from './episode'

// Types de contenu secondaires et spécifiques
import portrait from './portrait'
import video from './video'

// Outils de taxonomie et de structuration
import verticale from './verticale'
import format from './format'
import univers from './univers'

// Configuration
import teamMember from './teamMember'
import siteSettings from './siteSettings'

// Récits (articles longs)
import recit from './recit'

// Recommandations culturelles
import recommendation from './recommendation'

// ========== BLOCS DE CONTENU RICHES ==========
import styledQuote from './objects/styledQuote'
import callout from './objects/callout'
import accordion from './objects/accordion'
import ctaButton from './objects/ctaButton'
import imageGallery from './objects/imageGallery'
import youtube from './objects/youtube'
import socialEmbed from './objects/socialEmbed'
import keyTakeaways from './objects/keyTakeaways'
import progressSteps from './objects/readingProgress'
import audioPlayer from './objects/audioPlayer'
import relatedArticles from './objects/relatedArticles'
import newsletterCta from './objects/newsletterCta'
import recommendationBlock from './objects/recommendationBlock'

export const schemaTypes = [
  // --- Contenus Principaux ---
  production,
  serie,
  episode,

  // --- Contenus Spécifiques ---
  portrait,
  video,
  recit,
  recommendation,

  // --- Outils de Taxonomie ---
  verticale,
  format,
  univers,
  author,
  tag,

  // --- Configuration ---
  teamMember,
  siteSettings,

  // --- Utilitaire ---
  blockContent,

  // --- Blocs de contenu riches ---
  styledQuote,
  callout,
  accordion,
  ctaButton,
  imageGallery,
  youtube,
  socialEmbed,
  keyTakeaways,
  progressSteps,
  audioPlayer,
  relatedArticles,
  newsletterCta,
  recommendationBlock,
]
