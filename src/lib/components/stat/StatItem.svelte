<script lang="ts">
	import type { PokemonStat, PokemonType } from 'pokeapi-typescript';
	import StatIcon from '$lib/components/stat/StatIcon.svelte';
	import { typeColorClasses } from '$lib/constants/type/typeColorClasses';

	let { stat, type }: { stat: PokemonStat; type: PokemonType } = $props();
	const typeTextKey = type.type.name as keyof typeof typeColorClasses.text;
	const typeColorClassText = typeColorClasses.text[typeTextKey];
	const typeBgKey = type.type.name as keyof typeof typeColorClasses.bg;
	const typeColorClassBg = typeColorClasses.bg[typeBgKey];
</script>

<div
	class="{typeColorClassBg} {typeColorClassText} flex items-center justify-start gap-3 rounded-2xl py-1.5 capitalize"
>
	<div class="ms-3">
		<StatIcon {stat} />
	</div>
	<div class="flex flex-col">
		<span class="font-bold">{stat.base_stat}</span>
		<span class="text-sm font-bold">{stat.stat.name.replace('special-', 'Sp. ')}</span>
	</div>
</div>
