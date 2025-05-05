import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';

export const pokemonListState = $state<NamedApiResourceList<Pokemon>>({
	count: 0,
	next: '',
	previous: '',
	results: []
});
