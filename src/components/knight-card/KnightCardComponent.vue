<script setup lang="ts">
import type { KnightEntity } from '@/entities/KnightEntity';
import { convertDate } from '@/utils/convertDate';
import SwordIcon from '../icons/SwordIcon.vue';
import SwordCrossIcon from '../icons/SwordCrossIcon.vue';
import HeroifyKnightComponent from '@/components/heroify-knight/HeroifyKnightComponent.vue';
import CrownIcon from '../icons/CrownIcon.vue';

defineProps<{
	knight: KnightEntity;
}>();

// TODO corrigir funcionamento do emit event
async function handleHeroifyKnight(knight: KnightEntity) {
	console.log('knight :>> ', knight);

	// page.value = 0;
	// searchByName.value = '';

	// await searchKnights();
}
</script>

<style lang="scss">
@import '_knight-card.styles';
</style>

<template>
	<div class="knight-card" @heroifyKnight="handleHeroifyKnight">
		<v-card class="mx-auto">
			<template v-slot:title>
				<span class="font-weight-black" :title="knight.name">{{
					knight.name
				}}</span>
			</template>
			<template v-slot:subtitle>
				<p>Criado em: {{ convertDate(knight.createdAt, true) }}</p>
				<p>
					Atualizado em:
					{{
						knight.updatedAt ? `${convertDate(knight.createdAt, true)}` : '-'
					}}
				</p>
			</template>
			<template v-slot:prepend>
				<component
					:is="
						knight.heroifiedAt
							? CrownIcon
							: knight.getAge() <= 7
								? SwordIcon
								: SwordCrossIcon
					"
					width="48px"
				/>
			</template>
			<template v-slot:actions>
				<HeroifyKnightComponent :knight="knight" />
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
