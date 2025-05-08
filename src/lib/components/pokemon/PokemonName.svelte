<script lang="ts">
	import type { Pokemon } from 'pokeapi-typescript';
	import { typeUIClasses } from '$lib/constants/type/type-ui';
	import { Heading } from 'flowbite-svelte';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { pokemon }: { pokemon: Pokemon } = $props();
	const typeName = pokemon.types[0].type.name as keyof typeof typeUIClasses.text;
	const { text } = getTypeClasses(typeName);
</script>

<span
	class="{text} pointer-events-none absolute start-0 end-0 mt-2 text-center text-4xl font-bold tracking-widest capitalize opacity-20 select-none"
>
	{pokemon.name.replaceAll('-', ' ')}
</span>
<a href="/pokemon/{pokemon.id}">
	<Heading class="relative text-center capitalize" tag="h3">
		{pokemon.name.replaceAll('-', ' ')}
	</Heading>
</a>
