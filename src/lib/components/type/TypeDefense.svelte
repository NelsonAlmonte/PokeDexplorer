<script lang="ts">
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import { Card, Heading } from 'flowbite-svelte';
	import TypeItem from './TypeItem.svelte';

	let { profile }: { profile: PokemonProfile } = $props();
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">Type defenses</Heading>
	<div class="absolute inset-0 h-40 w-full">
		<LightBeam type={profile.pokemon.types[0]} />
	</div>
	<TypeIconBackground type={profile.pokemon.types[0]} />
	{#each profile.type_defenses as typeDefense}
		{#if typeDefense.value.length > 0}
			<Heading class="z-20 my-3 text-center capitalize" tag="h5">{typeDefense.label}</Heading>
			<div class="flex flex-wrap gap-4">
				{#each typeDefense.value as item}
					<TypeItem type={item.type} value={item.value} />
				{/each}
			</div>
		{/if}
	{/each}
</Card>
