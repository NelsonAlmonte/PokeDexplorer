// import { error } from '@sveltejs/kit';
// import type {
// 	PokemonListItem,
// 	PokemonListResponse,
// 	TransformedPokemon
// } from '$lib/interfaces/pokemon.interface';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async () => {
// 	try {
// 		const pokemons = await fetchPokemons();
// 		return pokemons;
// 	} catch (err) {
// 		console.log(err);
// 		throw error(500, 'Error when loading the pokemon list');
// 	}
// };

// async function fetchPokemons() {
// 	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');

// 	if (!response.ok) {
// 		throw new Error('No se pudo cargar el Pokémon');
// 	}

// 	const data: PokemonListResponse = await response.json();
// 	const transformedPokemons = await Promise.all(data.results.map(transformPokemon));

// 	return {
// 		...data,
// 		results: transformedPokemons
// 	};
// }

// async function transformPokemon(pokemon: PokemonListItem): Promise<TransformedPokemon> {
// 	const id = extractIdFromUrl(pokemon.url);
// 	return {
// 		...pokemon,
// 		id: id,
// 		sprite: getSpriteFromId(id),
// 		types: await getPokemonProperty(id, 'types'),
// 		stats: await getPokemonProperty(id, 'stats')
// 	};
// }

// function extractIdFromUrl(url: string): string {
// 	const segments = url.split('/').filter(Boolean);
// 	return segments[segments.length - 1];
// }

// function getSpriteFromId(id: string): string {
// 	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
// }

// async function getPokemonProperty(id: string, key: string) {
// 	if (getPokemonFromLocalStorage(id)) {
// 		const data = getPokemonFromLocalStorage(id);
// 		return data[key];
// 	} else {
// 		const data = await fetchPokemonData(id);
// 		savePokemonToLocalStorage(id, data);
// 		return data[key];
// 	}
// }

// async function fetchPokemonData(id: string) {
// 	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

// 	if (!response.ok) {
// 		throw new Error('No se pudo cargar el Pokémon');
// 	}

// 	const data = await response.json();

// 	return data;
// }

// function savePokemonToLocalStorage(id, pokemon): void {
// 	localStorage.setItem(id, pokemon);
// }

// function getPokemonFromLocalStorage(id: string) {
// 	return localStorage.getItem(id);
// }
