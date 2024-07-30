'use client';

import { USER_ID } from '@/constants/userId';
import { useQuery } from '@apollo/client';
import { Card } from 'flowbite-react';
import { GET_STATS } from '../queries/stats';

export default function Stats() {
	const { data, loading, error } = useQuery(GET_STATS, {
		variables: { userId: USER_ID }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	if (!data || !data.stats || data.stats.length === 0) {
		return <p>No stats available</p>;
	}

	const stats = data.stats[0];

	return (
		<div className='mx-auto max-w-7xl p-4'>
			<h2 className='mb-4 text-2xl font-semibold'>User Stats</h2>
			<Card className='mb-4 p-4'>
				<div className='flex space-x-4'>
					<p className='mb-2'>
						<span className='font-bold'>Runway:</span> {stats.runway} months
					</p>
					<p className='mb-2'>
						<span className='font-bold'>Monthly Outgoing:</span>{' '}
						<span className='text-green-500'>${stats.monthlyOutgoing}</span>
					</p>
					<p>
						<span className='font-bold'>Montily Incoming:</span>{' '}
						<span className='text-red-500'>${stats.monthlyIncoming}</span>
					</p>
				</div>
			</Card>
		</div>
	);
}
