<script lang="ts">
	import type { PageProps } from './$types';
	import EvolutionChain from '$lib/components/evolution/EvolutionChain.svelte';
	import FormList from '$lib/components/form/FormList.svelte';

	let { data }: PageProps = $props();
	const type = $derived(data.profile.pokemon.types[0]);
</script>

{#if data.evolutionChain.chain.evolves_to.length > 0}
	<div class="mb-8 grid w-full grid-cols-1 gap-4">
		<EvolutionChain evolutionChain={data.evolutionChain} {type} />
	</div>
{/if}
{#if data.forms.length > 1}
	<div class="mb-8 grid w-full grid-cols-1 gap-4">
		<FormList forms={data.forms} {type} />
	</div>
{/if}
