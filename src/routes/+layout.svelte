<script lang="ts">
	import Modal from '$lib/components/ui/Modal.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>PokéDexplorer</title>
</svelte:head>

<Navbar />
<div class="container mx-auto mt-20 max-w-screen-xl px-4 xl:px-0">
	{@render children()}
</div>
<Modal />
