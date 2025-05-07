<script lang="ts">
	import type { DetailedChainLink } from '$lib/types/evolution.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import EvolutionChainItem from '$lib/components/evolution/EvolutionChainItem.svelte';
	import EvolutionChainBranch from '$lib/components/evolution/EvolutionChainBranch.svelte';
	import EvolutionDetail from '$lib/components/evolution/EvolutionDetail.svelte';

	let { chainLink, profile }: { chainLink: DetailedChainLink; profile: PokemonProfile } = $props();
</script>

<div class="flex items-center justify-center gap-10">
	{#if chainLink.evolution_details.length > 0}
		<div class="flex flex-col">
			{#each chainLink.evolution_details as detail}
				<EvolutionDetail {detail} {profile} />
			{/each}
		</div>
	{/if}
	<EvolutionChainItem {chainLink} {profile} />
	{#if chainLink.evolves_to.length > 0}
		<div class="flex flex-col gap-4">
			{#each chainLink.evolves_to as child}
				<EvolutionChainBranch chainLink={child} {profile} />
			{/each}
		</div>
	{/if}
</div>
