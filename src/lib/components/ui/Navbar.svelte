<script lang="ts">
	import { modalState, navbarState } from '$lib/store/ui.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<div class="container mx-auto max-w-screen-xl px-4 xl:px-0">
	<nav
		class="relative z-10 mt-4 rounded-3xl border-gray-200 bg-gray-50 py-2.5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
	>
		<div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
			<a href="/pokemon" class="flex items-center space-x-3 rtl:space-x-reverse">
				<img src="/images/logo.webp" class="h-10" alt="Logo" />
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
					>PokéDexplorer</span
				>
			</a>
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
			<div
				class="{navbarState.isHidden ? 'hidden' : ''} w-full md:block md:w-auto"
				id="navbar-solid-bg"
			>
				<ul
					class="mt-4 flex flex-col items-center rounded-lg bg-gray-50 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-transparent"
				>
					<li>
						<a
							href="/pokemon"
							class="md:hover:text-fighting-700 md:dark:hover:text-fighting-500 block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>Home</a
						>
					</li>
					<li>
						<button
							class="md:hover:text-fighting-700 md:dark:hover:text-fighting-500 block cursor-pointer rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							onclick={() => (modalState.search.isOpen = true)}>Search</button
						>
					</li>
					<li>
						<ThemeSwitch />
					</li>
				</ul>
			</div>
		</div>
	</nav>
</div>
