<script lang="ts">
	import type { Ability } from 'pokeapi-typescript';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import type { CardProps } from '$lib/types/ui.type';
	import AbilityItem from '$lib/components/ability/AbilityItem.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	let { abilities, profile }: { abilities: Ability[]; profile: PokemonProfile } = $props();
	const cardProps: CardProps = {
		title: 'Abilities',
		type: profile.pokemon.types[0]
	};
</script>

<Card {cardProps}>
	<div class="z-10 grid grid-cols-2 gap-4">
		{#each abilities as ability, index}
			<AbilityItem
				{ability}
				type={profile.pokemon.types[0]}
				isHiddenAbility={profile.pokemon.abilities[index].is_hidden}
			/>
		{/each}
	</div>
</Card>
