import { IContentCard } from '@kompanion/types'
import { graphql } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'

import Directory from '../containers/Directory/Directory'
import { textToParagraphs } from '../../../utilities/utils/lib'

export interface IIndexPageProps {
  data: {
    content: {
      edges: Array<{
        node: IContentCard
      }>
    }
  }
}

const firstParagraph = `Learning Gatsby and React can be fun and more collaborative. Count on valuable, community-curated content as your kompanion.\n__Why count on old fashioned link aggregators when you have recommendations by your fellow developers?__ 😉`

export const IndexPage: React.SFC<IIndexPageProps> = ({ data }) => {
  return (
    <>
      <Helmet>
        <title>
          Kompanion kommunity - learning Gatsby can be fun and effective
        </title>
      </Helmet>
      <Directory content={data.content.edges}>
        <h1>kommunity</h1>
        {textToParagraphs(firstParagraph)}
      </Directory>
    </>
  )
}

IndexPage.displayName = 'IndexPage'

export default IndexPage

export const pageQuery = graphql`
  {
    content: allKommunityContent {
      edges {
        node {
          title
          topic
          skillLevel
          format
          url
          recommendations {
            user {
              handle
              fields {
                avatarUrl
                name
              }
            }
            comment
          }
        }
      }
    }
  }
`
