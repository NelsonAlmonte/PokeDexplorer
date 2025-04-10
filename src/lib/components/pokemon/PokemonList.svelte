<script lang="ts">
	import PokemonItem from '$lib/components/pokemon/PokemonItem.svelte';
	import type { TransformedPokemon } from '$lib/interfaces/pokemon.interface';
	let { data } = $props();
	const pokemons: TransformedPokemon[] = data;
</script>

{#if pokemons}
	<div class="mt-40 grid grid-cols-2 gap-6 p-4 md:grid-cols-3 lg:grid-cols-4">
		{#each pokemons as pokemon}
			<PokemonItem data={pokemon} />
		{/each}
	</div>
{:else}
	<h1 class="text-white">Error when loading the pokemon list</h1>
{/if}
