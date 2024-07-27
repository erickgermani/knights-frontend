<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { convertDate } from '@/utils/convertDate';

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

function formatDate(date: Date) {
	const convertedString = convertDate(date);

	return convertedString;
}
</script>

<style lang="scss">
@import '_create-knight.styles';
</style>

<template>
	<div class="create-knight">
		<div class="text-center">
			<v-dialog v-model="dialog" max-width="600">
				<template v-slot:activator="{ props: activatorProps }">
					<v-btn
						prepend-icon="mdi-plus-circle"
						color="green"
						v-bind="activatorProps"
						>Criar cavaleiro</v-btn
					>
				</template>

				<v-card prepend-icon="mdi-account" title="Novo cavaleiro">
					<v-card-text>
						<v-row dense>
							<v-col cols="12" md="12" sm="6">
								<v-text-field
									label="Name*"
									required
									max-length="255"
									name="name"
									variant="solo-filled"
								></v-text-field>
							</v-col>

							<v-col cols="12" sm="6">
								<VueDatePicker
									v-model="date"
									:flow="['year', 'month', 'calendar']"
									required
									placeholder="Data de nascimento"
									name="birthday"
									auto-apply
									:max-date="new Date()"
									prevent-min-max-navigation
									partial-flow
									:hide-navigation="['hours', 'minutes', 'seconds', 'time']"
									:format="formatDate"
								></VueDatePicker>
							</v-col>

							<v-col cols="12" sm="6">
								<v-autocomplete
									:items="attributes"
									label="Atributo chave"
									required
									name="keyAttribute"
									variant="solo-filled"
								></v-autocomplete>
							</v-col>
						</v-row>

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
							@click="dialog = false"
						></v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>
