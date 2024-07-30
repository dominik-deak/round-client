import AccountDetails from '../components/AccountDetails';
import RecentTransactions from '../components/RecentTransactions';
import AppSidebar from '../components/Sidebar';
import Stats from '../components/Stats';

export default function Home() {
	return (
		<div className='flex'>
			<div className='w-64'>
				<AppSidebar />
			</div>
			<div className='flex-1 p-4'>
				<h1 className='mb-6 text-3xl font-bold'>Accounts</h1>
				<AccountDetails />
				<RecentTransactions />
				<Stats />
			</div>
		</div>
	);
}
