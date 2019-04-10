# gatsby-starter-koncrete

Minimal implementation of the [koncrete Gatsby theme](https://github.com/kompanion/gatsby-themes/tree/master/koncrete). See `gatsby-theme-koncrete`'s documentation for more info on set-up options for your theme 

```graphql
{
  allKommunityContent {
    categories: group(field: category) {
      category: fieldValue
      entries: edges {
        content: node {
          title
          collaborators {
            handle
            fields {
              avatarUrl
              name
            }
          }
        }
      }
    }
  }
```