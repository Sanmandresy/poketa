import type { OrderDirection, Page } from "./page";

type Pagination = {
	page?: number;
	pageSize?: number;
};

type Filter<T> = {
	[K in keyof T]?: T[K];
};

type Order<T> = {
	field?: KOf<T>;
	value?: OrderDirection;
};

export type KOf<T> = keyof T;

export interface Repository<T, K> {
	findOne: (id: string) => Promise<T | null>;
	findFirst?: () => Promise<T | null>;
	findAll?: (
		pagination: Pagination,
		filter: Filter<T & K>,
		order: Order<T>
	) => Promise<Page<T>>;
	saveOrUpdate?: (payload: T[]) => Promise<T[]>;
	delete?: (id: string) => Promise<T>;
	deleteMany?: (ids: string[]) => Promise<T[]>;
}
