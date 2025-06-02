<script lang="ts">
	import type { FlavorText, PokemonType } from 'pokeapi-typescript';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { entry, type }: { entry: FlavorText; type: PokemonType } = $props();
	const { text, bgOpacity } = getTypeClasses(type.type.name);
</script>

<div class="{bgOpacity} rounded-2xl px-4 py-3">
	<div class="mb-4 flex items-baseline gap-2">
		<h5 class="{text} text-xl font-bold capitalize">{entry.version.name}</h5>
	</div>
	<p class={text}>
		{entry.flavor_text}
	</p>
</div>
