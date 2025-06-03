<script lang="ts">
	import { setContext } from 'svelte';
	import SearchModal from '$lib/components/ui/search/SearchModal.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../app.css';

	let { children, data } = $props();
	setContext('generations', data.generations) as string[];
</script>

<svelte:head>
	<title>PokéDexplorer</title>
</svelte:head>

<Navbar />
<div class="container mx-auto max-w-screen-xl px-4 xl:px-0">
	{@render children()}
</div>
<SearchModal />
