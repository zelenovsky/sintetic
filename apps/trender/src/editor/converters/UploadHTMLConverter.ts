import {
  UploadNode,
  convertLexicalToHTML,
  consolidateHTMLConverters,
  type HTMLConverter,
  type SerializedUploadNode
} from '@payloadcms/richtext-lexical'
import { captionEditor } from '../config'

export const UploadHTMLConverter: HTMLConverter<SerializedUploadNode> = {
  converter: async ({ node, payload }) => {
    const uploadDocument = await payload!.findByID({
      id: node.value,
      collection: node.relationTo as any,
    })
    const url = (payload?.config?.serverURL || '') + uploadDocument?.url

    if (!(uploadDocument?.mimeType as string)?.startsWith('image')) {
      // Only images can be serialized as HTML
      return ``
    }

    let caption_html = null
    if (node.fields?.caption) {
      caption_html = await convertLexicalToHTML({
        // @ts-ignore
        converters: consolidateHTMLConverters({ editorConfig: captionEditor.editorConfig }),
        data: node.fields.caption as any,
        payload
      })
    }

    if (caption_html) {
      return (
        `<figure>
          <img src="${url}" alt="${uploadDocument?.filename}" height="300">
          <figcaption>${caption_html}</figcaption>
        </figure>`
      )
    }
  
    return `<img src="${url}" alt="${uploadDocument?.filename}" height="300">`
  },
  nodeTypes: [UploadNode.getType()],
}
