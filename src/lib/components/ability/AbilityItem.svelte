<script lang="ts">
	import type { Ability, PokemonType } from 'pokeapi-typescript';
	import { getTypeClasses } from '$lib/utils/type.util';
	import { slide } from 'svelte/transition';

	let {
		ability,
		type,
		isHiddenAbility
	}: { ability: Ability; type: PokemonType; isHiddenAbility: Boolean } = $props();
	const { text, bgOpacity, bgHover } = getTypeClasses(type.type.name);
	let collapse = $state({ isHidden: true, label: 'Show more' });

	function manageCollapse() {
		collapse.isHidden = !collapse.isHidden;
		collapse.label = collapse.isHidden ? 'Show more' : 'Show less';
	}
</script>

<div class="{bgOpacity} rounded-2xl px-4 py-3">
	<div class="mb-4 flex items-baseline gap-2">
		<h5 class="{text} text-xl font-bold capitalize">{ability.name.replaceAll('-', ' ')}</h5>
		<span class={text}>•</span>
		<span class={text}>
			{ability.flavor_text_entries.find((value) => value.language.name === 'en')?.flavor_text}
		</span>
		{#if isHiddenAbility}
			<span class={text}>•</span>
			<span class="{text} text-sm font-bold opacity-80">Hidden ability</span>
		{/if}
	</div>
	<p class={text}>
		{ability.effect_entries.find((value) => value.language.name === 'en')?.short_effect}
	</p>

	<div class="my-4 flex justify-center">
		<button
			class="{text} {bgHover} cursor-pointer rounded-2xl px-3 py-2 font-bold hover:text-white"
			onclick={manageCollapse}>{collapse.label}</button
		>
	</div>
	{#if !collapse.isHidden}
		<p transition:slide={{ duration: 300 }} class="{text} opacity-80">
			{ability.effect_entries.find((value) => value.language.name === 'en')?.effect}
		</p>
	{/if}
</div>
