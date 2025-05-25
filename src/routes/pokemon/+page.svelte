<script lang="ts">
	import type { AlertProps } from '$lib/types/ui.type.js';
	import { feedState } from '$lib/store/feed.svelte.js';
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Loading from '$lib/components/ui/Loading.svelte';
	import { fetchPokemons } from '$lib/api/pokemon.api.js';
	import { InfiniteLoader, LoaderState } from 'svelte-infinite';

	let { data } = $props();
	const loaderState = new LoaderState();
	const errorAlert: AlertProps = {
		title: 'Uh oh!',
		content: 'Unable to connect to the regional Pokédex',
		subcontent: 'Please try again later and refresh the page',
		classes: ['bg-gray-800', 'text-white']
	};
	const noDataAlert: AlertProps = {
		title: 'Well...',
		content: "You've reached the end of the list",
		subcontent: "You've reached the end of the list",
		classes: ['bg-gray-800', 'text-white']
	};

	if (!feedState.pokemon.results.length) feedState.pokemon.results = data.results;

	async function loadMore() {
		try {
			const offset = feedState.pokemon.results.length;
			const newPokemons = await fetchPokemons(offset);
			feedState.pokemon.results = [...feedState.pokemon.results, ...newPokemons.results];
			loaderState.loaded();
			if (newPokemons.results.length === 0) loaderState.complete();
		} catch (error) {
			loaderState.error();
		}
	}
</script>

<InfiniteLoader {loaderState} triggerLoad={loadMore}>
	<PokemonList pokemons={feedState.pokemon.results} />

	{#snippet error()}
		<Alert alertProps={errorAlert} />
	{/snippet}

	{#snippet noData()}
		<Alert alertProps={noDataAlert} />
	{/snippet}

	{#snippet loading()}
		<Loading />
	{/snippet}
</InfiniteLoader>
