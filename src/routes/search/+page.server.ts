import type { PageServerLoad } from './$types';
import type { Params } from '$lib/types/search.type';
import { searchPokemon } from '$lib/api/search.api';

export const load: PageServerLoad = async ({ url }) => {
	const params: Params = {
		name: url.searchParams.get('name'),
		types: url.searchParams.get('types'),
		generations: url.searchParams.get('generations')
	};
	const results = await searchPokemon(params);

	return { results, params };
};
