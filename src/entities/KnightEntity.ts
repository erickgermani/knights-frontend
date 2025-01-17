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
	private _nickname: string;
	readonly birthday: Date;
	readonly weapons: Array<Weapon>;
	readonly attributes: Attributes;
	readonly keyAttribute: keyof Attributes;
	readonly heroifiedAt?: Date;
	readonly createdAt: Date;
	readonly updatedAt?: Date;
	private readonly age: number;
	private readonly attack: number;
	private readonly experience: number;

	constructor(props: KnightProps) {
		this.id = props.id;
		this.name = props.name;
		this._nickname = props.nickname;
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

	get nickname(): string {
		return this._nickname;
	}

	private set nickname(value: string) {
		this._nickname = value;
	}

	updateNickname(value: string) {
		this.nickname = value;
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

	getAge() {
		return this.age;
	}

	getAttack() {
		return this.attack;
	}

	getExperience() {
		return this.experience;
	}

	private calculateAge(reference: Date = new Date()) {
		let years = reference.getFullYear() - this.birthday.getFullYear();

		const referenceMonth = reference.getMonth();
		const initialMonth = this.birthday.getMonth();

		const referenceDay = reference.getDate();
		const initialDay = this.birthday.getDate();

		if (
			referenceMonth < initialMonth ||
			(referenceMonth === initialMonth && referenceDay < initialDay)
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
		const getAttributeModResponse = this.getAttributeMod();

		const attributeMod =
			getAttributeModResponse !== undefined ? getAttributeModResponse : -2;

		const getEquippedWeaponResponse = this.getEquippedWeapon();

		const weaponMod =
			getEquippedWeaponResponse !== undefined
				? getEquippedWeaponResponse.mod
				: -2;

		const attack = KnightEntity.INITIAL_ATTACK + attributeMod + weaponMod;

		return attack;
	}

	private calculateExperience() {
		if (this.age < 7) return 0;

		const experience = Math.floor((this.age - 7) * Math.pow(22, 1.45));

		return experience;
	}
}

export class KnightEntityFactory {
	static create(props: KnightProps): KnightEntity {
		return new KnightEntity(props);
	}
}
