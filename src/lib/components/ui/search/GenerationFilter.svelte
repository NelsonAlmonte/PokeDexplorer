<script lang="ts">
	import { searchState } from '$lib/store/search.svelte';

	let { generation }: { generation: string } = $props();
	const generationClass = searchState.selectedGenerations.includes(generation)
		? `bg-fighting-600 active`
		: `bg-fighting-600/25 default`;

	function toggleType(event: MouseEvent): void {
		const currentTarget = event.currentTarget as HTMLButtonElement;
		const selectedGeneration = `generation-${currentTarget.innerText.toLowerCase()}`;

		if (searchState.selectedGenerations.includes(selectedGeneration)) {
			currentTarget.classList.remove('active');
			currentTarget.classList.remove('bg-fighting-600');
			currentTarget.classList.add('bg-fighting-600/25');
			currentTarget.classList.add('default');
			searchState.selectedGenerations = searchState.selectedGenerations.filter(
				(type) => type !== selectedGeneration
			);
		} else {
			currentTarget.classList.add('active');
			currentTarget.classList.add('bg-fighting-600');
			currentTarget.classList.remove('bg-fighting-600/25');
			currentTarget.classList.remove('default');
			searchState.selectedGenerations.push(selectedGeneration);
		}
	}
</script>

<button
	type="button"
	class="{generationClass} hover:bg-fighting-600 dark:hover:bg-fighting-600 cursor-pointer rounded-2xl px-3 py-2.5 font-bold text-gray-900 uppercase hover:text-white dark:text-white"
	onclick={toggleType}
>
	<div class="flex justify-center">
		<span>{generation.replaceAll('generation-', '')}</span>
	</div>
</button>

<style>
	.active {
		color: white;
		cursor: pointer;
	}
</style>
