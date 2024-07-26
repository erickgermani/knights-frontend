<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);
</script>

<style lang="scss">
@import '_create-knight.styles.scss';
</style>

<template>
	<div class="create-knight">
		<div class="pa-4 text-center">
			<v-dialog v-model="dialog" max-width="600">
				<template v-slot:activator="{ props: activatorProps }">
					<v-btn
						prepend-icon="mdi-plus-circle"
						color="green"
						v-bind="activatorProps"
						>Criar cavaleiro</v-btn
					>
				</template>

				<v-card prepend-icon="mdi-account" title="User Profile">
					<v-card-text>
						<v-row dense>
							<v-col cols="12" md="4" sm="6">
								<v-text-field label="First name*" required></v-text-field>
							</v-col>

							<v-col cols="12" md="4" sm="6">
								<v-text-field
									label="Last name*"
									persistent-hint
									required
								></v-text-field>
							</v-col>

							<v-col cols="12" sm="6">
								<v-select
									:items="['0-17', '18-29', '30-54', '54+']"
									label="Age*"
									required
								></v-select>
							</v-col>

							<v-col cols="12" sm="6">
								<v-autocomplete
									:items="[
										'Skiing',
										'Ice hockey',
										'Soccer',
										'Basketball',
										'Hockey',
										'Reading',
										'Writing',
										'Coding',
										'Basejump',
									]"
									label="Atributo chave"
								></v-autocomplete>
							</v-col>
						</v-row>

						<small class="text-caption text-medium-emphasis"
							>*indicates required field</small
						>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

						<v-btn
							color="primary"
							text="Save"
							variant="tonal"
							@click="dialog = false"
						></v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</div>
</template>
