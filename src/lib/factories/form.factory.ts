import type { PokemonSpeciesUpdated, PokemonUpdated } from '$lib/types/pokemon.type';
import { extractIdFromUrl, getPokemon } from '$lib/api/pokemon.api';

export async function generateForms(
	pokemons: PokemonUpdated[],
	pokemonSpecies: PokemonSpeciesUpdated
): Promise<PokemonUpdated[]> {
	const formsId = pokemonSpecies.varieties.map((variety) => extractIdFromUrl(variety.pokemon.url));
	const forms = await Promise.all(formsId.map(async (id) => await getPokemon(pokemons, id)));

	return forms;
}
