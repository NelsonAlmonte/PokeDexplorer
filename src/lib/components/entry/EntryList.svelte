<script lang="ts">
	import type { FlavorText, PokemonType } from 'pokeapi-typescript';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import EntryItem from '$lib/components/entry/EntryItem.svelte';
	import { Card, Heading } from 'flowbite-svelte';

	let { entries, type }: { entries: FlavorText[]; type: PokemonType } = $props();
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">Pokédex entries</Heading>
	<div class="absolute inset-0 z-0 h-40 w-full">
		<LightBeam {type} />
	</div>
	<TypeIconBackground {type} />
	<div class="z-10 grid grid-cols-3 gap-4">
		{#each entries as entry}
			<EntryItem {entry} {type} />
		{/each}
	</div>
</Card>
