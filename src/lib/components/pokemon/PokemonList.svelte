<script lang="ts">
	import type { NamedApiResourceList } from 'pokeapi-typescript';
	import type { PokemonUpdated } from '$lib/types/pokemon.type';
	import PokemonItem from '$lib/components/pokemon/PokemonItem.svelte';

	let { pokemons }: { pokemons: NamedApiResourceList<PokemonUpdated> } = $props();
</script>

{#if pokemons.results}
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each pokemons.results as pokemon}
			<PokemonItem {pokemon} />
		{/each}
	</div>
{:else}
	<h1 class="text-white">Error when loading the pokemon list</h1>
{/if}
