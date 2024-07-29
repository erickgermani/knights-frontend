import { describe, it, expect } from 'vitest';
import {
	AttributesDto,
	WeaponDto,
	CreateKnightDto,
} from '../create-knight-entity.dto';
import type { Attributes } from '@/entities/KnightEntity';

describe('AttributesDto', () => {
	it('should validate correct attributes', () => {
		const errors = AttributesDto.validate({
			strength: 10,
			dexterity: 15,
			constitution: 12,
			intelligence: 8,
			wisdom: 5,
			charisma: 6,
		});

		expect(errors).toHaveLength(0);
	});

	it('should validate incorrect attributes', () => {
		const errors = AttributesDto.validate({
			strength: 25,
			dexterity: -5,
			constitution: 12,
			intelligence: 8,
			wisdom: 5,
			charisma: 6,
		});

		expect(errors).toContain('strength must be a number between 0 and 20');
		expect(errors).toContain('dexterity must be a number between 0 and 20');
	});
});

describe('WeaponDto', () => {
	it('should validate correct weapon', () => {
		const errors = WeaponDto.validate({
			name: 'Sword',
			mod: 5,
			attr: 'strength',
			equipped: true,
		});

		expect(errors).toHaveLength(0);
	});

	it('should validate incorrect weapon', () => {
		const errors = WeaponDto.validate({
			name: '',
			mod: 5,
			attr: 'invalid_attr' as keyof Attributes,
			equipped: true,
		});

		expect(errors).toContain(
			'name must be a non-empty string with a maximum length of 255 characters',
		);
		expect(errors).toContain('attr must be a valid key of Attributes');
	});
});

describe('CreateKnightDto', () => {
	it('should validate correct create knight dto', () => {
		const errors = CreateKnightDto.validate({
			name: 'Knight',
			nickname: 'Sir Lancelot',
			birthday: new Date('2000-01-01'),
			weapons: [
				{ name: 'Sword', mod: 5, attr: 'strength', equipped: true },
				{ name: 'Shield', mod: 2, attr: 'constitution', equipped: false },
			],
			attributes: {
				strength: 10,
				dexterity: 15,
				constitution: 12,
				intelligence: 8,
				wisdom: 5,
				charisma: 6,
			},
			keyAttribute: 'strength',
			createdAt: new Date(),
		});

		expect(errors).toHaveLength(0);
	});

	it('should validate incorrect create dto', () => {
		const errors = CreateKnightDto.validate({
			name: '',
			nickname: '',
			birthday: new Date('invalid-date'),
			weapons: [],
			attributes: {
				strength: 25,
				dexterity: -5,
				constitution: 12,
				intelligence: 8,
				wisdom: 5,
				charisma: 6,
			},
			keyAttribute: 'invalid_attr' as keyof Attributes,
			createdAt: new Date(),
		});

		expect(errors).toContain('name must be a non-empty string');
		expect(errors).toContain('nickname must be a non-empty string');
		expect(errors).toContain('birthday must be a valid Date object');
		expect(errors).toContain('weapons must be a non-empty array');
		expect(errors).toContain('attributes must be a non-empty object');
		expect(errors).toContain('keyAttribute must be a valid key of Attributes');
	});
});
