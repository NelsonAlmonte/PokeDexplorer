<script lang="ts">
	import type { PageProps } from './$types';
	import { setContext } from 'svelte';
	import MoveList from '$lib/components/move/MoveList.svelte';

	let { data }: PageProps = $props();
	const profile = data.profile;
	const generation = $derived(data.generation);
	setContext('generation', () => generation);
</script>

<div class="z-20 mb-8 grid w-full grid-cols-1 gap-4">
	<MoveList moveCollection={data.moveCollection} {profile} />
</div>
