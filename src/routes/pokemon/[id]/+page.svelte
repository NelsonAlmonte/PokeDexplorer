<script lang="ts">
	import type { PageProps } from './$types';
	import { typeUIClasses } from '$lib/constants/type/type-ui';
	import { setContext } from 'svelte';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import PokemonInfo from '$lib/components/pokemon/PokemonInfo.svelte';
	import StatRange from '$lib/components/stat/StatRange.svelte';
	import TypeDefense from '$lib/components/type/TypeDefense.svelte';
	import MoveList from '$lib/components/move/MoveList.svelte';
	import EvolutionChain from '$lib/components/evolution/EvolutionChain.svelte';
	import FormList from '$lib/components/form/FormList.svelte';
	import AbilityList from '$lib/components/ability/AbilityList.svelte';
	import EntryList from '$lib/components/entry/EntryList.svelte';
	import Title from '$lib/components/ui/Title.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { createTitle } from '$lib/utils/ui.util';

	let { data }: PageProps = $props();
	const profile = $derived(data.profile);
	const info = $derived(data.profile.info);
	const typeDefenses = $derived(data.typeDefenses);
	const moveCollection = $derived(data.moveCollection);
	const generation = $derived(profile.generations.at(-1)!);
	const abilities = $derived(data.abilities);
	const entries = $derived(data.entries);
	const typeName = data.profile.pokemon.types[0].type.name as keyof typeof typeUIClasses.text;
	const { text } = getTypeClasses(typeName);
	const type = $derived(data.profile.pokemon.types[0]);
	setContext('generation', () => generation);
</script>

<img
	class="z-10 w-100"
	src={profile.pokemon.sprites.other['official-artwork'].front_default}
	alt={profile.pokemon.name}
/>
<div class="z-10 -mt-4 mb-8">
	<PokemonName pokemon={profile.pokemon} />
</div>
<div class="mb-8 flex items-center justify-center gap-6">
	{#each profile.pokemon.types as type}
		<TypeItem type={type.type.name} value={0} />
	{/each}
</div>
<div class="mb-8">
	<Title titleProps={createTitle('Information', text)} />
</div>
<div class="mb-8 grid w-full grid-cols-3 gap-4">
	<PokemonInfo info={info.basic} {type} />
	<PokemonInfo info={info.training} {type} />
	<PokemonInfo info={info.breeding} {type} />
</div>
<div class="mb-8">
	<Title titleProps={createTitle('Battle', text)} />
</div>
<div class="mb-8 grid w-full grid-cols-2 gap-4">
	<StatRange statRange={profile.stat_range} {profile} />
	<TypeDefense {typeDefenses} {type} />
</div>
<div class="mb-8 grid w-full grid-cols-1 gap-4">
	<AbilityList {abilities} {profile} />
</div>
{#if data.evolutionChain.chain.evolves_to.length > 0 && data.forms.length > 1}
	<div class="mb-8">
		<Title titleProps={createTitle('Growth', text)} />
	</div>
{/if}
{#if data.evolutionChain.chain.evolves_to.length > 0}
	<div class="mb-8 grid w-full grid-cols-1 gap-4">
		<EvolutionChain evolutionChain={data.evolutionChain} {type} />
	</div>
{/if}
{#if data.forms.length > 1}
	<div class="mb-8 grid w-full grid-cols-1 gap-4">
		<FormList forms={data.forms} {type} />
	</div>
{/if}
<div class="mb-8 grid w-full grid-cols-1 gap-4">
	<Title titleProps={createTitle('Moves', text)} />
	<MoveList {moveCollection} {profile} />
</div>
<div class="mb-8">
	<Title titleProps={createTitle('Extra', text)} />
</div>
<div class="mb-8 grid w-full grid-cols-1 gap-4">
	<EntryList {entries} {type} />
</div>
