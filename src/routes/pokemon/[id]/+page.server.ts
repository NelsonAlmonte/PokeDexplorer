import type { Pokemon, PokemonSpecies } from 'pokeapi-typescript';
import type { PageServerLoad } from './$types';
import type { PokemonInfo } from '$lib/interfaces/pokemon.interface';

const ENDPOINTS = ['pokemon-species' as keyof PokemonInfo];

export const load: PageServerLoad = async ({ params, parent }) => {
	const { results } = await parent();
	const pokemons = results;
	const id = +params.id;
	const info: PokemonInfo = { pokemon: {} as Pokemon, 'pokemon-species': {} as PokemonSpecies };

	const pokemon = pokemons.find((p) => p.id === id);

	if (!pokemon) {
		const res = await doFecth('pokemon', id);
		if (!res.ok) throw new Error('No se pudo cargar el Pokémon');
		info['pokemon'] = (await res.json()) as Pokemon;
	} else {
		info['pokemon'] = pokemon;
	}

	for (const endpoint of ENDPOINTS) {
		const response = await doFecth(endpoint, id);
		info[endpoint] = response;
	}

	return { info };
};

async function doFecth(endpoint: string, id: number) {
	const res = await fetch(`https://pokeapi.co/api/v2/${endpoint}/${id}`);
	if (!res.ok) throw new Error('Error when retrieving the response');
	const data = await res.json();
	return data;
}
