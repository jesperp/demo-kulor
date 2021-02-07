<script lang='typescript'>
	import iro from '@jaames/iro'
	import { palette, defaultHue } from './store'

	let picker:iro.ColorPicker | undefined

	function colorChanged(color:iro.Color) {
		palette.setCurrentHue(color.hue)
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
	const selected = $palette.selected
	if (selected !== undefined && picker) {
		picker.color.set(`hsl(${$palette.colors[selected].hue || defaultHue}, 50%, 100%)`)
	}	
}

</script>

<div use:pickerAction id="hue-picker"></div>
