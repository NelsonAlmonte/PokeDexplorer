<script lang="ts">
	import type { TransformedPokemon } from '$lib/interfaces/pokemon.interface';
	import { Card, Button } from 'flowbite-svelte';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import LightBeam from '$lib/components/pokemon/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	let { data } = $props();
	const pokemon: TransformedPokemon = data;
</script>

<Card class="relative mb-40 rounded-3xl">
	<LightBeam data={pokemon.types[0]} />
	<TypeIconBackground data={pokemon.types[0]} />
	<div class="z-20">
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
		<!-- <Button href="/pokemon/{pokemon.id}" color="green">View</Button> -->
	</div>
</Card>
