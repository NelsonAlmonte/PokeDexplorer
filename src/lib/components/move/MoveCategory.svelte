<script lang="ts">
	import type { moveUIClasses } from '$lib/constants/ui/move';
	import { getMoveCategoryClasses } from '$lib/utils/move.util';
	import MoveCategoryIcon from './MoveCategoryIcon.svelte';

	let { category }: { category: string } = $props();
	const categoryName = category as keyof typeof moveUIClasses.text;
	const { text, bgOpacity } = getMoveCategoryClasses(categoryName);
</script>

<div
	class="flex items-center gap-1.5 rounded-2xl {text} {bgOpacity} px-3 py-2 font-bold tracking-wide capitalize"
>
	<MoveCategoryIcon {category} />
	{category}
</div>
