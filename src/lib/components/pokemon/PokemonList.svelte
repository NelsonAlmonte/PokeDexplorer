<script lang="ts">
	import type { PokemonUpdated } from '$lib/types/pokemon.type';
	import type { AlertProps } from '$lib/types/ui.type';
	import PokemonItem from '$lib/components/pokemon/PokemonItem.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';

	let { pokemons }: { pokemons: PokemonUpdated[] } = $props();
	const alertProps: AlertProps = {
		title: 'Uh oh!',
		content: 'No signs of Pokémon in the vicinity',
		subcontent: 'Try a different location',
		classes: ['bg-gray-800', 'text-white']
	};
</script>

{#if pokemons.length > 0}
	{#key pokemons}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each pokemons as pokemon}
				<PokemonItem {pokemon} />
			{/each}
		</div>
	{/key}
{:else}
	<Alert {alertProps} />
{/if}
