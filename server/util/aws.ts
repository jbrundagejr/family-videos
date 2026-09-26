import {
	S3Client,
	ListObjectsCommand,
	GetObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const initClient = () => {
	const config = useRuntimeConfig()
	const { AWS_ACCESS_KEY, AWS_SECRET, AWS_REGION } = config
	const { NUXT_AWS_ENDPOINT } = config.public
	return new S3Client({
		region: AWS_REGION,
		endpoint:
			typeof NUXT_AWS_ENDPOINT === "string" ? NUXT_AWS_ENDPOINT : undefined,
		credentials: {
			accessKeyId: AWS_ACCESS_KEY,
			secretAccessKey: AWS_SECRET,
		},
	})
}

export const getBucketContentsWithPresignedURLs = async (Bucket: string) => {
	const client = initClient()
	const command = new ListObjectsCommand({
		Bucket,
	})
	const response = await client.send(command)
	const objects = response.Contents || []
	return Promise.all(
		objects.map(async (obj) => ({
			key: obj.Key,
			lastModified: obj.LastModified,
			url: obj.Key ? await getPresignedUrl(Bucket, obj.Key) : null,
		})),
	)
}

export const getPresignedUrl = async (Bucket: string, Key: string) => {
	const client = initClient()
	const command = new GetObjectCommand({
		Bucket,
		Key,
	})
	const url = await getSignedUrl(client, command, { expiresIn: 3600 }) // URL valid for 1 hour
	return url
}
