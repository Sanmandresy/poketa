import { between, eq, ilike } from "drizzle-orm";
import { database } from "../init";
import { transaction } from "../schema";
import {
	getOrderDirection,
	getTableColumn,
	hasKey,
	objectMapper,
	paginate,
	randomUuid,
} from "../../util";
import type {
	Page,
	Repository,
	Transaction,
	TransactionFilter,
} from "../../types";

export const transactionRepository: Repository<Transaction, TransactionFilter> =
	{
		findOne: async (id) => {
			if (id) {
				const [entity] = await database
					.select()
					.from(transaction)
					.where(eq(transaction.id, id));
				if (!entity) return null;
				return objectMapper(entity, {} as Transaction);
			}
			return null;
		},
		findAll: async (pagination, filter, order) => {
			const { nextOffset, offset, actualPageSize } = paginate(
				pagination.page,
				pagination.pageSize
			);
			const query = database.select().from(transaction);

			if (filter.title !== undefined) {
				query.where(ilike(transaction.title, `%${filter.title}%`));
			}

			if (filter.type !== undefined) {
				query.where(eq(transaction.type, filter.type));
			}

			// @ts-ignore
			if (filter.amounts !== undefined || filter.amounts?.length === 2) {
				query.where(
					between(transaction.amount, filter.amounts[0], filter.amounts[1])
				);
			}

			// @ts-ignore
			if (filter.dateRange !== undefined || filter.dateRange?.length === 2) {
				query.where(
					between(
						transaction.issued_on,
						filter.dateRange[0],
						filter.dateRange[1]
					)
				);
			}

			if (order.field !== undefined && order.value !== undefined) {
				query.orderBy(
					getOrderDirection(
						// @ts-ignore
						getTableColumn(transaction, order.field),
						order.value
					)
				);
			}

			const actualPage = await query.offset(offset).limit(actualPageSize);
			const nextPage = await query.offset(nextOffset).limit(1);

			return {
				data: actualPage.map((row) => objectMapper(row, {} as Transaction)),
				is_last_page: nextPage.length === 0,
			} satisfies Page<Transaction>;
		},
		saveOrUpdate: async (transactions) => {
			return await database.transaction(async (tx) => {
				const savedOrUpdatedTransactions: Transaction[] = [];
				for (const restTransaction of transactions) {
					if (!hasKey(restTransaction, "id")) {
						const [saved] = await tx
							.insert(transaction)
							.values({ ...restTransaction, id: randomUuid() })
							.returning();
						if (saved) {
							savedOrUpdatedTransactions.push(
								objectMapper(saved, {} as Transaction)
							);
						}
					} else {
						const [updated] = await tx
							.update(transaction)
							.set(restTransaction)
							.where(eq(transaction.id, restTransaction.id))
							.returning();
						if (updated) {
							savedOrUpdatedTransactions.push(
								objectMapper(updated, {} as Transaction)
							);
						}
					}
				}
				return savedOrUpdatedTransactions;
			});
		},
		deleteMany: async (ids) => {
			return await database.transaction(async (tx) => {
				const deletedTransactions: Transaction[] = [];
				for (const id of ids) {
					const [deleted] = await tx
						.delete(transaction)
						.where(eq(transaction.id, id))
						.returning();
					if (deleted) {
						deletedTransactions.push(objectMapper(deleted, {} as Transaction));
					}
				}
				return deletedTransactions;
			});
		},
		delete: async (id) => {
			return await database.transaction(async (tx) => {
				const [deleted] = await tx
					.delete(transaction)
					.where(eq(transaction.id, id))
					.returning();
				return objectMapper(deleted, {} as Transaction);
			});
		},
	};
