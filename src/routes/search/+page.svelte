<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import PokemonList from '$lib/components/pokemon/PokemonList.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Loading from '$lib/components/ui/Loading.svelte';
	import { searchPokemon } from '$lib/api/search.api.js';
	import { feedState } from '$lib/store/feed.svelte.js';
	import { emptyAlert, errorAlert, noDataAlert } from '$lib/constants/ui/alert.js';
	import { InfiniteLoader, LoaderState } from 'svelte-infinite';

	let { data } = $props();
	const loaderState = new LoaderState();

	afterNavigate((nav) => {
		if (nav.from?.route.id === '/search') {
			feedState.search = [];
		} else {
			feedState.search = data.results;
		}

		if (feedState.search.length <= 0) feedState.search = data.results;
	});

	async function loadMore() {
		try {
			const offset = feedState.search.length;
			const newPokemons = await searchPokemon(data.params, offset);
			feedState.search = [...feedState.search, ...newPokemons];
			loaderState.loaded();
			if (offset !== 0 && newPokemons.length === 0) loaderState.complete();
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
{#if !feedState.search.length}
	<Alert alertProps={emptyAlert} />
{/if}
