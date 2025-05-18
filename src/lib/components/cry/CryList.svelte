<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { Cries } from '$lib/types/pokemon.type';
	import type { typeUIClasses } from '$lib/constants/type/type-ui';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Card, Heading } from 'flowbite-svelte';

	let { cries, type }: { cries: Cries; type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { text } = getTypeClasses(typeName);
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">Cries</Heading>
	<div class="absolute inset-0 z-0 h-40 w-full">
		<LightBeam {type} />
	</div>
	<TypeIconBackground {type} />
	<div class="flex justify-center gap-4">
		{#each Object.entries(cries) as [type, cry]}
			{#if cry}
				<div class="flex flex-col items-center">
					<h5 class="{text} mb-4 text-xl font-bold capitalize">{type}</h5>
					<audio controls>
						<source src={cry} type="audio/ogg" />
						<source src={cry} type="audio/mpeg" />
						Your browser does not support the audio element.
					</audio>
				</div>
			{/if}
		{/each}
	</div>
</Card>
