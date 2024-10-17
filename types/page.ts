export type Page<T> = {
	data: T[];
	is_last_page: boolean;
};

export enum OrderDirection {
	ASC = "ASC",
	DESC = "DESC",
}
