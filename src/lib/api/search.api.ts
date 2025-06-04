import type { PokemonUpdated } from '$lib/types/pokemon.type';
import type { GraphQLWhere, Params, SearchResponse } from '$lib/types/search.type';
import type { PokemonSprites } from 'pokeapi-typescript';
import { error } from '@sveltejs/kit';

export async function searchPokemon(params: Params, offset: number = 0): Promise<PokemonUpdated[]> {
	const where = createWhereResult(params);
	const SEARCH_POKEMON_QUERY = `
		query searchPokemon($where: pokemon_v2_pokemon_bool_exp, $limit: Int = 12, $offset: Int = 0) {
			search_results: pokemon_v2_pokemon(
				where: $where
				order_by: {id: asc}
				limit: $limit
				offset: $offset
			) {
				name
				id
				sprites: pokemon_v2_pokemonsprites {
					sprites
				}
				types: pokemon_v2_pokemontypes {
					type: pokemon_v2_type {
						name
					}
				}
				stats: pokemon_v2_pokemonstats {
					base_stat
					stat: pokemon_v2_stat {
						name
					}
				}
			}
		}
	`;

	try {
		const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			},
			body: JSON.stringify({
				query: SEARCH_POKEMON_QUERY,
				variables: {
					where: where,
					limit: 12,
					offset: offset
				},
				operationName: 'searchPokemon'
			})
		});

		const data: SearchResponse = await response.json();

		return data.data.search_results.map((item) => ({
			...item,
			sprites: (Array.isArray(item.sprites) ? item.sprites[0]?.sprites : null) as PokemonSprites
		}));
	} catch {
		error(500, { message: 'error' });
	}
}

function createWhereResult(params: Params) {
	const where: GraphQLWhere = {};

	if (params.name) where.name = { _like: `%${params.name}%` };
	if (params.types?.length) {
		where.pokemon_v2_pokemontypes = {
			pokemon_v2_type: { name: { _in: params.types.split(',') } }
		};
	}
	if (params.generations?.length) {
		where.pokemon_v2_pokemonspecy = {
			pokemon_v2_generation: { name: { _in: params.generations.split(',') } }
		};
	}

	return where;
}
