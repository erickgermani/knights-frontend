<script setup lang="ts">
import type { KnightEntity } from '@/entities/KnightEntity';
import { convertDate } from '@/utils/convertDate';
import SwordIcon from '../icons/SwordIcon.vue';
import SwordCrossIcon from '../icons/SwordCrossIcon.vue';

defineProps<{
	knight: KnightEntity;
}>();
</script>

<style lang="scss">
@import '_knight-card.styles';
</style>

<template>
	<div class="knight-card">
		<v-card class="mx-auto">
			<template v-slot:title>
				<span class="font-weight-black" :title="knight.name">{{
					knight.name
				}}</span>
			</template>
			<template v-slot:subtitle>
				<p>Criado em: {{ convertDate(knight.createdAt) }}</p>
				<p>
					Atualizado em:
					{{ knight.updatedAt ? `${convertDate(knight.createdAt)}` : '-' }}
				</p>
			</template>
			<template v-slot:prepend>
				<component
					:is="knight.getAge() < 7 ? SwordIcon : SwordCrossIcon"
					width="48px"
				/>
			</template>

			<v-card-text class="bg-surface-light pt-4">
				<v-table>
					<tbody>
						<tr>
							<td><strong>Apelido</strong></td>
							<td :title="knight.nickname">{{ knight.nickname }}</td>
						</tr>
						<tr>
							<td><strong>Idade</strong></td>
							<td>{{ knight.getAge() }}</td>
						</tr>
						<tr>
							<td><strong>Armas</strong></td>
							<td>{{ knight.weapons.length }}</td>
						</tr>
						<tr>
							<td><strong>Atributo</strong></td>
							<td>{{ knight.keyAttribute }}</td>
						</tr>
						<tr>
							<td><strong>Ataque</strong></td>
							<td>{{ knight.getAttack() }}</td>
						</tr>
						<tr>
							<td><strong>Exp</strong></td>
							<td>{{ knight.getExperience() }}</td>
						</tr>
					</tbody>
				</v-table>
			</v-card-text>
		</v-card>
	</div>
</template>
