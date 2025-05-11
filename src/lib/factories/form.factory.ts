import type { Pokemon } from 'pokeapi-typescript';
import type { PokemonSpeciesUpdated } from '$lib/types/pokemon.type';
import { extractIdFromUrl, getPokemon } from '$lib/api/pokemon.api';

export async function generateForms(
	pokemons: Pokemon[],
	pokemonSpecies: PokemonSpeciesUpdated
): Promise<Pokemon[]> {
	const formsId = pokemonSpecies.varieties.map((variety) => extractIdFromUrl(variety.pokemon.url));
	const forms = await Promise.all(formsId.map(async (id) => await getPokemon(pokemons, id)));

	return forms;
}
