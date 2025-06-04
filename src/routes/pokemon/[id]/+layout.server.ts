import type { LayoutServerLoad } from './$types';
import type { PokemonProfile, PokemonSpeciesUpdated } from '$lib/types/pokemon.type';
import type { PokemonInformation } from '$lib/types/information.type';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { generatePokemonInfo } from '$lib/factories/information.factory';
import { doFetch, extractIdFromUrl, getPokemon } from '$lib/api/pokemon.api';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params, parent, url }) => {
	const { pokemons } = await parent();
	const id = params.id;
	const profile: PokemonProfile = {
		pokemon: await getPokemon(pokemons, id),
		species: {} as PokemonSpeciesUpdated,
		info: {} as PokemonInformation,
		generations: [] as string[]
	};

	if (!profile.pokemon) error(404, { message: 'empty' });

	const speciesId = extractIdFromUrl(profile.pokemon.species.url);
	const { data, err } = await doFetch<PokemonSpeciesUpdated>('pokemon-species', speciesId);

	if (err) error(500, { message: 'error' });

	profile.species = data!;
	profile.info = generatePokemonInfo(profile);

	const capitalizedPokemonName = `${profile.pokemon.name.charAt(0).toUpperCase()}${profile.pokemon.name.replaceAll('-', ' ').slice(1)}`;
	const metaTags = {
		title: `PokéDexplorer`,
		titleTemplate: `${capitalizedPokemonName} • %s`,
		description: `Discover everything about ${capitalizedPokemonName}, including its abilities, evolutions, stats, and moves.`,
		canonical: new URL(url.pathname, url.origin).href,
		openGraph: {
			type: 'website',
			url: new URL(url.pathname, url.origin).href,
			locale: 'en_EN',
			title: `${capitalizedPokemonName} • PokéDexplorer`,
			description: `Discover everything about ${capitalizedPokemonName}, including its abilities, evolutions, stats, and moves.`,
			siteName: 'PokeDexplorer',
			images: [
				{
					url: profile.pokemon.sprites.other['official-artwork'].front_default,
					alt: `Pokémon image`,
					width: 400,
					height: 400,
					type: 'image/webp'
				}
			]
		},
		twitter: {
			cardType: 'summary_large_image',
			title: `${capitalizedPokemonName} • PokéDexplorer`,
			description: `Discover everything about ${capitalizedPokemonName}, including its abilities, evolutions, stats, and moves.`,
			image: profile.pokemon.sprites.other['official-artwork'].front_default
		}
	} satisfies MetaTagsProps;

	return { profile, id, metaTags };
};
