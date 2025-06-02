<script lang="ts">
	import { getTypeClasses } from '$lib/utils/type.util';

	let { type }: { type: string } = $props();
	const { icon } = getTypeClasses(type);
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
