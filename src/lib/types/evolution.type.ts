import type { ChainLink, Item, NamedApiResource, PokemonType } from 'pokeapi-typescript';

export type DetailedEvolutionChain = {
	baby_trigger_item: NamedApiResource<Item>;
	chain: DetailedChainLink;
	id: number;
};

export type DetailedChainLink = ChainLink & {
	evolution_data: EvolutionData;
	evolves_to: DetailedChainLink[];
};

export type EvolutionData = {
	name: string;
	types: PokemonType[];
	sprite: string;
};
