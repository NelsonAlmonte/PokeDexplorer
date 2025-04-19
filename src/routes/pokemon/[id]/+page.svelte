<script lang="ts">
	import type { PageProps } from './$types';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import PokemonInfo from '$lib/components/pokemon/PokemonInfo.svelte';
	import StatRange from '$lib/components/stat/StatRange.svelte';
	import { generatePokemonInfo } from '$lib/factories/information.factory';
	import { Card, Heading } from 'flowbite-svelte';

	let { data }: PageProps = $props();
	console.log(data);
	const pokemon = data.profile.pokemon;
	const pokemonSpecies = data.profile['pokemon-species'];
	const profile = data.profile;

	const info = generatePokemonInfo(profile);
</script>

<LightBeam type={pokemon.types[0]} />
<div class="absolute start-0 top-50 z-0 h-170 w-full">
	<TypeIconBackground type={pokemon.types[0]} />
</div>
<div class="absolute top-40 right-0 z-0 h-70 w-full scale-x-[-1]">
	<TypeIconBackground type={pokemon.types[0]} />
</div>
<div class="absolute top-140 right-0 z-0 h-100 w-full scale-x-[-1]">
	<TypeIconBackground type={pokemon.types[0]} />
</div>
<div class="relative flex flex-col items-center">
	<img
		class="z-10 w-100"
		src={pokemon.sprites.other['official-artwork'].front_default}
		alt={pokemon.name}
	/>
	<div class="z-10 -mt-4 mb-8">
		<PokemonName {pokemon} />
	</div>
	<div class="mb-8 flex items-center justify-center gap-6">
		{#each pokemon.types as type}
			<TypeItem {type} />
		{/each}
	</div>
	<div class="mb-8 grid w-full grid-cols-3 gap-4">
		<PokemonInfo info={info.basic} {profile} />
		<PokemonInfo info={info.training} {profile} />
		<PokemonInfo info={info.breeding} {profile} />
	</div>
	<div class="mb-8 grid w-full grid-cols-2 gap-4">
		<StatRange info={info.stats} {profile} />
		<Card class="relative rounded-3xl" size="none">
			<Heading class="z-20 mb-4 text-center" tag="h4">Type defenses</Heading>
			<LightBeam type={pokemon.types[0]} />
			<TypeIconBackground type={pokemon.types[0]} />
		</Card>
	</div>
</div>
