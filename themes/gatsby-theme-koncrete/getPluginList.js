module.exports = ({
  useSitemap,
  useSharp,
  useNetlify,
  siteUrl
}) => {
  let pluginsList = [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript'
  ]
  // If we don't have a siteUrl, then we can't produce a sitemap!
  if (useSitemap === true && typeof siteUrl === 'string') {
    pluginsList = [...pluginsList, 'gatsby-plugin-sitemap']
  }
  if (useSharp === true) {
    pluginsList = [
      ...pluginsList,
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp'
    ]
  }
  if (useNetlify === true) {
    pluginsList = [...pluginsList, 'gatsby-plugin-netlify']
  }
  return pluginsList
}
