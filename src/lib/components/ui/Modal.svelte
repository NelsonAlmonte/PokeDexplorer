<script lang="ts">
	import { modalState } from '$lib/store/ui.svelte';
	import { Button, Modal, Label, Input } from 'flowbite-svelte';

	let name = $state('');
</script>

<Modal bind:open={modalState.search.isOpen} size="sm" outsideclose>
	<form class="flex flex-col space-y-6" method="get" action="/search">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Search</h3>
		<Label class="space-y-2">
			<span>Pokémon name</span>
			<Input
				bind:value={name}
				type="text"
				id="name"
				name="name"
				placeholder="Pokémon name"
				autocomplete="off"
			/>
		</Label>
		<div class="flex shrink-0 items-center justify-end space-x-3 rtl:space-x-reverse">
			<Button type="button" class="cursor-pointer" color="alternative">Close</Button>
			<Button type="submit" class="cursor-pointer" color="blue">Search</Button>
		</div>
	</form>
</Modal>
