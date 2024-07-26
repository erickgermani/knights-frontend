import type { CreatedKnight } from '@/api/ApiService';
import { KnightEntityFactory, type KnightProps } from '@/entities/KnightEntity';

export class KnightMapper {
	private static convertDate(date?: string) {
		if (!date) return undefined;

		return new Date(date);
	}

	static toEntity(props: CreatedKnight) {
		const data: KnightProps = Object.assign(props, {
			birthday: this.convertDate(props.birthday),
			heroifiedAt: this.convertDate(props.heroifiedAt),
			createdAt: this.convertDate(props.createdAt),
			updatedAt: this.convertDate(props.updatedAt),
		});

		return KnightEntityFactory.create(data);
	}
}
