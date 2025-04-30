<script lang="ts">
	import type { typeUIClasses } from '$lib/constants/type/type-ui';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Button } from 'flowbite-svelte';

	let { profile }: { profile: PokemonProfile } = $props();
	const typeName = profile.pokemon.types[0].type.name as keyof typeof typeUIClasses.text;
	const { bgOpacity, bgHover } = getTypeClasses(typeName);
	const startIndex = profile.generations.indexOf(profile.species.generation.name);
	const generations = profile.generations.slice(startIndex);
</script>

<div class="my-3 flex justify-center gap-3">
	{#each generations as generation}
		{@const generationNumber = generation.replace('generation-', '')}
		<a href={generationNumber}>
			<Button class="{bgOpacity} {bgHover} cursor-pointer rounded-2xl uppercase"
				>{generationNumber}</Button
			>
		</a>
	{/each}
</div>
