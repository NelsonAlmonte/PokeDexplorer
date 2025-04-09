<script lang="ts">
	let { data } = $props();
	import { Heading } from 'flowbite-svelte';
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
</script>

{#if data.results}
	<div class="mt-40 grid grid-cols-2 gap-6 p-4 md:grid-cols-3 lg:grid-cols-4">
		{#each data.results as pokemon}
			<Card class="mb-40 rounded-3xl">
				<div class="flex items-center justify-center">
					<img class="-mt-40 w-70" src={pokemon.sprite} alt={pokemon.name} />
				</div>
				<div class="relative mb-8">
					<span
						class="pointer-events-none absolute start-0 end-0 top-0 mt-2 text-center text-4xl font-bold tracking-widest text-{pokemon
							.types[0].type.name}-500 capitalize opacity-20 select-none"
					>
						{pokemon.name}
					</span>
					<Heading class="relative text-center capitalize" tag="h3">
						{pokemon.name}
					</Heading>
				</div>
				<div class="mb-8 flex items-center justify-center gap-6">
					{#each pokemon.types as type}
						<div
							class="rounded-2xl bg-{type.type
								.name}-800 px-3 py-2 font-bold tracking-wide text-{type.type.name}-500 capitalize"
						>
							{type.type.name}
						</div>
					{/each}
				</div>
				<Button href="/pokemon/{pokemon.id}" color="green">View</Button>
			</Card>
		{/each}
	</div>
{:else}
	<h1>Error when loading the pokemon list</h1>
{/if}
