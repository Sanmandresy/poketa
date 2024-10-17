import type { user } from "../database";

export type User = {
	id: string;
	username: string;
	avatar: string;
};

export type UserEntity = typeof user.$inferSelect;
