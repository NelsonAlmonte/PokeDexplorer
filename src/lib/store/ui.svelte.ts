export const modalState = $state({
	search: {
		isOpen: false
	}
});

export const searchState = $state({
	name: '',
	selectedTypes: [] as string[]
});
