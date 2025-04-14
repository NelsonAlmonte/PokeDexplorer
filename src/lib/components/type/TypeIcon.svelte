<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import { icons } from '$lib/constants/type/typeIconSVGs';

	let { type }: { type: PokemonType } = $props();
	const iconKey = type.type.name as keyof typeof icons;
	const icon = icons[iconKey];
</script>

<div>
	{@html icon}
</div>

<style>
	div :global {
		svg {
			width: 16px;
			height: 16px;
		}
	}
</style>
