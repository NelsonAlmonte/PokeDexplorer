import { error } from '@sveltejs/kit';
import type {
	NamedApiResource,
	NamedApiResourceList,
	Generation,
	Move,
	PokemonMove,
	MoveLearnMethod,
	VersionGroup
} from 'pokeapi-typescript';
import type { DetailedPokemonMove, MoveCollection, MovesGroup } from '$lib/types/move.type';
import type { PokemonUpdated } from '$lib/types/pokemon.type';
import { doFetch } from '$lib/api/pokemon.api';

export async function generateMoveCollection(
	pokemon: PokemonUpdated,
	moves: Move[],
	generation: string
): Promise<MoveCollection[]> {
	const moveCollection: MoveCollection[] = [];
	const movesGroup = await generateMovesGroup(pokemon, moves, generation);

	for (const key in movesGroup) {
		moveCollection.push({
			label: key.replaceAll('-', ' '),
			learn_methods: movesGroup[key]
		});
	}

	return moveCollection;
}

async function generateMovesGroup(
	pokemon: PokemonUpdated,
	moves: Move[],
	generation: string
): Promise<MovesGroup> {
	const { data, err } = await doFetch<Generation>('generation', generation);

	if (err) error(500, { message: 'error' });

	const genInfo = data!;
	const versionGroups = genInfo.version_groups;
	const genMoves = generateGenMoves(versionGroups, pokemon.moves);
	const moveLearnMethods = await getMoveLearnMethods();
	const movesGroup = structureMovesGroup(genMoves, moves, moveLearnMethods);
	return movesGroup;
}

function generateGenMoves(
	versionGroups: NamedApiResource<VersionGroup>[],
	moves: PokemonMove[]
): Record<string, PokemonMove[]> {
	const pokemonGenMoves: Record<string, PokemonMove[]> = {};

	for (const versionGroup of versionGroups) {
		const versionGroupName = versionGroup.name;
		pokemonGenMoves[versionGroupName] = [];

		for (const move of moves) {
			for (const details of move.version_group_details) {
				const moveVersionGroup = details.version_group.name;

				if (moveVersionGroup == versionGroupName) {
					pokemonGenMoves[versionGroupName].push({
						move: move.move,
						version_group_details: move.version_group_details
					});
				}
			}
		}
	}
	return pokemonGenMoves;
}

async function getMoveLearnMethods(): Promise<string[]> {
	const { data, err } = await doFetch<NamedApiResourceList<NamedApiResource<MoveLearnMethod>>>(
		'move-learn-method',
		''
	);

	if (err) error(500, { message: 'error' });

	const moveLearnMethods = data!;

	return moveLearnMethods.results.map((value) => value.name);
}

function structureMovesGroup(
	genMoves: Record<string, PokemonMove[]>,
	moves: Move[],
	moveLearnMethods: string[]
): MovesGroup {
	const moveMap = new Map(moves.map((move) => [move.name, move]));
	const movesGroup: MovesGroup = {};

	for (const key in genMoves) {
		const versionGroupMoves = genMoves[key];

		if (versionGroupMoves.length <= 0) continue;

		if (!movesGroup[key]) movesGroup[key] = [];

		for (const method of moveLearnMethods) {
			movesGroup[key].push({
				label: method.replaceAll('-', ' '),
				moves: []
			});
		}

		for (const versionGroupMove of versionGroupMoves) {
			const move = moveMap.get(versionGroupMove.move.name);
			if (!move) continue;

			for (const detail of versionGroupMove.version_group_details) {
				if (detail.version_group.name !== key) continue;

				const methodIndex = moveLearnMethods.indexOf(detail.move_learn_method.name);
				if (methodIndex === -1) continue;

				const alreadyExists = movesGroup[key][methodIndex].moves.some(
					(m) => m.name === move.name.replaceAll('-', ' ')
				);
				if (!alreadyExists) {
					movesGroup[key][methodIndex].moves.push({
						name: move.name.replaceAll('-', ' '),
						power: move.power,
						accuracy: move.accuracy,
						damage_class: move.damage_class,
						type: move.type,
						version_group_details: detail
					});
					movesGroup[key][methodIndex].moves = sortMoves(
						movesGroup[key][methodIndex].moves,
						detail.move_learn_method.name
					);
				}
			}
		}
	}

	return movesGroup;
}

function sortMoves(moves: DetailedPokemonMove[], learnMethod: string): DetailedPokemonMove[] {
	let sortedMoves: DetailedPokemonMove[] = [];
	if (learnMethod === 'level-up') {
		sortedMoves = moves.sort(
			(a, b) => a.version_group_details.level_learned_at - b.version_group_details.level_learned_at
		);
	} else {
		sortedMoves = moves.sort((a, b) => a.name.localeCompare(b.name));
	}

	return sortedMoves;
}
