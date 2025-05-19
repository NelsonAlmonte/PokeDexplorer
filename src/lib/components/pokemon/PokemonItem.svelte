<script lang="ts">
	import type { PokemonUpdated } from '$lib/types/pokemon.type';
	import type { CardProps } from '$lib/types/ui.type';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import StatList from '$lib/components/stat/StatList.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	let { pokemon }: { pokemon: PokemonUpdated } = $props();
	const cardProps: CardProps = {
		type: pokemon.types[0]
	};
</script>

<div class="mt-40">
	<Card {cardProps}>
		<div class="z-20">
			<a href="/pokemon/{pokemon.name}">
				<div class="flex items-center justify-center">
					<img
						class="-mt-40 w-70"
						src={pokemon.sprites.other['official-artwork'].front_default}
						alt={pokemon.name}
					/>
				</div>
				<div class="relative mb-8">
					<PokemonName {pokemon} />
				</div>
			</a>
			<div class="mb-8 flex items-center justify-center gap-6">
				{#each pokemon.types as type}
					<TypeItem type={type.type.name} value={0} />
				{/each}
			</div>
			<StatList {pokemon} />
		</div>
	</Card>
</div>
