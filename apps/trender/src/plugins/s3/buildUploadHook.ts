import path from 'path'
import { PutObjectCommand, PutObjectCommandInput, ObjectCannedACL } from '@aws-sdk/client-s3'
import { CollectionBeforeChangeHook } from 'payload/types'
import type { Options } from './plugin'

type File = {
  filename: string
  mimeType?: string
  buffer: Buffer
}

const getFilesToUpload: CollectionBeforeChangeHook = ({
  data,
  req,
}): File[] => {
  const reqFile = req.file ?? null

  if (reqFile == null) return []

  const files: File[] = [
    {
      filename: data.filename,
      mimeType: data.mimeType,
      buffer: reqFile.data,
    },
  ]

  // if (data.mimeType?.includes('image') && data.sizes != null) {
  //   Object.entries<FileData>(data.sizes).forEach(([key, sizeData]) => {
  //     const buffer = req.payloadUploadSizes[key];
  //     const { filename } = sizeData;

  //     if (buffer != null || filename != null) {
  //       files.push({
  //         buffer,
  //         filename,
  //         mimeType: data.mimeType,
  //       });
  //     }
  //   });
  // }

  return files
}

const buildUploadHook = (options: Options): CollectionBeforeChangeHook => {
  const uploadHook: CollectionBeforeChangeHook = async (beforeChangeOptions) => {
    const files = getFilesToUpload(beforeChangeOptions)

    for (const file of files) {
      let key = path.posix.join(options.folder, file.filename)

      let putObjectCommandInput: PutObjectCommandInput = {
        Bucket: options.bucket,
        Key: key,
        Body: file.buffer,
        ACL: ObjectCannedACL.public_read
      }

      if (file.mimeType) {
        putObjectCommandInput.ContentType = file.mimeType
      }

      await options.client.send(new PutObjectCommand(putObjectCommandInput))
    }
  }

  return uploadHook
}

export default buildUploadHook
