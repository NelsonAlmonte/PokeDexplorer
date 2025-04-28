import type { Move, PokemonMoveVersion } from 'pokeapi-typescript';

export type MoveCollection = {
	label: string;
	value: LearnMethodMove[];
};

export type MovesGroup = Record<string, LearnMethodMove[]>;

export type LearnMethodMove = {
	label: string;
	value: DetailedPokemonMove[];
};

export type DetailedPokemonMove = Pick<
	Move,
	'name' | 'power' | 'accuracy' | 'damage_class' | 'type'
> & {
	version_group_details: PokemonMoveVersion;
};
