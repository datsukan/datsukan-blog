import { graphql } from "gatsby"
import { ArticlesLayout } from "@layouts/articles"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title
  const articles = data.allMicrocmsArticle.edges

  return (
    <ArticlesLayout
      location={location}
      siteTitle={siteTitle}
      pageTitle=""
      articles={articles}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMicrocmsArticle(sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
          createdAt
          updatedAt
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
