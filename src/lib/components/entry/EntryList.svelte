<script lang="ts">
	import type { FlavorText, PokemonType } from 'pokeapi-typescript';
	import type { CardProps } from '$lib/types/ui.type';
	import Card from '$lib/components/ui/Card.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { entries, type }: { entries: FlavorText[]; type: PokemonType } = $props();
	const { text, bgOpacity } = getTypeClasses(type.type.name);
	const cardProps: CardProps = {
		title: 'Pokédex entries',
		type: type,
		classes: ['overflow-hidden']
	};
</script>

<Card {cardProps}>
	<div class="z-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each entries as entry}
			<div class="{bgOpacity} rounded-2xl px-4 py-3">
				<div class="mb-4 flex items-baseline gap-2">
					<h5 class="{text} text-xl font-bold capitalize">{entry.version.name}</h5>
				</div>
				<p class={text}>
					{entry.flavor_text}
				</p>
			</div>
		{/each}
	</div>
</Card>
