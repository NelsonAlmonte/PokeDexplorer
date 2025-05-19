<script lang="ts">
	import type { FlavorText, PokemonType } from 'pokeapi-typescript';
	import type { typeUIClasses } from '$lib/constants/ui/type';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { entry, type }: { entry: FlavorText; type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { text, bgOpacity } = getTypeClasses(typeName);
</script>

<div class="{bgOpacity} rounded-2xl px-4 py-3">
	<div class="mb-4 flex items-baseline gap-2">
		<h5 class="{text} text-xl font-bold capitalize">{entry.version.name}</h5>
	</div>
	<p class={text}>
		{entry.flavor_text}
	</p>
</div>
