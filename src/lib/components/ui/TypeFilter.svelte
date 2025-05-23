<script lang="ts">
	import { typeUIClasses } from '$lib/constants/ui/type';
	import { searchState } from '$lib/store/ui.svelte';
	import { getTypeClasses } from '$lib/utils/type.util';
	import TypeIcon from '$lib/components/type/TypeIcon.svelte';

	let { type }: { type: string } = $props();
	const typeName = type as keyof typeof typeUIClasses.text;
	const { text, bg, border, bgHover } = getTypeClasses(typeName);
	const typeClass = searchState.selectedTypes.includes(type)
		? `${bg} active`
		: `${border} default border-1`;

	function toggleType(event: MouseEvent): void {
		const currentTarget = event.currentTarget as HTMLButtonElement;
		const selectedType = currentTarget.innerText.toLowerCase();

		if (searchState.selectedTypes.includes(selectedType)) {
			currentTarget.classList.remove('active');
			currentTarget.classList.remove(bg);
			currentTarget.classList.add(border);
			currentTarget.classList.add('default');
			currentTarget.classList.add('border-1');
			searchState.selectedTypes = searchState.selectedTypes.filter((type) => type !== selectedType);
		} else {
			currentTarget.classList.add('active');
			currentTarget.classList.add(bg);
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
