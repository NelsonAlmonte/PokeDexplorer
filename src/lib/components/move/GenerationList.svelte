<script lang="ts">
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import { getContext } from 'svelte';
	import { page } from '$app/state';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Button } from 'flowbite-svelte';

	let { profile }: { profile: PokemonProfile } = $props();
	const { bgOpacity, bgHover, bg } = getTypeClasses(profile.pokemon.types[0].type.name);
	const startIndex = profile.generations.indexOf(profile.species.generation.name);
	const generations = profile.generations.slice(startIndex);
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
					: `${bgOpacity} ${bgHover} cursor-pointer rounded-2xl font-bold uppercase focus:ring-0`}
				>{generationNumber}</Button
			>
		</a>
	{/each}
</div>
