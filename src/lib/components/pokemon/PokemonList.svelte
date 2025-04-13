<script lang="ts">
	import type { TransformedPokemon } from '$lib/interfaces/pokemon.interface';
	import PokemonItem from '$lib/components/pokemon/PokemonItem.svelte';

	let { pokemons }: { pokemons: TransformedPokemon[] } = $props();
</script>

{#if pokemons}
	<div class="grid grid-cols-2 gap-6 p-4 md:grid-cols-3 lg:grid-cols-4">
		{#each pokemons as pokemon}
			<PokemonItem {pokemon} />
		{/each}
	</div>
{:else}
	<h1 class="text-white">Error when loading the pokemon list</h1>
{/if}
