import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
	query Transactions($userId: String!) {
		transactions(userId: $userId) {
			id
			amount
			type
			description
			date
			account {
				id
				name
				bank
			}
		}
	}
`;
