<script lang="ts">
	import type { PageProps } from './$types';
	import { setContext } from 'svelte';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import PokemonInfo from '$lib/components/pokemon/PokemonInfo.svelte';
	import StatRange from '$lib/components/stat/StatRange.svelte';
	import TypeDefense from '$lib/components/type/TypeDefense.svelte';
	import MoveList from '$lib/components/move/MoveList.svelte';
	import EvolutionChain from '$lib/components/evolution/EvolutionChain.svelte';
	import FormList from '$lib/components/form/FormList.svelte';

	let { data }: PageProps = $props();
	const pokemon = $derived(data.profile.pokemon);
	const profile = $derived(data.profile);
	const info = $derived(data.profile.info);
	const typeDefenses = $derived(data.typeDefenses);
	const moveCollection = $derived(data.moveCollection);
	const generation = $derived(profile.generations.at(-1)!);
	console.log(data.profile.species);
	setContext('generation', () => generation);
</script>

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
		<TypeItem type={type.type.name} value={0} />
	{/each}
</div>
<div class="mb-8 grid w-full grid-cols-3 gap-4">
	<PokemonInfo info={info.basic} {profile} />
	<PokemonInfo info={info.training} {profile} />
	<PokemonInfo info={info.breeding} {profile} />
</div>
<div class="mb-8 grid w-full grid-cols-2 gap-4">
	<StatRange statRange={profile.stat_range} {profile} />
	<TypeDefense {typeDefenses} {profile} />
</div>
{#if data.evolutionChain.chain.evolves_to.length > 0}
	<div class="mb-8 grid w-full grid-cols-1 gap-4">
		<EvolutionChain evolutionChain={data.evolutionChain} {profile} />
	</div>
{/if}
{#if data.forms.length > 1}
	<div class="mb-8 grid w-full grid-cols-1 gap-4">
		<FormList forms={data.forms} {profile} />
	</div>
{/if}
<div class="mb-8 grid w-full grid-cols-1 gap-4">
	{#key profile}
		<MoveList {moveCollection} {profile} />
	{/key}
</div>
