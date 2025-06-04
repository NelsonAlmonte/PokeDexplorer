import type { AlertTypes, AlertProps } from '$lib/types/ui.type';

const errorAlert: AlertProps = {
	title: 'Whoops!',
	content: 'Unable to connect to the regional Pokédex',
	subcontent: 'Please refresh the page or try again later',
	classes: ['bg-white', 'text-gray-900', 'dark:bg-gray-800', 'dark:text-white']
};
const noDataAlert: AlertProps = {
	title: 'Well...',
	content: "You've reached the end",
	subcontent: 'The trail goes cold. No more Pokémon in sight',
	classes: ['bg-white', 'text-gray-900', 'dark:bg-gray-800', 'dark:text-white']
};
const emptyAlert: AlertProps = {
	title: 'Uh oh!',
	content: 'No signs of Pokémon in the vicinity',
	subcontent: 'Try a different location',
	classes: ['bg-white', 'text-gray-900', 'dark:bg-gray-800', 'dark:text-white']
};
export const alerts: AlertTypes = {
	error: errorAlert,
	no_data: noDataAlert,
	empty: emptyAlert
};
