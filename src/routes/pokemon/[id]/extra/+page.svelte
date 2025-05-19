<script lang="ts">
	import type { PageProps } from './$types';
	import CryList from '$lib/components/cry/CryList.svelte';
	import EntryList from '$lib/components/entry/EntryList.svelte';
	import SpriteList from '$lib/components/sprite/SpriteList.svelte';

	let { data }: PageProps = $props();
	const entries = $derived(data.entries);
	const spritesGroup = $derived(data.sprites);
	const cries = $derived(data.profile.pokemon.cries);
	const type = $derived(data.profile.pokemon.types[0]);
</script>

<div class="mb-8 grid w-full grid-cols-1 gap-4">
	<EntryList {entries} {type} />
</div>
{#if spritesGroup.length > 0}
	<div class="mb-8 grid w-full grid-cols-1 gap-4">
		<SpriteList {spritesGroup} {type} />
	</div>
{/if}
<div class="mb-8 grid w-full grid-cols-1 gap-4">
	<CryList {cries} {type} />
</div>
