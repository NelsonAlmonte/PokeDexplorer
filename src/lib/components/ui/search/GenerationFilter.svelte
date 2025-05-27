<script lang="ts">
	import { searchState } from '$lib/store/search.svelte';

	let { generation }: { generation: string } = $props();
	const generationClass = searchState.selectedGenerations.includes(generation)
		? `bg-blue-600 active`
		: `border-blue-600 default border-1`;

	function toggleType(event: MouseEvent): void {
		const currentTarget = event.currentTarget as HTMLButtonElement;
		const selectedGeneration = `generation-${currentTarget.innerText.toLowerCase()}`;

		if (searchState.selectedGenerations.includes(selectedGeneration)) {
			currentTarget.classList.remove('active');
			currentTarget.classList.remove('bg-blue-600');
			currentTarget.classList.add('border-blue-600');
			currentTarget.classList.add('default');
			currentTarget.classList.add('border-1');
			searchState.selectedGenerations = searchState.selectedGenerations.filter(
				(type) => type !== selectedGeneration
			);
		} else {
			currentTarget.classList.add('active');
			currentTarget.classList.add('bg-blue-600');
			currentTarget.classList.remove('default');
			searchState.selectedGenerations.push(selectedGeneration);
		}
	}
</script>

<button
	type="button"
	class="{generationClass} cursor-pointer rounded-2xl px-3 py-2.5 font-bold uppercase hover:bg-blue-600"
	onclick={toggleType}
>
	<div class="flex justify-center">
		<span class="text-white">{generation.replaceAll('generation-', '')}</span>
	</div>
</button>
