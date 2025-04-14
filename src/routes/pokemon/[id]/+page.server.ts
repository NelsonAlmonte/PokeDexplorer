import type { Pokemon } from 'pokeapi-typescript';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent, fetch }) => {
	const { results } = await parent();
	const pokemons = results;
	const id = +params.id;

	let pokemon = pokemons.find((p) => p.id === id);

	if (!pokemon) {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		if (!res.ok) throw new Error('No se pudo cargar el Pokémon');
		pokemon = (await res.json()) as Pokemon;
	}

	return { pokemon };
};
