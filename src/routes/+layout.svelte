<script lang="ts">
	import { setContext } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { navbarState } from '$lib/store/ui.svelte';
	import SearchModal from '$lib/components/ui/search/SearchModal.svelte';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import '../app.css';

	let { children, data } = $props();

	setContext('generations', data.generations) as string[];

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		navbarState.isHidden = true;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Navbar />
<div class="container mx-auto mt-25 max-w-screen-xl">
	{@render children()}
</div>
<SearchModal />

<style>
	html:not(.theme-transition)::view-transition-old(root) {
		animation: fade-out 300ms ease;
	}

	html:not(.theme-transition)::view-transition-new(root) {
		animation: fade-in 300ms ease;
	}

	@keyframes fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
