<script setup lang="ts">
import type { UpdateKnightProps } from '@/api/ApiService';
import type { KnightEntity } from '@/entities/KnightEntity';
import { inject, nextTick, ref, watch, type Ref } from 'vue';
import HeroifyKnightComponent from '../heroify-knight/HeroifyKnightComponent.vue';

const props = defineProps<{
	knight: KnightEntity;
}>();

const dialog = ref(false);

const nickname = ref('');

const knightToUpdate: Ref<UpdateKnightProps | undefined> | undefined =
	inject('knightToUpdate');

if (knightToUpdate) {
	watch(knightToUpdate, () => {
		if (knightToUpdate.value) return;

		dialog.value = false;
	});
}

async function handleConfirm() {
	if (!knightToUpdate) return;

	knightToUpdate.value = {
		id: props.knight.id as string,
		nickname: nickname.value,
	};
}
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

				<v-card :title="`Atualizar ${knight.name}`">
					<template v-slot:actions>
						<v-spacer></v-spacer>
						<HeroifyKnightComponent :knight="knight" />

						<v-btn color="red" @click="dialog = false"> Cancelar </v-btn>

						<v-btn
							color="blue"
							@click="handleConfirm"
							class="confirm-update-nickname"
						>
							Confirmar
						</v-btn>
					</template>
					<v-card-text>
						<v-row dense>
							<v-col cols="12" md="12" sm="6">
								<v-text-field
									label="Novo apelido"
									required
									v-model="nickname"
									name="update-nickname"
								></v-text-field>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>
