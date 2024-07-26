import {
	ApiService,
	type CreateKnightResponse,
	type GetKnightResponse,
	type RequestError,
	type SearchKnightsResponse,
	type UpdateKnightResponse,
} from '@/api/ApiService';
import { KnightDataBuilder } from '@/entities/testing/helpers/knight-data-builder';
import { describe, test, expect } from 'vitest';

describe('ApiService tests', () => {
	const sut: ApiService = ApiService.getInstance();
	let knightId: string;

	describe('createKnight method', () => {
		test('Should return created knight', async () => {
			const knight = KnightDataBuilder();

			const response = (await sut.createKnight(knight)) as CreateKnightResponse;

			expect(response.data).toBeInstanceOf(Object);
			expect(typeof response.data.id).toBe('string');
			expect(typeof response.data.name).toBe('string');
			expect(typeof response.data.nickname).toBe('string');
			expect(typeof response.data.birthday).toBe('string');
			expect(response.data.weapons).toBeInstanceOf(Array);
			expect(response.data.weapons).toHaveLength(1);
			expect(response.data.attributes).toBeInstanceOf(Object);
			expect(typeof response.data.keyAttribute).toBe('string');
			expect(typeof response.data.createdAt).toBe('string');

			knightId = response.data.id;
		});
	});

	describe('getKnight method', () => {
		test('Should return a knight searching by id', async () => {
			expect(knightId).toBeDefined();

			const response = (await sut.getKnight(knightId)) as GetKnightResponse;

			expect(response.data).toBeInstanceOf(Object);
			expect(typeof response.data.id).toBe('string');
			expect(typeof response.data.name).toBe('string');
			expect(typeof response.data.nickname).toBe('string');
			expect(typeof response.data.birthday).toBe('string');
			expect(response.data.weapons).toBeInstanceOf(Array);
			expect(response.data.weapons).toHaveLength(1);
			expect(response.data.attributes).toBeInstanceOf(Object);
			expect(typeof response.data.keyAttribute).toBe('string');
			expect(typeof response.data.createdAt).toBe('string');
		});
	});

	describe('updateKnight method', () => {
		test('Should update a knight by id', async () => {
			expect(knightId).toBeDefined();

			const updateKnightProps = {
				id: knightId,
				nickname: 'new nickname' + new Date().toISOString(),
			};

			const response = (await sut.updateKnight(
				updateKnightProps,
			)) as UpdateKnightResponse;

			expect(response.data).toBeInstanceOf(Object);
			expect(typeof response.data.id).toBe('string');
			expect(typeof response.data.name).toBe('string');
			expect(typeof response.data.nickname).toBe('string');
			expect(response.data.nickname).toEqual(updateKnightProps.nickname);
			expect(typeof response.data.birthday).toBe('string');
			expect(response.data.weapons).toBeInstanceOf(Array);
			expect(response.data.weapons).toHaveLength(1);
			expect(response.data.attributes).toBeInstanceOf(Object);
			expect(typeof response.data.keyAttribute).toBe('string');
			expect(typeof response.data.createdAt).toBe('string');
			expect(typeof response.data.updatedAt).toBe('string');
		});
	});

	describe('heroifyKnight method', () => {
		test('Should heroify knight', async () => {
			expect(knightId).toBeDefined();

			const heroifyKnightResponse = await sut.heroifyKnight(knightId);

			expect(heroifyKnightResponse).not.toHaveProperty('error');

			const getKnightResponse = (await sut.getKnight(
				knightId,
			)) as GetKnightResponse;

			expect(typeof getKnightResponse.data.heroifiedAt).toBe('string');
		});
	});

	describe('searchKnights method', () => {
		test('Should return result props with knights', async () => {
			const response = (await sut.searchKnights({})) as SearchKnightsResponse;

			expect(response.data).toBeInstanceOf(Array);
			expect(typeof response.meta.currentPage).toBe('number');
			expect(typeof response.meta.perPage).toBe('number');
			expect(typeof response.meta.lastPage).toBe('number');
			expect(typeof response.meta.total).toBe('number');
		});
	});
});
