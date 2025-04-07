<script lang="ts">
	let { data } = $props();
	import { Heading } from 'flowbite-svelte';
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
</script>

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
  {#each data.pokemons.results as pokemon}
	<Card img={pokemon.sprite}>
		<Heading class="text-center" tag="h3">{pokemon.name}</Heading>
    <Button href="/pokemon/{pokemon.id}" color="blue">View</Button>
	</Card>
  {/each}
</div>
