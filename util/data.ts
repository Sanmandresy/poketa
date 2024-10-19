import { asc, desc } from "drizzle-orm";
import { SQLiteColumn, type SQLiteTable } from "drizzle-orm/sqlite-core";
import { randomUUID } from "expo-crypto";
import type { OrderDirection } from "types";

type Mappable = Record<string, unknown>;

type ColumnGetter<T extends SQLiteTable> = {
	[K in keyof T]: T[K] extends SQLiteColumn ? K : never;
}[keyof T];

export const objectMapper = <Source extends Mappable, Target extends Mappable>(
	source: Source,
	target: Target,
	excludeProperties: (keyof (Source & Target))[] = [],
	mapping?: () => Partial<Target>
): Target => {
	const destination = Object.create(Object.getPrototypeOf(target));

	// Default copy operation for all properties present in both source and target
	for (const key of Object.keys(source) as (keyof Source)[]) {
		if (!excludeProperties?.includes(key as keyof (Source & Target))) {
			destination[key] = source[key];
		}
	}

	if (mapping) {
		const mappingResult = mapping();
		Object.assign(destination, mappingResult);
	}

	return destination;
};

export const paginate = (page?: number, pageSize?: number) => {
	const actualPage = page ?? 1;
	const actualPageSize = pageSize ?? 10;
	const offset = actualPage * (actualPage - 1);
	const nextOffset = actualPage * actualPageSize;
	return { offset, nextOffset, actualPageSize };
};

export const hasKey = <T extends Mappable, K extends keyof T>(
	obj: T,
	key: K
) => {
	return key in obj;
};

export const hasValue = <T extends Mappable, K extends keyof T>(
	obj: T,
	key: K
): obj is T & { [P in K]: NonNullable<T[P]> } => {
	return hasKey(obj, key) && obj[key] !== null && obj[key] !== undefined;
};

export const randomUuid = () => {
	return randomUUID().toLowerCase();
};

export const isBlank = (value: string | undefined) => {
	return value?.trim().length === 0;
};

export const toUndefined = (value: string | undefined) => {
	return isBlank(value) ? undefined : value;
};

export const isEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export function getTableColumn<T extends SQLiteTable>(
	table: T,
	key: ColumnGetter<T>
): SQLiteColumn | undefined {
	if (key in table) {
		const column = table[key];
		if (column instanceof SQLiteColumn) {
			return column;
		}
	}
	return undefined;
}

export const getOrderDirection = (
	column: SQLiteColumn,
	direction: OrderDirection
) => {
	switch (direction) {
		case "ASC":
			return asc(column);
		case "DESC":
			return desc(column);
		default:
			return asc(column);
	}
};
