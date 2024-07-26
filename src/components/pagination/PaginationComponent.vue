<script setup lang="ts">
const props = defineProps<{
	length: number;
	setPage: (value: number) => Promise<void>;
}>();

function onUpdate(page: number) {
	props.setPage(page);
}
</script>

<template>
	<section class="pagination">
		<v-pagination
			:length="length"
			:total-visible="4"
			@update:modelValue="onUpdate"
		></v-pagination>
	</section>
</template>
