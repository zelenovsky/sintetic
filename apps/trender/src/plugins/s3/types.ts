import { Buffer } from 'node:buffer';
import { CollectionConfig, UploadConfig, SanitizedConfig } from 'payload/types';

export type S3UploadConfig = {
  bucket: string;
  prefix?: string | Function;
  commandInput?: any;
};

export type S3IncomingUploadType = {
  s3: S3UploadConfig;
} & UploadConfig;

export type S3UploadCollectionConfig = {
  upload: S3IncomingUploadType;
} & CollectionConfig;

export type File = {
  filename: string;
  mimeType?: string;
  buffer: Buffer;
};

export type PayloadConfig = SanitizedConfig
