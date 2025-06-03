<script lang="ts">
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Button } from 'flowbite-svelte';

	let { profile }: { profile: PokemonProfile } = $props();
	const { text, bgOpacity, bgHover, bg } = getTypeClasses(profile.pokemon.types[0].type.name);
	const generationsContext = getContext('generations') as string[];
	const startIndex = generationsContext.indexOf(profile.species.generation.name);
	const generations = generationsContext.slice(startIndex);
	const currentGeneration = getContext('generation') as () => string;
	let routeToNavigate = $state('');
	if (!page.url.pathname.includes('moves')) routeToNavigate = `${profile.pokemon.id}/moves/`;
</script>

<div class="my-3 flex flex-wrap justify-center gap-3">
	{#each generations as generation}
		{@const generationNumber = generation.replace('generation-', '')}
		<a data-sveltekit-noscroll href="{routeToNavigate}{generationNumber}">
			<Button
				class={generation == currentGeneration()
					? `${bg} ${bgHover} cursor-pointer rounded-2xl font-bold uppercase focus:ring-0`
					: `${text} ${bgOpacity} ${bgHover} cursor-pointer rounded-2xl font-bold uppercase hover:text-white focus:ring-0`}
				>{generationNumber}</Button
			>
		</a>
	{/each}
</div>
