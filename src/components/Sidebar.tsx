'use client'; // needed for icons

import { Sidebar } from 'flowbite-react';
import { FaBriefcase, FaFileAlt, FaHome } from 'react-icons/fa';

export default function AppSidebar() {
	return (
		<Sidebar aria-label='Sidebar'>
			<Sidebar.Items>
				<Sidebar.ItemGroup>
					<Sidebar.Item href='#' icon={FaHome}>
						Home
					</Sidebar.Item>
					<Sidebar.Item href='#' icon={FaFileAlt}>
						Accounts
					</Sidebar.Item>
					<Sidebar.Item href='#' icon={FaBriefcase}>
						Portfolio
					</Sidebar.Item>
				</Sidebar.ItemGroup>
			</Sidebar.Items>
		</Sidebar>
	);
}
