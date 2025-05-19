<script lang="ts">
	import type { FlavorText, PokemonType } from 'pokeapi-typescript';
	import type { CardProps } from '$lib/types/ui.type';
	import EntryItem from '$lib/components/entry/EntryItem.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	let { entries, type }: { entries: FlavorText[]; type: PokemonType } = $props();
	const cardProps: CardProps = {
		title: 'Pokédex entries',
		type: type
	};
</script>

<Card {cardProps}>
	<div class="z-10 grid grid-cols-3 gap-4">
		{#each entries as entry}
			<EntryItem {entry} {type} />
		{/each}
	</div>
</Card>
