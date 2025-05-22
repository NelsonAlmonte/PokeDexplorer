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
};

export type GraphQLWhere = {
	name?: Record<string, string>;
	pokemon_v2_pokemontypes?: Record<string, Record<string, Record<string, string[]>>>;
};
