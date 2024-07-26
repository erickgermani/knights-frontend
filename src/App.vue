<script setup lang="ts">
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import FooterComponent from '@/components/footer/FooterComponent.vue';
import SearchComponent from './components/search/SearchComponent.vue';
import PaginationComponent from './components/pagination/PaginationComponent.vue';
import CreateKnightComponent from '@/components/create-knight/CreateKnightComponent.vue';
import KnightCardsComponent from '@/components/knight-cards/KnightCardsComponent.vue';
import {
	ApiService,
	type SearchKnightsProps,
	type SearchKnightsResponse,
} from './api/ApiService';
import { onMounted, ref, type Ref } from 'vue';
import type { KnightEntity } from './entities/KnightEntity';
import { KnightMapper } from './mappers/KnightMapper';

const apiService = ApiService.getInstance();

const loading = ref(false);

const totalOfPages = ref(1);

const searchByName: Ref<string> = ref('');

async function setSearchByName(value: string) {
	searchByName.value = value;
	page.value = 1;

	await searchKnights({ page: page.value, filterBy: searchByName.value });
}

const page = ref(1);

async function setPage(value: number) {
	page.value = value;

	await searchKnights({ page: page.value, filterBy: searchByName.value });
}

let searchKnightsResult: SearchKnightsResponse;

const searchedKnights: Ref<KnightEntity[]> = ref([]);

const searchKnightsFailed = ref(false);

async function searchKnights(props: SearchKnightsProps = {}) {
	searchKnightsFailed.value = false;
	loading.value = true;

	try {
		searchKnightsResult = (await apiService.searchKnights(
			props,
		)) as SearchKnightsResponse;

		if (searchKnightsResult.data === undefined) return [];

		searchedKnights.value = searchKnightsResult.data.map((knightProps) =>
			KnightMapper.toEntity(knightProps),
		);

		totalOfPages.value = Math.ceil(
			searchKnightsResult.meta.total / searchKnightsResult.meta.perPage,
		);
	} catch (error) {
		searchKnightsFailed.value = true;
	} finally {
		loading.value = false;
	}
}

const renderCreateKnightButton = ref(false);

onMounted(async () => {
	await searchKnights();

	renderCreateKnightButton.value = true;
});
</script>

<template>
	<v-app>
		<HeaderComponent />
		<v-divider class="mb-8" />
		<v-main>
			<SearchComponent :set-search-by-name="setSearchByName" />
			<KnightCardsComponent :knights="searchedKnights" />
			<PaginationComponent :set-page="setPage" :length="totalOfPages" />
		</v-main>
		<FooterComponent />
	</v-app>
	<v-overlay
		:model-value="loading"
		class="align-center justify-center"
		scroll-strategy="block"
		:persistent="true"
	>
		<v-progress-circular
			color="primary"
			size="64"
			indeterminate
		></v-progress-circular>
	</v-overlay>
	<Teleport v-if="renderCreateKnightButton" to=".create-knight">
		<CreateKnightComponent />
	</Teleport>
</template>
