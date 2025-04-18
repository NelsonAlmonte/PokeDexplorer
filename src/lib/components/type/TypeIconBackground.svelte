<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import { typeColorClasses } from '$lib/constants/type/type-color-classes';
	import { icons } from '$lib/constants/type/type-icon-svg';

	let { type }: { type: PokemonType } = $props();
	const typeTextKey = type.type.name as keyof typeof typeColorClasses.text;
	const typeColorClassText = typeColorClasses.text[typeTextKey];
	const iconKey = type.type.name as keyof typeof icons;
	const icon = icons[iconKey];
</script>

<div class="{typeColorClassText} absolute inset-0 z-0 w-full overflow-hidden opacity-10">
	<div class="h-full w-full -translate-x-1/2">
		{@html icon}
	</div>
</div>
