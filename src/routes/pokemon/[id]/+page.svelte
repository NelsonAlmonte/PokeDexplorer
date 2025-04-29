<script lang="ts">
	import type { PageProps } from './$types';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import PokemonInfo from '$lib/components/pokemon/PokemonInfo.svelte';
	import StatRange from '$lib/components/stat/StatRange.svelte';
	import TypeDefense from '$lib/components/type/TypeDefense.svelte';
	import MoveList from '$lib/components/move/MoveList.svelte';

	let { data }: PageProps = $props();
	const pokemon = data.profile.pokemon;
	const profile = data.profile;
	const info = data.profile.info;
	console.log('PAGE', data.moveCollection);
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
	<StatRange info={info.stats} {profile} />
	<TypeDefense {profile} />
</div>
<div class="mb-8 grid w-full grid-cols-1 gap-4">
	<MoveList moveCollection={data.moveCollection} {profile} />
</div>
