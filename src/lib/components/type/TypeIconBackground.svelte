<script lang="ts">
	import type { Types } from '$lib/interfaces/type.interface';
	import { typeColorClasses } from '$lib/constants/type/typeColorClasses';
	import { icons } from '$lib/constants/type/typeIconSVGs';

	let { data } = $props();
	const type: Types = data;
	const typeTextKey = type.type.name as keyof typeof typeColorClasses.text;
	const typeColorClassText = typeColorClasses.text[typeTextKey];
	const iconKey = type.type.name as keyof typeof icons;
	const icon = icons[iconKey];
</script>

<div class="{typeColorClassText} absolute inset-0 z-0 w-100 overflow-hidden opacity-10">
	<div class="h-full w-full -translate-x-1/2">
		{@html icon}
	</div>
</div>
