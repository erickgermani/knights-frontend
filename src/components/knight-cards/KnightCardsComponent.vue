<script setup lang="ts">
import type { KnightEntity } from '@/entities/KnightEntity';
import KnightCardComponent from '../knight-card/KnightCardComponent.vue';

defineProps<{
	knights: KnightEntity[] | undefined;
}>();
</script>

<style lang="scss">
@import '_knight-cards.styles';
</style>

<template>
	<section class="knight-cards">
		<v-container>
			<v-row v-if="knights === undefined" class="skeletons">
				<v-col v-for="i in 15" :key="i">
					<v-skeleton-loader
						:elevation="12"
						:type="['card-avatar', 'card']"
						class="mx-auto"
					></v-skeleton-loader>
				</v-col>
			</v-row>
			<v-row v-else>
				<v-col v-for="knight in knights" :key="knight.id">
					<KnightCardComponent :knight="knight" />
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>
