<script lang="ts">
	import type { PageProps } from './$types';
	import PokemonInfo from '$lib/components/pokemon/PokemonInfo.svelte';
	import { MetaTags } from 'svelte-meta-tags';

	let { data }: PageProps = $props();
	const info = $derived(data.profile.info);
	const type = $derived(data.profile.pokemon.types[0]);
</script>

<MetaTags {...data.metaTags} />

<div class="mb-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
	<PokemonInfo info={info.basic} {type} />
	<PokemonInfo info={info.training} {type} />
	<PokemonInfo info={info.breeding} {type} />
</div>
