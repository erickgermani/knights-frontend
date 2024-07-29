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
	type CreateKnightProps,
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

		if (error instanceof AxiosError) alert(error.response?.data.message);
	} finally {
		loading.value = false;

		if (scroll) setTimeout(() => scrollToTarget('.divider'), 250);
	}
}

const totalOfPages = ref(1);

function getSearchMeta() {
	return {
		page: page.value,
		filterBy: searchByName.value ? searchByName.value : '',
		filter: filterByHeroes.value ? 'heroes' : '',
	};
}

const page = ref(1);

async function setPage(value: number) {
	page.value = value;

	await searchKnights(getSearchMeta(), true);
}

const searchByName: Ref<string> = ref('');

async function setSearchByName(value: string) {
	searchByName.value = value;
	page.value = 1;

	await searchKnights(getSearchMeta(), true);
}

const filterByHeroes = ref(false);

async function setFilterByHeroes(value: boolean) {
	filterByHeroes.value = value;
	page.value = 1;

	await searchKnights(getSearchMeta(), true);
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

		knightToUpdate.value = undefined;
	} catch (error) {
		heroifyKnightFailed.value = true;

		if (error instanceof AxiosError) alert(error.response?.data.message);
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

		if (error instanceof AxiosError) alert(error.response?.data.message);
	} finally {
		loading.value = false;
	}
}

watch(knightToUpdate, async () => {
	if (!knightToUpdate.value) return;

	await updateKnight(knightToUpdate.value);
});

const knightToCreate: Ref<CreateKnightProps | undefined> = ref();

provide('knightToCreate', knightToCreate);

const createKnightFailed = ref(false);

async function createKnight(props: CreateKnightProps) {
	createKnightFailed.value = false;
	loading.value = true;

	try {
		await apiService.createKnight(props);

		await searchKnights();

		knightToCreate.value = undefined;
	} catch (error: any) {
		createKnightFailed.value = true;

		if (error instanceof AxiosError) alert(error.response?.data.message);
	} finally {
		loading.value = false;
	}
}

watch(knightToCreate, async () => {
	if (!knightToCreate.value) return;

	await createKnight(knightToCreate.value);
});

const renderTeleportComponents = ref(false);

onMounted(async () => {
	await searchKnights();

	await nextTick();

	renderTeleportComponents.value = true;
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
	<Teleport v-if="renderTeleportComponents" to=".filter-by-heroes-container">
		<v-btn
			color="purple"
			class="filter-by-heroes"
			text="Filtrar por heróis"
			:variant="!filterByHeroes ? 'tonal' : undefined"
			@click="setFilterByHeroes(!filterByHeroes)"
		></v-btn>
	</Teleport>
	<Teleport v-if="renderTeleportComponents" to=".create-knight-container">
		<CreateKnightComponent />
	</Teleport>
</template>
