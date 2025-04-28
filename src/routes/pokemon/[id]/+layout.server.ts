import type { LayoutServerLoad } from './$types';
import type { PokemonProfile, TypeDefense } from '$lib/types/pokemon.type';
import type { PokemonInformation } from '$lib/types/information.type';
import { generatePokemonInfo } from '$lib/factories/information.factory';
import { generateTypeDefenses } from '$lib/factories/type-defense.factory';
import { doFetch, getPokemon } from '$lib/api/pokemon.api';

export const load: LayoutServerLoad = async ({ params, parent }) => {
	const { results } = await parent();
	const pokemons = results;
	const id = +params.id;
	const profile: PokemonProfile = {
		pokemon: await getPokemon(pokemons, id),
		species: await doFetch('pokemon-species', id),
		info: {} as PokemonInformation,
		type_defenses: [] as TypeDefense[]
	};

	profile.info = generatePokemonInfo(profile);
	profile.type_defenses = await generateTypeDefenses(profile.pokemon.types);

	return { profile };
};
