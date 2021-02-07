<script lang='typescript'>
	import { fade } from 'svelte/transition';
	import type { PaletteColor } from './store'
	import { shades, store } from './store'

	export let color:PaletteColor
	export let index:number

	const { palette } = store

	$: selected = $palette.selected === index
</script>

<style>
	.selected {
		@apply ring-1;
	}
</style>

<div
	in:fade
	class:selected
	class="flex flex-col flex-grow ring-0 ring-gray-100 ring-white"
 on:click={ () => { console.log("setSelected(index)", index); store.setSelected(index) } }
	>
	{#each shades as shade}
		<div
			class="flex-grow shade"
			style={ `background-color: hsl(${color.hue}, ${shade.saturation}%, ${shade.lightness}%);` } />
	{/each}
</div>
