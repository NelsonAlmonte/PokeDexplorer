<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { InfoItem } from '$lib/types/information.type';
	import { typeColorClasses } from '$lib/constants/type/type-color-classes';

	let { item, type }: { item: InfoItem; type: PokemonType } = $props();
	const typeTextKey = type.type.name as keyof typeof typeColorClasses.text;
	const typeColorClassText = typeColorClasses.text[typeTextKey];
	const typeBgKey = type.type.name as keyof typeof typeColorClasses.bg;
	const typeColorClassBg = typeColorClasses.bg[typeBgKey];
</script>

<div
	class="{typeColorClassBg} {typeColorClassText} flex items-center justify-start gap-3 rounded-2xl py-1.5 capitalize"
>
	<div class="ms-3">
		{#if item.icon}
			{@const Icon = item.icon}
			<Icon size="20" />
		{/if}
	</div>
	<div class="flex flex-col">
		<span class="font-bold">{item.label}</span>
		<span class="text-sm font-bold">{item.value}</span>
	</div>
</div>
