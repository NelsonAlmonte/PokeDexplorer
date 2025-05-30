<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { DetailedEvolutionChain } from '$lib/types/evolution.type';
	import type { CardProps } from '$lib/types/ui.type';
	import EvolutionChainBranch from '$lib/components/evolution/EvolutionChainBranch.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	let { evolutionChain, type }: { evolutionChain: DetailedEvolutionChain; type: PokemonType } =
		$props();
	const cardProps: CardProps = {
		title: 'Evolution chain',
		type: type,
		classes: ['overflow-hidden']
	};
</script>

<Card {cardProps}>
	<EvolutionChainBranch chainLink={evolutionChain.chain} {type} />
</Card>
