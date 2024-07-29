<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
	setSearchByName: (value: string) => Promise<void>;
}>();

const name = ref('');

async function handleSubmit() {
	props.setSearchByName(name.value);
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
					name="search-by-name"
					v-model="name"
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
