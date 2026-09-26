<script setup lang="ts">
const { data } = await useFetch<any[]>("/api/idrive", {
	query: {
		prefix: "",
	},
})
</script>

<template>
	<NuxtLayout>
		<ul>
			<li v-for="item in data" :key="item.key">
				<video controls>
					<source :src="item.url" type="video/mp4" />
				</video>
			</li>
		</ul>
	</NuxtLayout>
</template>

<style scoped>
ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 16px;
}

video {
	aspect-ratio: 16 / 9;
	width: 100%;
	height: auto;
	border: none;
	border-radius: 8px;
}
</style>
