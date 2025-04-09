<script lang="ts">
	let { children } = $props();
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	import '../app.css';
</script>

<svelte:head>
	<title>PokeDexplorer</title>
</svelte:head>

<div class="m-5">
	<Navbar class="rounded-3xl" rounded color="form">
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
<div class="m-5">
	{@render children()}
</div>
