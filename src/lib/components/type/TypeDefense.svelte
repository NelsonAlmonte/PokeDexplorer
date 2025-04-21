<script lang="ts">
	import type { InfoSection } from '$lib/types/information.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import { Card, Heading } from 'flowbite-svelte';
	import { doFetch } from '$lib/api/pokemon.api';
	import { onMount } from 'svelte';
	import type { Type, TypeRelations } from 'pokeapi-typescript';

	let { info, profile }: { info: InfoSection; profile: PokemonProfile } = $props();

	async function fetchTypeDamageRelations() {
		// TODO: Separar el fetch de las operaciones con arreglos
		const types: Type[] = [];
		for (const type of profile.pokemon.types) {
			types.push((await doFetch('type', type.type.name)) as Type);
		}

		const typeRelations: Record<string, Record<string, number>> = {
			double_damage_from: {},
			half_damage_from: {},
			no_damage_from: {}
		};

		const typeRelationsKeys = [
			{
				key: 'double_damage_from',
				product: 2
			},
			{
				key: 'half_damage_from',
				product: 0.5
			},
			{
				key: 'no_damage_from',
				product: 0
			}
		];

		for (const type of types) {
			for (const relationKey of typeRelationsKeys) {
				const currentRelationKey = relationKey.key as keyof TypeRelations;
				for (const damageType of type.damage_relations[currentRelationKey]) {
					const name = damageType.name;
					typeRelations[currentRelationKey][name] =
						(typeRelations[currentRelationKey][name] || 1) * relationKey.product;
				}
			}
		}
		console.log(typeRelations);
		console.log(Object.entries(typeRelations).map(([type, values]) => ({ type, values: values })));

		return Object.entries(typeRelations).map(([type, values]) => ({ type, values: values }));
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
