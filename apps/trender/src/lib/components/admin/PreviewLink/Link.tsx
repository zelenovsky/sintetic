'use client'
import { useDocumentInfo } from '@payloadcms/ui/providers/DocumentInfo'
import { useEffect, useState } from 'react'

const url = new URL(window.location.href)

export default function Link() {
  const d = useDocumentInfo()
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    fetch(`${url.origin}/api/verticals/${d.publishedDoc?.vertical}`)
      .then(res => res.json())
      .then(vertical => {
        setPreviewUrl(`${url.origin}/${vertical.slug}/${d.collectionSlug}/${d.publishedDoc?.id}`)
      })
  }, [])

  return (
    <div>
      <div>
        <a href={previewUrl} target='_blank'>Last Draft Preview Link</a>
      </div>
      <div>
        <a href={previewUrl} target='_blank'>Published Article Link</a>
      </div>
    </div>
  )
}
