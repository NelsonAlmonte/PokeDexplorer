import { error } from '@sveltejs/kit';
import type { ChainLink, EvolutionChain } from 'pokeapi-typescript';
import type { PokemonSpeciesUpdated, PokemonUpdated } from '$lib/types/pokemon.type';
import type { DetailedChainLink, DetailedEvolutionChain } from '$lib/types/evolution.type';
import { doFetch, extractIdFromUrl, getPokemon } from '$lib/api/pokemon.api';

export async function generateEvolutionChain(
	pokemons: PokemonUpdated[],
	pokemonSpecies: PokemonSpeciesUpdated
): Promise<DetailedEvolutionChain> {
	const evolutionChainId = extractIdFromUrl(pokemonSpecies.evolution_chain.url);
	const { data, err } = await doFetch<EvolutionChain>('evolution-chain', evolutionChainId);

	if (err) error(500, { message: 'error' });

	const EvolutionChain = data!;
	const detailedEvolutionChain = EvolutionChain;
	detailedEvolutionChain.chain = await buildDetailedEvolutionChain(EvolutionChain.chain, pokemons);

	return detailedEvolutionChain as DetailedEvolutionChain;
}

async function buildDetailedEvolutionChain(
	chainLink: ChainLink,
	pokemons: PokemonUpdated[]
): Promise<DetailedChainLink> {
	const id: string = extractIdFromUrl(chainLink.species.url);
	const pokemon: PokemonUpdated = await getPokemon(pokemons, id);

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
