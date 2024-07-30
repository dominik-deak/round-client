export function formatAmount(type: string, amount: number) {
	return type === 'outgoing' ? `-$${Math.abs(amount)}` : `+$${amount}`;
}
