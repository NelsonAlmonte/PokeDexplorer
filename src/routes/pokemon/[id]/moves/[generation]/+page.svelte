<script lang="ts">
	import type { PageProps } from './$types';
	import type { typeUIClasses } from '$lib/constants/type/type-ui';
	import { setContext } from 'svelte';
	import MoveList from '$lib/components/move/MoveList.svelte';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Button } from 'flowbite-svelte';

	let { data }: PageProps = $props();
	const profile = data.profile;
	const pokemon = profile.pokemon;
	const typeName = profile.pokemon.types[0].type.name as keyof typeof typeUIClasses.text;
	const { bgOpacity, bgHover } = getTypeClasses(typeName);
	const generation = $derived(data.generation);
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
<div class="mb-8 flex items-center justify-center">
	<a href="/pokemon/{pokemon.id}">
		<Button class="{bgOpacity} {bgHover} cursor-pointer rounded-2xl font-bold" size="xl"
			>Back to info</Button
		>
	</a>
</div>
<div class="z-20 mb-8 grid w-full grid-cols-1 gap-4">
	<MoveList moveCollection={data.moveCollection} {profile} />
</div>
