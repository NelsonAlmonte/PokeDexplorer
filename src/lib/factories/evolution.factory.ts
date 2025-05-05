import type { ChainLink, EvolutionChain, Pokemon } from 'pokeapi-typescript';
import type { PokemonSpeciesUpdated } from '$lib/types/pokemon.type';
import type { DetailedChainLink, DetailedEvolutionChain } from '$lib/types/evolution.type';
import { doFetch, extractIdFromUrl, getPokemon } from '$lib/api/pokemon.api';

export async function generateEvolutionChain(
	pokemons: Pokemon[],
	pokemonSpecies: PokemonSpeciesUpdated
): Promise<DetailedEvolutionChain> {
	const evolutionChainId = extractIdFromUrl(pokemonSpecies.evolution_chain.url);
	const evolutionChain: EvolutionChain = await doFetch('evolution-chain', evolutionChainId);
	const detailedEvolutionChain = evolutionChain;
	detailedEvolutionChain.chain = await buildDetailedEvolutionChain(evolutionChain.chain, pokemons);
	return detailedEvolutionChain as DetailedEvolutionChain;
}

async function buildDetailedEvolutionChain(
	chainLink: ChainLink,
	pokemons: Pokemon[]
): Promise<DetailedChainLink> {
	const pokemon: Pokemon = await getPokemon(pokemons, chainLink.species.name, 'name');

	const detailedChainLink: DetailedChainLink = {
		...chainLink,
		evolution_data: {
			name: pokemon.name,
			types: pokemon.types,
			sprite: pokemon.sprites.other['official-artwork'].front_default
		},
		evolves_to: await Promise.all(
			chainLink.evolves_to.map(async (child) => await buildDetailedEvolutionChain(child, pokemons))
		)
	};

	return detailedChainLink;
}
