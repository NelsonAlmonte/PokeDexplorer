<script lang="ts">
	import type { DamageRelation, InfoItem, InfoSection, Range } from '$lib/types/information.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import { Card, Heading } from 'flowbite-svelte';
	import TypeItem from './TypeItem.svelte';

	let { info, profile }: { info: InfoSection; profile: PokemonProfile } = $props();
	function isTypeDefense(value: InfoItem['value']): value is DamageRelation[] {
		return (
			Array.isArray(value) &&
			value.every(
				(item) =>
					typeof item === 'object' &&
					item !== null &&
					'type' in item &&
					'value' in item &&
					typeof (item as any).type === 'string' &&
					typeof (item as any).value === 'number'
			)
		);
	}
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">{info.label}</Heading>
	<div class="absolute inset-0 h-40 w-full">
		<LightBeam type={profile.pokemon.types[0]} />
	</div>
	<TypeIconBackground type={profile.pokemon.types[0]} />
	{#each info.data as infoItem}
		{#if isTypeDefense(infoItem.value)}
			{#if infoItem.value.length > 0}
				<Heading class="z-20 my-3 text-center" tag="h5">{infoItem.label}</Heading>
				<div class="flex flex-wrap gap-4">
					{#each infoItem.value as item}
						<TypeItem type={item.type} value={item.value} />
					{/each}
				</div>
			{/if}
		{/if}
	{/each}
</Card>
