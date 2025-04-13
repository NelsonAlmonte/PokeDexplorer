import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchPokemons } from '$lib/api/pokemon.api';

export const load: PageServerLoad = async () => {
	console.log('ME LLAMARON DESDE EL SSR');
	try {
		const pokemons = await fetchPokemons(0);
		return pokemons;
	} catch (err) {
		console.log(err);
		throw error(500, 'Error when loading the pokemon list');
	}
};
