import type { LayoutServerLoad } from './$types';
import type { Generation, NamedApiResource, NamedApiResourceList } from 'pokeapi-typescript';
import type { PokemonProfile, StatRange } from '$lib/types/pokemon.type';
import type { PokemonInformation } from '$lib/types/information.type';
import { generatePokemonInfo } from '$lib/factories/information.factory';
import { doFetch, getPokemon } from '$lib/api/pokemon.api';
import { generateStatRange } from '$lib/factories/stat.factory';

export const load: LayoutServerLoad = async ({ params, parent }) => {
	const { results } = await parent();
	const pokemons = results;
	const id = +params.id;
	const profile: PokemonProfile = {
		pokemon: await getPokemon(pokemons, id),
		species: await doFetch('pokemon-species', id),
		info: {} as PokemonInformation,
		stat_range: [] as StatRange[],
		generations: [] as string[]
	};

	profile.info = generatePokemonInfo(profile);
	profile.stat_range = generateStatRange(profile);
	const generationsReponse: NamedApiResourceList<NamedApiResource<Generation>> = await doFetch(
		'generation',
		''
	);
	profile.generations = generationsReponse.results.map((generation) => generation.name);

	return { profile };
};
