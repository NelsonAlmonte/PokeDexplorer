import type { Move } from 'pokeapi-typescript';
import type { PageServerLoad } from './$types';
import { getPokemon } from '$lib/api/pokemon.api';
import { generateMoveCollection } from '$lib/factories/move.factory';

export const load: PageServerLoad = async ({ params, parent, fetch }) => {
	const { results, profile } = await parent();
	const id = +params.id;
	const generation = `generation-${params.generation}`;
	const pokemons = results;
	const pokemon = await getPokemon(pokemons, id);
	const response = await fetch('/data/moves.json');
	const moves: Move[] = await response.json();
	const moveCollection = await generateMoveCollection(
		pokemon,
		moves,
		profile.generations,
		generation
	);
	return { moveCollection };
};
