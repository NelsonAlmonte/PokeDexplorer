import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { fetchPokemons } from '$lib/api/pokemon.api';

export const load: LayoutServerLoad = async () => {
	try {
		const pokemons = await fetchPokemons(0);
		return pokemons;
	} catch {
		error(500, { message: 'error' });
	}
};
