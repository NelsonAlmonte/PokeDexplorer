<script lang="ts">
	import type { MoveCollection } from '$lib/types/move.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import type { typeUIClasses } from '$lib/constants/type/type-ui';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import MoveItem from '$lib/components/move//MoveItem.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Card, Heading, Tabs, TabItem } from 'flowbite-svelte';

	let { moveCollection, profile }: { moveCollection: MoveCollection[]; profile: PokemonProfile } =
		$props();
	const typeName = profile.pokemon.types[0].type.name as keyof typeof typeUIClasses.text;
	const { text } = getTypeClasses(typeName);
</script>

<span
	class="{text} pointer-events-none absolute start-0 end-0 mt-2 text-center text-4xl font-bold tracking-widest capitalize opacity-20 select-none"
>
	Moves
</span>
<Heading class="relative text-center capitalize" tag="h3">Moves</Heading>

<Tabs tabStyle="pill" class="z-20" contentClass="">
	{#each moveCollection as moveGroup, index}
		<TabItem open={index === 0}>
			<span slot="title" class="capitalize">{moveGroup.label}</span>
			<div class="columns-2 gap-4">
				{#each moveGroup.learn_methods as learnMethod}
					{#if learnMethod.moves.length > 0}
						<Card class="relative mb-4 w-full rounded-3xl" size="none">
							<Heading class="z-20 mb-6 text-center" tag="h4"
								>Moves learnt by <span class="capitalize">{learnMethod.label}</span></Heading
							>
							<div class="absolute inset-0 h-40 w-full">
								<LightBeam type={profile.pokemon.types[0]} />
							</div>
							<TypeIconBackground type={profile.pokemon.types[0]} />
							{#each learnMethod.moves as move}
								<MoveItem {move} {profile} isLevelUp={learnMethod.label === 'level up'} />
							{/each}
						</Card>
					{/if}
				{/each}
			</div>
		</TabItem>
	{:else}
		<Heading class="z-20 mb-6 text-center" tag="h4">No moves</Heading>
	{/each}
</Tabs>
