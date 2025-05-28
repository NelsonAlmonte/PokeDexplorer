<script lang="ts">
	import type { DetailedChainLink } from '$lib/types/evolution.type';
	import TypeItem from '$lib/components/type/TypeItem.svelte';

	let { chainLink }: { chainLink: DetailedChainLink } = $props();
</script>

<div>
	<a href="/pokemon/{chainLink.evolution_data.name}">
		<img
			class="z-10 w-50"
			src={chainLink.evolution_data.sprite}
			alt={chainLink.evolution_data.name}
		/>
		<div class="mb-4 flex justify-center">
			<p class="font-bold text-white capitalize">
				{chainLink.evolution_data.name.replaceAll('-', ' ')}
			</p>
		</div>
	</a>
	<div class="mb-8 flex items-center justify-center gap-2">
		{#each chainLink.evolution_data.types as type}
			<TypeItem type={type.type.name} value={0} />
		{/each}
	</div>
</div>
