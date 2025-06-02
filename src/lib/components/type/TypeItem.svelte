<script lang="ts">
	import TypeIcon from './TypeIcon.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Fraction } from 'fraction.js';

	let { type, value = 0 }: { type: string; value: number } = $props();
	const { text, bgOpacity } = getTypeClasses(type);
</script>

<div
	class="flex items-center gap-1.5 rounded-2xl {text} {bgOpacity} px-3 py-2 font-bold tracking-wide capitalize"
>
	<TypeIcon {type} />
	{type}
	{#if value != 0}
		<small>
			×{new Fraction(value).toFraction()}
		</small>
	{/if}
</div>
