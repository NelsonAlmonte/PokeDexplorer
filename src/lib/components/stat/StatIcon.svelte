<script lang="ts">
	import { icons } from '$lib/constants/stat/statIonSVGs';
	import type { Stats } from '$lib/interfaces/stat.interface';
	let { data } = $props();
	const stat: Stats = data;
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
