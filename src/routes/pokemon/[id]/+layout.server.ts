import type { LayoutServerLoad } from './$types';
import type { PokemonProfile, PokemonSpeciesUpdated } from '$lib/types/pokemon.type';
import type { PokemonInformation } from '$lib/types/information.type';
import { generatePokemonInfo } from '$lib/factories/information.factory';
import { doFetch, extractIdFromUrl, getPokemon } from '$lib/api/pokemon.api';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params, parent }) => {
	const { results } = await parent();
	const pokemons = results;
	const id = params.id;
	const profile: PokemonProfile = {
		pokemon: await getPokemon(pokemons, id),
		species: {} as PokemonSpeciesUpdated,
		info: {} as PokemonInformation,
		generations: [] as string[]
	};

	if (!profile.pokemon) error(404, { message: 'empty' });

	const speciesId = extractIdFromUrl(profile.pokemon.species.url);
	const { data, err } = await doFetch<PokemonSpeciesUpdated>('pokemon-species', speciesId);

	if (err) error(500, { message: 'error' });

	profile.species = data!;
	profile.info = generatePokemonInfo(profile);

	return { profile, id };
};
