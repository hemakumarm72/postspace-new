/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  DeleteObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import {
  createPresignedPost,
  PresignedPostOptions,
} from '@aws-sdk/s3-presigned-post'

import { AwsPathList, inputSignedUrl } from '../@types'
import { AWSBucketName, BucketFolder } from '../config/env'

const s3Client = new S3Client({
  // endpoint: process.env.AWS_S3_ENDPOINT as string,
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

export const generatePresignedUrl = async (input: inputSignedUrl) => {
  //  const maxFileSize = 1 * 1024 * 1024 // 1 MB
  const Key: string = `${BucketFolder}/${input.userId}/${input.fileName}`

  const params: PresignedPostOptions = {
    Bucket: AWSBucketName,
    Key,
    Expires: 60 * 60, // link will expired in 1 hour
    Conditions: [
      ['content-length-range', 0, input.maxFileSize], // Restrict file size: 0 to 1 MB]
      ['eq', '$Content-Type', input.contentType],
    ],
  }

  try {
    const signedPost = await createPresignedPost(s3Client, params)
    console.log('Generated signed URL:', signedPost.url)
    console.log('Signed URL fields:', signedPost.fields)

    return signedPost
  } catch (error) {
    console.error('Error generating signed URL', error)
  }
}

export const awsDeleteMulti = async (pathLists: AwsPathList[]) => {
  try {
    const deleteObjectCommand = new DeleteObjectsCommand({
      Bucket: AWSBucketName,
      Delete: {
        Objects: pathLists,
      },
    })
    const data = await s3Client.send(deleteObjectCommand)
    return Promise.resolve(data)
  } catch (error) {
    console.log(error)
  }
}
