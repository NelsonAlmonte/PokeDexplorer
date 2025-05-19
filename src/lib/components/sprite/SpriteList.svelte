<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { SpriteGroup } from '$lib/types/sprite.type';
	import type { typeUIClasses } from '$lib/constants/ui/type';
	import type { CardProps } from '$lib/types/ui.type';
	import Card from '$lib/components/ui/Card.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { TabItem, Tabs } from 'flowbite-svelte';

	let { spritesGroup, type }: { spritesGroup: SpriteGroup[]; type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { text, bg, bgOpacity, bgHover } = getTypeClasses(typeName);
	const cardProps: CardProps = {
		title: 'Sprites',
		type: type
	};
</script>

<Card {cardProps}>
	<Tabs
		tabStyle="pill"
		class="z-20"
		defaultClass="flex z-10 flex-wrap justify-center mb-3 space-x-2"
		contentClass=""
	>
		{#each spritesGroup as group, index}
			<TabItem
				open={index === 0}
				activeClasses="inline-block rounded-2xl text-center font-bold text-white {bg} cursor-pointer px-5 py-2.5"
				inactiveClasses="inline-block rounded-2xl text-center font-bold text-gray-400 hover:text-white {bgOpacity} {bgHover} cursor-pointer px-5 py-2.5"
			>
				<span slot="title" class="uppercase">{group.generation.replace('generation-', '')}</span>
				<div class="grid grid-cols-2 gap-4">
					{#each group.game_version as gameVersion}
						<div class="{bgOpacity} rounded-2xl px-4 py-6">
							<div class="mb-4 flex justify-center">
								<h5 class="{text} text-xl font-bold capitalize">{gameVersion.name}</h5>
							</div>
							<div class="grid grid-cols-2 gap-4">
								{#each Object.entries(gameVersion.sprites) as [type, sprite]}
									{#if sprite?.length}
										<div class="flex flex-col items-center">
											<img class="mb-2 w-40" src={sprite} alt={type} />
											<span class="font-bold {text} capitalize">{type.replaceAll('_', ' ')}</span>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</TabItem>
		{/each}
	</Tabs>
</Card>
