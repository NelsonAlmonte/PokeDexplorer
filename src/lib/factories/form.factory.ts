import type { Pokemon } from 'pokeapi-typescript';
import type { PokemonSpeciesUpdated } from '$lib/types/pokemon.type';
import { extractIdFromUrl, getPokemon } from '$lib/api/pokemon.api';

export async function generateForms(
	pokemons: Pokemon[],
	pokemonSpecies: PokemonSpeciesUpdated
): Promise<Pokemon[]> {
	const formsId = extractPokemonIds(pokemonSpecies);
	const forms = await Promise.all(formsId.map(async (id) => await getPokemon(pokemons, id)));

	return forms;
}

export function extractPokemonIds(pokemonSpecies: PokemonSpeciesUpdated): string[] {
	const formsId: string[] = pokemonSpecies.varieties.map((variety) =>
		extractIdFromUrl(variety.pokemon.url)
	);
	return formsId;
}
