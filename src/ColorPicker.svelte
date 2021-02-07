<script lang='typescript'>
	import iro from '@jaames/iro'
	import { store, defaultHue } from './store'

	let picker:iro.ColorPicker | undefined
	const { selected } = store

	function colorChanged(color:iro.Color) {
		store.setCurrentHue(color.hue)
	}

	function pickerAction(node:HTMLElement) {
		picker = iro.ColorPicker(node, {
			color: `hsl(${defaultHue}, 50%, 100%)`,
			layoutDirection: "vertical",
			sliderSize: 24,
			handleRadius: 10,
      layout: [{
        component: iro.ui.Slider,
        options: { sliderType: 'hue', }
      }]
		})

		picker.on("color:change", colorChanged)
		
		return {
			destroy() {
				picker?.off("color:change", colorChanged) 
				// No destroy for picker? 
				// https://github.com/jaames/iro.js/issues/157
			}
		}
	}
$: {
	// When a new color is selected, update the picker to match selected hue
	const current = $selected
	if (current !== undefined && picker) {
		picker.color.set(`hsl(${current.hue}, 50%, 100%)`)
	}	
}

</script>

<div use:pickerAction id="hue-picker"></div>
