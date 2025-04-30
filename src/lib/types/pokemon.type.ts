import type { Pokemon, PokemonSpecies } from 'pokeapi-typescript';
import type { PokemonInformation } from '$lib/types/information.type';

export type PokemonProfile = {
	pokemon: Pokemon;
	species: PokemonSpeciesUpdated;
	info: PokemonInformation;
	type_defenses: TypeDefense[];
	generations: string[];
};

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
