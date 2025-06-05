<script lang="ts">
	import type { PokemonUpdated } from '$lib/types/pokemon.type';
	import type { PokemonType } from 'pokeapi-typescript';
	import type { CardProps } from '$lib/types/ui.type';
	import Card from '$lib/components/ui/Card.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { SquareArrowOutUpRight } from '@lucide/svelte';

	type LinkSection = {
		label: string;
		data: LinkInfo[];
	};

	type LinkInfo = {
		name: string;
		image: string;
		url: string;
	};

	let { pokemon, type }: { pokemon: PokemonUpdated; type: PokemonType } = $props();
	const { text, bgOpacity, bgHover } = getTypeClasses(type.type.name);
	const cardProps: CardProps = {
		title: 'External links',
		type: type,
		classes: ['overflow-hidden']
	};
	const pokemonName = pokemon.name.split('-')[0];
	const links: LinkSection[] = [
		{
			label: 'Pokédex',
			data: [
				{
					name: 'Pokemondb',
					image: '/images/links/pokemondb.webp',
					url: `https://pokemondb.net/pokedex/${pokemonName}`
				},
				{
					name: 'Bulbapedia',
					image: '/images/links/bulbapedia.webp',
					url: `https://bulbapedia.bulbagarden.net/wiki/${pokemonName}`
				},
				{
					name: 'Serebii',
					image: '/images/links/serebii.webp',
					url: `https://www.serebii.net/pokedex-sv/${pokemonName}`
				},
				{
					name: 'Wikidex',
					image: '/images/links/wikidex.webp',
					url: `https://www.wikidex.net/wiki/${pokemonName}`
				}
			]
		},
		{
			label: 'Cards',
			data: [
				{
					name: 'DexDecks',
					image: '/images/links/dexdecks.webp',
					url: `https://dexdecks.netlify.app/search?q=name:${pokemonName}*`
				},
				{
					name: 'PokemonCard',
					image: '/images/links/pokemoncard.webp',
					url: `https://pokemoncard.io/card-database/?n=${pokemonName}&desc=${pokemonName}`
				},
				{
					name: 'Pkmncards',
					image: '/images/links/pkmncards.webp',
					url: `https://pkmncards.com/pokemon/${pokemonName}/`
				},
				{
					name: 'Pokémon TCG',
					image: '/images/links/pokemon.webp',
					url: `https://www.pokemon.com/us/pokemon-tcg/pokemon-cards?cardName=${pokemonName}`
				}
			]
		}
	];
</script>

<Card {cardProps}>
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
		{#each links as link}
			<div>
				<h4 class="{text} mb-4 flex justify-center text-xl font-bold">{link.label}</h4>
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{#each link.data as item}
						<div class="{bgOpacity} z-50 flex items-center justify-between rounded-2xl p-4">
							<div class="flex items-center gap-4">
								<img class="h-8 w-8" src={item.image} alt={item.name} />
								<a href={item.url} class="{text} font-bold hover:underline" target="_blank"
									>{item.name}</a
								>
							</div>
							<a
								href={item.url}
								class="{text} {bgHover} cursor-pointer rounded-lg p-2.5 hover:text-white focus:outline-none"
								target="_blank"
							>
								<SquareArrowOutUpRight size="20" />
							</a>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</Card>
