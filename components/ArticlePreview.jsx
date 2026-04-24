import { useEffect, useState } from 'react'
import { useClient } from 'sanity'

const UNIVERS_COLORS = {
  esprit: '#7B5CD6',
  corps: '#5AA352',
  liens: '#E67839',
  monde: '#2E9B74',
  avenir: '#2E94B5',
}

const UNIVERS_LABELS = {
  esprit: "L'Esprit",
  corps: 'Le Corps',
  liens: 'Les Liens',
  monde: 'Le Monde',
  avenir: "L'Avenir",
}

function renderBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return null
  return blocks.map((block, i) => {
    if (block._type === 'block') {
      const text = (block.children || []).map((child, j) => {
        let content = child.text || ''
        if (!content) return null
        const marks = child.marks || []
        if (marks.includes('strong')) content = `<strong>${content}</strong>`
        if (marks.includes('em')) content = `<em>${content}</em>`
        return content
      }).join('')

      switch (block.style) {
        case 'h2': return <h2 key={i} style={{ fontSize: '1.6rem', margin: '2rem 0 0.8rem', fontFamily: 'Georgia, serif' }} dangerouslySetInnerHTML={{ __html: text }} />
        case 'h3': return <h3 key={i} style={{ fontSize: '1.3rem', margin: '1.5rem 0 0.6rem', fontFamily: 'Georgia, serif' }} dangerouslySetInnerHTML={{ __html: text }} />
        case 'h4': return <h4 key={i} style={{ fontSize: '1.1rem', margin: '1.2rem 0 0.5rem' }} dangerouslySetInnerHTML={{ __html: text }} />
        case 'blockquote': return <blockquote key={i} style={{ borderLeft: '3px solid #ccc', paddingLeft: '1rem', margin: '1.5rem 0', fontStyle: 'italic', color: '#555' }} dangerouslySetInnerHTML={{ __html: text }} />
        default: return <p key={i} style={{ margin: '0.8rem 0', lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: text }} />
      }
    }

    if (block._type === 'image' && block.asset) {
      return (
        <figure key={i} style={{ margin: '2rem 0', textAlign: 'center' }}>
          <div style={{ background: '#f0f0f0', borderRadius: 8, padding: '1rem', fontSize: '0.85rem', color: '#888' }}>
            [Image]
            {block.caption && <figcaption style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>{block.caption}</figcaption>}
          </div>
        </figure>
      )
    }

    if (block._type === 'callout') {
      const icons = { info: '💡', warning: '⚠️', tip: '✅', remember: '📖', didyouknow: '💬', key: '🔑', testimonial: '❤️', stat: '📊' }
      const calloutText = Array.isArray(block.content)
        ? block.content.map(b => (b.children || []).map(c => c.text).join('')).join(' ')
        : block.content || ''
      return (
        <div key={i} style={{ background: '#f8f5ff', border: '1px solid #e0d8f0', borderRadius: 8, padding: '1rem 1.2rem', margin: '1.5rem 0' }}>
          <strong>{icons[block.type] || '📌'} {block.title || ''}</strong>
          <p style={{ margin: '0.5rem 0 0', lineHeight: 1.6 }}>{calloutText}</p>
        </div>
      )
    }

    if (block._type === 'youtube') {
      return (
        <div key={i} style={{ margin: '2rem 0', background: '#000', borderRadius: 8, padding: '3rem', textAlign: 'center', color: '#fff' }}>
          ▶ Vidéo YouTube
          {block.url && <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.6 }}>{block.url}</div>}
        </div>
      )
    }

    return null
  })
}

export default function ArticlePreview({ document }) {
  const doc = document?.displayed || {}
  const client = useClient({ apiVersion: '2024-03-01' })
  const [authorName, setAuthorName] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (doc.author?._ref) {
      client.fetch(`*[_id == $id][0].name`, { id: doc.author._ref }).then(n => setAuthorName(n || 'Auteur inconnu'))
    }
  }, [doc.author?._ref])

  useEffect(() => {
    if (doc.image?.asset?._ref) {
      const ref = doc.image.asset._ref
      const [, id, dims, format] = ref.split('-')
      setImageUrl(`https://cdn.sanity.io/images/r941i081/production/${id}-${dims}.${format}`)
    } else if (doc.imageUrl) {
      setImageUrl(doc.imageUrl)
    } else {
      setImageUrl(null)
    }
  }, [doc.image?.asset?._ref, doc.imageUrl])

  const uColor = UNIVERS_COLORS[doc.univpilar] || '#666'
  const uLabel = UNIVERS_LABELS[doc.univpilar] || ''

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#1a1a1a' }}>
      {/* Univers badge */}
      {uLabel && (
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ color: uColor, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {uLabel}
          </span>
          {doc.category && (
            <span style={{ color: '#888', fontSize: '0.75rem', marginLeft: '0.5rem' }}>
              · {doc.category}
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <h1 style={{ fontSize: '2.2rem', lineHeight: 1.2, fontFamily: 'Georgia, serif', margin: '0 0 1rem' }}>
        {doc.titleHtml
          ? <span dangerouslySetInnerHTML={{ __html: doc.titleHtml }} />
          : doc.titre || 'Sans titre'
        }
      </h1>

      {/* Deck */}
      {doc.deck && (
        <p style={{ fontSize: '1.15rem', color: '#555', lineHeight: 1.5, margin: '0 0 1.5rem', fontStyle: 'italic' }}>
          {doc.deck}
        </p>
      )}

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#888', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
        {authorName && <span style={{ fontWeight: 600, color: '#333' }}>{authorName}</span>}
        {doc.readTime && <><span>·</span><span>{doc.readTime}</span></>}
        {doc.datePublication && (
          <>
            <span>·</span>
            <time>{new Date(doc.datePublication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
          </>
        )}
      </div>

      {/* Hero image */}
      {imageUrl && (
        <figure style={{ margin: '0 0 2rem' }}>
          <img
            src={imageUrl}
            alt={doc.heroAlt || doc.titre}
            style={{ width: '100%', borderRadius: 8, objectFit: 'cover', maxHeight: 420 }}
          />
          {doc.heroCredit && (
            <figcaption style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.4rem', textAlign: 'right' }}>
              © {doc.heroCredit}
            </figcaption>
          )}
        </figure>
      )}

      {/* Body */}
      <article style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
        {renderBlocks(doc.contenu)}
      </article>

      {/* Tags */}
      {doc.tags?.length > 0 && (
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #eee', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {doc.tags.map((tag, i) => (
            <span key={i} style={{ background: '#f3f3f3', borderRadius: 20, padding: '0.3rem 0.8rem', fontSize: '0.8rem', color: '#666' }}>
              {typeof tag === 'string' ? tag : tag.title || ''}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
