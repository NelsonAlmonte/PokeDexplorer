<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { PokemonUpdated } from '$lib/types/pokemon.type';
	import type { CardProps } from '$lib/types/ui.type';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	let { forms, type }: { forms: PokemonUpdated[]; type: PokemonType } = $props();
	const cardProps: CardProps = {
		title: 'Forms',
		type: type,
		classes: ['overflow-hidden']
	};
</script>

<Card {cardProps}>
	<div class="flex flex-wrap justify-evenly">
		{#each forms as form}
			<div class="flex flex-col">
				<a href="/pokemon/{form.name}">
					{#if form.sprites.other['official-artwork'].front_default}
						<img
							class="z-10 w-50"
							src={form.sprites.other['official-artwork'].front_default}
							alt={form.name}
						/>
					{:else}
						<img class="z-10 w-50" src="/images/pokeball.webp" alt={form.name} />
					{/if}

					<div class="mb-4 flex justify-center">
						<p class="font-bold text-gray-900 capitalize dark:text-white">
							{form.name.replaceAll('-', ' ')}
						</p>
					</div>
				</a>
				<div class="mb-8 flex items-center justify-center gap-2">
					{#each form.types as type}
						<TypeItem type={type.type.name} value={0} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</Card>
