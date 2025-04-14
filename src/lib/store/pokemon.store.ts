import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';
import { writable } from 'svelte/store';

export const pokemons = writable<NamedApiResourceList<Pokemon>>({
	count: 0,
	next: '',
	previous: '',
	results: []
});
