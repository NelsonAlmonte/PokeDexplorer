<script lang="ts">
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';

	let { data } = $props();
</script>

<PokemonList pokemons={data.results} />
