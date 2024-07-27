<script setup lang="ts">
import type { KnightEntity } from '@/entities/KnightEntity';
import { ref } from 'vue';

const props = defineProps<{
	knight: KnightEntity;
}>();

const emits = defineEmits(['heroifyKnight']);

const dialog = ref(false);

function handleConfirm() {
	emits('heroifyKnight', props.knight);

	dialog.value = false;
}
</script>

<style lang="scss">
@import '_heroify-knight.styles';
</style>

<template>
	<div class="heroify-knight mx-auto">
		<div class="text-center pa-4">
			<v-dialog v-model="dialog" max-width="400">
				<template v-slot:activator="{ props: activatorProps }">
					<v-btn
						v-bind="activatorProps"
						variant="elevated"
						color="deep-purple"
						:disabled="knight.heroifiedAt !== undefined"
						:title="
							knight.heroifiedAt && `${knight.name} já está no Hall dos Heróis`
						"
					>
						Heroificar
					</v-btn>
				</template>

				<v-card
					title="Confirmar heroificação?"
					:text="`Tem certeza que deseja mover ${knight.name} para o Hall dos Heróis? Essa ação é permanente e não pode ser desfeita.`"
				>
					<template v-slot:actions>
						<v-spacer></v-spacer>

						<v-btn color="red" @click="dialog = false"> Cancelar </v-btn>

						<v-btn color="blue" @click="handleConfirm"> Confirmar </v-btn>
					</template>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>
