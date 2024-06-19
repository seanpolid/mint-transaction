import { CategoryDTO } from "./CategoryDTO";

export type TransactionDTO = {
	id: number;
	identifier: string;
	amount: number;
	startDate: string;
	endDate: string;
	paidInAdvance: boolean;
	notes: string;
	category: CategoryDTO;
};
