import type { Pokemon, PokemonSpecies } from 'pokeapi-typescript';
import type { Stats } from './stat.interface';
import type { Types } from './type.interface';

export type PokemonInfo = {
	pokemon: Pokemon;
	'pokemon-species': PokemonSpecies;
};

export interface PokemonListResponse {
	count: number;
	next: string;
	previous: string;
	results: TransformedPokemon[];
}

export interface PokemonListItem {
	name: string;
	url: string;
}

export interface TransformedPokemon extends PokemonListItem {
	id: string;
	sprite: string;
	types: Types[];
	stats: Stats[];
}
