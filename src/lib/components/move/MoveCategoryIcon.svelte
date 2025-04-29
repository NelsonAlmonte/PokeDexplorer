<script lang="ts">
	import type { moveUIClasses } from '$lib/constants/move/move-ui';
	import { getMoveCategoryClasses } from '$lib/utils/move.util';

	let { category }: { category: string } = $props();
	const categoryName = category as keyof typeof moveUIClasses.text;
	const { icon } = getMoveCategoryClasses(categoryName);
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
