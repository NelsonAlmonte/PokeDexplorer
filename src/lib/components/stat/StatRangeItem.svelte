<script lang="ts">
	import type { PokemonStat, PokemonType } from 'pokeapi-typescript';
	import type { InfoItem, Range } from '$lib/types/information.type';
	import { typeUIClasses } from '$lib/constants/type/type-ui';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Progressbar } from 'flowbite-svelte';
	import { TrendingDown, TrendingUp } from '@lucide/svelte';

	let { item, stat, type }: { item: InfoItem; stat: PokemonStat; type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { text, bgOpacity, bg } = getTypeClasses(typeName);
	const range = item.value as Range;
	const progress = (stat.base_stat / 200) * 100;
</script>

<div class="{text} {bgOpacity} flex items-center justify-between gap-3 rounded-2xl py-2 capitalize">
	<div class="flex flex-1 items-center justify-start gap-3">
		<div class="flex w-1/3 items-center justify-start gap-3">
			<div class="ms-3">
				{#if item.icon}
					{@const Icon = item.icon}
					<Icon size="20" />
				{/if}
			</div>
			<div class="flex flex-col">
				<span class="font-bold">{item.label}</span>
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
