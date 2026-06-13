import blockContent from './blockContent'
import author from './author'
import tag from './tag'

// Types de contenu principaux
import production from './production'
import portrait from './portrait'
import video from './video'
import recommendation from './recommendation'
import affiliateProduct from './affiliateProduct'
import boutiqueProduct from './boutiqueProduct'
import questionDeLaSemaine from './questionDeLaSemaine'
import articleDossier from './articleDossier'
import teamMember from './teamMember'

// Taxonomie (legacy — conservés pour les données existantes, cachés dans le studio)
import verticale from './verticale'
import format from './format'
import univers from './univers'

// Paramètres
import siteSettings from './siteSettings'

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
import affiliateBlock from './objects/affiliateBlock'
import checklist from './objects/checklist'

export const schemaTypes = [
  // --- Contenus Principaux ---
  production,
  portrait,
  video,
  recommendation,
  affiliateProduct,
  boutiqueProduct,
  questionDeLaSemaine,
  articleDossier,

  // --- Équipe ---
  teamMember,
  author,

  // --- Taxonomie (legacy, conservé pour migration) ---
  verticale,
  univers,
  format,
  tag,

  // --- Paramètres ---
  siteSettings,

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
  affiliateBlock,
  checklist,
]
