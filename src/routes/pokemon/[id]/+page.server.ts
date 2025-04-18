import type { Pokemon } from 'pokeapi-typescript';
import type { PageServerLoad } from './$types';
import type { PokemonProfile, PokemonSpeciesUpdated } from '$lib/types/pokemon.type';

const ENDPOINTS = ['pokemon-species' as keyof PokemonProfile];

export const load: PageServerLoad = async ({ params, parent }) => {
	const { results } = await parent();
	const pokemons = results;
	const id = +params.id;
	const profile: PokemonProfile = {
		pokemon: {} as Pokemon,
		'pokemon-species': {} as PokemonSpeciesUpdated
	};

	const pokemon = pokemons.find((p) => p.id === id);

	if (!pokemon) {
		const data = await doFecth('pokemon', id);
		profile.pokemon = data as Pokemon;
	} else {
		profile.pokemon = pokemon;
	}

	for (const endpoint of ENDPOINTS) {
		const response = await doFecth(endpoint, id);
		profile[endpoint] = response;
	}

	return { profile };
};

async function doFecth(endpoint: string, id: number) {
	const res = await fetch(`https://pokeapi.co/api/v2/${endpoint}/${id}`);
	if (!res.ok) throw new Error('Error when retrieving the response');
	const data = await res.json();
	return data;
}
