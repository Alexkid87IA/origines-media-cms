// Custom document action: opens the article on the frontend in preview/draft mode
const PREVIEW_SECRET = 'origines-preview-2026'
const FRONTEND_URL = 'http://localhost:3000'

export function OpenPreviewAction(props) {
  const { draft, published } = props
  const doc = draft || published

  // Only show for production documents that have a slug
  if (!doc?.slug?.current) {
    return null
  }

  return {
    label: 'Preview sur le site',
    icon: () => '👁',
    onHandle: () => {
      const slug = doc.slug.current
      const url = `${FRONTEND_URL}/api/draft?secret=${PREVIEW_SECRET}&slug=${slug}`
      window.open(url, '_blank')
    },
  }
}
