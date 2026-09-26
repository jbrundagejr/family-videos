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

export const getObjects = async () => {
	const {
		public: { NUXT_AWS_BUCKET_NAME },
	} = useRuntimeConfig()
	const client = initClient()
	const command = new ListObjectsCommand({
		Bucket: NUXT_AWS_BUCKET_NAME as string,
	})
	const response = await client.send(command)
	return response.Contents || []
}

export const getPresignedUrl = async (key: string) => {
	const {
		public: { NUXT_AWS_BUCKET_NAME },
	} = useRuntimeConfig()
	const client = initClient()
	const command = new GetObjectCommand({
		Bucket: NUXT_AWS_BUCKET_NAME as string,
		Key: key,
	})
	const url = await getSignedUrl(client, command, { expiresIn: 3600 }) // URL valid for 1 hour
	return url
}
