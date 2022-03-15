import { graphql } from "gatsby"

import { ArticlesLayout } from "@layouts/articles"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title
  const articles = data.allMicrocmsArticle.edges
  const { tagLabel } = pageContext

  return (
    <ArticlesLayout
      location={location}
      siteTitle={siteTitle}
      pageTitle={tagLabel}
      articles={articles}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($tagName: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMicrocmsArticle(
      sort: { fields: [publishedAt], order: DESC }
      filter: { tags: { elemMatch: { name: { eq: $tagName } } } }
    ) {
      edges {
        node {
          id
          createdAt
          updatedAt
          publishedAt
          publishedAt
          updatedAt
          formattedPublishedAt: publishedAt(formatString: "YYYY.MM.DD")
          formattedUpdatedAt: updatedAt(formatString: "YYYY.MM.DD")
          revisedAt
          title
          description
          emoji
          body
          category {
            id
            name
            label
            order
          }
          tags {
            name
            label
          }
        }
      }
    }
  }
`
