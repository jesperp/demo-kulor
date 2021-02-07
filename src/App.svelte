<script lang='typescript'>
	import PaletteColor from './PaletteColor.svelte'
	import ColorPicker from './ColorPicker.svelte'
	import Export from './Export.svelte'
	import { palette, exportModalState } from './store'

</script>


<main class="relative flex flex-col h-full p-4 text-white bg-gray-900">

  <section class="flex flex-wrap items-center justify-center pb-2 space-x-2">

		<h1 class="mb-2 text-2xl">
			Kulör
		</h1>

		<button class="mb-2" title="Add new color" on:click={ palette.addColor }>
			<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</button>

		<button class="mb-2" title="Show CSS/Tailwind config" on:click={ exportModalState.toggle }>
			<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
			</svg>
		</button>

		<div class="mb-2">
			<ColorPicker />
		</div>

  </section>


  <section class="flex h-full mx-1 space-x-1">
		{#if $palette.colors.length === 0 }
			<!-- Show intro screen -->
			<div class="sm:flex sm:items-center sm:justify-center sm:flex-grow">
				<p class="m-2 text-lg sm:-mt-20 sm:w-96" >
					Kulör is an HSL based color scheme generator that exports to CSS and Tailwind.
					Add colors and play with the hue-slider!
				</p>
			</div>
		{:else}
			<!-- Show palette -->
			{#each $palette.colors as color, index}
				<PaletteColor index={index} color={color} />
			{/each}
		{/if}
  </section>

	<!-- Export to CSS/Tailwnd modal (if visible) -->
	{#if $exportModalState }
		<Export />
	{/if}
</main>
