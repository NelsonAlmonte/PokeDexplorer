<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { TypeDefense } from '$lib/types/pokemon.type';
	import type { CardProps } from '$lib/types/ui.type';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { Heading } from 'flowbite-svelte';

	let { typeDefenses, type }: { typeDefenses: TypeDefense[]; type: PokemonType } = $props();
	const cardProps: CardProps = {
		title: 'Type defenses',
		type: type,
		classes: ['overflow-hidden']
	};
</script>

<Card {cardProps}>
	{#key typeDefenses}
		{#each typeDefenses as typeDefense}
			{#if typeDefense.value.length > 0}
				<Heading class="z-20 my-3 text-center capitalize" tag="h5">{typeDefense.label}</Heading>
				<div class="flex flex-wrap justify-center gap-4">
					{#each typeDefense.value as item}
						<TypeItem type={item.type} value={item.value} />
					{/each}
				</div>
			{/if}
		{/each}
	{/key}
</Card>
