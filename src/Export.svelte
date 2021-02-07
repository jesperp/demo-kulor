<script lang='typescript'>
	import { fade } from 'svelte/transition';
	import { shades, store } from './store'

	const { palette } = store
</script>

<div
	style="background-color: rgba(0, 0, 0, 0.6);"
	class="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen overlay "
	on:mousedown={ store.closeExport }
	>

	<section
	 on:mousedown={ e => e.stopPropagation() }
	 in:fade
	 style="max-width:700px; min-width:300px;"
 	 class="relative p-4 px-4 mx-4 text-sm text-black bg-white shadow-md opacity-100 rounded-md"
	 >

	<button title="Close window" class="absolute top-2 right-2 " on:click={ store.closeExport }>
		<svg width="25" height="25" class="" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
		</svg>
	</button>


	<div class="flex justify-around mb-2 text-lg font-bold">
		<button class="px-2 rounded-lg ring-4 ring-green-200">CSS</button>
		<button>Tailwind<sup class="text-xs text-red-700 animate-pulse">TODO</sup></button>
	</div>

<pre class="flex overflow-scroll select-all h-80">
{ 
	":root{\n" +
	$palette.colors.map(
		color =>
			`\t--base-${color.name}: ${color.hue};\n` +   // E.g: --base-color1: 180;

			shades.map( shade =>
				// E.g: --color1-500: hsl(var(--base-color1), 100%, 90%);
				`\t--${color.name}-${shade.name}: hsl(var(--base-${color.name}), ${shade.saturation}%, ${shade.lightness}%);`
			).join('\n')
	).join('\n\n')
	+ "\n}"
}
</pre>

</section>
</div>

