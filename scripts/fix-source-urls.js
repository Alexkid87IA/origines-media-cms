const { createClient } = require('@sanity/client')
const crypto = require('crypto')

const client = createClient({
  projectId: 'r941i081',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

function genKey() {
  return crypto.randomBytes(6).toString('hex')
}

function fixBlock(block) {
  if (block._type !== 'block') return null

  const children = block.children || []
  const markDefs = [...(block.markDefs || [])]
  let changed = false
  const newChildren = []

  for (const child of children) {
    if (child._type !== 'span' || !child.text || !child.text.includes('https://')) {
      newChildren.push(child)
      continue
    }

    const text = child.text
    const baseMarks = child.marks || []

    // Pattern 1: [(Label)](URL) — markdown-style
    const mdPattern = /\[?\(([^)]+)\)\]?\((https?:\/\/[^\s)]+)\)/g
    let match
    let lastIdx = 0
    const segments = []

    while ((match = mdPattern.exec(text)) !== null) {
      if (match.index > lastIdx) {
        segments.push({ type: 'text', value: text.substring(lastIdx, match.index) })
      }
      segments.push({ type: 'link', label: match[1].trim(), url: match[2].trim() })
      lastIdx = match.index + match[0].length
    }

    if (segments.length > 0) {
      if (lastIdx < text.length) {
        segments.push({ type: 'text', value: text.substring(lastIdx) })
      }
      changed = true
      for (const seg of segments) {
        if (seg.type === 'text') {
          newChildren.push({ _type: 'span', _key: genKey(), text: seg.value, marks: baseMarks })
        } else {
          const linkKey = genKey()
          markDefs.push({ _type: 'link', _key: linkKey, href: seg.url, blank: true })
          newChildren.push({ _type: 'span', _key: genKey(), text: seg.label, marks: [...baseMarks, linkKey] })
        }
      }
      continue
    }

    // Pattern 2: "Label : https://url" or "Label: https://url"
    const urlPattern = /^(.*?)\s*:\s*(https?:\/\/[^\s),]+)(.*)$/
    const urlMatch = text.match(urlPattern)

    if (urlMatch) {
      const label = urlMatch[1].trim()
      const url = urlMatch[2].trim()
      const after = urlMatch[3] || ''
      changed = true

      if (label) {
        const linkKey = genKey()
        markDefs.push({ _type: 'link', _key: linkKey, href: url, blank: true })
        newChildren.push({ _type: 'span', _key: genKey(), text: label, marks: [...baseMarks, linkKey] })
      } else {
        let domain
        try { domain = new URL(url).hostname.replace('www.', '') } catch { domain = 'source' }
        const linkKey = genKey()
        markDefs.push({ _type: 'link', _key: linkKey, href: url, blank: true })
        newChildren.push({ _type: 'span', _key: genKey(), text: domain, marks: [...baseMarks, linkKey] })
      }

      if (after.trim()) {
        newChildren.push({ _type: 'span', _key: genKey(), text: after, marks: baseMarks })
      }
      continue
    }

    newChildren.push(child)
  }

  if (!changed) return null
  return { ...block, children: newChildren, markDefs }
}

async function main() {
  const articles = await client.fetch(
    `*[_type == "production" && count(contenu[_type == "block"].children[text match "https://*"]) > 0]{_id, titre, contenu}`
  )

  console.log(`${articles.length} articles with raw URLs\n`)

  let fixed = 0
  for (const doc of articles) {
    const contenu = doc.contenu || []
    let docChanged = false
    const newContenu = contenu.map((block) => {
      const result = fixBlock(block)
      if (result) { docChanged = true; return result }
      return block
    })

    if (docChanged) {
      await client.patch(doc._id).set({ contenu: newContenu }).commit()
      fixed++
      console.log(`✓ ${doc.titre}`)
    }
  }

  console.log(`\nDone: ${fixed}/${articles.length} articles fixed`)
}

main().catch(console.error)
