import { getObjects, initClient, getPresignedUrl } from "~~/server/util/aws"

export default defineEventHandler(async (event) => {
	const objects = await getObjects()
	return Promise.all(
		objects.map(async (obj) => ({
			key: obj.Key,
			lastModified: obj.LastModified,
			url: obj.Key ? await getPresignedUrl(obj.Key) : null,
		}))
	)
})
