<script lang="ts">
	import type { DetailedPokemonMove } from '$lib/types/move.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import type { typeUIClasses } from '$lib/constants/type/type-ui';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Crosshair, Flame, Signal } from '@lucide/svelte';
	import MoveCategory from './MoveCategory.svelte';

	let {
		move,
		profile,
		isLevelUp
	}: { move: DetailedPokemonMove; profile: PokemonProfile; isLevelUp: boolean } = $props();
	const typeName = profile.pokemon.types[0].type.name as keyof typeof typeUIClasses.text;
	const { text, bgOpacity } = getTypeClasses(typeName);
</script>

<div class="{text} {bgOpacity} z-20 mb-4 flex items-center gap-4 rounded-2xl py-2 capitalize">
	{#if move.version_group_details.level_learned_at !== 0 && isLevelUp}
		<div class="flex items-center justify-start gap-3">
			<div class="ms-3">
				<Signal size="20" />
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Lv.</span>
				<span class="text-sm font-bold">{move.version_group_details.level_learned_at}</span>
			</div>
		</div>
	{/if}
	<span class="ms-3 font-bold">
		{move.name}
	</span>
	<TypeItem type={move.type.name} value={0} />
	<MoveCategory category={move.damage_class.name} />
	<div class="flex items-center justify-start gap-3">
		<div class="ms-1">
			<Flame size="20" />
		</div>
		<div class="flex flex-col">
			<span class="font-bold">Power</span>
			<span class="text-sm font-bold">{move.power ?? '—'}</span>
		</div>
	</div>
	<div class="flex items-center justify-start gap-3">
		<div class="ms-1">
			<Crosshair size="20" />
		</div>
		<div class="flex flex-col">
			<span class="font-bold">Acc.</span>
			<span class="text-sm font-bold">{move.accuracy ?? '—'}</span>
		</div>
	</div>
</div>
