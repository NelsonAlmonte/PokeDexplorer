<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import { typeUIClasses } from '$lib/constants/ui/type';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { type }: { type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { from } = getTypeClasses(typeName);
</script>

<div
	class="{from} pointer-events-none z-0 h-full w-full bg-radial-[100%_100%_at_50%_top] to-60%"
></div>
