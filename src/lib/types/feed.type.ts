import type { NamedApiResourceList } from 'pokeapi-typescript';
import type { PokemonUpdated } from './pokemon.type';

export type Feed = {
	pokemon: NamedApiResourceList<PokemonUpdated>;
	search: PokemonUpdated[];
};
