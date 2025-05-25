<script lang="ts">
	import type { AlertProps } from '$lib/types/ui.type.js';
	import { feedState } from '$lib/store/feed.svelte.js';
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Loading from '$lib/components/ui/Loading.svelte';
	import { searchPokemon } from '$lib/api/search.api.js';
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
		content: "You've reached the end",
		subcontent: 'The trail goes cold. No more Pokémon in sight',
		classes: ['bg-gray-800', 'text-white']
	};

	if (!feedState.search.length) {
		feedState.search = data.results;
	}
	// else {
	// 	feedState.search = [];
	// }

	async function loadMore() {
		try {
			const offset = feedState.search.length;
			console.log(offset);
			const newPokemons = await searchPokemon(data.params, offset);
			feedState.search = [...feedState.search, ...newPokemons];
			loaderState.loaded();
			if (newPokemons.length === 0) loaderState.complete();
		} catch (error) {
			loaderState.error();
		}
	}
</script>

<InfiniteLoader {loaderState} triggerLoad={loadMore}>
	<PokemonList pokemons={feedState.search} />

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
