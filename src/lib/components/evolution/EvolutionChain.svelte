<script lang="ts">
	import type { DetailedEvolutionChain } from '$lib/types/evolution.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import EvolutionChainBranch from '$lib/components/evolution/EvolutionChainBranch.svelte';
	import { Card, Heading } from 'flowbite-svelte';

	let {
		evolutionChain,
		profile
	}: { evolutionChain: DetailedEvolutionChain; profile: PokemonProfile } = $props();
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">Evolution chain</Heading>
	<div class="absolute inset-0 h-40 w-full">
		<LightBeam type={profile.pokemon.types[0]} />
	</div>
	<TypeIconBackground type={profile.pokemon.types[0]} />
	<EvolutionChainBranch chainLink={evolutionChain.chain} {profile} />
</Card>
