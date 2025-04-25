import type {
	Pokemon,
	NamedApiResource,
	NamedApiResourceList,
	Generation,
	Move,
	PokemonMove,
	PokemonMoveVersion,
	MoveLearnMethod
} from 'pokeapi-typescript';
import type { PageServerLoad } from './$types';
import { doFetch } from '$lib/api/pokemon.api';

export const load: PageServerLoad = async ({ params, parent, fetch }) => {
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
	const pokemonLastGenMoves: Record<string, PokemonMove[]> = {};

	for (const versionGroup of lastGenVersionGroups) {
		const versionGroupName = versionGroup.name;
		pokemonLastGenMoves[versionGroupName] = [];
		for (const move of pokemon.moves) {
			for (const details of move.version_group_details) {
				const moveVersionGroup = details.version_group.name;
				if (moveVersionGroup == versionGroupName) {
					pokemonLastGenMoves[versionGroupName].push({
						move: move.move,
						version_group_details: move.version_group_details
					});
				}
			}
		}
	}

	type DetailedPokemonMove = Pick<Move, 'name' | 'power' | 'accuracy' | 'damage_class' | 'type'> & {
		version_group_details: PokemonMoveVersion;
	};
	const pokemonMoves: Record<string, Record<string, DetailedPokemonMove[]>> = {};
	const response = await fetch('/data/moves.json');
	const moves: Move[] = await response.json();
	const moveLearnMethods: NamedApiResourceList<NamedApiResource<MoveLearnMethod>> = await doFetch(
		'move-learn-method',
		''
	);
	const moveLearnMethodsNames: string[] = moveLearnMethods.results.map((value) => value.name);

	for (const key in pokemonLastGenMoves) {
		const versionGroupMoves = pokemonLastGenMoves[key];
		if (versionGroupMoves.length > 0) {
			if (!pokemonMoves[key]) pokemonMoves[key] = {};
			for (const moveLearnMethod of moveLearnMethodsNames) {
				pokemonMoves[key][moveLearnMethod] = [];
				for (const versionGroupMove of versionGroupMoves) {
					const foundMove = moves.find((move) => move.name === versionGroupMove.move.name)!;
					const foundLearnMethod = versionGroupMove.version_group_details.find(
						(learnMethod) => learnMethod.move_learn_method.name === moveLearnMethod
					);
					const alredyAddedMove = pokemonMoves[key][moveLearnMethod].some(
						(value) => value.name === foundMove.name
					);
					if (!alredyAddedMove && foundLearnMethod) {
						pokemonMoves[key][moveLearnMethod].push({
							name: foundMove.name,
							power: foundMove.power,
							accuracy: foundMove.accuracy,
							damage_class: foundMove.damage_class,
							type: foundMove.type,
							version_group_details: versionGroupMove.version_group_details.find(
								(value) => value.version_group.name === key
							)!
						});
					}
				}
			}
		}
	}

	console.log(pokemonMoves);
};
