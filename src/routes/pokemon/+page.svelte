<script lang="ts">
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import type { TransformedPokemon } from '$lib/interfaces/pokemon.interface.js';
	let { data } = $props();
	const pokemons: TransformedPokemon[] = data.results;
</script>

<PokemonList data={pokemons} />
