<script lang="ts">
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import { pokemonListState } from '$lib/store/pokemon.svelte';
	import { fetchPokemons } from '$lib/api/pokemon.api.js';
	import { Button } from 'flowbite-svelte';

	let { data } = $props();

	if (!pokemonListState.results.length) pokemonListState.results = data.results;

	async function loadMore() {
		const offset = pokemonListState.results.length;
		const newPokemons = await fetchPokemons(offset);
		pokemonListState.results = [...pokemonListState.results, ...newPokemons.results];
	}
</script>

<PokemonList pokemons={pokemonListState.results} />

<div class="my-10 flex items-center justify-center">
	<Button color="blue" onclick={loadMore}>Load more Pokémons</Button>
</div>
