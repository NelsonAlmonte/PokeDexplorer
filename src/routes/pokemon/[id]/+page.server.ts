import type { Pokemon } from 'pokeapi-typescript';
import type { PageServerLoad } from './$types';
import type { PokemonProfile, PokemonSpeciesUpdated } from '$lib/types/pokemon.type';
import { doFetch } from '$lib/api/pokemon.api';

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
		const data = await doFetch('pokemon', id);
		profile.pokemon = data as Pokemon;
	} else {
		profile.pokemon = pokemon;
	}

	for (const endpoint of ENDPOINTS) {
		const response = await doFetch(endpoint, id);
		profile[endpoint] = response;
	}

	return { profile };
};
