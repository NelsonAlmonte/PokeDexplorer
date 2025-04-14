import type { NamedApiResource, NamedApiResourceList, Pokemon } from 'pokeapi-typescript';

const pokemonCache: Record<string, Pokemon> = {};

export async function fetchPokemons(offset: number): Promise<NamedApiResourceList<Pokemon>> {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`);

	if (!response.ok) throw new Error('No se pudo cargar el Pokémon');

	const data: NamedApiResourceList<NamedApiResource<Pokemon>> = await response.json();
	const transformedPokemons = await Promise.all(data.results.map(transformPokemon));

	return {
		...data,
		results: transformedPokemons
	};
}

async function transformPokemon(pokemon: NamedApiResource<Pokemon>): Promise<Pokemon> {
	const id = extractIdFromUrl(pokemon.url);
	const pokemonData = await fetchPokemonData(id);

	return pokemonData;
}

function extractIdFromUrl(url: string): string {
	const segments = url.split('/').filter(Boolean);
	return segments[segments.length - 1];
}

async function fetchPokemonData(id: string): Promise<Pokemon> {
	if (pokemonCache[id]) return pokemonCache[id];

	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

	if (!response.ok) throw new Error('No se pudo cargar el Pokémon');

	const data = await response.json();
	pokemonCache[id] = data;

	return data;
}
