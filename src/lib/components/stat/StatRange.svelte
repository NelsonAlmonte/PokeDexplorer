<script lang="ts">
	import type { PokemonProfile, StatRange } from '$lib/types/pokemon.type';
	import type { CardProps } from '$lib/types/ui.type';
	import StatRangeItem from '$lib/components/stat/StatRangeItem.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	let { statRange, profile }: { statRange: StatRange[]; profile: PokemonProfile } = $props();
	const cardProps: CardProps = {
		title: 'Base stats',
		type: profile.pokemon.types[0]
	};
</script>

<Card {cardProps}>
	<div class="mb-4 grid grid-cols-1 gap-4">
		{#each statRange as statRangeItem, i}
			<StatRangeItem
				{statRangeItem}
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
