import Base from "./Base.svelte";

var base = new Base({
  target: document.body,
});

export default base;

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    base.$destroy();
  });
}
