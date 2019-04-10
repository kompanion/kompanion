# gatsby-theme-koncrete

koncrete is the basis for Gatsby projects, adding **Typescript integration** (which you opt not to use) and **`react-helmet`** (as well as `gatsby-plugin-react-helmet`) by default. Optionally, you can also add `gatsby-plugin-sitemap`, `gatsby-transformer-sharp` and `gatsby-plugin-netlify` via theme options.

This theme doesn't add any component or functionality, it's purely for packing dependencies. If you're looking for higher-level themes, browse [kompanion's theme repository](https://github.com/kompanion/gatsby-themes).

## Usage

```shell
npm i gatsby-theme-koncrete
# or
yarn add gatsby-theme-koncrete
```

All the available options are listed in the example below:

```js
// in your gatsby-config.js
module.exports = {
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-koncrete',
      options: {
        useSharp: false, // defaults to false
        useNetlify: true, // defaults to false
        useSitemap: true, // defaults to false
        siteUrl: 'https://gatsbyjs.org', // necessary for `useSitemap`
      }
    }
  ]
  // ...
}
```

## Note on dependencies

Many npm packages aren't transparent about why and how they add dependencies to your projects, and that's part of the reason why our `node_modules` folder is so bloated... if your dependency graph concerns you, be sure to read below.

This theme includes the following packages as dependencies, meaning you'll download all of them when using it:

```json
{
  "dependencies": {
    "@babel/plugin-transform-typescript": "^7.1.0",
    "@kompanion/utils": "*",
    "@types/react-helmet": "^5.0.8",
    "gatsby-plugin-page-creator": "^2.0.10",
    "gatsby-plugin-react-helmet": "^3.0.7",
    "gatsby-plugin-sharp": "^2.0.28",
    "gatsby-plugin-sitemap": "^2.0.9",
    "gatsby-plugin-typescript": "^2.0.9",
    "gatsby-transformer-sharp": "^2.1.17",
    "gatsby-plugin-netlify": "^2.0.11",
    "react-helmet": "^5.2.0",
    "typescript": "^3.3.0"
  },
}
```

This is an intended behavior to simplify development as, by doing so, you **need only install `gatsby-theme-koncrete` and not have to worry about the other packages**, freeing space and complexity in your `package.json`.

Also, having the package doesn't mean you have to use it: if you don't turn them on in the theme's properties, Gatsby won't do anything about it and your runtime won't be affected 😉

## TODO

- set-up prettier and eslint (or standardJS)
- **documentation**
- Investigate if there's a way to set-up `prettier` and `tslint`/`eslint` to run on sites
  - This might be better off with starters as configuration is highly personal and might incurr in headaches for users