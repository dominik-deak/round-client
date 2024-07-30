'use client';

import { USER_ID } from '@/constants/userId';
import { useQuery } from '@apollo/client';
import {
	BarController,
	BarElement,
	CategoryScale,
	Chart,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from 'chart.js';
import { Card } from 'flowbite-react';
import React, { useEffect, useRef } from 'react';
import { GET_ACCOUNTS } from '../queries/accounts';
import { Account } from '../types/accounts';

Chart.register(
	LineElement,
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	PointElement,
	LineController,
	BarController
);

function AccountDetails() {
	const { loading, error, data } = useQuery(GET_ACCOUNTS, {
		variables: { userId: USER_ID }
	});

	const lineChartRef = useRef<HTMLCanvasElement | null>(null);
	const barChartRef1 = useRef<HTMLCanvasElement | null>(null);
	const barChartRef2 = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (data) {
			const lineCtx = lineChartRef.current?.getContext('2d');
			const barCtx1 = barChartRef1.current?.getContext('2d');
			const barCtx2 = barChartRef2.current?.getContext('2d');

			if (lineCtx) {
				const lineData = {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
					datasets: [
						{
							label: 'Runway & Cash Zero',
							data: [65, 59, 80, 81, 56, 55, 40],
							borderColor: 'rgba(75, 192, 192, 1)',
							backgroundColor: 'rgba(75, 192, 192, 0.2)',
							fill: true
						}
					]
				};

				new Chart(lineCtx, {
					type: 'line',
					data: lineData
				});
			}

			if (barCtx1 && barCtx2) {
				const barData = {
					labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
					datasets: [
						{
							label: 'Monthly Spend',
							data: [12, 19, 3, 5, 2, 3, 12],
							backgroundColor: 'rgba(255, 99, 132, 0.2)',
							borderColor: 'rgba(255, 99, 132, 1)',
							borderWidth: 1
						},
						{
							label: 'Monthly Income',
							data: [22, 29, 13, 15, 12, 13, 22],
							backgroundColor: 'rgba(54, 162, 235, 0.2)',
							borderColor: 'rgba(54, 162, 235, 1)',
							borderWidth: 1
						}
					]
				};

				new Chart(barCtx1, {
					type: 'bar',
					data: barData
				});

				new Chart(barCtx2, {
					type: 'bar',
					data: barData
				});
			}
		}
	}, [data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const accounts: Account[] = data.accounts;
	const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0).toFixed(2);

	return (
		<div className='mx-auto max-w-7xl p-4'>
			<header className='mb-6 flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold'>Accounts</h1>
					<p className='text-gray-600'>Add or manage your linked bank accounts</p>
				</div>
				<button className='btn btn-primary'>+ Link bank account</button>
			</header>

			<div className='mb-8 grid grid-cols-1 gap-6'>
				<Card>
					<h2 className='text-xl font-semibold'>
						Total account balance ({accounts.length} account{accounts.length > 1 ? 's' : ''})
					</h2>
					<p className='text-2xl'>${totalBalance}</p>
				</Card>
			</div>

			<div className='mb-6 grid grid-cols-3 gap-6'>
				{accounts.map(account => (
					<Card key={account.id} className='p-4'>
						<h3 className='font-semibold'>{account.name}</h3>
						<p>Bank: {account.bank}</p>
						<p>Balance: ${account.balance.toFixed(2)}</p>
					</Card>
				))}
			</div>

			<div className='mb-6 grid grid-cols-3 gap-6'>
				<div className='col-span-1'>
					<Card className='p-4'>
						<h3 className='font-semibold'>Runway & Cash Zero</h3>
						<canvas ref={lineChartRef}></canvas>
					</Card>
				</div>
				<div className='col-span-1'>
					<Card className='p-4'>
						<h3 className='font-semibold'>Monthly Spend</h3>
						<canvas ref={barChartRef1}></canvas>
					</Card>
				</div>
				<div className='col-span-1'>
					<Card className='p-4'>
						<h3 className='font-semibold'>Monthly Income</h3>
						<canvas ref={barChartRef2}></canvas>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default AccountDetails;
