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

	constructor(props: KnightProps) {
		this.id = props.id;
		this.name = props.name;
		this.nickname = props.nickname;
		this.birthday = props.birthday;
		this.weapons = props.weapons;
		this.attributes = props.attributes;
		this.keyAttribute = props.keyAttribute;
		this.heroifiedAt = props.heroifiedAt;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
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
}
