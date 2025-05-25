import type { Feed } from '$lib/types/feed.type';

export const feedState = $state<Feed>({
	pokemon: {
		count: 0,
		next: '',
		previous: '',
		results: []
	},
	search: []
});
