<script lang="ts">
	import type { PokemonStat, PokemonType } from 'pokeapi-typescript';
	import type { StatRange } from '$lib/types/pokemon.type';
	import { icons } from '$lib/constants/ui/icons';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Progressbar } from 'flowbite-svelte';
	import { TrendingDown, TrendingUp } from '@lucide/svelte';

	let {
		statRangeItem,
		stat,
		type
	}: { statRangeItem: StatRange; stat: PokemonStat; type: PokemonType } = $props();
	const { text, bgOpacity, bg } = getTypeClasses(type.type.name);
	const range = statRangeItem.value;
	const progress = (stat.base_stat / 200) * 100;
</script>

<div class="{text} {bgOpacity} flex items-center justify-between gap-3 rounded-2xl py-2 capitalize">
	<div class="flex flex-1 items-center justify-start gap-3">
		<div class="flex items-center justify-start gap-3 md:w-1/3">
			<div class="ms-3">
				{#if statRangeItem.icon}
					{@const Icon = icons[statRangeItem.icon]}
					<Icon size="20" />
				{/if}
			</div>
			<div class="flex flex-col">
				<span class="font-bold">{statRangeItem.label}</span>
				<span class="text-sm font-bold">{stat.base_stat}</span>
			</div>
		</div>
		<div class="flex-1">
			<Progressbar {progress} progressClass={bg} size="h-1.5" />
		</div>
	</div>
	<div class="me-3 flex gap-2">
		<div class="flex items-center justify-start gap-3">
			<div class="ms-3">
				<TrendingDown size="20" />
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Min</span>
				<span class="text-sm font-bold">{range.min}</span>
			</div>
		</div>
		<div class="flex items-center justify-start gap-3">
			<div class="ms-3">
				<TrendingUp size="20" />
			</div>
			<div class="flex flex-col">
				<span class="font-bold">Max</span>
				<span class="text-sm font-bold">{range.max}</span>
			</div>
		</div>
	</div>
</div>
