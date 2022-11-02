const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addBase, matchUtilities, theme }) {
    addBase({
      ':root': {
        '--fluid-min-width': theme('fluid.minWidth', '375'),
        '--fluid-max-width': theme('fluid.maxWidth', '1440'),
        '--fluid-screen': 'calc(var(--fluid-min-width) * 1px)',
        '--fluid-bp': 'calc((var(--fluid-screen) - var(--fluid-min-width) / 16 * 1rem) / (var(--fluid-max-width) - var(--fluid-min-width)))',
        [`@media (min-width: ${theme('fluid.minWidth', '1440')}px)`]: {
          '--fluid-screen': '100vw',
        },
        [`@media (min-width: ${theme('fluid.maxWidth', '1440')}px)`]: {
          '--fluid-screen': 'calc(var(--fluid-max-width) * 1px)',
        },
      },
    });

    matchUtilities({
      'fluid-min': modifier => {
        if (modifier === undefined) {
          return [];
        }

        return {
          '--fluid-min-font-size': modifier,
          'font-size': 'calc(((var(--fluid-min-font-size) / 16) * 1rem) + (var(--fluid-max-font-size) - var(--fluid-min-font-size)) * var(--fluid-bp))',
        };
      },
      'fluid-max': modifier => {
        if (modifier === undefined) {
          return [];
        }

        return {
          '--fluid-max-font-size': modifier,
        };
      },
    });
  },
  {
    theme: {
      fluid: {
        'minWidth': '375',
        'maxWidth': '1440',
      }
    }
  }
)
