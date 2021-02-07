import { writable } from 'svelte/store';

export type Hue = number

export interface PaletteColor {
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
	selected?: number,
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

function createPaletteStore() {
	const { subscribe, update } = writable<Palette>({ colors: [] })

	return {
		subscribe,

		addColor: () => update(
			palette => {
				const defaultColor = {
					hue: defaultHue,
					// TODO Nicer default names primary, secondary, tertiary, etc
					name: `color${palette.colors.length+1}`,
        }
				return {
					...palette,
					colors: [...palette.colors, defaultColor],
					selected: palette.colors.length,
				}
			}
		),

		// Update hue on currently selected color
		setCurrentHue: (hue:Hue) => update(
			palette => ({
				...palette,
				colors: palette.colors.map(
					(color, i) => (i === palette.selected) ? { ...color, hue }:color
				)
			})
		),

		setSelected: (index:number) => update(
			palette =>
				(typeof palette.colors[index] !== undefined)
					? ({ ...palette, selected: index }) : palette
	  ),
	};
}

export const palette = createPaletteStore();


// Store for export modal (true=visible, false=hidden)
function createExportModalStore() {
	const { subscribe, set, update } = writable<boolean>(false)
	return {
		subscribe,
		toggle: () => update( visible => !visible ),
		close: () => set(false),
	}
}

export const exportModalState = createExportModalStore()

