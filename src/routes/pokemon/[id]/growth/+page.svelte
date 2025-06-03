<script lang="ts">
	import type { PageProps } from './$types';
	import type { AlertProps } from '$lib/types/ui.type';
	import EvolutionChain from '$lib/components/evolution/EvolutionChain.svelte';
	import FormList from '$lib/components/form/FormList.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { data }: PageProps = $props();
	const type = data.profile.pokemon.types[0];
	const { text, bgOpacity } = getTypeClasses(type.type.name);
	const alertProps: AlertProps = {
		title: 'Nothing to show here!',
		content: `${data.profile.pokemon.name.replaceAll('-', ' ')} doesn't evolve or change forms.`,
		subcontent: `It has reached its final form—no evolution needed.`,
		classes: [bgOpacity, text]
	};
</script>

{#if data.evolutionChain.chain.evolves_to.length > 0 || data.forms.length > 1}
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
{:else}
	<Alert {alertProps} />
{/if}
