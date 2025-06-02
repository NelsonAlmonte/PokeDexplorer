<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { InfoItem } from '$lib/types/information.type';
	import { icons } from '$lib/constants/ui/icons';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { item, type }: { item: InfoItem; type: PokemonType } = $props();
	const { text, bgOpacity } = getTypeClasses(type.type.name);
</script>

<div class="{text} {bgOpacity} flex items-center justify-start gap-3 rounded-2xl py-1.5 capitalize">
	<div class="ms-3">
		{#if item.icon}
			{@const Icon = icons[item.icon]}
			<Icon size="20" />
		{/if}
	</div>
	<div class="flex flex-col">
		<span class="font-bold">{item.label}</span>
		<span class="text-sm font-bold">{item.value}</span>
	</div>
</div>
