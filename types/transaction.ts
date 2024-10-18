import type { transaction } from "../database";

export enum TransactionType {
	EXPENSE = "EXPENSE",
	INCOME = "INCOME",
	INVESTMENT = "INVESTMENT",
	LOAN = "LOAN",
	SAVINGS = "SAVINGS",
	TRANSFER = "TRANSFER",
	REPAYMENT = "REPAYMENT",
	DONATION = "DONATION",
}

export type Transaction = {
	id: string;
	title: string;
	amount: number;
	type: TransactionType;
	issued_on: string;
	updated_on: string;
	description: string;
};

export type TransactionEntity = typeof transaction.$inferSelect;

export type KTransaction = keyof Transaction;

export type TransactionFilter = {
	amounts?: number[];
	dateRange?: string[];
};
