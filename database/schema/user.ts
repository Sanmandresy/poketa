import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
	id: text().primaryKey(),
	username: text().notNull(),
	avatar: blob("avatar"),
});
