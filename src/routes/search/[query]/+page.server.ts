import type { PageServerLoad } from './$types';
import { searchPokemon } from '$lib/api/search.api';

export const load: PageServerLoad = async ({ params }) => {
	const searchValue = params.query;
	const results = await searchPokemon(searchValue);

	return { results };
};
