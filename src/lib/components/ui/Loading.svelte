<script lang="ts">
	import { Spinner } from 'flowbite-svelte';
</script>

<div class="flex flex-col items-center justify-center">
	<div class="h-50 w-70">
		<div
			id="alert-additional-content-2"
			class="flex flex-col items-center rounded-2xl bg-white px-5 py-8 text-center shadow-sm dark:bg-gray-800"
			role="alert"
		>
			<div class="mb-2 flex items-center gap-2">
				<Spinner color="red" size="10" />
			</div>
			<div class="mt-2">
				<p class="content text-xl font-bold text-gray-900 dark:text-white">
					Connecting to regional Pokédex database
				</p>
				<p class="mt-3 text-gray-900 dark:text-white">Fetching new entries</p>
			</div>
		</div>
	</div>
</div>
