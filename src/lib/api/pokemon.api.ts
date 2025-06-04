import { error } from '@sveltejs/kit';
import type { PokemonUpdated } from '$lib/types/pokemon.type';
import type { NamedApiResource, NamedApiResourceList } from 'pokeapi-typescript';

type FetchResult<T> = {
	data: T | null;
	err: Error | null;
};
const cache: Record<string, Record<string, unknown>> = {};

export async function fetchPokemons(offset: number): Promise<NamedApiResourceList<PokemonUpdated>> {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`);

	if (!response.ok) throw new Error('Error when retrieving the response');

	const data: NamedApiResourceList<NamedApiResource<PokemonUpdated>> = await response.json();
	const transformedPokemons = await Promise.all(data.results.map(transformPokemon));

	return {
		...data,
		results: transformedPokemons
	};
}

async function transformPokemon(
	pokemon: NamedApiResource<PokemonUpdated>
): Promise<PokemonUpdated> {
	const id = extractIdFromUrl(pokemon.url);
	const { data, err } = await doFetch<PokemonUpdated>('pokemon', id);

	if (err) error(500, { message: 'error' });

	return data!;
}

export function extractIdFromUrl(url: string): string {
	const segments = url.split('/').filter(Boolean);

	return segments[segments.length - 1];
}

export async function doFetch<T = unknown>(
	endpoint: string,
	id: string | number
): Promise<FetchResult<T>> {
	try {
		if (!cache[id]) cache[id] = {};
		if (cache[id][endpoint]) {
			return {
				data: cache[id][endpoint] as T,
				err: null
			};
		}

		const res = await fetch(`https://pokeapi.co/api/v2/${endpoint}/${id}`);
		if (!res.ok) throw new Error('Error when retrieving the response');
		const data = (await res.json()) as T;

		cache[id][endpoint] = data;

		return {
			data: data,
			err: null
		};
	} catch (error) {
		return {
			data: null,
			err: error instanceof Error ? error : new Error('Unknown error')
		};
	}
}

export async function getPokemon(
	pokemonList: PokemonUpdated[],
	lookupValue: number | string,
	lookupKey: string = 'name'
): Promise<PokemonUpdated> {
	const pokemonMap = new Map(
		pokemonList.map((pokemon) => [pokemon[lookupKey as keyof PokemonUpdated], pokemon])
	);
	let pokemon = pokemonMap.get(lookupValue);

	if (!pokemon) {
		const { data, err } = await doFetch<PokemonUpdated>('pokemon', lookupValue);

		if (err) error(500, { message: 'error' });

		pokemon = data!;
		pokemonMap.set(pokemon[lookupKey as keyof PokemonUpdated], pokemon);
	}

	return pokemon;
}
