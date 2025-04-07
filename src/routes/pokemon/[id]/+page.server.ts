import type { Pokemon } from "$lib/types/pokemon";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
	const pokemon: Pokemon = await fetchPokemon(params.id);
	return { pokemon };
}

async function fetchPokemon(id: string): Promise<Pokemon> {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

	if (!response.ok) {
		throw new Error('No se pudo cargar el Pokémon');
	}

	const data = await response.json();
	return data;
}
