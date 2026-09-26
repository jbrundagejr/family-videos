<script setup lang="ts">
const { data } = await useFetch<any[]>("/api")

const currentVideo = ref<any | null>(null)
</script>

<template>
	<NuxtLayout>
		<ul>
			<li v-for="item in data" :key="item.key">
				<button @click="currentVideo = item">
					{{ item.key }}
				</button>
			</li>
		</ul>
		<Modal v-if="currentVideo" @close="currentVideo = null">
			<video :src="currentVideo.url" controls autoplay />
		</Modal>
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
