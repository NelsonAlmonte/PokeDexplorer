import type { LayoutServerLoad } from './$types';
import type { PokemonProfile, PokemonSpeciesUpdated } from '$lib/types/pokemon.type';
import type { PokemonInformation } from '$lib/types/information.type';
import { generatePokemonInfo } from '$lib/factories/information.factory';
import { doFetch, extractIdFromUrl, getPokemon } from '$lib/api/pokemon.api';

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
	const speciesId = extractIdFromUrl(profile.pokemon.species.url);

	profile.species = await doFetch('pokemon-species', speciesId);
	profile.info = generatePokemonInfo(profile);

	return { profile, id };
};
