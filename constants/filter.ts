import { TransactionType } from "types";

export const transactionTypes = [
	{
		label: "Dépense",
		value: TransactionType.EXPENSE,
	},
	{
		label: "Revenu",
		value: TransactionType.INCOME,
	},
	{
		label: "Don",
		value: TransactionType.DONATION,
	},
	{
		label: "Investissement",
		value: TransactionType.INVESTMENT,
	},
	{
		label: "Prêt",
		value: TransactionType.LOAN,
	},
	{
		label: "Remboursement",
		value: TransactionType.REPAYMENT,
	},
	{
		label: "Epargne",
		value: TransactionType.SAVINGS,
	},
	{
		label: "Virement",
		value: TransactionType.TRANSFER,
	},
];
