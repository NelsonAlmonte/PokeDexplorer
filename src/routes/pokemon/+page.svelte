<script lang="ts">
	import type { AlertProps } from '$lib/types/ui.type.js';
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Loading from '$lib/components/ui/Loading.svelte';
	import { fetchPokemons } from '$lib/api/pokemon.api.js';
	import { InfiniteLoader, LoaderState } from 'svelte-infinite';

	let { data } = $props();
	let results = $derived(data.results);
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

	async function loadMore() {
		try {
			const offset = results.length;
			const newPokemons = await fetchPokemons(offset);
			results = [...results, ...newPokemons.results];
			loaderState.loaded();
			if (newPokemons.results.length === 0) loaderState.complete();
		} catch (error) {
			loaderState.error();
		}
	}
</script>

<InfiniteLoader {loaderState} triggerLoad={loadMore}>
	<PokemonList pokemons={results} />

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
