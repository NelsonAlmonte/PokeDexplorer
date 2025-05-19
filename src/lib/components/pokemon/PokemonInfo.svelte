<script lang="ts">
	import type { InfoSection } from '$lib/types/information.type';
	import type { PokemonType } from 'pokeapi-typescript';
	import type { CardProps } from '$lib/types/ui.type';
	import InfoItem from '$lib/components/ui/InfoItem.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	let { info, type }: { info: InfoSection; type: PokemonType } = $props();
	const cardProps: CardProps = {
		title: info.label,
		type: type
	};
</script>

<Card {cardProps}>
	<div class="z-20 grid grid-cols-2 gap-4">
		{#each info.data as infoItem}
			<InfoItem item={infoItem} {type} />
		{/each}
	</div>
</Card>
