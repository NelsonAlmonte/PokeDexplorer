<script lang="ts">
	import type { PokemonStat } from 'pokeapi-typescript';
	import { icons } from '$lib/constants/stat/statIonSVGs';

	let { stat }: { stat: PokemonStat } = $props();
	const iconKey = stat.stat.name as keyof typeof icons;
	const icon = icons[iconKey];
</script>

<div>
	{@html icon}
</div>

<style>
	div :global {
		svg {
			width: 20px;
			height: 20px;
		}
	}
</style>
