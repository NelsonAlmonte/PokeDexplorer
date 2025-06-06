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

	function toggleTheme(event: MouseEvent): void {
		if (document.startViewTransition) {
			document.startViewTransition(() => applyTheme(event));
		} else {
			applyTheme(event);
		}
	}

	function applyTheme(event: MouseEvent): void {
		// const html = document.documentElement;
		// let currentTheme = themeState.theme;
		// html.style.viewTransitionName = 'theme-transition';

		// html.classList.remove('light', 'dark');

		// currentTheme = currentTheme === 'light' ? 'dark' : 'light';

		// html.style.setProperty('--theme-button-cord', getCoords(event));
		// html.classList.add(currentTheme);
		// themeState.theme = currentTheme;
		// localStorage.setItem('theme', currentTheme);
		const html = document.documentElement;
		let currentTheme = themeState.theme;

		html.classList.add('theme-transition');
		html.style.viewTransitionName = 'root';

		currentTheme = currentTheme === 'light' ? 'dark' : 'light';
		html.style.setProperty('--theme-button-cord', getCoords(event));
		html.classList.remove('light', 'dark');
		html.classList.add(currentTheme);
		themeState.theme = currentTheme;
		localStorage.setItem('theme', currentTheme);

		setTimeout(() => {
			html.classList.remove('theme-transition');
		}, 500);
	}

	function getCoords(event: MouseEvent): string {
		const x = `${(event.clientX / window.innerWidth) * 100}%`;
		const y = `${(event.clientY / window.innerHeight) * 100}%`;

		return `${x} ${y}`;
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
