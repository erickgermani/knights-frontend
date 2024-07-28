import type { Attributes, KnightProps, Weapon } from '@/entities/KnightEntity';
import type { AxiosInstance } from 'axios';
import axios from 'axios';

export type CreateKnightProps = Omit<
	KnightProps,
	'id' | 'heroifiedAt' | 'createdAt' | 'updatedAt'
>;

export type CreateKnightResponse = {
	data: {
		id: string;
		name: string;
		nickname: string;
		birthday: string;
		weapons: string;
		attributes: string;
		keyAttribute: keyof Attributes;
		createdAt: string;
	};
};

export type CreatedKnight = {
	id: string;
	name: string;
	nickname: string;
	birthday: string;
	weapons: Weapon[];
	attributes: Attributes;
	keyAttribute: keyof Attributes;
	heroifiedAt?: string;
	createdAt: string;
	updatedAt?: string;
};

export type GetKnightResponse = {
	data: CreatedKnight;
};

export type UpdateKnightProps = {
	id: string;
	nickname: string;
};

export type UpdateKnightResponse = GetKnightResponse;

type SortDirection = 'asc' | 'desc';

export type SearchKnightsProps = {
	page?: number;
	perPage?: number;
	sort?: string;
	sortDir?: SortDirection;
	filterBy?: string;
	filter?: string;
};

export type SearchKnightsResponse = {
	data: [CreatedKnight];
	meta: {
		currentPage: number;
		perPage: number;
		lastPage: number;
		total: number;
	};
};

type Endpoints = {
	[key: string]: string | ((hostname: string) => string);
	default: string;
	get: (hostname: string) => string;
};

const endpoints: Endpoints = {
	localhost: 'http://localhost:3000',
	default: location.origin,
	get(hostname: string) {
		const value = this[hostname];

		if (value && typeof value === 'string') return value;

		return this.default;
	},
};

const { hostname } = location;

export class ApiService {
	private readonly axiosInstance: AxiosInstance;

	private readonly endpoint = endpoints.get(hostname);

	private static instance: ApiService;

	private constructor() {
		this.axiosInstance = axios.create({
			baseURL: this.endpoint,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	static getInstance(): ApiService {
		if (!ApiService.instance) ApiService.instance = new ApiService();

		return ApiService.instance;
	}

	async createKnight(props: CreateKnightProps): Promise<CreateKnightResponse> {
		const { data } = await this.axiosInstance.post('/v1/knights', props);

		if (data.error) throw new Error(data.message);

		return data;
	}

	async getKnight(id: string): Promise<GetKnightResponse> {
		const { data } = await this.axiosInstance.get(`/v1/knights/${id}`);

		if (data.error) throw new Error(data.message);

		return data;
	}

	async updateKnight(props: UpdateKnightProps): Promise<UpdateKnightResponse> {
		const { data } = await this.axiosInstance.put(`/v1/knights/${props.id}`, {
			nickname: props.nickname,
		});

		if (data.error) throw new Error(data.message);

		return data;
	}

	async heroifyKnight(id: string): Promise<void> {
		await this.axiosInstance.delete(`/v1/knights/${id}`);
	}

	async searchKnights(
		props: SearchKnightsProps = {},
	): Promise<SearchKnightsResponse> {
		const queryParams = Object.entries(props)
			.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
			.join('&');

		const { data } = await this.axiosInstance.get(
			`/v1/knights${queryParams ? '?' + queryParams : ''}`,
		);

		if (data.error) throw new Error(data.message);

		return data;
	}
}
