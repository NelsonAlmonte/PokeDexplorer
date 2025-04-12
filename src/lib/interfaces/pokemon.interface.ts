import type { Stats } from './stat.interface';
import type { Types } from './type.interface';

export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
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
