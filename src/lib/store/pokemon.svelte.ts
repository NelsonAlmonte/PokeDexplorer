import type { NamedApiResourceList } from 'pokeapi-typescript';
import type { PokemonUpdated } from '$lib/types/pokemon.type';

export const pokemonListState = $state<NamedApiResourceList<PokemonUpdated>>({
	count: 0,
	next: '',
	previous: '',
	results: []
});
