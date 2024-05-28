import { S3Client } from '@aws-sdk/client-s3'
import buildUploadHook from './buildUploadHook'
import buildDeleteHook from './buildDeleteHook'
import { CollectionConfig } from 'payload/types'

export type Options = {
  bucket: string
  folder: string
  client: S3Client
}

const pluginPayloadS3Upload = (options: Options) => {
  return (payloadConfig: any) => {
    const uploadCollections = payloadConfig.collections.filter(
      (collection: CollectionConfig) => collection.upload != null
    )

    uploadCollections.forEach((collection: CollectionConfig) => {
      if (collection.hooks == null) {
        collection.hooks = {}
      }

      if (collection.hooks.beforeChange == null) {
        collection.hooks.beforeChange = []
      }

      if (collection.hooks.afterDelete == null) {
        collection.hooks.afterDelete = []
      }

      collection.hooks.beforeChange.push(buildUploadHook(options))
      collection.hooks.afterDelete.push(buildDeleteHook(options))
    })

    return payloadConfig
  }
}

export default pluginPayloadS3Upload
