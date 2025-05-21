<script lang="ts">
	import { modalState } from '$lib/store/ui.svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<div class="container mx-auto max-w-screen-xl">
	<Navbar
		class="fixed start-0 top-0 z-50 w-full py-2.5"
		navContainerClass="px-2 md:px-0 max-w-screen-xl"
	>
		<NavBrand href="/pokemon">
			<img
				src="https://flowbite-svelte.com/images/flowbite-svelte-icon-logo.svg"
				class="me-3 h-6 sm:h-9"
				alt="Flowbite Logo"
			/>
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>PokéDexplorer</span
			>
		</NavBrand>
		<div>
			<NavHamburger />
			<NavUl>
				<NavLi class="!text-white" href="/pokemon">Home</NavLi>
				<NavLi class="!text-white" href="/pokemon">Pokémon</NavLi>
				<NavLi
					role="button"
					class="cursor-pointer !text-white"
					onclick={() => (modalState.search.isOpen = true)}>Search</NavLi
				>
			</NavUl>
		</div>
	</Navbar>
</div>
