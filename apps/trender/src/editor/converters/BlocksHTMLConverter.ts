import {
  convertLexicalToHTML,
  consolidateHTMLConverters,
  type HTMLConverter,
  type SerializedUploadNode
} from '@payloadcms/richtext-lexical'
import { galleryImageDescriptionEditor } from '../../blocks/GalleryBlock'

type ExternalProductFields = {
  gallery: {
    images: {
      id: string
      image: number
    }[]
  }
  title: string
  price: string
  link: {
    url: string
    text: string
  }
}

type GalleryFields = {
  images: {
    id: string
    image: number
    description: any
  }[]
}

export const BlocksHTMLConverter: HTMLConverter<SerializedUploadNode> = {
  converter: async ({ node, payload }) => {
    if (node.fields.blockType === 'external-product') {
      const fields = node.fields as ExternalProductFields
      const promises = []

      for (const { image: id } of fields.gallery.images) {
        promises.push(getMediaUrl(id, payload))
      }

      const gallery = await Promise.all(promises)

      const html = `
        <article class="s-post-external-product">
          <div class="edge-scroll no-scrollbar">
            <ul class="b-gallery">
              ${gallery.map(([url, filename]) => (
                `<li>
                  <img src="${url}" alt="${filename}" />
                </li>`
              )).join('')}
            </ul>
          </div>

          <h1 class="b-title">${fields.title}</h1>

          <p class="b-price">${Number(fields.price).toLocaleString("ru-RU")} ₽</p>

          <a href="${fields.link.url}" class="b-link">${fields.link.text}</a>
        </article>
      `

      return html
    }

    if (node.fields.blockType === 'gallery') {
      const fields = node.fields as GalleryFields
      const promises = []

      for (const { image, description } of fields.images) {
        promises.push(buildGalleryEntity(image, description, payload))
      }

      const gallery = await Promise.all(promises)

      const html = `
        <section class="s-gallery" data-gallery="root">
          <div class="b-actions">
            <ul class="b-images no-scrollbar" data-gallery="images">
              ${gallery.map((image, index) => (
                `<li class=${index === 0 ? 'is-active' : ''}>
                  <img src="${image.url}" alt="${image.filename}" loading="lazy" />
                </li>`
              )).join('')}
            </ul>

            <button type="button" class="b-action is-prev" data-gallery="action-prev">Prev</button>
            <button type="button" class="b-action is-next" data-gallery="action-next">Next</button>
          </div>

          ${gallery.length > 1 ? (
            `<ul class="b-pagination" style="--pagination-gap-size: ${100 / gallery.length / 4}px" data-gallery="pagination">
              ${gallery.map((_, index) => (
                `<li class=${index === 0 ? 'is-active' : ''}></li>`
              )).join('')}
            </ul>`
          ) : ''}

          <ul class="b-descriptions" data-gallery="descriptions">
            ${gallery.map((image, index) => (
              `<li class=${index === 0 ? 'is-active' : ''}>
                <div>
                  <div class="b-numbers">
                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none">
                      <path d="M0.613672 20L12.7937 0.399999H15.3137L3.13367 20H0.613672Z" fill="#3D3D3D"/>
                    </svg>
                    <span class="b-index">${index + 1}</span>
                    <span class="b-gallery-size">${gallery.length}</span>
                  </div>
                </div>
                <div class="b-description">
                  ${image.description_html}
                </div>
              </li>`
            )).join('')}
          </ul>
        </section>
      `

      return html
    }

    return ``
  },
  nodeTypes: ['block'],
}

async function getMediaUrl(id: number, payload: any) {
  const uploadDocument = await payload.findByID({
    id,
    collection: 'media',
  })

  const url = (payload?.config?.serverURL || '') + uploadDocument?.url

  if (!(uploadDocument?.mimeType as string)?.startsWith('image')) {
    // Only images can be serialized as HTML
    throw new Error('BlocksHTMLConverter: Only images can be serialized as HTML')
  }

  return [url, uploadDocument?.filename]
}

async function buildGalleryEntity(imageId: number, description: any, payload: any) {
  const [url, filename] = await getMediaUrl(imageId, payload)
  const description_html = await convertLexicalToHTML({
    // @ts-ignore
    converters: consolidateHTMLConverters({ editorConfig: galleryImageDescriptionEditor.editorConfig }),
    data: description,
    payload
  })
  return { url, filename, description_html }
}
