<script lang="ts">
	import { browser } from '$app/environment';
	import { themeState } from '$lib/store/ui.svelte';
	import { Moon, Sun } from '@lucide/svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!browser) return;

		const html = document.documentElement;
		const isDark = html.classList.contains('dark');
		themeState.theme = isDark ? 'dark' : 'light';

		localStorage.setItem('theme', themeState.theme);
	});

	function toggleTheme() {
		const html = document.documentElement;
		let currentTheme = themeState.theme;

		html.classList.remove('light', 'dark');

		currentTheme = currentTheme === 'light' ? 'dark' : 'light';

		html.classList.add(currentTheme);
		themeState.theme = currentTheme;
		localStorage.setItem('theme', currentTheme);
	}
</script>

<button
	class="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
	onclick={toggleTheme}
>
	{#if themeState.theme === 'dark'}
		<span class="sr-only">Toggle light mode</span>

		<Sun />
	{:else}
		<span class="sr-only">Toggle dark mode</span>
		<Moon />
	{/if}
</button>
