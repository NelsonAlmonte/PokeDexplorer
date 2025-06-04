import type { PageServerLoad } from './$types';
import type { Params } from '$lib/types/search.type';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { searchPokemon } from '$lib/api/search.api';

export const load: PageServerLoad = async ({ url }) => {
	const params: Params = {
		name: url.searchParams.get('name'),
		types: url.searchParams.get('types'),
		generations: url.searchParams.get('generations')
	};
	const results = await searchPokemon(params);
	const metaTags = {
		title: `PokéDexplorer`,
		titleTemplate: 'Search result • %s',
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

	return { results, params, metaTags };
};
