<script setup lang="ts">
import type { Attributes, Weapon } from '@/entities/KnightEntity';
import { ref, type Ref } from 'vue';

const dialog = ref(false);

const emits = defineEmits(['createWeapon']);

const attributes = [
	'charisma',
	'constitution',
	'dexterity',
	'intelligence',
	'strength',
	'wisdom',
];

const name = ref('');

const mod = ref('0');

const attr: Ref<keyof Attributes | undefined> = ref();

const equipped = ref('');

async function handleSubmit() {
	emits('createWeapon', {
		name: name.value,
		mod: parseInt(mod.value),
		attr: attr.value,
		equipped: equipped.value === 'Sim',
	});

	name.value = '';
	mod.value = '0';
	attr.value = undefined;
	equipped.value = '';

	dialog.value = false;
}
</script>

<style lang="scss">
@import '_create-weapon.styles';
</style>

<template>
	<div class="create-weapon">
		<div class="mt-4">
			<v-dialog v-model="dialog" max-width="400">
				<template v-slot:activator="{ props: activatorProps }">
					<v-btn color="green" v-bind="activatorProps"> Criar arma </v-btn>
				</template>

				<v-card :title="`Criar arma`">
					<template v-slot:actions>
						<v-spacer></v-spacer>

						<v-btn color="red" @click="dialog = false"> Cancelar </v-btn>

						<v-btn
							color="blue"
							type="submit"
							form="create-weapon"
							class="confirm-create-weapon"
						>
							Criar arma
						</v-btn>
					</template>
					<v-card-text>
						<form id="create-weapon" @submit.prevent="handleSubmit">
							<v-row dense>
								<v-col cols="12" md="12" sm="6">
									<v-text-field
										label="Nome*"
										required
										v-model="name"
										name="name"
									></v-text-field>
								</v-col>
								<v-col cols="12" md="12" sm="6">
									<v-text-field
										label="Mod*"
										required
										v-model="mod"
										type="number"
										name="mod"
									></v-text-field>
								</v-col>
								<v-col cols="12" md="12" sm="6">
									<v-select
										:items="attributes"
										label="Atributo*"
										name="attributes"
										required
										variant="solo-filled"
										v-model="attr"
									></v-select>
								</v-col>
								<v-col cols="12" md="12" sm="6">
									<v-select
										:items="['Sim', 'Não']"
										label="Equipado*"
										name="equipped"
										required
										variant="solo-filled"
										v-model="equipped"
									></v-select>
								</v-col>
							</v-row>
						</form>
					</v-card-text>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>
