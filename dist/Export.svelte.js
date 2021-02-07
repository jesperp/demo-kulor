/* src/Export.svelte generated by Svelte v3.32.1 */
import {
	SvelteComponent,
	add_render_callback,
	append,
	attr,
	component_subscribe,
	create_in_transition,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	set_style,
	space,
	text
} from "../_snowpack/pkg/svelte/internal.js";

import { fade } from "../_snowpack/pkg/svelte/transition.js";
import { shades, store } from "./store.js";

function create_fragment(ctx) {
	let div1;
	let section;
	let button0;
	let t0;
	let div0;
	let t5;
	let pre;
	let t6_value = ":root{\n" + /*$palette*/ ctx[0].colors.map(/*func*/ ctx[2]).join("\n\n") + "\n}" + "";
	let t6;
	let section_intro;
	let mounted;
	let dispose;

	return {
		c() {
			div1 = element("div");
			section = element("section");
			button0 = element("button");
			button0.innerHTML = `<svg width="25" height="25" class="" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`;
			t0 = space();
			div0 = element("div");

			div0.innerHTML = `<button class="px-2 rounded-lg ring-4 ring-green-200">CSS</button> 
      <button>Tailwind<sup class="text-xs text-red-700 animate-pulse">TODO</sup></button>`;

			t5 = space();
			pre = element("pre");
			t6 = text(t6_value);
			attr(button0, "title", "Close window");
			attr(button0, "class", "absolute top-2 right-2 ");
			attr(div0, "class", "flex justify-around mb-2 text-lg font-bold");
			attr(pre, "class", "flex overflow-scroll select-all h-80");
			set_style(section, "max-width", "700px");
			set_style(section, "min-width", "300px");
			attr(section, "class", "relative p-4 px-4 mx-4 text-sm text-black bg-white shadow-md opacity-100 rounded-md");
			set_style(div1, "background-color", "rgba(0, 0, 0, 0.6)");
			attr(div1, "class", "absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen overlay ");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, section);
			append(section, button0);
			append(section, t0);
			append(section, div0);
			append(section, t5);
			append(section, pre);
			append(pre, t6);

			if (!mounted) {
				dispose = [
					listen(button0, "click", store.closeExport),
					listen(section, "mousedown", mousedown_handler),
					listen(div1, "mousedown", store.closeExport)
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$palette*/ 1 && t6_value !== (t6_value = ":root{\n" + /*$palette*/ ctx[0].colors.map(/*func*/ ctx[2]).join("\n\n") + "\n}" + "")) set_data(t6, t6_value);
		},
		i(local) {
			if (!section_intro) {
				add_render_callback(() => {
					section_intro = create_in_transition(section, fade, {});
					section_intro.start();
				});
			}
		},
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
			mounted = false;
			run_all(dispose);
		}
	};
}

const mousedown_handler = e => e.stopPropagation();

function instance($$self, $$props, $$invalidate) {
	let $palette;
	const { palette } = store;
	component_subscribe($$self, palette, value => $$invalidate(0, $palette = value));

	const func = color => `\t--base-${color.name}: ${color.hue.toFixed(1)};\n` + // E.g: --base-color1: 180;
	shades.map(shade => // E.g: --color1-500: hsl(var(--base-color1), 100%, 90%);
	`\t--${color.name}-${shade.name}: hsl(var(--base-${color.name}), ${shade.saturation}%, ${shade.lightness}%);`).join("\n");

	return [$palette, palette, func];
}

class Export extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Export;