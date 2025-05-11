<script lang="ts">
	import type { TitleProps } from '$lib/types/ui.type';
	import { Heading } from 'flowbite-svelte';

	let { titleProps }: { titleProps: TitleProps } = $props();
</script>

<span
	class="{titleProps.shadow_color} pointer-events-none absolute start-0 end-0 mt-2 text-center text-4xl font-bold tracking-widest capitalize opacity-20 select-none"
>
	{titleProps.title}
</span>
<Heading class="relative text-center capitalize" tag="h3">{titleProps.title}</Heading>
