import type { PokemonUpdated } from './pokemon.type';

export type SearchResponse = {
	data: Search;
};

export type Search = {
	search_results: PokemonUpdated[];
};

export type Params = {
	name: string | null;
	types: string | null;
	generations: string | null;
};

export type GraphQLWhere = {
	name?: {
		_like?: string;
	};
	pokemon_v2_pokemontypes?: {
		pokemon_v2_type?: {
			name?: {
				_in?: string[];
			};
		};
	};
	pokemon_v2_pokemonspecy?: {
		pokemon_v2_generation?: {
			name?: {
				_in?: string[];
			};
		};
	};
};
