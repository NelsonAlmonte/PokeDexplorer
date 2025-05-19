<script lang="ts">
	import type { PageProps } from './$types';
	import StatRange from '$lib/components/stat/StatRange.svelte';
	import TypeDefense from '$lib/components/type/TypeDefense.svelte';
	import AbilityList from '$lib/components/ability/AbilityList.svelte';

	let { data }: PageProps = $props();
	const profile = $derived(data.profile);
	const statRange = $derived(data.statRange);
	const typeDefenses = $derived(data.typeDefenses);
	const abilities = $derived(data.abilities);
	const type = $derived(data.profile.pokemon.types[0]);
</script>

<div class="mb-8 grid w-full grid-cols-2 gap-4">
	<StatRange {statRange} {profile} />
	<TypeDefense {typeDefenses} {type} />
</div>
<div class="mb-8 grid w-full grid-cols-1 gap-4">
	<AbilityList {abilities} {profile} />
</div>
