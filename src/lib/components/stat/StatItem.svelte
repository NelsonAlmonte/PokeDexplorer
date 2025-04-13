<script lang="ts">
	import type { Stats } from '$lib/interfaces/stat.interface';
	import type { Types } from '$lib/interfaces/type.interface';
	import StatIcon from '$lib/components/stat/StatIcon.svelte';
	import { statColorClasses } from '$lib/constants/stat/statColorClasses';
	import { typeColorClasses } from '$lib/constants/type/typeColorClasses';

	let { data, type } = $props();
	const stat: Stats = data;
	// const type: Types = type;
	const statTextKey = stat.stat.name as keyof typeof statColorClasses.text;
	const statColorClassText = statColorClasses.text[statTextKey];
	const statBgKey = stat.stat.name as keyof typeof statColorClasses.bg;
	const statColorClassBg = statColorClasses.bg[statBgKey];

	const typeTextKey = type.type.name as keyof typeof typeColorClasses.text;
	const typeColorClassText = typeColorClasses.text[typeTextKey];
	const typeBgKey = type.type.name as keyof typeof typeColorClasses.bg;
	const typeColorClassBg = typeColorClasses.bg[typeBgKey];
</script>

<div
	class="{typeColorClassBg} {typeColorClassText} flex items-center justify-start gap-3 rounded-2xl py-1.5 capitalize"
>
	<!-- <div
	class="{statColorClassBg} {statColorClassText} flex items-center justify-start gap-3 rounded-2xl py-1.5 capitalize"
> -->
	<div class="ms-3">
		<StatIcon data={stat} />
	</div>
	<div class="flex flex-col">
		<span class="font-bold">{stat.base_stat}</span>
		<span class="text-sm font-bold">{stat.stat.name.replace('special-', 'Sp. ')}</span>
	</div>
</div>
