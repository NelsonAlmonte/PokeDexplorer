<script lang="ts">
	import type { Types } from '$lib/interfaces/type.interface';
	import { icons } from '$lib/constants/type/typeIconSVGs';
	let { data } = $props();
	const type: Types = data;
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
