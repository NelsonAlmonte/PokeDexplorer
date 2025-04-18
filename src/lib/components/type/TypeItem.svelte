<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import TypeIcon from './TypeIcon.svelte';
	import { typeColorClasses } from '$lib/constants/type/type-color-classes';

	let { type }: { type: PokemonType } = $props();
	const typeTextKey = type.type.name as keyof typeof typeColorClasses.text;
	const typeColorClassText = typeColorClasses.text[typeTextKey];
	const typeBgKey = type.type.name as keyof typeof typeColorClasses.bg;
	const typeColorClassBg = typeColorClasses.bg[typeBgKey];
</script>

<div
	class="flex items-center gap-1.5 rounded-2xl {typeColorClassBg} {typeColorClassText} px-3 py-2 font-bold tracking-wide capitalize"
>
	<TypeIcon {type} />
	{type.type.name}
</div>
