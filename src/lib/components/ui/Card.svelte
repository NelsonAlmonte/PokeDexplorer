<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { CardProps } from '$lib/types/ui.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import { Card, Heading } from 'flowbite-svelte';

	let { cardProps, children }: { cardProps: CardProps; children: Snippet<[]> } = $props();
</script>

<Card
	class="{cardProps.classes.join(' ')} relative w-full rounded-3xl border-0 shadow-sm"
	size="none"
>
	{#if cardProps.title}
		<Heading class="z-20 mb-6 text-center" tag="h4">{cardProps.title}</Heading>
	{/if}
	<div class="absolute inset-0 h-40 w-full overflow-hidden rounded-3xl opacity-70">
		<LightBeam type={cardProps.type} />
	</div>
	<TypeIconBackground type={cardProps.type} />
	{@render children()}
</Card>
