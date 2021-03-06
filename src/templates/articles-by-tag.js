import { graphql } from "gatsby"

import { ArticlesLayout } from "@layouts/articles"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title
  const articles = data.allContentfulArticle.nodes
  const { tagName } = pageContext

  return (
    <ArticlesLayout
      location={location}
      siteTitle={siteTitle}
      pageTitle={tagName}
      articles={articles}
    />
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query ($tagId: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulArticle(
      sort: { fields: [createdAt], order: DESC }
      filter: { tags: { elemMatch: { contentful_id: { eq: $tagId } } } }
    ) {
      nodes {
        id: contentful_id
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
