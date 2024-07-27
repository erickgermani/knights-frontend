<script setup lang="ts">
import type { KnightEntity } from '@/entities/KnightEntity';
import { ref } from 'vue';

const props = defineProps<{
	knight: KnightEntity;
}>();

const dialog = ref(false);
</script>

<style lang="scss">
@import '_update-knight.styles';
</style>

<template>
	<div class="update-knight mx-auto">
		<div class="text-center pa-4">
			<v-dialog v-model="dialog" max-width="400">
				<template v-slot:activator="{ props: activatorProps }">
					<v-btn v-bind="activatorProps"> Atualizar </v-btn>
				</template>

				<v-card
					title="Confirmar heroificação?"
					:text="`Tem certeza que deseja mover ${knight.name} para o Hall dos Heróis? Essa ação é permanente e não pode ser desfeita.`"
				>
					<template v-slot:actions>
						<v-spacer></v-spacer>

						<v-btn color="red" @click="dialog = false"> Cancelar </v-btn>

						<v-btn color="blue" @click="dialog = false"> Confirmar </v-btn>
					</template>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>
