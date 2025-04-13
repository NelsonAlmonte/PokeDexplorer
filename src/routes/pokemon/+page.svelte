<script lang="ts">
	import type { PokemonListResponse } from '$lib/interfaces/pokemon.interface.js';
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import { pokemons } from '$lib/store/pokemon.store.js';
	import { fetchPokemons } from '$lib/api/pokemon.api.js';
	import { Button } from 'flowbite-svelte';

	let { data }: { data: PokemonListResponse } = $props();

	if (!$pokemons.length) pokemons.set(data.results);

	async function loadMore() {
		const offset = $pokemons.length;
		const newPokemons = await fetchPokemons(offset);
		pokemons.update((currentPokemons) => [...currentPokemons, ...newPokemons.results]);
	}
</script>

<PokemonList pokemons={$pokemons} />

<div class="my-10 flex items-center justify-center">
	<Button color="blue" onclick={loadMore}>Load more Pokémons</Button>
</div>
