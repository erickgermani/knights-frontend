<script setup lang="ts">
import type { KnightEntity } from '@/entities/KnightEntity';
import { inject, ref, watch, type Ref } from 'vue';

const props = defineProps<{
	knight: KnightEntity;
}>();

const dialog = ref(false);

const knightToHeroify: Ref<string | undefined> | undefined =
	inject('knightToHeroify');

if (knightToHeroify) {
	watch(knightToHeroify, () => {
		if (knightToHeroify.value) return;

		dialog.value = false;
	});
}

function handleConfirm() {
	if (knightToHeroify) knightToHeroify.value = props.knight.id as string;
}
</script>

<style lang="scss">
@import '_heroify-knight.styles';
</style>

<template>
	<div class="heroify-knight">
		<v-dialog v-model="dialog" max-width="400">
			<template v-slot:activator="{ props: activatorProps }">
				<v-btn color="purple" v-bind="activatorProps"> Heroificar </v-btn>
			</template>

			<v-card
				title="Confirmar heroificação?"
				:text="`Tem certeza que deseja mover ${knight.name} para o Hall dos Heróis? Essa ação é permanente e não pode ser desfeita.`"
			>
				<template v-slot:actions>
					<v-spacer></v-spacer>

					<v-btn color="red" @click="dialog = false"> Cancelar </v-btn>

					<v-btn color="blue" @click="handleConfirm" class="confirm-heroify">
						Confirmar
					</v-btn>
				</template>
			</v-card>
		</v-dialog>
	</div>
</template>
