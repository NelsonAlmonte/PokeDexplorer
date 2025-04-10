<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import type { TransformedPokemon } from '$lib/interfaces/pokemon.interface';
	let { data } = $props();
	const pokemon: TransformedPokemon = data;
</script>

<Card class="mb-40 rounded-3xl">
	<div class="flex items-center justify-center">
		<img class="-mt-40 w-70" src={pokemon.sprite} alt={pokemon.name} />
	</div>
	<div class="relative mb-8">
		<PokemonName data={pokemon} />
	</div>
	<div class="mb-8 flex items-center justify-center gap-6">
		{#each pokemon.types as type}
			<TypeItem data={type} />
		{/each}
	</div>
	<Button href="/pokemon/{pokemon.id}" color="green">View</Button>
</Card>
