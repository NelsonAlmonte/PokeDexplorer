<script lang="ts">
	import type { PageProps } from './$types';
	import PokemonInfo from '$lib/components/pokemon/PokemonInfo.svelte';

	let { data }: PageProps = $props();
	const info = $derived(data.profile.info);
	const type = $derived(data.profile.pokemon.types[0]);
</script>

<div class="mb-8 grid w-full grid-cols-3 gap-4">
	<PokemonInfo info={info.basic} {type} />
	<PokemonInfo info={info.training} {type} />
	<PokemonInfo info={info.breeding} {type} />
</div>
