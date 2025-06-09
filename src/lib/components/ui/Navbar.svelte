<script lang="ts">
	import { modalState, navbarState } from '$lib/store/ui.svelte';
	import ThemeSwitch from '$lib/components/ui/ThemeSwitch.svelte';
	import { ArrowLeft } from '@lucide/svelte';
	import { page } from '$app/state';

	let isRootRoute = $derived(page.url.pathname === '/');
	let isSearchRoute = $derived(page.url.pathname.includes('search'));
</script>

<nav
	class="fixed start-1/2 top-0 z-50 mt-4 w-[calc(100%-2rem)] max-w-screen-xl -translate-x-1/2 rounded-3xl border-gray-200 bg-white py-2.5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
>
	<div class="flex flex-wrap items-center justify-between p-4">
		<div class="flex items-center space-x-3 rtl:space-x-reverse">
			{#if !isRootRoute && !isSearchRoute}
				<button
					class="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
					onclick={() => history.back()}
				>
					<ArrowLeft size="20" />
					<span class="sr-only">Back button</span>
				</button>
			{/if}
			<a
				class="main-nav-text flex items-center space-x-3 rtl:space-x-reverse"
				href="/"
				data-sveltekit-noscroll
			>
				<img src="/images/logo.webp" class="h-10" alt="Logo" />
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
					>PokéDexplorer</span
				>
			</a>
		</div>
		<div class="flex">
			<div class="md:hidden">
				<ThemeSwitch />
			</div>
			<button
				data-collapse-toggle="navbar-solid-bg"
				type="button"
				class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-solid-bg"
				aria-expanded="false"
				onclick={() => (navbarState.isHidden = !navbarState.isHidden)}
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-5 w-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
		</div>
		<div
			class="{navbarState.isHidden ? 'hidden' : ''} w-full md:block md:w-auto"
			id="navbar-solid-bg"
		>
			<ul
				class="mt-4 flex flex-col gap-4 rounded-lg bg-gray-50 p-2 font-medium md:mt-0 md:flex-row md:items-center md:gap-0 md:border-0 md:bg-transparent md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-700 md:dark:bg-transparent"
			>
				<li class="md:h-5">
					<a
						href="/"
						class="md:hover:text-fighting-700 md:dark:hover:text-fighting-500 block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:me-4 md:border-0 md:p-0 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						data-sveltekit-noscroll>Home</a
					>
				</li>
				<li class="md:h-5">
					<button
						class="md:hover:text-fighting-700 md:dark:hover:text-fighting-500 block cursor-pointer rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:me-1 md:border-0 md:p-0 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						onclick={() => (modalState.search.isOpen = true)}>Search</button
					>
				</li>
				<li class="hidden md:block">
					<ThemeSwitch />
				</li>
			</ul>
		</div>
	</div>
</nav>

<style>
	nav {
		view-transition-name: nav;
	}

	.main-nav-text {
		view-transition-name: main-nav-text;
		width: fit-content;
	}
</style>
