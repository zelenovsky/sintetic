import {
  HTMLConverterFeature, UploadFeature, lexicalEditor, BlocksFeature
} from '@payloadcms/richtext-lexical'

import { UploadHTMLConverter } from './converters/UploadHTMLConverter'
import { BlocksHTMLConverter } from './converters/BlocksHTMLConverter'

import ExternalProductBlock from '../blocks/ExternalProductBlock'
import GalleryBlock from '../blocks/GalleryBlock'

export const captionEditor = lexicalEditor({})

export const postEditorConfig = {
  // @ts-ignore
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    BlocksFeature({
      blocks: [ExternalProductBlock, GalleryBlock],
    }),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'richText',
              editor: captionEditor,
            },
          ]
        }
      }
    }),
    HTMLConverterFeature({
      converters: ({ defaultConverters }) => {
        return defaultConverters.filter(({ nodeTypes }) => {
          if (nodeTypes.includes('upload')) {
            return false
          }
          return true
          // @ts-ignore
        }).concat(UploadHTMLConverter, BlocksHTMLConverter)
      },
    })
  ]
}

export const postEditor = lexicalEditor(postEditorConfig)
