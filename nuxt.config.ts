// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			NUXT_AWS_ENDPOINT: process.env.NUXT_AWS_ENDPOINT,
			NUXT_AWS_BUCKET_NAME: process.env.NUXT_AWS_BUCKET_NAME,
		},
		AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
		AWS_SECRET: process.env.AWS_SECRET,
		AWS_REGION: process.env.AWS_REGION,
	},
	css: ["~/styles/fonts.css", "~/styles/mobile.css"],
})
