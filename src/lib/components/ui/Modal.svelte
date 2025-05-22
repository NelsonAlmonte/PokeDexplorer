<script lang="ts">
	import { goto } from '$app/navigation';
	import { modalState } from '$lib/store/ui.svelte';
	import { Button, Modal, Label, Input } from 'flowbite-svelte';

	let name = $state('');
	let selectedTypes = $state<string[]>([]);
	let isDisabled = $state(true);
	const types = ['grass', 'fire', 'water'];

	function toggleType(event: MouseEvent): void {
		const currentTarget = event.currentTarget as HTMLButtonElement;
		const selectedType = currentTarget.innerText;

		currentTarget.classList.toggle('bg-blue-700');
		if (selectedTypes.includes(selectedType)) {
			selectedTypes = selectedTypes.filter((type) => type !== selectedType);
		} else {
			selectedTypes.push(currentTarget.innerText);
		}

		validate();
	}

	function handleSubmit(event: Event): void {
		event.preventDefault();

		goto(createUrl());
	}

	function createUrl(): string {
		const url = new URL(`${window.location.origin}/search`);
		const params = new URLSearchParams(url.search);

		if (name !== '') params.set('name', name.trim());
		if (selectedTypes.length) params.set('types', selectedTypes.join(','));
		url.search = params.toString();

		return url.toString();
	}

	function validate(): void {
		if (name !== '' || selectedTypes.length > 0) isDisabled = false;
		else isDisabled = true;
	}
</script>

<Modal bind:open={modalState.search.isOpen} size="sm" outsideclose>
	<form class="flex flex-col space-y-6" method="get" action="/search" onsubmit={handleSubmit}>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Search</h3>
		<Label class="space-y-2">
			<span>Pokémon name</span>
			<Input
				bind:value={name}
				onkeyup={validate}
				type="text"
				id="name"
				name="name"
				placeholder="Pokémon name"
				autocomplete="off"
			/>
		</Label>
		{#each types as type}
			<button type="button" class="bg-blue-300 p-4 text-white" onclick={toggleType}>{type}</button>
		{/each}
		<div class="flex shrink-0 items-center justify-end space-x-3 rtl:space-x-reverse">
			<Button type="button" class="cursor-pointer" color="alternative">Close</Button>
			<Button type="submit" class="cursor-pointer" color="blue" disabled={isDisabled}>Search</Button
			>
		</div>
	</form>
</Modal>
