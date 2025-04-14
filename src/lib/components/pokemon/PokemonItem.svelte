<script lang="ts">
	import type { Pokemon } from 'pokeapi-typescript';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import LightBeam from '$lib/components/pokemon/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import StatItem from '$lib/components/stat/StatItem.svelte';
	import { Card } from 'flowbite-svelte';

	let { pokemon }: { pokemon: Pokemon } = $props();
</script>

<a href="/pokemon/{pokemon.id}">
	<Card class="relative mt-40 rounded-3xl" size="none">
		<LightBeam data={pokemon.types[0]} />
		<TypeIconBackground data={pokemon.types[0]} />
		<div class="z-20">
			<div class="flex items-center justify-center">
				<img
					class="-mt-40 w-70"
					src={pokemon.sprites.other['official-artwork'].front_default}
					alt={pokemon.name}
				/>
			</div>
			<div class="relative mb-8">
				<PokemonName data={pokemon} />
			</div>
			<div class="mb-8 flex items-center justify-center gap-6">
				{#each pokemon.types as type}
					<TypeItem data={type} />
				{/each}
			</div>
			<div class="grid grid-cols-2 gap-4">
				{#each pokemon.stats as stat}
					<StatItem data={stat} type={pokemon.types[0]} />
				{/each}
			</div>
		</div>
	</Card>
</a>
