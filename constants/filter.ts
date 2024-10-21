import { TransactionType } from "types";

export const transactionTypes = [
	{
		id: "expense",
		label: "Dépense",
		value: TransactionType.EXPENSE,
	},
	{
		id: "income",
		label: "Revenu",
		value: TransactionType.INCOME,
	},
	{
		id: "donation",
		label: "Don",
		value: TransactionType.DONATION,
	},
	{
		id: "Investment",
		label: "Investissement",
		value: TransactionType.INVESTMENT,
	},
	{
		id: "loan",
		label: "Prêt",
		value: TransactionType.LOAN,
	},
	{
		id: "repayment",
		label: "Remboursement",
		value: TransactionType.REPAYMENT,
	},
	{
		id: "savings",
		label: "Epargne",
		value: TransactionType.SAVINGS,
	},
	{
		id: "transfer",
		label: "Virement",
		value: TransactionType.TRANSFER,
	},
];
