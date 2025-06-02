<script lang="ts">
	import { browser } from '$app/environment';
	import { themeState } from '$lib/store/ui.svelte';
	import { Moon, Sun } from '@lucide/svelte';
	import { Button } from 'flowbite-svelte';
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
	class="me-2 cursor-pointer text-gray-400 hover:text-gray-900 dark:hover:text-white"
	onclick={toggleTheme}
>
	{#if themeState.theme === 'dark'}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>
