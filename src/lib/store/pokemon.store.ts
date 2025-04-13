import type { TransformedPokemon } from '$lib/interfaces/pokemon.interface';
import { writable } from 'svelte/store';

export const pokemons = writable<TransformedPokemon[]>([]);
