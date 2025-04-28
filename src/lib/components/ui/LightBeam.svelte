<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import { typeUIClasses } from '$lib/constants/type/type-ui';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { type }: { type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { from } = getTypeClasses(typeName);
</script>

<div
	class="{from} pointer-events-none absolute inset-0 z-10 h-full w-full rounded-3xl bg-radial-[100%_100%_at_50%_top] to-60%"
></div>
