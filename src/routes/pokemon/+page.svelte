<script lang="ts">
	import type { NamedApiResourceList } from 'pokeapi-typescript';
	import type { PokemonUpdated } from '$lib/types/pokemon.type';
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import { pokemonListState } from '$lib/store/pokemon.svelte';
	import { fetchPokemons } from '$lib/api/pokemon.api.js';
	import { Button } from 'flowbite-svelte';

	let { data }: { data: NamedApiResourceList<PokemonUpdated> } = $props();

	if (!pokemonListState.results.length) pokemonListState.results = data.results;

	async function loadMore() {
		const offset = pokemonListState.results.length;
		const newPokemons = await fetchPokemons(offset);
		pokemonListState.results = [...pokemonListState.results, ...newPokemons.results];
	}
</script>

<PokemonList pokemons={pokemonListState} />

<div class="my-10 flex items-center justify-center">
	<Button color="blue" onclick={loadMore}>Load more Pokémons</Button>
</div>
