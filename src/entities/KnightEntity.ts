export type Attributes = {
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
};

export type Weapon = {
	name: string;
	mod: number;
	attr: keyof Attributes;
	equipped: boolean;
};

export type KnightProps = {
	id?: string;
	name: string;
	nickname: string;
	birthday: Date;
	weapons: Array<Weapon>;
	attributes: Attributes;
	keyAttribute: keyof Attributes;
	heroifiedAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
};

export class KnightEntity {
	static readonly INITIAL_ATTACK = 10;

	static readonly ATTACK_MODIFIER: Record<string, number> = {
		'0-8': -2,
		'9-10': -1,
		'1-12': 0,
		'13-15': 1,
		'16-18': 2,
		'19-20': 3,
	};

	readonly id?: string;
	readonly name: string;
	readonly nickname: string;
	readonly birthday: Date;
	readonly weapons: Array<Weapon>;
	readonly attributes: Attributes;
	readonly keyAttribute: keyof Attributes;
	readonly heroifiedAt?: Date;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
	private readonly age: number;
	private readonly attack: number;
	private readonly experience: number;

	constructor(props: KnightProps) {
		this.id = props.id;
		this.name = props.name;
		this.nickname = props.nickname;
		this.birthday = props.birthday;
		this.weapons = props.weapons;
		this.attributes = props.attributes;
		this.keyAttribute = props.keyAttribute;
		this.heroifiedAt = props.heroifiedAt;
		this.createdAt = props.createdAt ?? new Date();
		this.updatedAt = props.updatedAt;
		this.age = this.calculateAge();
		this.attack = this.calculateAttack();
		this.experience = this.calculateExperience();
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			nickname: this.nickname,
			birthday: this.birthday,
			weapons: this.weapons,
			attributes: this.attributes,
			keyAttribute: this.keyAttribute,
			heroifiedAt: this.heroifiedAt,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}

	private calculateAge(reference: Date = new Date()) {
		let years = reference.getFullYear() - this.birthday.getFullYear();

		const referencetMonth = reference.getMonth();
		const initialMonth = this.birthday.getMonth();

		const referencetDay = reference.getDate();
		const initialDay = this.birthday.getDate();

		if (
			referencetMonth < initialMonth ||
			(referencetMonth === initialMonth && referencetDay < initialDay)
		)
			years -= 1;

		return years;
	}

	private getEquippedWeapon() {
		const equippedWeapon = this.weapons.find((weapon) => weapon.equipped);

		return equippedWeapon;
	}

	private getAttributeMod() {
		const attributeValue =
			this.attributes[this.keyAttribute as keyof Attributes];

		let attributeMod;

		for (const range in KnightEntity.ATTACK_MODIFIER) {
			const [min, max] = range.split('-').map(Number);

			if (attributeValue >= min && attributeValue <= max) {
				attributeMod = KnightEntity.ATTACK_MODIFIER[range];
				break;
			}
		}

		return attributeMod;
	}

	private calculateAttack() {
		const attributeMod = this.getAttributeMod() ?? 0;
		const weaponMod = this.getEquippedWeapon()?.mod ?? 0;

		const attack = KnightEntity.INITIAL_ATTACK + attributeMod + weaponMod;

		return attack;
	}

	private calculateExperience() {
		if (this.age < 7) return 0;

		const experience = Math.floor((this.age - 7) * Math.pow(22, 1.45));

		return experience;
	}
}
