<script lang="ts">
	import type { TransformedPokemon } from '$lib/interfaces/pokemon.interface';
	import { typeColorClasses } from '$lib/constants/type/typeColorClasses';
	import { Heading } from 'flowbite-svelte';

	let { data } = $props();
	const pokemon: TransformedPokemon = data;
	const typeText = pokemon.types[0].type.name as keyof typeof typeColorClasses.text;
	const typeColorClassText = typeColorClasses.text[typeText];
</script>

<span
	class="pointer-events-none absolute {typeColorClassText} start-0 end-0 top-0 mt-2 text-center text-4xl font-bold tracking-widest capitalize opacity-20 select-none"
>
	{pokemon.name}
</span>
<Heading class="relative text-center capitalize" tag="h3">
	{pokemon.name}
</Heading>
