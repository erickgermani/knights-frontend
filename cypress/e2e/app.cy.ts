import listKnights from '../fixtures/list-knights.json';
import updateKnight from '../fixtures/update-knight.json';
import listKnightsAfterUpdate from '../fixtures/list-knights-after-update.json';
import listKnightsAfterHeroify from '../fixtures/list-knights-after-heroify.json';
import createKnight from '../fixtures/create-knight.json';
import listKnightsAfterCreate from '../fixtures/list-knights-after-create.json';

const activeIntercepts = true;

describe('App test', () => {
	beforeEach(() => {
		if (activeIntercepts) {
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
		}
	});

	it.skip('visits the app root url', () => {
		cy.visit('/');
		cy.contains('.logo a', 'Knights Challenge');
	});

	it.skip('must contains knight cards container', () => {
		cy.visit('/');
		cy.get('.knight-cards');
	});

	it.skip('must render knight cards', () => {
		cy.visit('/');
		cy.get('.knight-card');
	});

	it.skip('must update knight nickname', () => {
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

	it.skip('must heroify knight', () => {
		cy.visit('/');
		cy.get('.knight-card .update-knight button').first().click();

		cy.get('.heroify-knight button').click();

		if (activeIntercepts)
			cy.intercept('GET', '*/knights', {
				statusCode: 200,
				body: listKnightsAfterHeroify,
			});

		cy.get('.confirm-heroify').click();

		cy.get('.knight-card').first().contains('title', 'crown');
	});

	it.skip('must create new knight', () => {
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

		if (activeIntercepts)
			cy.intercept('GET', '*/knights', {
				statusCode: 200,
				body: listKnightsAfterCreate,
			});

		cy.get('.confirm-create-knight').click();

		cy.get('.knight-card .v-card-title').first().contains('knight name');
	});
});
