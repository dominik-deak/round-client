'use client';

import { USER_ID } from '@/constants/userId';
import { formatAmount } from '@/util/formatAmount';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { Table } from 'flowbite-react';
import { GET_TRANSACTIONS } from '../queries/transactions';

export default function RecentTransactions() {
	const { data, loading, error } = useQuery(GET_TRANSACTIONS, {
		variables: { userId: USER_ID }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className='mx-auto max-w-7xl p-4'>
			<h2 className='mb-4 text-2xl font-semibold'>Recent Transactions</h2>
			<Table className='w-full table-auto text-left'>
				<Table.Head>
					<Table.HeadCell>Date</Table.HeadCell>
					<Table.HeadCell>To/From</Table.HeadCell>
					<Table.HeadCell>Amount</Table.HeadCell>
					<Table.HeadCell>Bank</Table.HeadCell>
					<Table.HeadCell>Account</Table.HeadCell>
				</Table.Head>
				<Table.Body>
					{data.transactions.map((transaction: any) => (
						<Table.Row key={transaction.id}>
							<Table.Cell>{format(new Date(transaction.date), 'MM/dd/yyyy')}</Table.Cell>
							<Table.Cell>{transaction.description}</Table.Cell>
							<Table.Cell className={transaction.type === 'outgoing' ? 'text-red-500' : 'text-green-500'}>
								{formatAmount(transaction.type, transaction.amount)}
							</Table.Cell>
							<Table.Cell>{transaction.account.bank || 'N/A'}</Table.Cell>
							<Table.Cell>{transaction.account.name}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}
