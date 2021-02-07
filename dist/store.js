import {writable, derived} from "../_snowpack/pkg/svelte/store.js";
import {nanoid} from "../_snowpack/pkg/nanoid.js";
export const shades = [
  {name: "50", saturation: 100, lightness: 90},
  {name: "100", saturation: 88, lightness: 80},
  {name: "200", saturation: 75, lightness: 70},
  {name: "300", saturation: 62, lightness: 60},
  {name: "400", saturation: 50, lightness: 50},
  {name: "500", saturation: 62, lightness: 40},
  {name: "600", saturation: 75, lightness: 30},
  {name: "700", saturation: 88, lightness: 20},
  {name: "800", saturation: 95, lightness: 10},
  {name: "900", saturation: 100, lightness: 5}
];
export const defaultHue = 0;
function createStore() {
  const palette = writable({colors: []});
  const exportModal = writable(false);
  const selected = derived(palette, ($palette) => $palette.colors.find((color) => color.id == $palette.selected));
  return {
    palette: {subscribe: palette.subscribe},
    selected: {subscribe: selected.subscribe},
    exportModal: {subscribe: exportModal.subscribe},
    showExport: () => exportModal.set(true),
    closeExport: () => exportModal.set(false),
    addColor: () => palette.update((palette2) => {
      const defaultColor = {
        id: nanoid(),
        hue: defaultHue,
        name: `color${palette2.colors.length + 1}`
      };
      return {
        ...palette2,
        colors: [...palette2.colors, defaultColor],
        selected: defaultColor.id
      };
    }),
    setCurrentHue: (hue) => palette.update((palette2) => ({
      ...palette2,
      colors: palette2.colors.map((color) => color.id === palette2.selected ? {...color, hue} : color)
    })),
    setSelected: (id) => palette.update((palette2) => ({...palette2, selected: id}))
  };
}
export const store = createStore();
