import { gql } from '@apollo/client';

export const GET_ACCOUNTS = gql`
	query Accounts($userId: String!) {
		accounts(userId: $userId) {
			id
			name
			bank
			balance
			transactions {
				id
				amount
				type
				description
				date
			}
		}
	}
`;
