<script lang="ts">
	import TypeIcon from './TypeIcon.svelte';
	import { typeUIClasses } from '$lib/constants/ui/type';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Fraction } from 'fraction.js';

	let { type, value = 0 }: { type: string; value: number } = $props();
	const typeName = type as keyof typeof typeUIClasses.text;
	const { text, bgOpacity } = getTypeClasses(typeName);
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
