<script setup lang="ts">
import MagnifyIcon from '../icons/MagnifyIcon.vue';

const props = defineProps<{
	setSearchByName: (value: string) => Promise<void>;
}>();

async function handleSubmit(event: SubmitEvent) {
	const form = event.target as HTMLFormElement;

	const nameField = form.querySelector(
		'[name="name"]',
	) as HTMLInputElement | null;

	props.setSearchByName(nameField?.value ?? '');
}
</script>

<style lang="scss">
@import '_search.styles';
</style>

<template>
	<section class="search">
		<v-container>
			<v-form @submit.prevent="handleSubmit">
				<v-text-field
					label="Nome"
					placeholder="Busque pelo nome do cavaleiro"
					variant="solo-filled"
					name="name"
					clearable
				>
				</v-text-field>
				<v-btn
					class="search-submit"
					variant="elevated"
					color="amber-lighten-2"
					type="submit"
					>Buscar</v-btn
				>
				<div class="create-knight-container"></div>
			</v-form>
		</v-container>
	</section>
</template>
