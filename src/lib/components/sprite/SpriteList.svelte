<script lang="ts">
	import type { PokemonType } from 'pokeapi-typescript';
	import type { SpriteGroup } from '$lib/types/sprite.type';
	import type { typeUIClasses } from '$lib/constants/type/type-ui';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Card, Heading, TabItem, Tabs } from 'flowbite-svelte';

	let { spritesGroup, type }: { spritesGroup: SpriteGroup[]; type: PokemonType } = $props();
	const typeName = type.type.name as keyof typeof typeUIClasses.text;
	const { text, bg, bgOpacity, bgHover } = getTypeClasses(typeName);
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">Sprites</Heading>
	<div class="absolute inset-0 z-0 h-40 w-full">
		<LightBeam {type} />
	</div>
	<TypeIconBackground {type} />
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
				{#each group.game_version as gameVersion}
					<h1 class="text-white">{gameVersion.name}</h1>
					<img
						class="w-25"
						src={gameVersion.sprites.front_default}
						alt={gameVersion.sprites.front_default}
					/>
				{/each}
			</TabItem>
		{/each}
	</Tabs>
</Card>
