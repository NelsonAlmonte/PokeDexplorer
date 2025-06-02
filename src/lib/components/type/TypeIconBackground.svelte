<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { type }: { type: PokemonType } = $props();
	const { text, icon } = getTypeClasses(type.type.name);
</script>

<div class="{text} pointer-events-none absolute inset-0 z-0 w-full overflow-hidden opacity-10">
	<div class="h-full w-full -translate-x-1/2">
		{@html icon}
	</div>
</div>
