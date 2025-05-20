import type { PokemonUpdated } from '$lib/types/pokemon.type';
import type { SearchResponse } from '$lib/types/search.type';
import type { PokemonSprites } from 'pokeapi-typescript';

const SEARCH_POKEMON_QUERY = `
query searchPokemon($search_value: String, $limit: Int = 12, $offset: Int = 0) {
  search_results: pokemon_v2_pokemon(
    where: {name: {_like: $search_value}}
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

export async function searchPokemon(searchValue: string): Promise<PokemonUpdated[]> {
	const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: '*/*'
		},
		body: JSON.stringify({
			query: SEARCH_POKEMON_QUERY,
			variables: {
				search_value: `${searchValue}%`,
				limit: 12,
				offset: 0
			},
			operationName: 'searchPokemon'
		})
	});

	const data: SearchResponse = await response.json();

	return data.data.search_results.map((item) => ({
		...item,
		sprites: (Array.isArray(item.sprites) ? item.sprites[0]?.sprites : null) as PokemonSprites
	}));
}
