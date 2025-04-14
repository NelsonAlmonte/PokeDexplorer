<script lang="ts">
	import type { PageProps } from './$types';
	import LightBeam from '$lib/components/pokemon/LightBeam.svelte';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';

	let { data }: PageProps = $props();
	const pokemon = data.pokemon;
</script>

<div class="relative flex flex-col items-center">
	<LightBeam type={pokemon.types[0]} />
	<TypeIconBackground type={pokemon.types[0]} />
	<img
		class="z-10 w-100"
		src={pokemon.sprites.other['official-artwork'].front_default}
		alt={pokemon.name}
	/>
	<div>
		<PokemonName {pokemon} />
	</div>
</div>
