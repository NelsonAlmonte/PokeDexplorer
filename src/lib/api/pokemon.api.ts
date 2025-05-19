import type { PokemonUpdated } from '$lib/types/pokemon.type';
import type { NamedApiResource, NamedApiResourceList } from 'pokeapi-typescript';

const pokemonCache: Record<string, PokemonUpdated> = {};

export async function fetchPokemons(offset: number): Promise<NamedApiResourceList<PokemonUpdated>> {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`);

	if (!response.ok) throw new Error('No se pudo cargar el Pokémon');

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
	const pokemonData = await fetchPokemonData(id);

	return pokemonData;
}

export function extractIdFromUrl(url: string): string {
	const segments = url.split('/').filter(Boolean);

	return segments[segments.length - 1];
}

async function fetchPokemonData(id: string): Promise<PokemonUpdated> {
	if (pokemonCache[id]) return pokemonCache[id];

	const data = await doFetch('pokemon', id);
	pokemonCache[id] = data;

	return data;
}

export async function doFetch(endpoint: string, id: string | number) {
	const res = await fetch(`https://pokeapi.co/api/v2/${endpoint}/${id}`);
	if (!res.ok) throw new Error('Error when retrieving the response');
	const data = await res.json();

	return data;
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
		const data = await doFetch('pokemon', lookupValue);
		pokemon = data as PokemonUpdated;
		pokemonMap.set(pokemon[lookupKey as keyof PokemonUpdated], pokemon);
	}

	return pokemon;
}
