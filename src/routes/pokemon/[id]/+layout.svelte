<script lang="ts">
	import type { LayoutProps } from './$types';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';

	let { data, children }: LayoutProps = $props();
	const pokemon = $derived(data.profile.pokemon);
</script>

{#key pokemon}
	<LightBeam type={pokemon.types[0]} />
	<div class="fixed start-0 top-50 z-0 h-170 w-full">
		<TypeIconBackground type={pokemon.types[0]} />
	</div>
	<div class="fixed top-30 right-0 z-0 h-70 w-full scale-x-[-1]">
		<TypeIconBackground type={pokemon.types[0]} />
	</div>
	<div class="fixed top-130 right-0 z-0 h-100 w-full scale-x-[-1]">
		<TypeIconBackground type={pokemon.types[0]} />
	</div>

	<div class="relative flex flex-col items-center">
		{@render children()}
	</div>
{/key}
