import type { Move, PokemonMoveVersion } from 'pokeapi-typescript';

export type MoveCollection = {
	label: string;
	learn_methods: LearnMethodMove[];
};

export type MovesGroup = Record<string, LearnMethodMove[]>;

export type LearnMethodMove = {
	label: string;
	moves: DetailedPokemonMove[];
};

export type DetailedPokemonMove = Pick<
	Move,
	'name' | 'power' | 'accuracy' | 'damage_class' | 'type'
> & {
	version_group_details: PokemonMoveVersion;
};
