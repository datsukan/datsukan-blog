import { graphql } from "gatsby"

import { ArticlesLayout } from "@layouts/articles"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title
  const articles = data.allContentfulArticle.nodes
  const { categoryName } = pageContext

  return (
    <ArticlesLayout
      location={location}
      siteTitle={siteTitle}
      pageTitle={categoryName}
      articles={articles}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($categoryId: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulArticle(
      sort: { fields: [createdAt], order: DESC }
      filter: { category: { id: { eq: $categoryId } } }
    ) {
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
