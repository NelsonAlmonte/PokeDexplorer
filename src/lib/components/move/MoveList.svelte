<script lang="ts">
	import type { MoveCollection } from '$lib/types/move.type';
	import type { PokemonProfile } from '$lib/types/pokemon.type';
	import type { typeUIClasses } from '$lib/constants/type/type-ui';
	import LightBeam from '$lib/components/ui/LightBeam.svelte';
	import TypeIconBackground from '$lib/components/type/TypeIconBackground.svelte';
	import TypeItem from '$lib/components/type/TypeItem.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { Card, Heading, Tabs, TabItem } from 'flowbite-svelte';
	import { Crosshair, Flame, Signal } from '@lucide/svelte';

	let { moveCollection, profile }: { moveCollection: MoveCollection[]; profile: PokemonProfile } =
		$props();
	const typeName = profile.pokemon.types[0].type.name as keyof typeof typeUIClasses.text;
	const { text, bgOpacity } = getTypeClasses(typeName);
</script>

<Heading class="z-20 mb-6 text-center" tag="h3">Moves</Heading>
<Tabs tabStyle="pill" class="z-20" contentClass="">
	{#each moveCollection as moveGroup, index}
		<TabItem open={index === 0}>
			<span slot="title" class="capitalize">{moveGroup.label}</span>
			<div class="columns-2 gap-4">
				{#each moveGroup.value as learnMethod}
					{#if learnMethod.value.length > 0}
						<Card class="relative mb-4 w-full rounded-3xl" size="none">
							<Heading class="z-20 mb-6 text-center" tag="h4"
								>Moves learnt by <span class="capitalize">{learnMethod.label}</span></Heading
							>
							<div class="absolute inset-0 h-40 w-full">
								<LightBeam type={profile.pokemon.types[0]} />
							</div>
							<TypeIconBackground type={profile.pokemon.types[0]} />
							{#each learnMethod.value as move}
								<div
									class="{text} {bgOpacity} mb-4 flex items-center gap-4 rounded-2xl py-2 capitalize"
								>
									{#if move.version_group_details.level_learned_at !== 0 && learnMethod.label === 'level up'}
										<div class="flex items-center justify-start gap-3">
											<div class="ms-3">
												<Signal size="20" />
											</div>
											<div class="flex flex-col">
												<span class="font-bold">Lv.</span>
												<span class="text-sm font-bold"
													>{move.version_group_details.level_learned_at}</span
												>
											</div>
										</div>
									{/if}
									<span class="ms-3 font-bold">
										{move.name}
									</span>
									<TypeItem type={move.type.name} value={0} />
									<div class="flex items-center justify-start gap-3">
										<div class="ms-1">
											<Crosshair size="20" />
										</div>
										<div class="flex flex-col">
											<span class="font-bold">Cat.</span>
											<span class="text-sm font-bold">{move.damage_class.name}</span>
										</div>
									</div>
									<div class="flex items-center justify-start gap-3">
										<div class="ms-1">
											<Flame size="20" />
										</div>
										<div class="flex flex-col">
											<span class="font-bold">Power</span>
											<span class="text-sm font-bold">{move.power ?? '—'}</span>
										</div>
									</div>
									<div class="flex items-center justify-start gap-3">
										<div class="ms-1">
											<Crosshair size="20" />
										</div>
										<div class="flex flex-col">
											<span class="font-bold">Acc.</span>
											<span class="text-sm font-bold">{move.accuracy ?? '—'}</span>
										</div>
									</div>
								</div>
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
