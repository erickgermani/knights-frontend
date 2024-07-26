import { describe, it, expect, beforeEach } from 'vitest';
import {
	KnightEntity,
	type Attributes,
	type KnightProps,
	type Weapon,
} from '@/entities/KnightEntity';
import { KnightDataBuilder } from '@/entities/helpers/knight-data-builder';

describe('KnightEntity unit tests', () => {
	let sut: KnightEntity;
	let props: KnightProps;

	beforeEach(() => {
		props = Object.assign(KnightDataBuilder(), {
			id: 'fakeId',
			heroifiedAt: new Date(),
			updatedAt: new Date(),
		});

		sut = new KnightEntity(props);
	});

	it('Constructor method', () => {
		expect(sut.id).toEqual(props.id);
		expect(sut.name).toEqual(props.name);
		expect(sut.nickname).toEqual(props.nickname);
		expect(sut.birthday).toEqual(props.birthday);
		expect(sut.weapons).toEqual(props.weapons);
		expect(sut.attributes).toEqual(props.attributes);
		expect(sut.keyAttribute).toEqual(props.keyAttribute);
		expect(sut.heroifiedAt).toBeInstanceOf(Date);
		expect(sut.createdAt).toBeInstanceOf(Date);
		expect(sut.updatedAt).toBeInstanceOf(Date);
		expect(typeof sut['age']).toBe('number');
		expect(typeof sut['attack']).toBe('number');
		expect(typeof sut['experience']).toBe('number');
	});

	it('Should calculate the correct age based on birthday', () => {
		const birthday = new Date('2000-07-20');

		const reference = new Date('2020-07-20');

		const expectedAge = 20;

		sut = new KnightEntity(KnightDataBuilder({ birthday }));

		expect(sut['calculateAge'](reference)).toEqual(expectedAge);
	});

	it('Should return the currently equipped weapon', () => {
		const equippedWeapon: Weapon = {
			name: 'Sword of Dawn',
			mod: 5,
			attr: 'strength',
			equipped: true,
		};

		const weapons: Weapon[] = [
			equippedWeapon,
			{
				name: 'Shield of Night',
				mod: 3,
				attr: 'constitution',
				equipped: false,
			},
		];

		sut = new KnightEntity(KnightDataBuilder({ weapons }));

		expect(sut['getEquippedWeapon']()).toEqual(equippedWeapon);
	});

	it('Should calculate the correct attack', () => {
		const weapons: Weapon[] = [
			{ name: 'Sword', mod: 2, attr: 'strength', equipped: true },
			{ name: 'Bow', mod: 1, attr: 'dexterity', equipped: false },
		];

		const attributes: Attributes = {
			strength: 15,
			dexterity: 10,
			constitution: 12,
			intelligence: 8,
			wisdom: 14,
			charisma: 13,
		};

		sut = new KnightEntity(
			KnightDataBuilder({
				attributes,
				weapons,
				keyAttribute: 'dexterity',
			}),
		);

		const expectedAttack = KnightEntity.INITIAL_ATTACK + -1 + 2;

		expect(sut['calculateAttack']()).toEqual(expectedAttack);
	});
});
