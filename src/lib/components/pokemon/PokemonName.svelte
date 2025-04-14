<script lang="ts">
	import type { Pokemon } from 'pokeapi-typescript';
	import { typeColorClasses } from '$lib/constants/type/typeColorClasses';
	import { Heading } from 'flowbite-svelte';

	let { pokemon }: { pokemon: Pokemon } = $props();
	const typeText = pokemon.types[0].type.name as keyof typeof typeColorClasses.text;
	const typeColorClassText = typeColorClasses.text[typeText];
</script>

<span
	class="pointer-events-none absolute {typeColorClassText} start-0 end-0 mt-2 text-center text-4xl font-bold tracking-widest capitalize opacity-20 select-none"
>
	{pokemon.name}
</span>
<a href="/pokemon/{pokemon.id}">
	<Heading class="relative text-center capitalize" tag="h3">
		{pokemon.name}
	</Heading>
</a>
