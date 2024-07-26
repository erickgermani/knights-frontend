<script setup lang="ts">
import { ApiService, type SearchKnightsResponse } from '@/api/ApiService';
import type { KnightEntity } from '@/entities/KnightEntity';
import { KnightMapper } from '@/mappers/KnightMapper';
import { onMounted, ref, type Ref } from 'vue';
import KnightCardComponent from '../knight-card/KnightCardComponent.vue';

defineProps<{
	knights: KnightEntity[];
}>();

const apiService = ApiService.getInstance();

const loading = ref(false);

let searchKnightsResult: SearchKnightsResponse;

const searchedKnights: Ref<KnightEntity[]> = ref([]);

const searchKnightsFailed = ref(false);

async function searchKnights() {
	searchKnightsFailed.value = false;
	loading.value = true;

	try {
		searchKnightsResult =
			(await apiService.searchKnights()) as SearchKnightsResponse;

		if (searchKnightsResult.data === undefined) return [];

		searchedKnights.value = searchKnightsResult.data.map((knightProps) =>
			KnightMapper.toEntity(knightProps),
		);
	} catch (error) {
		searchKnightsFailed.value = true;
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await searchKnights();
});
</script>

<style lang="scss">
@import '_knight-cards.styles';
</style>

<template>
	<section class="knight-cards">
		<v-container>
			<v-row>
				<v-col v-for="knight in knights" :key="knight.id">
					<KnightCardComponent :knight="knight" />
				</v-col>
			</v-row>
		</v-container>
	</section>
</template>
