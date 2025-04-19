<script lang="ts">
	import type { InfoSection } from '$lib/types/information.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import StatRangeItem from '$lib/components/stat/StatRangeItem.svelte';
	import { Card, Heading } from 'flowbite-svelte';

	let { info, profile }: { info: InfoSection; profile: PokemonProfile } = $props();
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">{info.label}</Heading>
	<div class="absolute inset-0 h-40 w-full">
		<LightBeam type={profile.pokemon.types[0]} />
	</div>
	<TypeIconBackground type={profile.pokemon.types[0]} />
	<div class="mb-4 grid grid-cols-1 gap-4">
		{#each info.data as infoItem, i}
			<StatRangeItem
				item={infoItem}
				stat={profile.pokemon.stats[i]}
				type={profile.pokemon.types[0]}
			/>
		{/each}
	</div>
	<small class="text-gray-400"
		>The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a
		beneficial nature, 252 EVs, 31 IVs; minimum values are based on a hindering nature, 0 EVs, 0
		IVs.</small
	>
</Card>
