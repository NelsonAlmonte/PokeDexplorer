<script lang="ts">
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Loading from '$lib/components/ui/Loading.svelte';
	import { fetchPokemons } from '$lib/api/pokemon.api.js';
	import { feedState } from '$lib/store/feed.svelte.js';
	import { alerts } from '$lib/constants/ui/alert.js';
	import { InfiniteLoader, LoaderState } from 'svelte-infinite';

	let { data } = $props();
	const loaderState = new LoaderState();

	if (!feedState.pokemon.results) feedState.pokemon.results = data.results;

	async function loadMore() {
		try {
			const offset = feedState.pokemon.results.length;
			const newPokemons = await fetchPokemons(offset);
			feedState.pokemon.results = [...feedState.pokemon.results, ...newPokemons.results];
			loaderState.loaded();
			if (offset !== 0 && newPokemons.results.length === 0) loaderState.complete();
		} catch (error) {
			loaderState.error();
		}
	}
</script>

<InfiniteLoader {loaderState} triggerLoad={loadMore}>
	<PokemonList pokemons={feedState.pokemon.results} />

	{#snippet error()}
		<Alert alertProps={alerts.error} />
	{/snippet}

	{#snippet noData()}
		<Alert alertProps={alerts.no_data} />
	{/snippet}

	{#snippet loading()}
		<Loading />
	{/snippet}
</InfiniteLoader>
