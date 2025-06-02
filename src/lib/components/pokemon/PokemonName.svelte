<script lang="ts">
	import type { PokemonUpdated } from '$lib/types/pokemon.type';
	import { Heading } from 'flowbite-svelte';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { pokemon }: { pokemon: PokemonUpdated } = $props();
	const { text } = getTypeClasses(pokemon.types[0].type.name);
</script>

<span
	class="{text} pointer-events-none absolute start-0 end-0 mt-2 text-center text-4xl font-bold tracking-widest capitalize opacity-20 select-none"
>
	{pokemon.name.replaceAll('-', ' ')}
</span>
<Heading class="relative text-center capitalize" tag="h3">
	{pokemon.name.replaceAll('-', ' ')}
</Heading>
