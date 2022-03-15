import { graphql } from "gatsby"

import { ArticlesLayout } from "@layouts/articles"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const articles = data.allMicrocmsArticle.edges
  const { categoryLabel } = pageContext

  return (
    <ArticlesLayout
      location={location}
      siteTitle={siteTitle}
      pageTitle={categoryLabel}
      articles={articles}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($categoryName: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMicrocmsArticle(
      sort: { fields: [publishedAt], order: DESC }
      filter: { category: { name: { eq: $categoryName } } }
    ) {
      edges {
        node {
          id
          articleId
          createdAt
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
