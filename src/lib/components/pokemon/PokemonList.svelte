<script lang="ts">
	import type { PokemonUpdated } from '$lib/types/pokemon.type';
	import PokemonItem from '$lib/components/pokemon/PokemonItem.svelte';

	let { pokemons }: { pokemons: PokemonUpdated[] } = $props();
</script>

{#key pokemons}
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each pokemons as pokemon (pokemon.id)}
			<PokemonItem {pokemon} />
		{/each}
	</div>
{/key}
