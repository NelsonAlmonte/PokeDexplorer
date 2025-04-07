<script lang="ts">
	let { children } = $props();
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	import '../app.css';
</script>

<svelte:head>
  <title>PokeDexplorer</title>
</svelte:head>

<div class="m-5">
<Navbar class="rounded-xl" rounded color="form">
  <NavBrand href="/">
    <img src="https://flowbite-svelte.com/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">PokeDexplorer</span>
  </NavBrand>
  <NavHamburger />
  <NavUl>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/docs/components/navbar">Navbar</NavLi>
    <NavLi href="/pricing">Pricing</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>
</Navbar>
  {@render children()}
</div>
