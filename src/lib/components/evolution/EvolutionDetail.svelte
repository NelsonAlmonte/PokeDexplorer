<script lang="ts">
	import type { EvolutionDetail, PokemonType } from 'pokeapi-typescript';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { MoveDown, MoveRight } from '@lucide/svelte';

	let { detail, type }: { detail: EvolutionDetail; type: PokemonType } = $props();
	const { text, bgOpacity } = getTypeClasses(type.type.name);
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
	<div class="mb-2 hidden justify-center lg:flex">
		<MoveRight size="32" />
	</div>
	<div class="mb-2 flex justify-center lg:hidden">
		<MoveDown size="32" />
	</div>
	<span>Trigger by {detail.trigger.name.replaceAll('-', ' ')}</span>
	{#each Object.entries(conditions) as [key, value]}
		<br />
		<span class="capitalize">{key.replaceAll('_', ' ')}:</span>
		<span class="capitalize">{value}</span>
	{/each}
</div>
