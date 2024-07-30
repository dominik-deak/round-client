export type Transaction = {
	id: string;
	date: string;
	amount: number;
	type: string;
	description: string;
	paymentMethod?: string;
	bank?: string;
	account: {
		name: string;
	};
};
