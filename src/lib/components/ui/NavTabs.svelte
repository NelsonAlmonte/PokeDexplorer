<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import type { NavTabProps } from '$lib/types/ui.type';
	import type { typeUIClasses } from '$lib/constants/ui/type';
	import { page } from '$app/state';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { icons } from '$lib/constants/ui/icons';
	import { Button } from 'flowbite-svelte';

	let { profile, type }: { profile: PokemonProfile; type: PokemonType } = $props();
	const generationNumber = profile.generations.at(-1)!.replace('generation-', '');
	const navTabs: NavTabProps[] = [
		{
			title: 'information',
			base_url: `/pokemon/${profile.pokemon.name}`,
			route: ``,
			icon: 'Book'
		},
		{
			title: 'battle',
			base_url: `/pokemon/${profile.pokemon.name}`,
			route: `/battle`,
			icon: 'Sword'
		},
		{
			title: 'growth',
			base_url: `/pokemon/${profile.pokemon.name}`,
			route: `/growth`,
			icon: 'Sprout'
		},
		{
			title: 'moves',
			base_url: `/pokemon/${profile.pokemon.name}`,
			route: `/moves/${generationNumber}`,
			icon: 'Flame'
		},
		{
			title: 'extra',
			base_url: `/pokemon/${profile.pokemon.name}`,
			route: `/extra`,
			icon: 'Puzzle'
		}
	];
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { bg, bgOpacity, bgHover } = getTypeClasses(typeName);

	function isActive(route: string, baseUrl: string): boolean {
		if (route === 'information') return page.url.pathname === baseUrl;
		return page.url.pathname.includes(route);
	}
</script>

{#each navTabs as navTabProp}
	<a
		data-sveltekit-replacestate
		data-sveltekit-noscroll
		href={navTabProp.base_url + navTabProp.route}
	>
		<Button
			class={isActive(navTabProp.title, navTabProp.base_url)
				? `${bg} ${bgHover} cursor-pointer rounded-2xl text-lg font-bold capitalize focus:ring-0`
				: `${bgOpacity} ${bgHover} cursor-pointer rounded-2xl text-lg font-bold capitalize focus:ring-0`}
		>
			{#if navTabProp.icon}
				{@const Icon = icons[navTabProp.icon]}
				<Icon class="me-2" size="20" />
			{/if}
			<span>{navTabProp.title}</span>
		</Button>
	</a>
{/each}
