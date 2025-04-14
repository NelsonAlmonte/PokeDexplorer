<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>PokeDexplorer</title>
</svelte:head>

<div class="container mx-auto mt-5 max-w-screen-xl">
	<div class="px-4">
		<Navbar class="rounded-3xl" rounded color="dark">
			<NavBrand href="/">
				<img
					src="https://flowbite-svelte.com/images/flowbite-svelte-icon-logo.svg"
					class="me-3 h-6 sm:h-9"
					alt="Flowbite Logo"
				/>
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
					>PokeDexplorer</span
				>
			</NavBrand>
			<NavHamburger />
			<NavUl>
				<NavLi href="/">Home</NavLi>
				<NavLi href="/pokemon">Pokemon</NavLi>
				<NavLi href="/docs/components/navbar">Navbar</NavLi>
				<NavLi href="/pricing">Pricing</NavLi>
				<NavLi href="/contact">Contact</NavLi>
			</NavUl>
		</Navbar>
	</div>
	<div class="p-4">
		{@render children()}
	</div>
</div>
