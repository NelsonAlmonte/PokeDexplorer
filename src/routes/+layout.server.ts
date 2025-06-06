import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { Generation, NamedApiResource, NamedApiResourceList } from 'pokeapi-typescript';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { doFetch, fetchPokemons } from '$lib/api/pokemon.api';

export const load: LayoutServerLoad = async ({ url }) => {
	try {
		const pokemons = await fetchPokemons(0);
		const { data } = await doFetch<NamedApiResourceList<NamedApiResource<Generation>>>(
			'generation',
			''
		);

		if (!data) error(500, { message: 'error' });

		const generations = data.results.map((generation) => generation.name);
		const metaTags = {
			title: `PokéDexplorer`,
			description: `Explore and search Pokémon with detailed information including abilities, evolutions, forms, stats, moves, type matchups, sprites, and sounds.`,
			canonical: new URL(url.pathname, url.origin).href,
			openGraph: {
				type: 'website',
				url: new URL(url.pathname, url.origin).href,
				locale: 'en_EN',
				title: `PokéDexplorer`,
				description: `Learn everything about your favorite Pokémon — their moves, forms, evolutions, stats, and more — all in one place.`,
				siteName: 'PokeDexplorer',
				images: [
					{
						url: '/images/logo.webp',
						alt: `PokéDexplorer logo`,
						width: 200,
						height: 200,
						type: 'image/webp'
					}
				]
			},
			twitter: {
				cardType: 'summary_large_image',
				title: `PokeDexplorer`,
				description: `Learn everything about your favorite Pokémon — their moves, forms, evolutions, stats, and more — all in one place.`,
				image: '/images/logo.webp'
			}
		} satisfies MetaTagsProps;

		return { pokemons, generations, metaTags };
	} catch {
		error(500, { message: 'error' });
	}
};
