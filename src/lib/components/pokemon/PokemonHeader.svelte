<script lang="ts">
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import PokemonName from '$lib/components/pokemon/PokemonName.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';

	let { profile }: { profile: PokemonProfile } = $props();
</script>

{#if profile.pokemon.sprites.other['official-artwork'].front_default}
	<img
		class="z-10 w-88"
		src={profile.pokemon.sprites.other['official-artwork'].front_default}
		alt={profile.pokemon.name}
	/>
{:else}
	<img class="z-10 w-88" src="/images/pokeball.webp" alt={profile.pokemon.name} />
{/if}
<div class="z-10 -mt-4 mb-8">
	<PokemonName pokemon={profile.pokemon} />
</div>
<div class="mb-8 flex items-center justify-center gap-4">
	{#each profile.pokemon.types as type}
		<TypeItem type={type.type.name} value={0} />
	{/each}
</div>
