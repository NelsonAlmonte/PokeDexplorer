<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { DetailedChainLink } from '$lib/types/evolution.type';
	import EvolutionChainItem from '$lib/components/evolution/EvolutionChainItem.svelte';
	import EvolutionChainBranch from '$lib/components/evolution/EvolutionChainBranch.svelte';
	import EvolutionDetail from '$lib/components/evolution/EvolutionDetail.svelte';

	let { chainLink, type }: { chainLink: DetailedChainLink; type: PokemonType } = $props();
</script>

<div class="flex items-center justify-center gap-10">
	{#if chainLink.evolution_details.length > 0}
		<div class="flex flex-col">
			{#each chainLink.evolution_details as detail}
				<EvolutionDetail {detail} {type} />
			{/each}
		</div>
	{/if}
	<EvolutionChainItem {chainLink} />
	{#if chainLink.evolves_to.length > 0}
		<div class="flex flex-col gap-4">
			{#each chainLink.evolves_to as child}
				<EvolutionChainBranch chainLink={child} {type} />
			{/each}
		</div>
	{/if}
</div>
