<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>PokeDexplorer</title>
</svelte:head>

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
				>PokeDexplorer</span
			>
		</NavBrand>
		<div>
			<NavHamburger />
			<NavUl>
				<NavLi class="!text-white" href="/pokemon">Home</NavLi>
				<NavLi class="!text-white" href="/pokemon">Pokemon</NavLi>
				<NavLi class="!text-white" href="/docs/components/navbar">Navbar</NavLi>
				<NavLi class="!text-white" href="/pricing">Pricing</NavLi>
				<NavLi class="!text-white" href="/contact">Contact</NavLi>
			</NavUl>
		</div>
	</Navbar>
</div>
<div class="container mx-auto mt-20 max-w-screen-xl px-4 xl:px-0">
	{@render children()}
</div>
