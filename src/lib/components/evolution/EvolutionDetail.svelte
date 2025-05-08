<script lang="ts">
	import type { typeUIClasses } from '$lib/constants/type/type-ui';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { MoveRight } from '@lucide/svelte';
	import type { EvolutionDetail } from 'pokeapi-typescript';

	let { detail, profile }: { detail: EvolutionDetail; profile: PokemonProfile } = $props();
	const typeName = profile.pokemon.types[0].type.name as keyof typeof typeUIClasses.text;
	const { text, bgOpacity } = getTypeClasses(typeName);
	const conditions = Object.fromEntries(
		Object.entries(detail)
			.filter(
				([key, value]) => value !== null && value !== false && value !== '' && key !== 'trigger'
			)
			.map(([key, value]) => [
				key,
				typeof value === 'object' && value !== null && 'name' in value
					? value.name.replaceAll('-', ' ')
					: value
			])
	);
</script>

<div class="{bgOpacity} {text}  mb-4 rounded-2xl px-4 py-3 font-bold">
	<div class="mb-2 flex justify-center">
		<MoveRight size="32" />
	</div>
	<span>Trigger by {detail.trigger.name.replaceAll('-', ' ')}</span>
	{#each Object.entries(conditions) as [key, value]}
		<br />
		<span class="capitalize">{key.replaceAll('_', ' ')}:</span>
		<span class="capitalize">{value}</span>
	{/each}
</div>
