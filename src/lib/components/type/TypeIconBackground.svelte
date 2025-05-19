<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import { typeUIClasses } from '$lib/constants/ui/type';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { type }: { type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { text, icon } = getTypeClasses(typeName);
</script>

<div class="{text} pointer-events-none absolute inset-0 z-0 w-full overflow-hidden opacity-10">
	<div class="h-full w-full -translate-x-1/2">
		{@html icon}
	</div>
</div>
