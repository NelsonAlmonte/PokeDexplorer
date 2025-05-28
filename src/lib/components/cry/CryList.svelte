<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { Cries } from '$lib/types/pokemon.type';
	import type { typeUIClasses } from '$lib/constants/ui/type';
	import type { CardProps } from '$lib/types/ui.type';
	import Card from '$lib/components/ui/Card.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';

	let { cries, type }: { cries: Cries; type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { text } = getTypeClasses(typeName);
	const cardProps: CardProps = {
		title: 'Cries',
		type: type
	};
</script>

<Card {cardProps}>
	<div class="flex flex-wrap justify-center gap-4">
		{#each Object.entries(cries) as [type, cry]}
			{#if cry}
				<div class="flex flex-col items-center">
					<h5 class="{text} mb-4 text-xl font-bold capitalize">{type}</h5>
					<audio controls>
						<source src={cry} type="audio/ogg" />
						<source src={cry} type="audio/mpeg" />
						Your browser does not support the audio element.
					</audio>
				</div>
			{/if}
		{/each}
	</div>
</Card>
