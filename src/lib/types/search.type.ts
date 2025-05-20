import type { PokemonUpdated } from './pokemon.type';

// export type GraphQLResponse<T> = {
// 	data: T;
// };

export type SearchResponse = {
	data: Search;
};

export type Search = {
	search_results: PokemonUpdated[];
};
