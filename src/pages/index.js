import { graphql } from "gatsby"
import { ArticlesLayout } from "@layouts/articles"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title
  const articles = data.allContentfulArticle.nodes

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
    allContentfulArticle(sort: { fields: [createdAt], order: DESC }) {
      nodes {
        id
        slug
        createdAt
        formattedCreatedAt: createdAt(formatString: "YYYY.MM.DD")
        title
        emoji
        category {
          slug
          name
        }
        tags {
          slug
          name
        }
      }
    }
  }
`
