<script setup lang="ts">
defineProps<{
	loading: boolean;
}>();
</script>

<template>
	<v-overlay
		:model-value="loading"
		class="align-center justify-center"
		scroll-strategy="block"
		:persistent="true"
	>
		<v-progress-circular
			color="primary"
			size="64"
			indeterminate
		></v-progress-circular>
	</v-overlay>
</template>
