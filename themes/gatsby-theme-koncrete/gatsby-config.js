// Options:
// useSharp?: boolean = false
// useNetlify?: boolean = false
// useSitemap?: boolean = false
// siteUrl?: string

const getPlugins = require('./getPluginList')

module.exports = (options) => {
  const plugins = getPlugins(options)
  return {
    plugins,
    siteMetadata: {
      siteUrl: options.siteUrl
    }
  }
}
