import type { Move } from 'pokeapi-typescript';
import type { PageServerLoad } from './$types';
import { getPokemon } from '$lib/api/pokemon.api';
import { generate } from '$lib/factories/move.factory';

export const load: PageServerLoad = async ({ params, parent, fetch }) => {
	const { results } = await parent();
	const id = +params.id;
	const pokemons = results;
	const pokemon = await getPokemon(pokemons, id);
	const response = await fetch('/data/moves.json');
	const moves: Move[] = await response.json();
	const pokemonMoves = await generate(pokemon, moves);
	return { pokemonMoves };
};
