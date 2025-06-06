<script>
	import { Github, Heart } from '@lucide/svelte';
</script>

<div class="container mx-auto max-w-screen-xl">
	<footer class="my-4 rounded-3xl bg-white py-2.5 shadow-sm dark:bg-gray-800">
		<div class="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
			<div class="flex items-center space-x-3 rtl:space-x-reverse">
				<img src="/images/logo.webp" class="h-10" alt="Logo" />
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
					>PokéDexplorer</span
				>
			</div>
			<div class="flex items-center gap-3 md:absolute md:left-1/2 md:-translate-x-1/2">
				<div class="flex items-center gap-1.5">
					<span class="text-sm text-gray-900 dark:text-gray-300">Made with </span>
					<Heart class="text-fighting-500" size="20" />
					<span class="text-sm text-gray-900 dark:text-gray-300">and </span>
					<img width="15" src="/images/svelte-icon.webp" alt="svelte icon" />
					<span class="text-sm text-gray-900 dark:text-gray-300">by </span>
					<a
						class="text-sm text-gray-950 underline dark:text-white"
						href="https://github.com/NelsonAlmonte"
						target="_blank"
					>
						Nelson Almonte
					</a>
				</div>
			</div>
			<div class="flex space-x-5 sm:justify-center md:mt-0">
				<a
					href="https://github.com/NelsonAlmonte/PokeDexplorer"
					class="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
					target="_blank"
				>
					<Github />
					<span class="sr-only">Project repository</span>
				</a>
			</div>
		</div>
	</footer>
</div>
