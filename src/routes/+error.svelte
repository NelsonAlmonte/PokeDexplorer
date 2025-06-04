<script lang="ts">
	import type { AlertTypes } from '$lib/types/ui.type';
	import { page } from '$app/state';
	import Alert from '$lib/components/ui/Alert.svelte';
	import { alerts } from '$lib/constants/ui/alert';

	const error = page.error?.message as keyof AlertTypes;
</script>

<div class="mt-10">
	<Alert alertProps={alerts[error]} />
</div>
