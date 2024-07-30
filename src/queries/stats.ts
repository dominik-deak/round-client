import { gql } from '@apollo/client';

export const GET_STATS = gql`
	query GetStats($userId: String!) {
		stats(userId: $userId) {
			id
			runway
			monthlyOutgoing
			monthlyIncoming
		}
	}
`;
