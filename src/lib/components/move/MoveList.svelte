<script lang="ts">
	import type { MoveCollection } from '$lib/types/move.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import type { typeUIClasses } from '$lib/constants/ui/type';
	import type { AlertProps } from '$lib/types/ui.type';
	import MoveItem from '$lib/components/move//MoveItem.svelte';
	import GenerationList from '$lib/components/move/GenerationList.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Tabs, TabItem } from 'flowbite-svelte';

	let { moveCollection, profile }: { moveCollection: MoveCollection[]; profile: PokemonProfile } =
		$props();
	const typeName = profile.pokemon.types[0].type.name as keyof typeof typeUIClasses.text;
	const { text, bg, bgOpacity, bgHover } = getTypeClasses(typeName);
	const alertProps: AlertProps = {
		title: 'Nothing to show here!',
		content: `${profile.pokemon.name.replaceAll('-', ' ')} didn't learn any moves in this generation.`,
		subcontent: `Maybe it was taking a break?`,
		classes: [bgOpacity, text]
	};
</script>

<GenerationList {profile} />
{#if moveCollection.length > 0}
	<Tabs
		tabStyle="pill"
		class="z-20"
		defaultClass="flex flex-wrap justify-center mb-3 space-x-2"
		contentClass=""
	>
		{#key moveCollection}
			{#each moveCollection as moveGroup, index}
				<TabItem
					open={index === 0}
					activeClasses="inline-block rounded-2xl text-center font-bold text-white {bg} cursor-pointer p-4"
					inactiveClasses="inline-block rounded-2xl text-center font-bold text-gray-400 hover:text-white {bgOpacity} {bgHover} cursor-pointer p-4"
				>
					<span slot="title" class="capitalize">{moveGroup.label}</span>
					<div class="columns-1 gap-4 xl:columns-2">
						{#each moveGroup.learn_methods as learnMethod}
							{#if learnMethod.moves.length > 0}
								{@const cardProps = {
									title: `Moves learnt by ${learnMethod.label}`,
									type: profile.pokemon.types[0]
								}}
								<div class="mb-4">
									<Card {cardProps}>
										{#each learnMethod.moves as move}
											<MoveItem {move} {profile} isLevelUp={learnMethod.label === 'level up'} />
										{/each}
									</Card>
								</div>
							{/if}
						{/each}
					</div>
				</TabItem>
			{/each}
		{/key}
	</Tabs>
{:else}
	<Alert {alertProps} />
{/if}
