import type { CreateKnightProps } from '@/api/ApiService';
import type { Attributes, Weapon } from '../KnightEntity';

export class AttributesDto {
	static validate(data: Attributes): string[] {
		const errors: string[] = [];
		for (const key of [
			'strength',
			'dexterity',
			'constitution',
			'intelligence',
			'wisdom',
			'charisma',
		]) {
			const value = data[key as keyof AttributesDto];
			if (typeof value !== 'number' || value < 0 || value > 20) {
				errors.push(`${key} must be a number between 0 and 20`);
			}
		}
		return errors;
	}
}

export class WeaponDto {
	static validate(data: Weapon): string[] {
		const errors: string[] = [];
		if (
			typeof data.name !== 'string' ||
			data.name.length > 255 ||
			data.name.length === 0
		) {
			errors.push(
				'name must be a non-empty string with a maximum length of 255 characters',
			);
		}
		if (typeof data.mod !== 'number') {
			errors.push('mod must be a number');
		}
		if (
			typeof data.attr !== 'string' ||
			![
				'charisma',
				'constitution',
				'dexterity',
				'intelligence',
				'strength',
				'wisdom',
			].includes(data.attr)
		) {
			errors.push('attr must be a valid key of Attributes');
		}
		if (typeof data.equipped !== 'boolean') {
			errors.push('equipped must be a boolean');
		}
		return errors;
	}
}

export class CreateKnightDto {
	static validate(data: Required<CreateKnightProps>): {
		valid: boolean;
		messages: string[];
	} {
		const errors: string[] = [];

		if (typeof data.name !== 'string' || data.name.length === 0)
			errors.push('name must be a non-empty string');

		if (typeof data.nickname !== 'string' || data.nickname.length === 0)
			errors.push('nickname must be a non-empty string');

		if (!(data.birthday instanceof Date) || isNaN(data.birthday.getTime()))
			errors.push('birthday must be a valid Date object');

		if (!Array.isArray(data.weapons) || data.weapons.length === 0)
			errors.push('weapons must be a non-empty array');
		else
			data.weapons.forEach((weapon, index) => {
				errors.push(
					...WeaponDto.validate(weapon).map(
						(error) => `weapons[${index}]: ${error}`,
					),
				);
			});

		if (typeof data.attributes !== 'object' || data.attributes === null)
			errors.push('attributes must be a non-empty object');
		else errors.push(...AttributesDto.validate(data.attributes));

		if (
			typeof data.keyAttribute !== 'string' ||
			![
				'charisma',
				'constitution',
				'dexterity',
				'intelligence',
				'strength',
				'wisdom',
			].includes(data.keyAttribute)
		)
			errors.push('keyAttribute must be a valid key of Attributes');

		if (
			data.createdAt &&
			(!(data.createdAt instanceof Date) || isNaN(data.createdAt.getTime()))
		)
			errors.push('createdAt must be a valid Date object');

		return {
			valid: !errors.length,
			messages: errors,
		};
	}
}
