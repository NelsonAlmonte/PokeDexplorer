export const load = async () => {
	const pokemons = await fetchPokemons();
	return { pokemons };
}

async function fetchPokemons() {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon');

	if (!response.ok) {
		throw new Error('No se pudo cargar el Pokémon');
	}

	const data = await response.json();
	return {
		...data,
		results: data.results.map(transformPokemon)
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformPokemon(pokemon: any) {
	const id = extractIdFromUrl(pokemon.url);
	return {
		...pokemon,
    id: id,
		sprite: getSpriteFromId(id)
	};
}

function extractIdFromUrl(url: string): string {
	const segments = url.split('/').filter(Boolean);
	return segments[segments.length - 1];
}

function getSpriteFromId(id: string): string {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}