const axios = require('axios')
const crypto = require('crypto')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

exports.onCreateNode = async ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  const {
    internal: { type },
    name,
    files,
    handle
  } = node

  if (
    type === 'GithubRepository' &&
    name === 'kommunity-content' &&
    files &&
    Array.isArray(files.entries)
  ) {
    console.time('\n====================\nCreating nodes')
    const { entries } = files

    for (const entry of entries) {
      const { object, name } = entry
      if (
        typeof name !== 'string' ||
        !object ||
        typeof object.text !== 'string'
      ) {
        continue
      }

      const content = JSON.parse(object.text)
      if (
        !content ||
        typeof content.title !== 'string' ||
        typeof content.url !== 'string' ||
        !Array.isArray(content.recommendations)
      ) {
        continue
      }

      const collaborators = content.recommendations.map(r => r.user)

      for (const c of collaborators) {
        if (typeof c !== 'string') {
          continue
        }

        createNode({
          id: `kommCollaborator-${c}`,
          handle: c,
          parent: null,
          children: [],
          internal: {
            type: 'KommunityCollaborator',
            contentDigest: crypto
              .createHash(`md5`)
              .update(c)
              .digest(`hex`)
          }
        })
      }

      createNode({
        id: name,
        collaborators___NODE: collaborators.map(c => `kommCollaborator-${c}`),
        ...content,
        recommendations: content.recommendations.map(({ comment, user }) => ({
          user___NODE: `kommCollaborator-${user}`,
          comment
        })),
        parent: null,
        children: [],
        internal: {
          mediaType: 'application/json',
          type: 'KommunityContent',
          contentDigest: crypto
            .createHash(`md5`)
            .update(object.text)
            .digest(`hex`),
          content: object.text,
          description: `Kommunity content node: ${content.title}`
        }
      })
    }
    console.timeEnd('\n====================\nCreating nodes')
  } else if (type === 'KommunityCollaborator') {
    console.time('\n===============\nFetching collaborators')
    const query = `
      query {
        user(login: "${handle}") {
          avatarUrl(size: 64)
          name
        }
      }
    `
    const res = await axios.post(
      'https://api.github.com/graphql',
      { query },
      {
        headers: {
          Authorization: `Bearer ${process.env.GH_ACCESS_TOKEN}`
        }
      }
    )
    const { data } = res
    if (data.data && data.data.user) {
      const { avatarUrl, name } = data.data.user
      createNodeField({
        node,
        name: 'avatarUrl',
        value: avatarUrl
      })
      createNodeField({
        node,
        name: 'name',
        value: name
      })
    }
    console.timeEnd('\n===============\nFetching collaborators')
  }
}
