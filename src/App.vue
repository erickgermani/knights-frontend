<script setup lang="ts">
import { AxiosError } from 'axios';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import FooterComponent from '@/components/footer/FooterComponent.vue';
import SearchComponent from './components/search/SearchComponent.vue';
import PaginationComponent from './components/pagination/PaginationComponent.vue';
import CreateKnightComponent from '@/components/create-knight/CreateKnightComponent.vue';
import KnightCardsComponent from '@/components/knight-cards/KnightCardsComponent.vue';
import LoaderComponent from './components/loader/LoaderComponent.vue';
import {
	ApiService,
	type SearchKnightsProps,
	type SearchKnightsResponse,
	type UpdateKnightProps,
} from './api/ApiService';
import { onMounted, ref, provide, type Ref, watch, nextTick } from 'vue';
import type { KnightEntity } from './entities/KnightEntity';
import { KnightMapper } from './mappers/KnightMapper';
import { scrollToTarget } from './utils/scrollToTarget';

const apiService = ApiService.getInstance();

const loading = ref(false);

let searchKnightsResult: SearchKnightsResponse;

const searchedKnights: Ref<KnightEntity[] | undefined> = ref();

const searchKnightsFailed = ref(false);

async function searchKnights(props: SearchKnightsProps = {}, scroll = false) {
	searchKnightsFailed.value = false;
	loading.value = true;

	try {
		searchKnightsResult = await apiService.searchKnights(props);

		if (searchKnightsResult.data === undefined) return [];

		searchedKnights.value = searchKnightsResult.data.map((knightProps) =>
			KnightMapper.toEntity(knightProps),
		);

		totalOfPages.value = Math.ceil(
			searchKnightsResult.meta.total / searchKnightsResult.meta.perPage,
		);
	} catch (error) {
		searchKnightsFailed.value = true;

		if (error instanceof AxiosError)
			console.log(
				'error.response.data.message :>> ',
				error.response?.data.message,
			);
	} finally {
		loading.value = false;

		if (scroll) setTimeout(() => scrollToTarget('.divider'), 250);
	}
}

const totalOfPages = ref(1);

const searchByName: Ref<string> = ref('');

async function setSearchByName(value: string) {
	searchByName.value = value;
	page.value = 1;

	await searchKnights({ page: page.value, filterBy: searchByName.value }, true);
}

const page = ref(1);

async function setPage(value: number) {
	page.value = value;

	await searchKnights({ page: page.value, filterBy: searchByName.value }, true);
}

const knightToHeroify: Ref<string | undefined> = ref();

provide('knightToHeroify', knightToHeroify);

const heroifyKnightFailed = ref(false);

async function heroifyKnight(knightId: string) {
	heroifyKnightFailed.value = false;
	loading.value = true;

	try {
		await apiService.heroifyKnight(knightId);

		await searchKnights();

		knightToHeroify.value = undefined;
	} catch (error) {
		heroifyKnightFailed.value = true;

		if (error instanceof AxiosError)
			console.log(
				'error.response.data.message :>> ',
				error.response?.data.message,
			);
	} finally {
		loading.value = false;
	}
}

watch(knightToHeroify, async () => {
	if (!knightToHeroify.value) return;

	await heroifyKnight(knightToHeroify.value);
});

const knightToUpdate: Ref<UpdateKnightProps | undefined> = ref();

provide('knightToUpdate', knightToUpdate);

const updateKnightFailed = ref(false);

async function updateKnight(props: UpdateKnightProps) {
	updateKnightFailed.value = false;
	loading.value = true;

	try {
		await apiService.updateKnight(props);

		await searchKnights();

		knightToUpdate.value = undefined;
	} catch (error: any) {
		updateKnightFailed.value = true;

		if (error instanceof AxiosError)
			console.log(
				'error.response.data.message :>> ',
				error.response?.data.message,
			);
	} finally {
		loading.value = false;
	}
}

watch(knightToUpdate, async () => {
	if (!knightToUpdate.value) return;

	await updateKnight(knightToUpdate.value);
});

const renderCreateKnightButton = ref(false);

onMounted(async () => {
	await searchKnights();

	await nextTick();

	renderCreateKnightButton.value = true;
});
</script>

<template>
	<v-app>
		<HeaderComponent />
		<v-divider class="divider" />
		<v-main>
			<SearchComponent :set-search-by-name="setSearchByName" />
			<KnightCardsComponent :knights="searchedKnights" />
			<PaginationComponent :set-page="setPage" :length="totalOfPages" />
		</v-main>
		<FooterComponent />
	</v-app>
	<LoaderComponent :loading="loading" />
	<Teleport v-if="renderCreateKnightButton" to=".create-knight-container">
		<CreateKnightComponent />
	</Teleport>
</template>
