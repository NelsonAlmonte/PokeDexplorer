<script lang="ts">
	import type { MoveCollection } from '$lib/types/move.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import { Card, Heading, Tabs, TabItem } from 'flowbite-svelte';

	let { moveCollection, profile }: { moveCollection: MoveCollection[]; profile: PokemonProfile } =
		$props();
</script>

<Card class="relative w-full rounded-3xl" size="none">
	<Heading class="z-20 mb-6 text-center" tag="h4">Moves</Heading>
	<div class="absolute inset-0 h-40 w-full">
		<LightBeam type={profile.pokemon.types[0]} />
	</div>
	<TypeIconBackground type={profile.pokemon.types[0]} />
	<Tabs tabStyle="pill" class="z-20">
		{#each moveCollection as moveGroup, index}
			<TabItem open={index === 0}>
				<span slot="title" class="capitalize">{moveGroup.label}</span>
				<div class="grid grid-cols-2">
					{#each moveGroup.value as learnMethod}
						{#if learnMethod.value.length > 0}
							<div>
								<Heading class="z-20 mb-6 text-center capitalize" tag="h5"
									>{learnMethod.label}</Heading
								>
								{#each learnMethod.value as move}
									<span class="mb-4 flex items-center gap-4 capitalize">
										{move.name}
										<TypeItem type={move.type.name} value={0} />
									</span>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			</TabItem>
		{:else}
			<Heading class="z-20 mb-6 text-center" tag="h4">No moves</Heading>
		{/each}
	</Tabs>
</Card>
