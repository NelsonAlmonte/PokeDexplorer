<script lang="ts">
	import { goto } from '$app/navigation';
	import { modalState, searchState } from '$lib/store/ui.svelte';
	import TypeFilter from '$lib/components/ui/TypeFilter.svelte';
	import { Button, Modal, Label, Input } from 'flowbite-svelte';

	let isDisabled = $derived.by(() => {
		if (searchState.name !== '' || searchState.selectedTypes.length > 0) return false;
		else return true;
	});
	const types = [
		'fire',
		'water',
		'grass',
		'electric',
		'ice',
		'fighting',
		'poison',
		'ground',
		'flying',
		'psychic',
		'bug',
		'rock',
		'ghost',
		'dragon',
		'dark',
		'steel',
		'fairy',
		'normal'
	];

	function handleSubmit(event: Event): void {
		event.preventDefault();
		modalState.search.isOpen = false;
		goto(createUrl());
	}

	function createUrl(): string {
		const url = new URL(`${window.location.origin}/search`);
		const params = new URLSearchParams(url.search);

		if (searchState.name !== '') params.set('name', searchState.name.trim());
		if (searchState.selectedTypes.length) params.set('types', searchState.selectedTypes.join(','));
		url.search = params.toString();

		return url.toString();
	}
</script>

<Modal bind:open={modalState.search.isOpen} size="sm" outsideclose>
	<form class="flex flex-col space-y-6" method="get" action="/search" onsubmit={handleSubmit}>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Search</h3>
		<Label class="space-y-2">
			<span>Pokémon name</span>
			<Input
				bind:value={searchState.name}
				type="text"
				id="name"
				name="name"
				placeholder="Pokémon name"
				autocomplete="off"
			/>
		</Label>
		<span class="mb-0.5 block text-sm font-medium text-gray-900 dark:text-gray-300">Types</span>
		<div class="grid grid-cols-3 gap-4">
			{#each types as type}
				<TypeFilter {type} />
			{/each}
		</div>
		<div class="flex shrink-0 items-center justify-end space-x-3 rtl:space-x-reverse">
			<Button
				type="button"
				class="cursor-pointer"
				color="alternative"
				onclick={() => (modalState.search.isOpen = false)}>Close</Button
			>
			<Button type="submit" class="cursor-pointer" color="blue" disabled={isDisabled}>Search</Button
			>
		</div>
	</form>
</Modal>
