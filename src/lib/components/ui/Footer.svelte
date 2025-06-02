<script>
	import { Github, Heart } from '@lucide/svelte';
</script>

<div class="container mx-auto max-w-screen-xl px-4 xl:px-0">
	<footer class="mb-4 rounded-3xl bg-white py-2.5 shadow-sm dark:bg-gray-800">
		<div class="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
			<!-- <span class="text-xl font-bold text-white">PokéDexplorer.</span> -->
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
					class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
					target="_blank"
				>
					<Github />
					<span class="sr-only">Project repository</span>
				</a>
			</div>
		</div>
	</footer>
</div>
