<script lang="ts">
	import type { Types } from '$lib/interfaces/type.interface';
	import TypeIcon from './TypeIcon.svelte';
	import { typeColorClasses } from '$lib/constants/type/typeColorClasses';
	let { data } = $props();
	const type: Types = data;
	const typeTextKey = type.type.name as keyof typeof typeColorClasses.text;
	const typeColorClassText = typeColorClasses.text[typeTextKey];
	const typeBgKey = type.type.name as keyof typeof typeColorClasses.bg;
	const typeColorClassBg = typeColorClasses.bg[typeBgKey];
</script>

<div
	class="flex items-center gap-1.5 rounded-2xl {typeColorClassBg} {typeColorClassText} px-3 py-2 font-bold tracking-wide capitalize"
>
	<TypeIcon data={type} />
	{type.type.name}
</div>
