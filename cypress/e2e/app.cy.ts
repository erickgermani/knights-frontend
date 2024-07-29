import listKnights from '../fixtures/list-knights.json';
import updateKnight from '../fixtures/update-knight.json';
import listKnightsAfterUpdate from '../fixtures/list-knights-after-update.json';
import listKnightsAfterHeroify from '../fixtures/list-knights-after-heroify.json';
import createKnight from '../fixtures/create-knight.json';
import listKnightsAfterCreate from '../fixtures/list-knights-after-create.json';
import searchKnights from '../fixtures/search-knights.json';
import filterByHeroes from '../fixtures/filter-by-heroes.json';
import pageTwo from '../fixtures/page-two.json';

const interceptRequests = true;

describe('App test', () => {
	beforeEach(() => {
		cy.viewport('macbook-16');

		if (interceptRequests) {
			cy.intercept('GET', '*/knights', {
				statusCode: 200,
				body: listKnights,
			});

			cy.intercept('PUT', '*/knights/*', {
				statusCode: 200,
				body: updateKnight,
			});

			cy.intercept('DELETE', '*/knights/*', {
				statusCode: 204,
			});

			cy.intercept('POST', '*/knights', {
				statusCode: 201,
				body: createKnight,
			});

			cy.intercept('GET', '*/knights*filterBy=Courtney*', {
				statusCode: 200,
				body: searchKnights,
			});

			cy.intercept('GET', '*/knights*filter=heroes', {
				statusCode: 200,
				body: filterByHeroes,
			});

			cy.intercept('GET', '*/knights?page=2*', {
				statusCode: 200,
				body: pageTwo,
			});
		}
	});

	it('visits the app root url', () => {
		cy.visit('/');
		cy.contains('.logo a', 'Knights Challenge');
	});

	it('must contains knight cards container', () => {
		cy.visit('/');
		cy.get('.knight-cards');
	});

	it('must render knight cards', () => {
		cy.visit('/');
		cy.get('.knight-card');
	});

	it('must update knight nickname', () => {
		cy.visit('/');
		cy.get('.knight-card .update-knight button').first().click();
		cy.get('[name=update-nickname]').type('new nickname');

		cy.intercept('GET', '*/knights', {
			statusCode: 200,
			body: listKnightsAfterUpdate,
		});

		cy.get('.confirm-update-nickname').click();

		cy.get('.knight-card').first().contains('td', 'new nickname');
	});

	it('must heroify knight', () => {
		cy.visit('/');
		cy.get('.knight-card .update-knight button').first().click();

		cy.get('.heroify-knight button').click();

		if (interceptRequests)
			cy.intercept('GET', '*/knights', {
				statusCode: 200,
				body: listKnightsAfterHeroify,
			});

		cy.get('.confirm-heroify').click();

		cy.get('.knight-card').first().contains('title', 'crown');
	});

	// caso o interceptRequests seja false, este teste pode falhar caso já exista um cavaleiro cadastrado com o mesmo nickname
	it('must create new knight', () => {
		cy.visit('/');

		cy.get('.create-knight button').first().click();

		cy.get('#create-knight [name=name]').type('knight name');
		cy.get('#create-knight [name=nickname]').type('knight nickname');

		cy.get('#create-knight [name=birthday]').click();
		cy.get(
			'[aria-label="Year picker overlay"] .dp__overlay_cell_active',
		).click();
		cy.get(
			'[aria-label="Month picker overlay"] .dp__overlay_cell_active',
		).click();
		cy.get('.dp__today').click();

		cy.get('#create-knight .v-col-12').first().next().next().next().click();
		cy.get('.v-list-item').first().click();

		cy.get('#create-knight [name=charisma]').type('1', { force: true });
		cy.get('#create-knight [name=constitution]').type('1', { force: true });
		cy.get('#create-knight [name=dexterity]').type('1', { force: true });
		cy.get('#create-knight [name=intelligence]').type('1', { force: true });
		cy.get('#create-knight [name=strength]').type('1', { force: true });
		cy.get('#create-knight [name=wisdom]').type('1', { force: true });

		cy.get('#create-knight .create-weapon button').click();
		cy.get('#create-weapon [name=name]').type('sword name');
		cy.get('#create-weapon [name=mod]').type('1');
		cy.get('#create-weapon .v-col-12').last().prev().click();
		cy.get('.v-list-item').first().click();
		cy.get('#create-weapon .v-col-12').last().click();
		cy.get('.v-list-item').first().click();
		cy.get('.confirm-create-weapon').click();

		if (interceptRequests)
			cy.intercept('GET', '*/knights', {
				statusCode: 200,
				body: listKnightsAfterCreate,
			});

		cy.get('.confirm-create-knight').click();

		cy.get('.knight-card .v-card-title').first().contains('knight name');
	});

	it('must search knights', () => {
		cy.visit('/');

		cy.get('.search [name=search-by-name').type('Courtney');
		cy.get('.search .search-submit').click();

		cy.get('.knight-card .v-card-title').first().contains('Courtney');
	});

	it('must filter by heroes', () => {
		cy.visit('/');

		cy.get('.filter-by-heroes').click();

		cy.get('.knight-card').first().contains('title', 'crown');
		cy.get('.knight-card .v-card-title').first().contains('Courtney');
	});

	it('should go to page 2', () => {
		cy.visit('/');

		cy.get('.v-pagination__item').first().next().first().click();

		cy.get('.knight-card');
	});
});
