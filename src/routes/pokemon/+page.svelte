<script lang="ts">
	import type { NamedApiResourceList, Pokemon } from 'pokeapi-typescript';
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import { pokemons } from '$lib/store/pokemon.store.js';
	import { fetchPokemons } from '$lib/api/pokemon.api.js';
	import { Button } from 'flowbite-svelte';

	let { data }: { data: NamedApiResourceList<Pokemon> } = $props();

	if (!$pokemons.results.length) pokemons.set(data);

	async function loadMore() {
		const offset = $pokemons.results.length;
		const newPokemons = await fetchPokemons(offset);
		pokemons.update((currentPokemons) => {
			const combinedPokemons = {
				count: newPokemons.count,
				next: newPokemons.next,
				previous: newPokemons.previous,
				results: [...currentPokemons.results, ...newPokemons.results]
			};
			return combinedPokemons;
		});
	}
</script>

<PokemonList pokemons={$pokemons} />

<div class="my-10 flex items-center justify-center">
	<Button color="blue" onclick={loadMore}>Load more Pokémons</Button>
</div>
