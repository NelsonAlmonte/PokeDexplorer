<script lang="ts">
	import type { LayoutProps } from './$types';
	import { getContext } from 'svelte';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import PokemonHeader from '$lib/components/pokemon/PokemonHeader.svelte';
	import NavTabs from '$lib/components/ui/NavTabs.svelte';

	let { data, children }: LayoutProps = $props();
	const pokemon = $derived(data.profile.pokemon);
	const type = $derived(data.profile.pokemon.types[0]);
	data.profile.generations = getContext('generations');
</script>

{#key pokemon}
	<LightBeam {type} />
	<div class="fixed start-0 top-50 z-0 h-170 w-full">
		<TypeIconBackground {type} />
	</div>
	<div class="fixed top-30 right-0 z-0 h-70 w-full scale-x-[-1]">
		<TypeIconBackground {type} />
	</div>
	<div class="fixed top-130 right-0 z-0 h-100 w-full scale-x-[-1]">
		<TypeIconBackground {type} />
	</div>

	<div class="relative flex flex-col items-center">
		<PokemonHeader profile={data.profile} />
		<div class="mb-8 flex justify-center gap-3">
			<NavTabs profile={data.profile} {type} />
		</div>
		{@render children()}
	</div>
{/key}
