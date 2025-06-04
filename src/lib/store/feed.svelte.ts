import type { PokemonUpdated } from '$lib/types/pokemon.type';

export const feedState = $state({
	pokemon: [] as PokemonUpdated[],
	search: [] as PokemonUpdated[]
});
