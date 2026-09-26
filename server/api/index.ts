import { getBucketContentsWithPresignedURLs } from "~~/server/util/aws"

export default defineEventHandler(async (event) => {
	const objects = await getBucketContentsWithPresignedURLs("family-videos")
	return objects
})
