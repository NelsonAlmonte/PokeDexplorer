<script lang="ts">
	import { getTypeClasses } from '$lib/utils/type.util';
	import { searchState } from '$lib/store/search.svelte';
	import TypeIcon from '$lib/components/type/TypeIcon.svelte';

	let { type }: { type: string } = $props();
	const { text, bg, bgOpacity, bgHover } = getTypeClasses(type);
	const typeClass = searchState.selectedTypes.includes(type)
		? `${bg} active`
		: `${bgOpacity} default`;

	function toggleType(event: MouseEvent): void {
		const currentTarget = event.currentTarget as HTMLButtonElement;
		const selectedType = currentTarget.innerText.toLowerCase();

		if (searchState.selectedTypes.includes(selectedType)) {
			currentTarget.classList.remove('active');
			currentTarget.classList.remove(...bg.split(' '));
			currentTarget.classList.add(...bgOpacity.split(' '));
			currentTarget.classList.add('default');
			searchState.selectedTypes = searchState.selectedTypes.filter((type) => type !== selectedType);
		} else {
			currentTarget.classList.add('active');
			currentTarget.classList.add(...bg.split(' '));
			currentTarget.classList.remove(...bgOpacity.split(' '));
			currentTarget.classList.remove('default');
			searchState.selectedTypes.push(selectedType);
		}
	}
</script>

<button
	type="button"
	class="{typeClass} {bgHover} cursor-pointer rounded-2xl px-3 py-2.5 font-bold capitalize"
	onclick={toggleType}
>
	<div class="flex items-center gap-1.5 {text}">
		<TypeIcon {type} />
		<span>{type}</span>
	</div>
</button>

<style>
	.active {
		span {
			color: white;
		}
	}
	.default:hover {
		span {
			color: white;
		}
	}
</style>
