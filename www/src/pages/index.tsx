import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import ContentCard, { IContentCardProps } from '../components/ContentCard'

export interface IIndexPageProps {
  data: {
    content: {
      edges: Array<{
        node: IContentCardProps
      }>
    }
  }
}

export const IndexPage: React.SFC<IIndexPageProps> = ({ data }) => {
  console.log(data)
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1>kompanion kommunity</h1>
      <section className="content__wrapper">
        {data.content.edges.map(({ node }) => (
          <ContentCard key={node.url} {...node} />
        ))}
      </section>
    </div>
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
          category
          skillLevel: expertiseLevel
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
