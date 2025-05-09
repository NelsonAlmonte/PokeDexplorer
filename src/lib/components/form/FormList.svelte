<script lang="ts">
	import type { Pokemon } from 'pokeapi-typescript';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import { Card, Heading } from 'flowbite-svelte';

	let { forms, profile }: { forms: Pokemon[]; profile: PokemonProfile } = $props();
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">Forms</Heading>
	<div class="absolute inset-0 h-40 w-full">
		<LightBeam type={profile.pokemon.types[0]} />
	</div>
	<TypeIconBackground type={profile.pokemon.types[0]} />
	<div class="flex justify-evenly">
		{#each forms as form}
			<div class="flex flex-col">
				<a href="/pokemon/{form.id}">
					<img
						class="z-10 w-50"
						src={form.sprites.other['official-artwork'].front_default}
						alt={form.name}
					/>
					<div class="mb-4 flex justify-center">
						<p class="font-bold text-white capitalize">
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
