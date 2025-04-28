<script lang="ts">
	import type { InfoSection } from '$lib/types/information.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import InfoItem from '$lib/components/ui/InfoItem.svelte';
	import { Card, Heading } from 'flowbite-svelte';

	let { info, profile }: { info: InfoSection; profile: PokemonProfile } = $props();
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">{info.label}</Heading>
	<div class="absolute inset-0 h-40 w-full">
		<LightBeam type={profile.pokemon.types[0]} />
	</div>
	<TypeIconBackground type={profile.pokemon.types[0]} />
	<div class="z-20 grid grid-cols-2 gap-4">
		{#each info.data as infoItem}
			<InfoItem item={infoItem} type={profile.pokemon.types[0]} />
		{/each}
	</div>
</Card>
