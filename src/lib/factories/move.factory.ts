import type {
	Pokemon,
	NamedApiResource,
	NamedApiResourceList,
	Generation,
	Move,
	PokemonMove,
	PokemonMoveVersion,
	MoveLearnMethod,
	VersionGroup
} from 'pokeapi-typescript';
import { doFetch } from '$lib/api/pokemon.api';
type DetailedPokemonMove = Pick<Move, 'name' | 'power' | 'accuracy' | 'damage_class' | 'type'> & {
	version_group_details: PokemonMoveVersion;
};

export async function generate(
	pokemon: Pokemon,
	moves: Move[]
): Promise<Record<string, Record<string, DetailedPokemonMove[]>>> {
	const versionGroups = (await getGenInfo()).version_groups;
	const genMoves = generateGenMoves(versionGroups, pokemon.moves);
	const moveLearnMethods = await getMoveLearnMethods();
	const pokemonMoves = generateMoves(genMoves, moves, moveLearnMethods);
	return pokemonMoves;
}

//TODO: Que reciba como parametro la generacion. Si no hay generacion que por defecto sea la ultima
async function getGenInfo(): Promise<Generation> {
	const generations: NamedApiResourceList<NamedApiResource<Generation>> = await doFetch(
		'generation',
		''
	);
	const gen = generations.results.at(-1)!;
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

function generateMoves(
	genMoves: Record<string, PokemonMove[]>,
	moves: Move[],
	moveLearnMethods: string[]
): Record<string, Record<string, DetailedPokemonMove[]>> {
	const pokemonMoves: Record<string, Record<string, DetailedPokemonMove[]>> = {};
	for (const key in genMoves) {
		const versionGroupMoves = genMoves[key];
		if (versionGroupMoves.length > 0) {
			if (!pokemonMoves[key]) pokemonMoves[key] = {};
			for (const moveLearnMethod of moveLearnMethods) {
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
	return pokemonMoves;
}
