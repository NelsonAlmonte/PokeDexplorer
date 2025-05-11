<script lang="ts">
	import type { InfoSection } from '$lib/types/information.type';
	import type { PokemonType } from 'pokeapi-typescript';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import InfoItem from '$lib/components/ui/InfoItem.svelte';
	import { Card, Heading } from 'flowbite-svelte';

	let { info, type }: { info: InfoSection; type: PokemonType } = $props();
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">{info.label}</Heading>
	<div class="absolute inset-0 h-40 w-full">
		<LightBeam {type} />
	</div>
	<TypeIconBackground {type} />
	<div class="z-20 grid grid-cols-2 gap-4">
		{#each info.data as infoItem}
			<InfoItem item={infoItem} {type} />
		{/each}
	</div>
</Card>
