<script lang="ts">
	import type { InfoSection } from '$lib/types/information.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import { Card, Heading } from 'flowbite-svelte';
	import { doFetch } from '$lib/api/pokemon.api';
	import { onMount } from 'svelte';
	import type { Type } from 'pokeapi-typescript';

	let { info, profile }: { info: InfoSection; profile: PokemonProfile } = $props();

	async function fetchTypeDamageRelations() {
		const data = [];
		for (const type of profile.pokemon.types) {
			data.push((await doFetch('type', type.type.name)) as Type);
		}

		const foo = data
			// .map((value) => {
			// 	return {
			// 		double_damage_from: value.damage_relations.double_damage_from
			// 		// half_damage_from: value.damage_relations.half_damage_from,
			// 		// no_damage_from: value.damage_relations.no_damage_from
			// 	};
			// })
			.flatMap((value) => {
				return value.damage_relations.double_damage_from;
			})
			.map((value) => value.name);
		console.log(foo);

		return data.map((value) => value);
	}

	onMount(async () => {
		await fetchTypeDamageRelations();
	});
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">{info.label}</Heading>
	<div class="absolute inset-0 h-40 w-full">
		<LightBeam type={profile.pokemon.types[0]} />
	</div>
	<TypeIconBackground type={profile.pokemon.types[0]} />
	<div class="mb-4 grid grid-cols-1 gap-4"></div>
</Card>
