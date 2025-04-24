import type {
	Pokemon,
	NamedApiResource,
	NamedApiResourceList,
	Generation,
	Move
} from 'pokeapi-typescript';
import type { PageServerLoad } from './$types';
// import type { PokemonProfile, PokemonSpeciesUpdated } from '$lib/types/pokemon.type';
import { doFetch } from '$lib/api/pokemon.api';
// import { generatePokemonInfo } from '$lib/factories/information.factory';
// import type { PokemonInformation } from '$lib/types/information.type';

// const ENDPOINTS = ['pokemon-species' as keyof PokemonProfile];

export const load: PageServerLoad = async ({ params, parent }) => {
	const { results } = await parent();
	const id = +params.id;
	const pokemons = results;

	let pokemon = pokemons.find((p) => p.id === id);

	if (!pokemon) {
		const data = await doFetch('pokemon', id);
		pokemon = data as Pokemon;
	}

	const generations: NamedApiResourceList<NamedApiResource<Generation>> = await doFetch(
		'generation',
		''
	);
	const lastGen = generations.results.at(-1)!;
	const lastGenInfo: Generation = await doFetch('generation', lastGen.name);
	const lastGenVersionGroups = lastGenInfo.version_groups;

	const pokemonLastGenMoves: never[] = [];

	for (const versionGroup of lastGenVersionGroups) {
		const versionGroupName = versionGroup.name;
		for (const move of pokemon.moves) {
			for (const details of move.version_group_details) {
				const moveVersionGroup = details.version_group.name;
				if (moveVersionGroup == versionGroupName) {
					const moveName = move.move.name;
					pokemonLastGenMoves.push({
						version: versionGroupName,
						method: details.move_learn_method.name,
						level_learned_at: details.level_learned_at,
						move: moveName
					});
				}
			}
		}
	}
	console.log(pokemonLastGenMoves);
	// NOTE: Para que me baneen la ip por usar tanto la API

	// const pokemonMoves = [];
	// for (const pokemonLastGenMove of pokemonLastGenMoves) {
	// 	const move: Move = await doFetch('move', pokemonLastGenMove.move);
	// 	pokemonMoves.push({
	// 		name: move.name,
	// 		type: move.type.name,
	// 		category: move.damage_class.name,
	// 		power: move.power,
	// 		accuracy: move.accuracy
	// 	});
	// }

	// console.log(pokemonMoves);
};
