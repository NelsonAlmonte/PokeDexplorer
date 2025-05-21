import type { PageServerLoad } from './$types';
import { searchPokemon } from '$lib/api/search.api';

export const load: PageServerLoad = async ({ url }) => {
	const searchValue = url.searchParams.get('name');
	const results = await searchPokemon(searchValue!);

	return { results };
};
