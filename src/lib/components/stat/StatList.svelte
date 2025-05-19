<script lang="ts">
	import type { PokemonUpdated } from '$lib/types/pokemon.type';
	import { generateStatItems } from '$lib/factories/stat.factory';
	import InfoItem from '$lib/components/ui/InfoItem.svelte';

	let { pokemon }: { pokemon: PokemonUpdated } = $props();
	const stats = generateStatItems(pokemon.stats);
</script>

<div class="grid grid-cols-2 gap-4">
	{#each stats as stat}
		<InfoItem item={stat} type={pokemon.types[0]} />
	{/each}
</div>
