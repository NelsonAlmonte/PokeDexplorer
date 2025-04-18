import type { Pokemon, PokemonSpecies } from 'pokeapi-typescript';

export type PokemonProfile = {
	pokemon: Pokemon;
	'pokemon-species': PokemonSpeciesUpdated;
};

export interface PokemonSpeciesUpdated extends PokemonSpecies {
	is_legendary: boolean;
	is_mythical: boolean;
}
