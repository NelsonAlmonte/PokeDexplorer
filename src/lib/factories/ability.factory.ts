import { error } from '@sveltejs/kit';
import type { Ability } from 'pokeapi-typescript';
import type { PokemonUpdated } from '$lib/types/pokemon.type';
import { doFetch, extractIdFromUrl } from '$lib/api/pokemon.api';

export async function generateAbilities(pokemon: PokemonUpdated): Promise<Ability[]> {
	const abilitiesId = pokemon.abilities.map((ability) => extractIdFromUrl(ability.ability.url));
	const abilities: Ability[] = await Promise.all(
		abilitiesId.map(async (id) => {
			const { data, err } = await doFetch<Ability>('ability', id);

			if (err) error(500, { message: 'error' });

			return data!;
		})
	);

	return abilities;
}
