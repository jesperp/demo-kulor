import { writable, derived } from 'svelte/store';
import { nanoid } from 'nanoid'

type Hue = number
type PaletteColorId = ReturnType<typeof nanoid>

export interface PaletteColor {
	id: PaletteColorId,
	hue: Hue,			// The H in HSL
	name: string,
}

export interface Shade {
	name: string,
	saturation: number,  // The S in HSL
	lightness: number,   // The L in HSL
}

type Palette = {
	colors: Array<PaletteColor>,
	selected?: PaletteColorId,
}


// TODO Make these configurable
export const shades:Array<Shade> = [
	{ name: "50" , saturation:  100, lightness: 90 },
	{ name: "100", saturation:   88, lightness: 80 },
	{ name: "200", saturation:   75, lightness: 70 },
	{ name: "300", saturation:   62, lightness: 60 },
	{ name: "400", saturation:   50, lightness: 50 },
	{ name: "500", saturation:   62, lightness: 40 },
	{ name: "600", saturation:   75, lightness: 30 },
	{ name: "700", saturation:   88, lightness: 20 },
	{ name: "800", saturation:   95, lightness: 10 },
	{ name: "900", saturation:  100, lightness:  5 },
]


export const defaultHue = 0

function createStore() {
	const palette = writable<Palette>({ colors: [] })
	const exportModal = writable<boolean>(false)

	// Derive currently selected color
	const selected = derived(palette,
		$palette =>
			$palette.colors.find( color => color.id == $palette.selected)
	)

	return {
		// Make direct store access readonly from outside
		palette: { subscribe: palette.subscribe },
		selected: { subscribe: selected.subscribe },
		exportModal: { subscribe: exportModal.subscribe },

		//
		// Public "API"
		//
		showExport: () => exportModal.set(true),

		closeExport: () => exportModal.set(false),

		addColor: () => palette.update(
			palette => {
				const defaultColor = {
					id: nanoid(),
					hue: defaultHue,
					// TODO Nicer default names primary, secondary, tertiary, etc
					name: `color${palette.colors.length+1}`,
        }
				return {
					...palette,
					colors: [...palette.colors, defaultColor],
					selected: defaultColor.id,
				}
			}
		),

		setCurrentHue: (hue:Hue) => palette.update(
			palette => ({
				...palette,
				colors: palette.colors.map(
					(color) => (color.id === palette.selected) ? { ...color, hue }:color
				)
			})
		),

		setSelected: (id:PaletteColorId) => palette.update(
			palette => ({ ...palette, selected: id })
	  ),
	}
}

export const store = createStore()
