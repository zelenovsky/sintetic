import path from 'path'
import { DeleteObjectCommand, DeleteObjectCommandInput } from '@aws-sdk/client-s3'
import { CollectionAfterDeleteHook } from 'payload/types'
import type { Options } from './plugin'

const getFilesToDelete: CollectionAfterDeleteHook = (afterDeleteOptions) => {
  const { doc } = afterDeleteOptions

  const files: string[] = [doc.filename]

  // if (doc.mimeType?.includes('image') && doc.sizes != null) {
  //   Object.values<FileData>(doc.sizes).forEach((fileData) => {
  //     if (fileData.filename != null) files.push(fileData.filename)
  //   })
  // }

  return files
}

const buildDeleteHook = (options: Options) => {
  const deleteHook: CollectionAfterDeleteHook = async (afterDeleteOptions) => {
    const filenames = getFilesToDelete(afterDeleteOptions)

    for (const filename of filenames) {
      let key = path.posix.join(options.folder, filename)

      await options.client.send(
        new DeleteObjectCommand({
          Bucket: options.bucket,
          Key: key,
        } as DeleteObjectCommandInput)
      )
    }
  }

  return deleteHook
}

export default buildDeleteHook
