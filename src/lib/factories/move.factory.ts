import type {
	Pokemon,
	NamedApiResource,
	NamedApiResourceList,
	Generation,
	Move,
	PokemonMove,
	MoveLearnMethod,
	VersionGroup
} from 'pokeapi-typescript';
import type { MoveCollection, MovesGroup } from '$lib/types/move.type';
import { doFetch } from '$lib/api/pokemon.api';

export async function generateMoveCollection(
	pokemon: Pokemon,
	moves: Move[]
): Promise<MoveCollection[]> {
	const moveCollection: MoveCollection[] = [];
	const movesGroup = await generateMovesGroup(pokemon, moves);
	for (const key in movesGroup) {
		moveCollection.push({
			label: key.replaceAll('-', ' '),
			value: movesGroup[key]
		});
	}
	return moveCollection;
}

async function generateMovesGroup(pokemon: Pokemon, moves: Move[]): Promise<MovesGroup> {
	const versionGroups = (await getGenInfo()).version_groups;
	const genMoves = generateGenMoves(versionGroups, pokemon.moves);
	const moveLearnMethods = await getMoveLearnMethods();
	const movesGroup = structureMovesGroup(genMoves, moves, moveLearnMethods);
	return movesGroup;
}

//TODO: Que reciba como parametro la generacion. Si no hay generacion que por defecto sea la ultima
async function getGenInfo(): Promise<Generation> {
	const generations: NamedApiResourceList<NamedApiResource<Generation>> = await doFetch(
		'generation',
		''
	);
	// const gen = generations.results.at(-1)!;
	const gen = generations.results.at(7)!;
	const genInfo: Generation = await doFetch('generation', gen.name);
	return genInfo;
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
	const moveLearnMethods: NamedApiResourceList<NamedApiResource<MoveLearnMethod>> = await doFetch(
		'move-learn-method',
		''
	);
	return moveLearnMethods.results.map((value) => value.name);
}

function structureMovesGroup(
	genMoves: Record<string, PokemonMove[]>,
	moves: Move[],
	moveLearnMethods: string[]
): MovesGroup {
	const movesGroup: MovesGroup = {};
	for (const key in genMoves) {
		const versionGroupMoves = genMoves[key];
		if (versionGroupMoves.length > 0) {
			if (!movesGroup[key]) movesGroup[key] = [];
			for (let index = 0; index < moveLearnMethods.length; index++) {
				if (!movesGroup[key][index])
					movesGroup[key][index] = {
						label: moveLearnMethods[index].replaceAll('-', ' '),
						value: []
					};
				for (const versionGroupMove of versionGroupMoves) {
					const foundMove = moves.find((move) => move.name === versionGroupMove.move.name)!;
					const foundLearnMethod = versionGroupMove.version_group_details.find(
						(learnMethod) => learnMethod.move_learn_method.name === moveLearnMethods[index]
					);
					const alredyAddedMove = movesGroup[key][index].value.some(
						(value) => value.name === foundMove.name
					);
					if (!alredyAddedMove && foundLearnMethod) {
						movesGroup[key][index].value.push({
							name: foundMove.name.replaceAll('-', ' '),
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
	return movesGroup;
}
