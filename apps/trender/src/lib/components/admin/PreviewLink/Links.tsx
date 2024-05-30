'use client'
import { useDocumentInfo } from '@payloadcms/ui/providers/DocumentInfo'
import { useEffect, useState } from 'react'

export default function Links() {
  const url = new URL(window.location.href)
  const d = useDocumentInfo()
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    const docWithVertical = d.versions?.docs.find(doc => doc.version.vertical)
    if (!docWithVertical) return

    // @ts-ignore
    fetch(`${url.origin}/api/verticals/${docWithVertical.version.vertical}`)
      .then(res => res.json())
      .then(vertical => {
        setPreviewUrl(`${url.origin}/${vertical.slug}/${d.collectionSlug}/${d.id}`)
      })
  }, [d])

  if (!previewUrl) {
    return (
      <p>There is no verions to preview</p>
    )
  }

  return (
    <div>
      {d.publishedDoc ? (
        <div>
          <a href={previewUrl} target='_blank'>View Published Article</a>
        </div>
      ) : (
        <p>This article is not published yet</p>
      )}

      <details style={{ marginTop: 10 }}>
        <summary>View Drafts</summary>
        {d.versions?.docs.map((doc, index) => (
          <div key={doc.id}>
            <a href={`${previewUrl}?version=${doc.id}`} target='_blank'>
              {/* @ts-ignore */}
              {doc.latest && 'Latest'} Draft Preview {!doc.latest && d.versions?.docs.length - index}
            </a>
          </div>
        ))}
      </details>
    </div>
  )
}
