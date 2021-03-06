require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-koncrete',
      options: {
        useTypescript: true,
        useSharp: false
      }
    }
  ],
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({ stage: 0 }),
          require('stylelint')()
          // require('cssnano')()
        ]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Merriweather`,
            variants: [`900`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/layouts/RegularPage.tsx')
        }
      }
    },
    {
      resolve: '@dschau/gatsby-source-github',
      options: {
        headers: {
          Authorization: `Bearer ${process.env.GH_ACCESS_TOKEN}` // https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
        },
        queries: [
          `{
            repository(name: "kommunity-content", owner: "kompanion") {
              name
              files: object(expression: "master:content") {
                ... on Tree {
                  entries {
                    name
                    object {
                      ... on Blob {
                        text
                      }
                    }
                  }
                }
              }
            }
          }`
        ]
      }
    }
  ]
}
