# Sanity customizer plugin

This plugin changes the Sanity studio logo and overrides CSS variables on color.

How to use it:

1. Change `Logo.jsx` to include the svg for the brand's logo;
2. update the variables in `variableOverrides.css` (as of now, I've only found it useful to change `--brand-primary`, but you can take a look at all the variables you can change [here](https://github.com/sanity-io/sanity/tree/master/packages/%40sanity/base/src/styles/variables))