<script lang="ts">
	import type { Ability } from 'pokeapi-typescript';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import AbilityItem from '$lib/components/ability/AbilityItem.svelte';
	import { Card, Heading } from 'flowbite-svelte';

	let { abilities, profile }: { abilities: Ability[]; profile: PokemonProfile } = $props();
	const type = profile.pokemon.types[0];
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">Abilities</Heading>
	<div class="absolute inset-0 z-0 h-40 w-full">
		<LightBeam {type} />
	</div>
	<TypeIconBackground {type} />
	<div class="z-10 grid grid-cols-2 gap-4">
		{#each abilities as ability, index}
			<AbilityItem {ability} {type} isHidden={profile.pokemon.abilities[index].is_hidden} />
		{/each}
	</div>
</Card>
