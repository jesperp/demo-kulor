const autoPreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: autoPreprocess({
    defaults: {
      script: 'typescript',
    },
    postcss: {
      verbose: true,
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ]
    },
  }),
};
