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
import recommendation from './recommendation'
import teamMember from './teamMember'

// Outils de taxonomie et de structuration
import verticale from './verticale'
import format from './format'
import univers from './univers'

// Types de blocs rich text
import keyTakeaways from './keyTakeaways'
import youtube from './youtube'
import quote from './quote'
import accordion from './accordion'

// Types objets pour blockContent
import imageGallery from './objects/imageGallery'
import audioPlayer from './objects/audioPlayer'
import socialEmbed from './objects/socialEmbed'
import styledQuote from './objects/styledQuote'
import callout from './objects/callout'
import progressSteps from './objects/readingProgress'
import ctaButton from './objects/ctaButton'
import newsletterCta from './objects/newsletterCta'
import relatedArticles from './objects/relatedArticles'
import recommendationBlock from './objects/recommendationBlock'

export const schemaTypes = [
  // --- Contenus Principaux ---
  production,
  serie,
  episode,

  // --- Contenus Spécifiques ---
  portrait,
  video,
  recommendation,
  teamMember,

  // --- Outils de Taxonomie ---
  verticale,
  format,
  univers,
  author,
  tag,

  // --- Utilitaire ---
  blockContent,

  // --- Blocs Rich Text ---
  keyTakeaways,
  youtube,
  quote,
  accordion,
  imageGallery,
  audioPlayer,
  socialEmbed,
  styledQuote,
  callout,
  progressSteps,
  ctaButton,
  newsletterCta,
  relatedArticles,
  recommendationBlock,
]