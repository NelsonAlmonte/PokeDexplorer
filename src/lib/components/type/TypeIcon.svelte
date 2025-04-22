<script lang="ts">
	import type { typeUIClasses } from '$lib/constants/type/type-ui';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { type }: { type: string } = $props();
	const typeName = type as keyof typeof typeUIClasses.text;
	const { icon } = getTypeClasses(typeName);
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
