import { Transaction } from './transactions';

export type Account = {
	id: string;
	name: string;
	bank: string;
	balance: number;
	transactions: Transaction[];
	runway: number;
	monthlyOutgoing: number;
	monthlyIncoming: number;
};
