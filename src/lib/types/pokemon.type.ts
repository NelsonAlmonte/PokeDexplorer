import type { Pokemon, PokemonSpecies } from 'pokeapi-typescript';
import type { IconKey, PokemonInformation } from '$lib/types/information.type';

export type PokemonProfile = {
	pokemon: PokemonUpdated;
	species: PokemonSpeciesUpdated;
	info: PokemonInformation;
	generations: string[];
};

export interface PokemonUpdated extends Pokemon {
	cries: Cries;
}

export interface PokemonSpeciesUpdated extends PokemonSpecies {
	is_legendary: boolean;
	is_mythical: boolean;
}

export type DamageRelation = {
	type: string;
	value: number;
};

export type TypeDefense = {
	label: string;
	value: DamageRelation[];
};

export type StatRange = {
	label: string;
	value: {
		min: number;
		max: number;
	};
	icon: IconKey;
};

export type Cries = {
	lates: string;
	legacy: string | null;
};
