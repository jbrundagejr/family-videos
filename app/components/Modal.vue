<script setup lang="ts">
const emits = defineEmits<{
	(e: "close"): void
}>()

const close = () => {
	emits("close")
}
</script>

<template>
	<div class="modal-background">
		<div class="modal">
			<slot />
			<button class="close-button" @click="close">Close</button>
		</div>
	</div>
</template>

<style scoped>
.modal-background {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.modal {
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	max-width: 90%;
	max-height: 90%;
	overflow-y: auto;
}
</style>
