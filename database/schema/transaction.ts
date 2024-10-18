import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const transaction = sqliteTable(
	"transaction",
	{
		id: text("id").primaryKey(),
		title: text("title").notNull(),
		amount: integer("amount").notNull(),
		type: text("type", {
			enum: [
				"EXPENSE",
				"INCOME",
				"INVESTMENT",
				"LOAN",
				"SAVINGS",
				"TRANSFER",
				"REPAYMENT",
				"DONATION",
			],
		}),
		description: text("description"),
		issued_on: text("issued_on").default(sql`current_timestamp`),
		updated_on: text("updated_on")
			.default(sql`current_timestamp`)
			.$onUpdateFn(() => sql`current_timestamp`),
	},
	(table) => ({
		titleIdx: index("transaction_title_index").on(table.title),
	})
);
