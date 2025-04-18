<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import { typeColorClasses } from '$lib/constants/type/type-color-classes';

	let { type }: { type: PokemonType } = $props();
	const typeFromKey = type.type.name as keyof typeof typeColorClasses.from;
	const typeColorClassFrom = typeColorClasses.from[typeFromKey];
</script>

<div
	class="{typeColorClassFrom} absolute inset-0 z-10 h-full w-full rounded-3xl bg-radial-[100%_100%_at_50%_top] to-60%"
></div>
