<script lang="ts">
	import MoveList from '$lib/components/move/MoveList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const profile = data.profile;
	console.log(data);
</script>

<div class="mb-8 grid w-full grid-cols-1 gap-4">
	<MoveList moveCollection={data.moveCollection} {profile} />
</div>
