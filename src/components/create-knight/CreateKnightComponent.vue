<script setup lang="ts">
import { inject, ref, watch, type Ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { convertDate } from '@/utils/convertDate';
import { type CreateKnightProps } from '@/api/ApiService';
import { formDataToObject } from '@/utils/formDataToObject';
import { CreateKnightDto } from '@/entities/helpers/create-knight-entity.dto';
import type { Weapon } from '@/entities/KnightEntity';
import CreateWeaponComponent from '../create-weapon/CreateWeaponComponent.vue';

const dialog = ref(false);

const date = ref();

const attributes = [
	'charisma',
	'constitution',
	'dexterity',
	'intelligence',
	'strength',
	'wisdom',
];

const weapons: Ref<Weapon[]> = ref([]);

function formatDate(date: Date) {
	const convertedString = convertDate(date);

	return convertedString;
}

function createWeapon(weapon: Weapon) {
	console.log(0);
	console.log('weapon :>> ', weapon);
	weapons.value.push(weapon);
}

const knightToCreate: Ref<CreateKnightProps | undefined> | undefined =
	inject('knightToCreate');

if (knightToCreate) {
	watch(knightToCreate, () => {
		if (knightToCreate.value) return;

		dialog.value = false;
	});
}

async function handleSubmit(event: SubmitEvent) {
	const form = event.target as HTMLFormElement | null;

	if (!form) return;

	const object = formDataToObject(new FormData(form));

	const createKnightProps: Required<CreateKnightProps> = {
		attributes: {
			charisma: parseInt(object.charisma),
			constitution: parseInt(object.constitution),
			dexterity: parseInt(object.dexterity),
			intelligence: parseInt(object.intelligence),
			strength: parseInt(object.strength),
			wisdom: parseInt(object.wisdom),
		},
		weapons: weapons.value.map((weapon) => weapon),
		birthday: new Date(object.birthday.split('/').reverse().join('-')),
		keyAttribute: object.keyAttribute,
		name: object.name,
		nickname: object.nickname,
		createdAt: new Date(),
	};

	const validateResponse = CreateKnightDto.validate(createKnightProps);

	if (!validateResponse.valid) {
		alert(
			'Por favor, corrija os seguintes erros antes de prosseguir: ' +
				validateResponse.messages.join(', '),
		);
		throw new Error();
	}

	if (knightToCreate) knightToCreate.value = createKnightProps;
}
</script>

<style lang="scss">
@import '_create-knight.styles';
</style>

<template>
	<div class="create-knight">
		<div class="text-center">
			<v-dialog v-model="dialog" max-width="600" scrollabe>
				<template v-slot:activator="{ props: activatorProps }">
					<v-btn
						prepend-icon="mdi-plus-circle"
						color="pink-darken-1"
						v-bind="activatorProps"
						>Criar cavaleiro</v-btn
					>
				</template>

				<v-card prepend-icon="mdi-account" title="Novo cavaleiro">
					<v-card-text
						class="px-4"
						style="height: 600px; max-height: 75vh; overflow: auto"
					>
						<form
							id="create-knight"
							@submit.prevent="(evt) => handleSubmit(evt as SubmitEvent)"
						>
							<v-row dense>
								<v-col cols="12" md="12" sm="6">
									<v-text-field
										label="Nome*"
										required
										max-length="255"
										name="name"
										variant="solo-filled"
									></v-text-field>
								</v-col>

								<v-col cols="12" md="12">
									<v-text-field
										label="Apelido*"
										required
										max-length="255"
										name="nickname"
										variant="solo-filled"
									></v-text-field>
								</v-col>

								<v-col cols="12" md="6">
									<VueDatePicker
										class="birthday-date-picker"
										v-model="date"
										:flow="['year', 'month', 'calendar']"
										required
										placeholder="Data de nascimento*"
										name="birthday"
										auto-apply
										:max-date="new Date()"
										prevent-min-max-navigation
										partial-flow
										:hide-navigation="['hours', 'minutes', 'seconds', 'time']"
										:format="formatDate"
									></VueDatePicker>
								</v-col>

								<v-col cols="12" md="6">
									<v-select
										:items="attributes"
										label="Atributo chave*"
										required
										name="keyAttribute"
										variant="solo-filled"
									></v-select>
								</v-col>

								<v-col
									v-for="attribute in attributes"
									:key="attribute"
									cols="4"
									md="4"
								>
									<v-text-field
										:label="`${attribute}*`"
										required
										:name="attribute"
										variant="solo-filled"
										type="number"
										min="0"
										max="20"
									></v-text-field>
								</v-col>
							</v-row>

							<v-col cols="12" md="12">
								<p>Armas:</p>

								<div v-if="weapons.length" class="weapons">
									<v-table>
										<thead>
											<tr>
												<th>Nome</th>
												<th>Mod</th>
												<th>Attr</th>
												<th>Equipado</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(weapon, ind) in weapons" :key="ind">
												<td>{{ weapon.name }}</td>
												<td>{{ weapon.mod }}</td>
												<td>{{ weapon.attr }}</td>
												<td>{{ weapon.equipped ? 'Sim' : 'Não' }}</td>
											</tr>
										</tbody>
									</v-table>
								</div>

								<CreateWeaponComponent @create-weapon="createWeapon" />
							</v-col>
						</form>

						<small class="text-caption text-medium-emphasis"
							>* indica campos obrigatórios</small
						>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn
							text="Fechar"
							variant="plain"
							@click="dialog = false"
						></v-btn>

						<v-btn
							color="primary"
							text="Criar"
							variant="tonal"
							type="submit"
							form="create-knight"
							class="confirm-create-knight"
						></v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>
