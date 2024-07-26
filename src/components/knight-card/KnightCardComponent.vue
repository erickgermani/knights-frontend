<script setup lang="ts">
import type { KnightEntity } from '@/entities/KnightEntity';
import { convertDate } from '@/utils/convertDate';
import HorseHumanIcon from '../icons/HorseHumanIcon.vue';

defineProps<{
	knight: KnightEntity;
}>();
</script>

<style lang="scss">
@import '_knight-card.styles';
</style>

<template>
	<div class="knight-card">
		<v-card class="mx-auto" width="400">
			<template v-slot:title>
				<span class="font-weight-black">{{ knight.name }}</span>
			</template>
			<template v-slot:subtitle>
				<p>Criado em: {{ convertDate(knight.createdAt) }}</p>
				<p>
					Atualizado em:
					{{ knight.updatedAt ? `${convertDate(knight.createdAt)}` : '-' }}
				</p>
			</template>
			<template v-slot:prepend><HorseHumanIcon width="48px" /></template>

			<v-card-text class="bg-surface-light pt-4">
				<p class="knight-name"><strong>Nome:</strong> {{ knight.name }}</p>
				<p class="knight-age"><strong>Idade:</strong> {{ knight.getAge() }}</p>
				<p class="knight-weapons">
					<strong>Armas:</strong> {{ knight.weapons.length }}
				</p>
				<p class="knight-attribute">
					<strong>Atributo:</strong> {{ knight.keyAttribute }}
				</p>
				<p class="knight-attack">
					<strong>Ataque:</strong> {{ knight.getAttack() }}
				</p>
				<p class="knight-experience">
					<strong>Exp:</strong> {{ knight.getExperience() }}
				</p>
			</v-card-text>
		</v-card>
	</div>
</template>
