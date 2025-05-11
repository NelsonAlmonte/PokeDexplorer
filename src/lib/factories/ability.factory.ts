import type { Ability, Pokemon } from 'pokeapi-typescript';
import { doFetch, extractIdFromUrl } from '$lib/api/pokemon.api';

export async function generateAbilities(pokemon: Pokemon): Promise<Ability[]> {
	const abilitiesId = pokemon.abilities.map((ability) => extractIdFromUrl(ability.ability.url));
	const abilities: Ability[] = await Promise.all(
		abilitiesId.map(async (id) => await doFetch('ability', id))
	);

	return abilities;
}
