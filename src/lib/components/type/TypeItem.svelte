<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import TypeIcon from './TypeIcon.svelte';
	import { typeUIClasses } from '$lib/constants/type/type-ui';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { type }: { type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { text, bgOpacity } = getTypeClasses(typeName);
</script>

<div
	class="flex items-center gap-1.5 rounded-2xl {text} {bgOpacity} px-3 py-2 font-bold tracking-wide capitalize"
>
	<TypeIcon {type} />
	{type.type.name}
</div>
